import { useState, useEffect, useRef, useCallback } from "react";
import { isSentByMe } from "@config/chatLogics";
import { selectCurrentUser } from "@store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useSendMessageMutation } from "@/store/api/chatApi";
import { getSelectedChat } from "@slices/chatSlice";
import { getSocket } from "@/socket";

export function Messages({ messagesData }: any) {
  console.log("MESSAGES COMPONENT=>");
  const inputRef = useRef<HTMLInputElement>(null);

  let socket = getSocket();
  const [sendMessage, { data: sentMessageData, isError, error }] =
    useSendMessageMutation();

  const [messages, setMessages]: any = useState([]);
  // const [arrivalMessages, setArrivalMessages]: any = useState(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom of the messages component
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    inputRef.current?.focus();
  }, [messages]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      console.log("new message received", newMessageReceived);
      // setArrivalMessages(newMessageReceived);
      console.log(newMessageReceived);
      if (
        newMessageReceived &&
        selectedChat?.users.some(
          (user: any) => user._id === newMessageReceived?.sender._id
        )
      ) {
        console.log("isko display krna hai!");
        setMessages([...messages, newMessageReceived]);
      } else {
        // display notification here
        console.log("notification");
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

  const selectedUser = useSelector(selectCurrentUser);
  const selectedChat = useSelector(getSelectedChat);

  const handleSendMessage = async (event: any) => {
    // event.preventDefault();
    console.log("inside handle message");
    console.log(event);
    console.log(inputRef?.current?.value);

    const newMessage = inputRef?.current?.value;
    if ((event.type === "click" || event.key === "Enter") && newMessage) {
      inputRef.current.value = null;

      sendMessage({
        chatId: selectedChat?._id,
        content: newMessage,
      })
        .unwrap()
        .then((data) => {
          console.log("new Message data", data);
          socket.emit("new message", data);
          // setMessages([...messages, data]);
        });
    }
  };

  return (
    <>
      <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
        <div className="flex flex-col h-full">
          {messages &&
            selectedUser &&
            messages.map((m: any, i: any) => (
              <div
                key={i}
                className={`flex ${
                  isSentByMe(messages, m, i, selectedUser?._id)
                    ? "justify-end"
                    : "justify-start"
                } mb-4`}
              >
                <div
                  className={`max-w-md py-2 px-4 ${
                    isSentByMe(messages, m, i, selectedUser?._id)
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
      </div>
      <div className="flex items-center mt-auto justify-between w-full p-3 border-t border-gray-300">
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
