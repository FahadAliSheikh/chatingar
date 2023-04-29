import { SingleChat } from "./single-chat";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedUser } from "@slices/userSlice";
import { setSelectedChat } from "@slices/chatSlice";
import { useEffect } from "react";

import { useGetSelectedChatMutation } from "@/store/api/chatApi";

import { ChatHeader } from "./chat-header";
export function ChatBox() {
  console.log(" CHATBOX component=>");
  let content: any;

  const dispatch = useDispatch();
  const selectedUser = useSelector(getSelectedUser);

  const [getSelectedChat, { data, isLoading, error, isError, isSuccess }] =
    useGetSelectedChatMutation();
  if (!selectedUser) {
    content = <p>Please Select a user to start chat...</p>;
  }
  useEffect(() => {
    if (selectedUser) {
      getSelectedChat(selectedUser._id)
        .unwrap()
        .then((data: any) => {
          dispatch(setSelectedChat(data));
        });
    }
  }, [selectedUser]);

  if (isLoading) {
    content = <p>Loading...</p>;
  }
  if (isError) {
    content = <p>Error Occured!</p>;
  }
  if (isSuccess) {
    content = (
      <section className="flex h-full flex-col bg-purple-100 border-lg">
        <ChatHeader selectedUser={selectedUser} />
        <SingleChat selectedChat={data} />
      </section>
    );
  }
  return content;
}
