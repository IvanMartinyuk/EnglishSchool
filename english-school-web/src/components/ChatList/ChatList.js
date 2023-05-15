import { useEffect, useState } from "react";
import { ChatService } from "../../services/chatService";
import Chat from '../Chat/Chat';
import './ChatList.scss';

const emptyImageUrl = "https://simg.nicepng.com/png/small/128-1280406_view-user-icon-png-user-circle-icon-png.png";

const ChatList = () => {
    const [chatList, setChatList] = useState([]);
    const [chatClasses, setChatClasses] = useState([]);
    const [currentChat, setCurrentChat] = useState(-1);
    const [prevChatNumber, setPrevChatNumber] = useState(-1);

    const defaultClasses = 'd-flex p-3 align-items-center';
    const blueClasses = 'd-flex p-3 align-items-center background-blue';

    useEffect(() => {
        let chatService = new ChatService();
        chatService.getChats().then(chats => {
            setChatList(chats);
            let classes = [];
            chats.forEach(chat => {
                classes.push(defaultClasses)
            })
            setChatClasses(classes);
        })
    }, [])

    const handleClick = (e) => {
        let classes = chatClasses;
        classes[e.target.id] = blueClasses;
        if(prevChatNumber > -1)
            classes[prevChatNumber] = defaultClasses;
        setPrevChatNumber(e.target.id);
        setCurrentChat(chatList[e.target.id]);
    }

    return(
        <div className="d-flex">
            <div className="w-25">
                {
                    chatList.map(chat => {
                        let index = chatList.indexOf(chat);
                        return(
                            <div className={ chatClasses[index] } onClick={handleClick} id={index}>
                                <div className="img-full-chat" id={index}>
                                    <img src={ chat.tutorImage.length > 0 ? chat.tutorImage : emptyImageUrl } 
                                         className='rounded-circle img-full'
                                         id={index}></img>
                                </div>
                                <b className="text-center w-75 fs-3" id={index}>{ chat.tutorName }</b>
                            </div>
                        )
                    })
                }
            </div>
            <div className="w-75 border-start h-90shv">
                <Chat chatId={ currentChat.chatId } ></Chat>
            </div>
        </div>
    )
}

export default ChatList;