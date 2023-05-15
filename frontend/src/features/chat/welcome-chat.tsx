import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@slices/authSlice";

export function WelcomeChat() {
  //   return <div>welcome-chat: Please Select a user to start chat</div>;
  const currentUser = useSelector(selectCurrentUser);
  return (
    <section className="flex mx-auto flex-col bg-purple-300 border-lg w-2/3 px-3 rounded-xl">
      <h1 className="text-3xl my-5">
        Welcome to chatingaer
        <span className="font-bold"> {currentUser.name}</span>!
      </h1>
      <h2 className="text-2xl py-4">
        Chatingar is the best place to find new people around you & make new
        friendships!
      </h2>
      <div className=" py-4 text-gray-700">
        <ul className="list-disc mx-8">
          <li>Chatingar is FREE! & will always stay free :)</li>
          <li>
            Chatingar is Mobile friendly! so you can use it on your smartphone
            easily!
          </li>
          <li>
            Register for free to reserve your username & update your profile.
          </li>
          <li>Start chatting by choosing a person from the list & say Hi!</li>
          <li>Well, Enjoy your time!</li>
        </ul>
      </div>
    </section>
  );
}
