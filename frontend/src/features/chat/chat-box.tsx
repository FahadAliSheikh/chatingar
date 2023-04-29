import { SingleChat } from "./single-chat";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedUser } from "@slices/userSlice";
import { getSelectedChat, setSelectedChat } from "@slices/chatSlice";
import React, { useState, useEffect, useRef } from "react";

import { MessageInput } from "../messages/message-input";
import { Messages } from "../messages/messages";
import {
  useGetSelectedChatMutation,
  useGetChatMessagesQuery,
  useSendMessageMutation,
  chatApi,
} from "@/store/api/chatApi";
import { ChatHeader } from "./chat-header";
export function ChatBox() {
  console.log(" CHATBOX comp");

  const dispatch = useDispatch();
  const selectedUser = useSelector(getSelectedUser);

  const [getSelectedChat, { data, isLoading, error, isError, isSuccess }] =
    useGetSelectedChatMutation();

  useEffect(() => {
    getSelectedChat(selectedUser._id)
      .unwrap()
      .then((data) => {
        dispatch(setSelectedChat(data));
      });
  }, [selectedUser]);

  let content: any;

  if (isSuccess) {
    content = (
      <section className="flex h-full flex-col bg-purple-100 border-lg">
        <ChatHeader selectedUser={selectedUser} />
        <SingleChat selectedChat={data} />

        {/* <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
          <Messages selectedChat={data} /> 
          /* <Messages />
        </div> */}

        {/* <MessageInput /> */}
      </section>
    );
  }
  return content;
}
