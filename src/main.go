package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
	"golang.org/x/crypto/bcrypt"
)

var clients = make(map[*websocket.Conn]bool)
var broadcast = make(chan Message)
var upgrader = websocket.Upgrader{}
var jwtKey = []byte("dasanidrinkingwater")

// Message structure
type Message struct {
	Username string `json:"username"`
	Message  string `json:"message"`
}

// User structure
type User struct {
	Username string `json:"Username"`
	Password string `json:"Password"`
	Email    string `json:"Email"`
}
type allUsers []User

var users = allUsers{}

// Claims structure
type Claims struct {
	Username string `json:"Username"`
	jwt.StandardClaims
}

func main() {
	file, _ := ioutil.ReadFile("store/users.json")
	json.Unmarshal(file, &users)

	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/api", home).Methods("GET")
	router.HandleFunc("/api/register", register).Methods("POST")
	router.HandleFunc("/api/login", login).Methods("POST")
	router.HandleFunc("/ws", handleConnections)
	router.PathPrefix("/").Handler(http.FileServer(http.Dir("../public")))
	go handleMessages()
	log.Println("http server started on :8000")
	err := http.ListenAndServe(":8000", router)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

func home(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(users)
}

func register(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var user User
	_ = json.NewDecoder(r.Body).Decode(&user)
	for _, v := range users {
		if user.Username == v.Username {
			http.Error(w, "Username not available.", 409)
			return
		}
		if user.Email == v.Email {
			http.Error(w, "An account has already been registered with the email entered.", 409)
			return
		}
	}
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		panic(err)
	}
	user.Password = string(hashedPassword)
	users = append(users, user)
	jsonString, _ := json.Marshal(users)
	ioutil.WriteFile("store/users.json", jsonString, os.ModePerm)
}

func login(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var user User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, "Invalid credentials.", 401)
		return
	}
	for _, v := range users {
		if user.Username == v.Username || user.Email == v.Email {
			if comparePasswords([]byte(v.Password), []byte(user.Password)) {
				expirationTime := time.Now().Add(120 * time.Minute)
				claims := &Claims{
					Username: user.Username,
					StandardClaims: jwt.StandardClaims{
						ExpiresAt: expirationTime.Unix(),
					},
				}
				token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
				tokenString, err := token.SignedString(jwtKey)
				if err != nil {
					w.WriteHeader(http.StatusInternalServerError)
					return
				}
				// http.SetCookie(w, &http.Cookie{
				// 	Name:    "token",
				// 	Value:   tokenString,
				// 	Expires: expirationTime,
				// })
				response := map[string]string{
					"token":    tokenString,
					"username": v.Username,
				}
				json.NewEncoder(w).Encode(response)
				return
			}
		}
	}
	http.Error(w, "Invalid credentials.", 401)
}

func comparePasswords(hashedPwd []byte, plainPwd []byte) bool {
	err := bcrypt.CompareHashAndPassword(hashedPwd, plainPwd)
	if err != nil {
		return false
	}
	return true
}

func handleConnections(w http.ResponseWriter, r *http.Request) {
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Fatal(err)
	}
	defer ws.Close()
	clients[ws] = true
	for {
		var msg Message
		err := ws.ReadJSON(&msg)
		if err != nil {
			log.Printf("error: %v", err)
			delete(clients, ws)
			break
		}
		broadcast <- msg
	}
}

func handleMessages() {
	for {
		msg := <-broadcast
		log.Println(msg)
		f, err := os.OpenFile("store/messages.txt", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
		if err != nil {
			log.Fatal(err)
		}
		if _, err := f.Write([]byte(msg.Username + ": " + msg.Message + "\n")); err != nil {
			log.Fatal(err)
		}
		if err := f.Close(); err != nil {
			log.Fatal(err)
		}
		for client := range clients {
			err := client.WriteJSON(msg)
			if err != nil {
				log.Printf("error: %v", err)
				client.Close()
				delete(clients, client)
			}
		}
	}
}
