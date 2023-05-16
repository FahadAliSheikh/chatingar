import { useEffect } from "react";
//COMPONENTS
import { SingleChat } from "./single-chat";
import { ChatHeader } from "./chat-header";
//SLICES
import { useDispatch, useSelector } from "react-redux";
import { getSelectedUser } from "@slices/userSlice";
import { setSelectedChat } from "@slices/chatSlice";
//API
import { useGetSelectedChatMutation } from "@/store/api/chatApi";
import { WelcomeChat } from "./welcome-chat";
import { Spinner } from "../spinner";

export function ChatBox() {
  console.log(" CHATBOX component=>");

  const dispatch = useDispatch();
  const selectedUser = useSelector(getSelectedUser);

  let content: any;

  const [fetchSelectedChat, { data, isLoading, error, isError, isSuccess }] =
    useGetSelectedChatMutation();
  if (!selectedUser) {
    // content = <p>Please Select a user to start chat... chat box</p>;
    content = (
      <div className="flex items-center rounded-xl pt-6">
        <WelcomeChat />
        {/* <Spinner /> */}
      </div>
    );
  }
  useEffect(() => {
    if (selectedUser) {
      fetchSelectedChat(selectedUser._id)
        .unwrap()
        .then((data: any) => {
          dispatch(setSelectedChat(data));
        });
    }
  }, [selectedUser]);

  if (isLoading) {
    content = (
      <div className="flex items-center justify-center h-screen py-8 rounded-xl">
        <Spinner height={"h-24"} width={"w-24"} />
      </div>
    );
  }
  if (isError) {
    content = (
      <p className="border border-white-800 text-center text-white hover:cursor-pointer rounded-md bg-red-500 py-8">
        Error in loading chat!
      </p>
    );
  }
  if (isSuccess) {
    content = (
      <section className="flex h-full flex-col bg-purple-100 border-lg">
        <ChatHeader selectedUser={selectedUser} />
        <SingleChat selectedChat={data} />
        {/* {<Messages />} */}
      </section>
    );
  }
  return content;
}
