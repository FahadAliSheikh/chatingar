import { SingleChat } from "./single-chat";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedUser } from "@slices/userSlice";
import { getSelectedChat, setSelectedChat } from "@slices/chatSlice";
import { useGetSelectedChatMutation } from "@/store/api/chatApi";

import { MessageInput } from "../messages/message-input";
import { useEffect } from "react";

export function ChatBox() {
  const dispatch = useDispatch();
  console.log("1-inside chatbox component");
  const selectedUser = useSelector(getSelectedUser);
  // const selectedChat = useSelector(getSelectedChat);
  const [getSelectedChat, { data, isLoading, error, isError, isSuccess }] =
    useGetSelectedChatMutation();
  console.log("2-selected User", selectedUser);

  useEffect(() => {
    if (selectedUser) {
      console.log("3-user is selected");
      getSelectedChat(selectedUser._id);
    }
  }, [selectedUser]);

  let content: any;
  if (isLoading) {
    content = <p>Loading...</p>;
  }
  if (isError) {
    content = <p>Something went wrong</p>;
  }
  if (isSuccess) {
    dispatch(setSelectedChat(data));

    // console.log("selected chat", selectedChat);

    content = (
      <section className="flex h-full flex-col bg-purple-100 border-lg">
        <div className=" flex items-center  p-3 border-b border-gray-300">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <img
                className="w-8 h-8 rounded-full"
                src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                alt="Neil image"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {selectedUser?.name}
              </p>
              <p className="text-sm text-gray-800 truncate dark:text-gray-800">
                {selectedUser?.gender}, {selectedUser?.age} years, <span></span>
                {selectedUser?.country}
              </p>
            </div>
          </div>
        </div>
        <SingleChat />
        {/* <SingleChat selectedUser={selectedUser} /> */}

        {/* <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
        <Messages />
      </div> */}

        <MessageInput />
      </section>
    );
  }
  return content;
}
