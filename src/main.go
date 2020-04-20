package main

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
	_ "github.com/mattn/go-sqlite3"
	"golang.org/x/crypto/bcrypt"
)

var clients = make(map[*websocket.Conn]bool)
var broadcast = make(chan Message)
var upgrader = websocket.Upgrader{}
var jwtKey = []byte("dasanidrinkingwater")
var database *sql.DB
var usersStatement *sql.Stmt
var msgsStatement *sql.Stmt

// Message structure
type Message struct {
	Timestamp int    `json:"timestamp"`
	Username  string `json:"username"`
	Message   string `json:"message"`
}

// User structure
type User struct {
	Username string `json:"Username"`
	Password string `json:"Password"`
	Email    string `json:"Email"`
}

// Claims structure
type Claims struct {
	Username string `json:"Username"`
	jwt.StandardClaims
}

func main() {
	database, _ = sql.Open("sqlite3", "./database.db")
	prepDB()
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/api", home).Methods("GET")
	router.HandleFunc("/api/register", register).Methods("POST")
	router.HandleFunc("/api/login", login).Methods("POST")
	router.HandleFunc("/api/messages", messages).Methods("GET")
	router.HandleFunc("/ws", handleConnections)
	router.PathPrefix("/").Handler(http.FileServer(http.Dir("../public")))
	go handleMessages()
	log.Println("http server started on :8000")
	err := http.ListenAndServe(":8000", router)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

func prepDB() {
	usersStatement, _ = database.Prepare("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT, email TEXT, created_on INTEGER)")
	usersStatement.Exec()
	usersStatement, _ = database.Prepare("INSERT INTO users (username, password, email, created_on) VALUES (?, ?, ?, ?)")
	msgsStatement, _ = database.Prepare("CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY, username TEXT, message TEXT, timestamp INTEGER)")
	msgsStatement.Exec()
	msgsStatement, _ = database.Prepare("INSERT INTO messages (username, message, timestamp) VALUES (?, ?, ?)")
}

func home(w http.ResponseWriter, r *http.Request) {
	rows, _ := database.Query("SELECT username, password, email FROM users")
	var u []User
	for rows.Next() {
		var user User
		rows.Scan(&user.Username, &user.Password, &user.Email)
		u = append(u, user)
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(u)
}

func register(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var user User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, "Invalid.", 401)
	}
	rows, _ := database.Query("SELECT username, password, email FROM users")
	for rows.Next() {
		var v User
		rows.Scan(&v.Username, &v.Password, &v.Email)
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
	now := time.Now().Unix()
	usersStatement.Exec(&user.Username, &user.Password, &user.Email, now)
}

func login(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var user User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, "Invalid credentials.", 401)
		return
	}
	rows, _ := database.Query("SELECT username, password, email FROM users")
	for rows.Next() {
		var v User
		rows.Scan(&v.Username, &v.Password, &v.Email)
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

func messages(w http.ResponseWriter, r *http.Request) {
	rows, _ := database.Query("SELECT username, message, timestamp FROM messages")
	var messages []Message
	for rows.Next() {
		var msg Message
		rows.Scan(&msg.Username, &msg.Message, &msg.Timestamp)
		messages = append(messages, msg)
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(messages)
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
		msgsStatement.Exec(&msg.Username, &msg.Message, &msg.Timestamp)
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
