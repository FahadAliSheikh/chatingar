import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Messages } from "../messages/messages";
import {
  useGetSelectedChatMutation,
  useGetChatMessagesQuery,
  useSendMessageMutation,
  chatApi,
} from "@/store/api/chatApi";
import {
  setSelectedChat,
  getSelectedChat,
  getChatMessages,
  getNewMessage,
  setChatMessages,
  chatSlice,
} from "@slices/chatSlice";
import { setSelectedUser, getSelectedUser } from "@slices/userSlice";
import { MessageInput } from "../messages/message-input";

export function SingleChat({ selectedChat }: any) {
  console.log("single chat comp");
  const dispatch = useDispatch();
  // const selectedUser = useSelector(getSelectedUser);
  // const selectedChat = useSelector(getSelectedChat);
  // const newMessage = useSelector(getNewMessage);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages]: any = useState([]);

  const [skip, setSkip] = useState(true);

  console.log("selectedChat", selectedChat._id);
  const [sendMessage, { data: sentMessageData }] = useSendMessageMutation();

  const [shouldFetch, setShouldFetch] = useState(false);

  const timestampRef = useRef(Date.now()).current;
  // const { data, isLoading, error, isError, isSuccess, refetch } =
  //   useGetChatMessagesQuery(
  //     {
  //       chatId: selectedChat?._id,
  //       sessionId: timestampRef,
  //     }
  //     // { skip: !shouldFetch }
  //   );
  const [executeGetMessagesQuery, { data, isError, isLoading, isSuccess }] =
    chatApi.endpoints.getChatMessages.useLazyQuery();

  useEffect(() => {
    console.log(shouldFetch);
    executeGetMessagesQuery({
      chatId: selectedChat?._id,
      sessionId: timestampRef,
    });
    // setMessages(data);

    setShouldFetch(true);
  }, [selectedChat]);

  // useEffect(() => {
  //   if (data) {
  //     setMessages(data);
  //   }
  // }, [data]);

  if (isLoading) {
    console.log("messages are loading");
  }
  if (isSuccess) {
    console.log("messages found in success");
    // setMessages(data);
    console.log(data);
  }
  // const [sendMessage, { data, isLoading, error, isError, isSuccess }] =
  //   useSendMessageMutation();

  const typingHandler = (e: any) => {
    if (e.key !== "Enter") {
      setNewMessage(e.target.value);
    }
  };

  const handleSendMessage = async (event: any) => {
    console.log("inside handle send message");
    // setUser( ...message, message: event.target.value );
    // if (event.key === "Enter") {
    event.preventDefault();
    // setNewMessage("");
    await sendMessage({
      chatId: selectedChat?._id,
      content: newMessage,
    }).unwrap();
    // const sentMessageData = await sendMessage({
    //   chatId: selectedChat?._id,
    //   content: newMessage,
    // }).unwrap();
    // // }
    // if (isError) {
    //   console.log("Error occured in sending a message", error);
    // }
    // if (isSuccess) {
    //   console.log("inside success!!!!! after sending message", data);
    //   // console.log(data);
    //   // Message has been sent to database
    //   // setMessages([...messages, data]);
    //   setChatMessages([...chatMessages, sentMessageData]);
    //   // setChatMessages([...chatMessages, data]);
    // }
  };

  let content: any = <p>single chat component loading</p>;

  if (isLoading) {
    content = <p>Messages are loading...</p>;
  } else if (isSuccess && messages) {
    content = <>{messages && <Messages messagesData={data} />}</>;
  }
  // }
  return (
    // <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
    //   <Messages />
    // </div>
    content
  );
}
