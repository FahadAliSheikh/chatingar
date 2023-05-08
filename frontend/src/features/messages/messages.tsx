import { useState, useEffect, useRef, useCallback } from "react";
import { FaRegPaperPlane } from "react-icons/fa";
import { FaSmile } from "react-icons/fa";

import { isSentByMe } from "@config/chatLogics";
import { selectCurrentUser } from "@store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useSendMessageMutation } from "@/store/api/chatApi";
import { getSelectedChat } from "@slices/chatSlice";
import { getSelectedUser } from "@slices/userSlice";
import {
  getNotification,
  addNotification,
  addToInbox,
  getInbox,
} from "@/store/slices/notificationSlice";

import { getSocket, onReceiveMessage } from "@/socket";
// import { Picker } from "emoji-mart/react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

export function Messages({ messagesData }: any) {
  console.log("MESSAGES COMPONENT=>");
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEmojiSelect = (emoji: any) => {
    if (inputRef.current) {
      inputRef.current.value += emoji.native;
    }
  };

  let socket = getSocket();
  const [sendMessage, { data: sentMessageData, isError, error }] =
    useSendMessageMutation();

  const [messages, setMessages]: any = useState([]);
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  // const [arrivalMessages, setArrivalMessages]: any = useState(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom of the messages component
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    inputRef.current?.focus();
  }, [messages]);

  // useEffect(() => {
  //   onReceiveMessage((data: any) => {
  //     console.log("received message:", data);
  //     // handle received message
  //   });
  // }, []);
  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      console.log("new message received", newMessageReceived);
      // setArrivalMessages(newMessageReceived);
      console.log(newMessageReceived);
      // if (
      //   newMessageReceived &&
      //   selectedChat?.users.some(
      //     (user: any) => user._id === newMessageReceived?.sender._id
      //   )
      // )
      // {
      if (
        (newMessageReceived &&
          currentUser._id === newMessageReceived.sender._id) ||
        selectedUser?._id === newMessageReceived.sender._id
      ) {
        console.log(currentUser._id);
        console.log(selectedUser._id);
        console.log(newMessageReceived.sender._id);
        console.log("isko display krna hai!");
        setMessages([...messages, newMessageReceived]);
        console.log(messages.length);
      } else {
        // display notification here
        console.log("notification");
        dispatch(addNotification());
        dispatch(addToInbox(newMessageReceived));
      }

      // console.log(messages);
    });
  }, [messages]);

  useEffect(() => {
    console.log("messages data wala ue");
    if (messagesData) {
      setMessages(messagesData);
    }
  }, [messagesData]);

  const currentUser = useSelector(selectCurrentUser);
  const selectedChat = useSelector(getSelectedChat);
  const selectedUser = useSelector(getSelectedUser);
  const currentInbox = useSelector(getInbox);

  const handleSendMessage = async (event: any) => {
    // event.preventDefault();
    setIsPickerVisible(false);
    const newMessage = inputRef?.current?.value;
    if ((event.type === "click" || event.key === "Enter") && newMessage) {
      inputRef.current.value = "";
      // setIsPickerVisible(!isPickerVisible);

      sendMessage({
        chatId: selectedChat?._id,
        content: newMessage,
      })
        .unwrap()
        .then((data: any) => {
          console.log("new Message data", data);
          // setMessages([...messages, data]);
          socket.emit("new message", data);
        });
    }
  };

  return (
    <>
      <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
        <div className="flex flex-col h-full">
          {messages &&
            currentUser &&
            messages.map((m: any, i: any) => (
              <div
                key={i}
                className={`flex ${
                  isSentByMe(messages, m, i, currentUser?._id)
                    ? "justify-end"
                    : "justify-start"
                } mb-4`}
              >
                <div
                  className={`max-w-md py-2 px-4 ${
                    isSentByMe(messages, m, i, currentUser?._id)
                      ? "bg-blue-500 text-white rounded-br-md rounded-tl-md rounded-tr-md"
                      : "bg-gray-100 text-gray-700 rounded-bl-md rounded-tl-md rounded-tr-md"
                  }`}
                >
                  <p>{m.content}</p>
                </div>
                <div ref={messagesEndRef} />
              </div>
            ))}
        </div>
        <div className={`  ${isPickerVisible ? "block" : "hidden"} `}>
          <Picker data={data} onEmojiSelect={handleEmojiSelect} />
        </div>
      </div>
      <div className="flex items-center mt-auto justify-between w-full p-3 border-t border-gray-300 gap-3">
        <input
          type="text"
          placeholder="Message"
          className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
          name="message"
          required
          // onChange={typingHandler}
          // value={newMessage}
          ref={inputRef}
          onKeyDown={handleSendMessage}
        />
        <button onClick={() => setIsPickerVisible(!isPickerVisible)}>
          <FaSmile className="text-purple-400" size={40} />
        </button>
        {/* <Picker /> */}

        <button
          onClick={handleSendMessage}
          className="bg-purple-500 flex flex-row gap-2 rounded-md hover:text-gray-400 my-4 p-2 text-white px-4"
        >
          Send
          {/* <FaRegPaperPlane size={20} /> */}
          {/* <svg
            className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg> */}
        </button>
      </div>
    </>
  );
}
