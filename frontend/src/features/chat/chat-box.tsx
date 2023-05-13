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
      <div className="flex items-center py-8 rounded-xl">
        <WelcomeChat />
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
        {/* {<Messages />} */}
      </section>
    );
  }
  return content;
}
