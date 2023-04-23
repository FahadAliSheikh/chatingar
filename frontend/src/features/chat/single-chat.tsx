import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Messages } from "../messages/messages";
import {
  useGetSelectedChatMutation,
  useGetChatMessagesQuery,
} from "@/store/api/chatApi";
import { setSelectedChat, getSelectedChat } from "@slices/chatSlice";
import { setSelectedUser, getSelectedUser } from "@slices/userSlice";

export function SingleChat() {
  const dispatch = useDispatch();
  // const selectedUser = useSelector(getSelectedUser);
  const selectedChat = useSelector(getSelectedChat);

  // console.log("selected chat in single chat", selectedChat);
  let content: any = <p>loading</p>;

  if (!selectedChat) {
    content = <p>chat not selected yet...</p>;
  } else {
    const timestampRef = useRef(Date.now()).current;

    const { data, isLoading, error, isError, isSuccess } =
      useGetChatMessagesQuery({
        chatId: selectedChat?._id,
        sessionId: timestampRef,
      });

    if (isLoading) {
      console.log("loading-----------");
      content = <p>Loading.....</p>;
    } else if (isSuccess) {
      console.log("data------", data);
      // dispatch(setSelectedChat(data));

      content = (
        <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
          <Messages messages={data} />
          {/* <Messages selectedChat={data} /> */}
        </div>
      );
    }
  }
  return (
    // <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
    //   <Messages />
    // </div>
    content
  );
}
