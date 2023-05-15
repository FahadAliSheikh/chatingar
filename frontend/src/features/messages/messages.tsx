import { useState, useEffect, useRef, useCallback } from "react";
import { FaSmile } from "react-icons/fa";

import { isSentByMe } from "@config/chatLogics";
import { useDispatch, useSelector } from "react-redux";
//APIS
import { useSendMessageMutation } from "@/store/api/chatApi";
//SLICES
import { selectCurrentUser } from "@store/slices/authSlice";
import {
  addMessage,
  getMessages,
  getSelectedChat,
  setSelectedChat,
} from "@slices/chatSlice";
import { addToInbox } from "@/store/slices/notificationSlice";

//SOCKET
import {
  getSocket,
  onSocketReceiveMessage,
  offSocketReceiveMessage,
  emitSocketSendMessage,
  onSocketRemoveUser,
  offSocketRemoveUser,
} from "@/socket";
//EMOJI LIBRARY
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { setSelectedUser, getActiveUsers } from "@/store/slices/userSlice";
import { removeSelectedUser, moveNewMsgOnTop } from "@/store/slices/userSlice";
import { removeSelectedChat } from "@slices/chatSlice";
import { useNavigate } from "react-router-dom";

// MESSAGE COMPONENT
export function Messages() {
  console.log("MESSAGES COMPONENT=>");
  let socket = getSocket();

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const currentUser = useSelector(selectCurrentUser);
  const selectedChat = useSelector(getSelectedChat);
  const activeUsers = useSelector(getActiveUsers);
  let messages = useSelector(getMessages);
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  // TEXT INPUT REFERENCE
  const inputRef = useRef<HTMLInputElement>(null);

  // emoji handle function: add emoji in input text

  const handleEmojiSelect = (emoji: any) => {
    if (inputRef.current) {
      inputRef.current.value += emoji.native;
    }
  };

  // RTK Query to get messages for selected chat
  const [
    sendMessage,
    { data: sentMessageData, isError: isSendMsgErr, error: sendMsgErr },
  ] = useSendMessageMutation();

  // Scroll to the bottom of the messages component
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    inputRef.current?.focus();
  }, [messages, isPickerVisible]);

  // useEffect to handle receiving messages
  useEffect(() => {
    console.log("hook running");
    onSocketReceiveMessage((newMessageReceived: any) => {
      // socket.on("message received", (newMessageReceived: any) => {
      console.log("socket event running");
      // handle received message
      // console.log(
      //   !selectedChat || selectedChat._id !== newMessageReceived.chat._id
      // );
      if (!selectedChat || selectedChat._id !== newMessageReceived.chat._id) {
        // display notification here
        dispatch(addToInbox(newMessageReceived));
        dispatch(moveNewMsgOnTop(newMessageReceived.sender));
      } else {
        console.log("isko display krna hai!");
        // setMessages([...messages, newMessageReceived]);
        dispatch(addMessage(newMessageReceived));
        //sort user, move newly message user at the top
        // activeUsers.push(newMessageReceived.chat.users[0]);
        dispatch(moveNewMsgOnTop(newMessageReceived.sender));
      }
    });
    // cleanup function to unsubscribe the event listener
    return () => {
      // socket.off("message received");
      offSocketReceiveMessage();
    };
  }, [selectedChat]);

  //useEffect to handle remove user that has loggged out
  useEffect(() => {
    onSocketRemoveUser((loggedOutUser: any) => {
      console.log("remove selected chat running");
      if (!selectedChat) return;
      console.log(selectedChat.users);
      if (
        selectedChat.users.some((user: any) => user._id === loggedOutUser._id)
      ) {
        dispatch(removeSelectedChat());
        dispatch(removeSelectedUser());
        navigate("/chat");
      }
    });
    return () => {
      // socket.off("removeUser");
      offSocketRemoveUser();
    };
  });
  const handleSendMessage = async (event: any) => {
    // close emoji picker
    setIsPickerVisible(false);
    const newMessage = inputRef?.current?.value;
    if ((event.type === "click" || event.key === "Enter") && newMessage) {
      inputRef.current.value = "";
      sendMessage({
        chatId: selectedChat?._id,
        content: newMessage,
      })
        .unwrap()
        .then((data: any) => {
          console.log("new Message data", data);
          // setMessages([...messages, data]);
          dispatch(addMessage(data));
          // socket.emit("new message", data);
          emitSocketSendMessage(data);
        });
    }
  };

  return (
    <>
      <div className="flex flex-col flex-grow h-0 p-4 overflow-auto mb-4">
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
              </div>
            ))}
          <div className={`  ${isPickerVisible ? "block" : "hidden"} `}>
            <Picker data={data} onEmojiSelect={handleEmojiSelect} />
          </div>
          <div ref={messagesEndRef} />
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
