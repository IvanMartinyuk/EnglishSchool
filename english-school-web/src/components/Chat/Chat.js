import React, { useEffect, useRef, useState } from "react";
import { SignalRService } from "../../services/signalrService.js";
import './Chat.scss';
import { ChatService } from "../../services/chatService.js";

const ChatComponent = (props) => {
  const { chatId } = props;
  const [messages, setMessages] = useState([]);
  const [messageClasses, setMessageClasses] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [signalRService, setSignalRService] = useState(new SignalRService());

  const divRef = useRef(null);

  useEffect(() => {
    let srService = new SignalRService();
    setSignalRService(srService);
    srService.startConnection();

    srService.onReceiveMessage((message) => {
      setMessages((prevMessages) => [...prevMessages, message.message]);
      let classes = '';
      if(sessionStorage.getItem('userId') == message.userId)
        classes = 'currentUserMessage';
      else
        classes = 'anotherUserMessage';
      setMessageClasses((cl) => [...cl, classes]);
    });

    return () => {
      if (srService.connection) {
        srService.connection.stop();
      }
    };
  }, []);

  useEffect(() => {
    if(chatId) {
      signalRService.joinGroup(chatId);
      let chatService = new ChatService();
      chatService.getMessages(chatId).then(mess => {
        let classes = [];
        let messagess = [];
        mess.forEach(m => {
          messagess.push(m.content);
          if(m.userId == sessionStorage.getItem('userId'))
            classes.push('currentUserMessage');
          else
            classes.push('anotherUserMessage');
        })
        setMessages(messagess);
        setMessageClasses(classes);

      })
    }
  }, [chatId])

  useEffect(() => {
    divRef.current.scrollTop = divRef.current.scrollHeight;
  }, [messages])

  const handleSendMessage = () => {
    console.log(inputMessage.length > 0)
    if (inputMessage.length > 0) {
      signalRService.sendMessage(chatId, inputMessage);
      setInputMessage("");
    }
  };

  return (
    <div className="chat" ref={divRef}> 
      {
        messages.map(message => {
          let classesNum = messages.indexOf(message);
          return(
            <div className="message">
              <div className={ messageClasses[classesNum] }>
                { message }
              </div>
            </div>
          )
        })
      }   
      
      <div className="d-flex w-75 chatInput">
        <input type="text" className="w-75 form-control m-3" value={inputMessage} onChange={(e) => {setInputMessage(e.target.value)}}></input>
        <button className="btn btn-dark m-3 ms-0" onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatComponent;
