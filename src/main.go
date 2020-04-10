package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
)

var clients = make(map[*websocket.Conn]bool)
var broadcast = make(chan Message)
var upgrader = websocket.Upgrader{}

// Message structure
type Message struct {
	Username string `json:"username"`
	Message  string `json:"message"`
}

// User structure
type user struct {
	Username string `json:"username"`
	Password string `json:"password"`
}
type allUsers []user

var users = allUsers{
	{
		Username: "admin",
		Password: "pass",
	},
}

func main() {
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/api", home)
	router.Handle("/", http.FileServer(http.Dir("../public")))
	router.HandleFunc("/ws", handleConnections)
	go handleMessages()
	log.Println("http server started on :8000")
	err := http.ListenAndServe(":8000", router)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

func home(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(users)
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
		f, err := os.OpenFile("messages.txt", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
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
