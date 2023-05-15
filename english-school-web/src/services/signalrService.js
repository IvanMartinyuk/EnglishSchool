import { HubConnectionBuilder } from "@microsoft/signalr";

const chatUrl = 'https://localhost:7158/chatHub'

export class SignalRService {
  connection = '';
  constructor() {
    this.connection = new HubConnectionBuilder()
      .withUrl(chatUrl)
      .withAutomaticReconnect()
      .build();

    this.connection.onclose(() => {
      console.log('SignalR connection closed.');
    });
  }

  startConnection() {
    this.connection
      .start()
      .then(() => {
        console.log('SignalR connection established.');
      })
      .catch((error) => {
        console.error('Error starting SignalR connection:', error);
      });
  }

  stopConnection() {
    this.connection.stop().then(() => {
      console.log('SignalR connection stopped.');
    });
  }

  joinGroup(chatId) {
    console.log(this.connection)
    this.connection.invoke("JoinGroup", chatId);
  }
  
  leaveGroup(chatId) {
    console.log(this.connection)
    this.connection.invoke("LeaveGroup", chatId);
  }

  onChatCreated(callback) {
    this.connection.on('ChatCreated', callback);
  }

  onMessageReceived(callback) {
    this.connection.on('ReceiveMessage', callback);
  }
  
  async createChat() {
    if (this.connection) {
      try {
        await this.connection.invoke("CreateChat");
      } catch (error) {
        console.log("Chat is not created");
      }
    } else {
      console.log("SignalR connection not established.");
    }
  }

  async sendMessage(chatId, message) {
    if (this.connection) {
      try {
        console.log(this.connection)
        let userId = sessionStorage.getItem("userId");
        console.log(chatId, message, userId)
        await this.connection.invoke("SendMessage", chatId, parseInt(userId), message);
        console.log("Message sent:", chatId, sessionStorage.getItem("userId"), message);
      } catch (error) {
        console.log("Error sending message:", error);
      }
    } else {
      console.log("SignalR connection not established.");
    }
  }

  onReceiveMessage(callback) {
    if (this.connection) {
      this.connection.on("ReceiveMessage", (message) => {
        console.log("Message received:", message);
        callback(message);
      });
    }
  }
}


