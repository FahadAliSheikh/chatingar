// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useSendMessageMutation } from "@/store/api/chatApi";
// import {
//   getSelectedChat,
//   setChatMessages,
//   getChatMessages,
// } from "@slices/chatSlice";

// export function MessageInput() {
//   const dispatch = useDispatch();
//   const selectedChat = useSelector(getSelectedChat);
//   const chatMessages = useSelector(getChatMessages);
//   const [newMessage, setNewMessage] = useState("");

//   const [
//     sendMessage,
//     { data: sentMessageData, isLoading, error, isError, isSuccess },
//   ] = useSendMessageMutation();

//   const typingHandler = (e: any) => {
//     if (e.key !== "Enter") {
//       setNewMessage(e.target.value);
//     }
//   };
//   const handleSendMessage = async (event: any) => {
//     // if (event.key === "Enter") {
//     console.log("inside handle send message");
//     event.preventDefault();

//     await sendMessage({
//       chatId: selectedChat?._id,
//       content: newMessage,
//     }).unwrap();
//     // }
//   };
//   if (isSuccess) {
//     console.log("message sent successfully");
//     // setNewMessage("");
//     dispatch(setChatMessages([...chatMessages, sentMessageData]));
//   } else if (isError) {
//     console.log("something went wrong");
//     console.log(error);
//   }
//   return (
//     <div className="flex items-center mt-auto justify-between w-full p-3 border-t border-gray-300">
//       <input
//         type="text"
//         placeholder="Message"
//         className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
//         name="message"
//         required
//         onChange={typingHandler}
//         value={newMessage}
//         // onKeyDown={handleSendMessage}
//       />
//       {/* <button>
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="w-5 h-5 text-gray-500"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
//           />
//         </svg>
//       </button> */}
//       <button onClick={handleSendMessage}>
//         <svg
//           className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 20 20"
//           fill="currentColor"
//         >
//           <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
//         </svg>
//       </button>
//     </div>
//   );
// }
