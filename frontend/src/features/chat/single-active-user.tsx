import { useDispatch, useSelector } from "react-redux";
import { setDisplayedComponent } from "@slices/displaySlice";
import { getSelectedUser, setSelectedUser } from "@slices/userSlice";
import React, { useState, useEffect } from "react";
import { setSelectedChat } from "@slices/chatSlice";
import { useGetSelectedChatMutation } from "@/store/api/chatApi";
import { useNavigate } from "react-router-dom";

export function SingleActiveUser({ user }: any) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [getSelectedChat, { data, isLoading, error, isError, isSuccess }] =
  //   useGetSelectedChatMutation();

  const handleClick = async (user: any) => {
    console.log("clicked on user", user);
    // await dispatch(setDisplayedComponent("ChatBox"));
    navigate("chat-box");
    await dispatch(setSelectedUser(user));
    if (user) {
      // const selectedChat = await getSelectedChat(user?._id);
      // dispatch(setSelectedChat(selectedChat));
    }
  };
  return (
    <div
      // className="py-3 sm:py-4 bg-pink-300 "
      className="flex w-full py-4 max-w-xs bg-pink-300 border border-white-800"
      onClick={() => handleClick(user)}
    >
      {/* <div className="flex items-center space-x-4"> */}
      <div className="flex-shrink-0">
        <img
          className="w-8 h-8 rounded-full"
          src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
          alt="Neil image"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {user?.name}
        </p>
        <p className="text-sm text-gray-800 truncate dark:text-gray-800">
          {user?.gender}, {user?.age}, {user?.country}
        </p>
      </div>
      {/* <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-gray-900">
          $320
        </div> */}
      {/* </div> */}
    </div>
  );
}
