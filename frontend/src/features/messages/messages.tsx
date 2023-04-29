import React, {
  useState,
  useEffect,
  useRef,
  KeyboardEvent,
  MouseEventHandler,
  useCallback,
} from "react";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
  isSentByMe,
} from "@config/chatLogics";
import { selectCurrentUser } from "@store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetSelectedChatMutation,
  useGetChatMessagesQuery,
  useSendMessageMutation,
} from "@/store/api/chatApi";
import {
  setSelectedChat,
  getSelectedChat,
  getChatMessages,
  getNewMessage,
  setChatMessages,
} from "@slices/chatSlice";

export function Messages({ messagesData }: any) {
  console.log("MESSAGES COMP");
  const [sendMessage, { data: sentMessageData }] = useSendMessageMutation();

  const [messages, setMessages]: any = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // setMessages(messagesData);
  console.log(messages);
  useEffect(() => {
    if (messagesData) {
      setMessages(messagesData);
    }
  }, [messagesData]);
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const selectedChat = useSelector(getSelectedChat);

  const handleSendMessage = async (event: any) => {
    event.preventDefault();

    console.log("inside handle send message");
    console.log(event);
    console.log(newMessage);

    if ((event.type === "click" || event.key === "Enter") && newMessage) {
      // setNewMessage("");
      sendMessage({
        chatId: selectedChat?._id,
        content: newMessage,
      })
        .unwrap()
        .then((data) => {
          console.log("after send message success!!");
          setNewMessage("");
          setMessages([...messages, data]);
          console.log("messages after sending message", messages);
        });
    }
  };

  const typingHandler = useCallback(
    (e: any) => {
      if (e.key !== "Enter") {
        setNewMessage(e.target.value);
      }
    },
    [setNewMessage]
  );
  return (
    <>
      <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
        <div className="flex flex-col h-full">
          {messages &&
            user &&
            messages.map((m: any, i: any) => (
              <div
                key={i}
                className={`flex ${
                  isSentByMe(messages, m, i, user?._id)
                    ? "justify-end"
                    : "justify-start"
                } mb-4`}
              >
                <div
                  className={`max-w-md py-2 px-4 ${
                    isSentByMe(messages, m, i, user?._id)
                      ? "bg-blue-500 text-white rounded-br-md rounded-tl-md rounded-tr-md"
                      : "bg-gray-100 text-gray-700 rounded-bl-md rounded-tl-md rounded-tr-md"
                  }`}
                >
                  <p>{m.content}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="flex items-center mt-auto justify-between w-full p-3 border-t border-gray-300">
        <input
          type="text"
          placeholder="Message"
          className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
          name="message"
          required
          onChange={typingHandler}
          value={newMessage}
          // onKeyDown={handleSendMessage}
        />
        <button onClick={handleSendMessage}>
          <svg
            className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </div>
    </>
  );
}
