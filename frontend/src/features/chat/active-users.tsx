import React, { useState, useEffect } from "react";
import { SingleActiveUser } from "./single-active-user";
// import { useSocket, getSocket } from "../../socket/get-socket";
import { User } from "@/interfaces/user";
import { useDispatch, useSelector } from "react-redux";
// const socket = getSocket();

export function ActiveUsers() {
  console.log("inside active users");

  // useEffect(() => {
  //   console.log("use effect running");
  //   socket.on("onlineUsers", (data) => {
  //     console.log("Data received:", data);
  //     // Do something with the data here...
  //   });

  //   // return () => {
  //   //   socket.off("my-event");
  //   // };
  // });

  return (
    <div className="flow-root overflow-y-auto">
      <ul
        role="list"
        className="divide-y divide-gray-200 dark:divide-gray-700 overflow-y-auto"
      >
        {/* {onlineUsers.map((user) => (
          // <p key={user.socketID}>{user.username}</p>
          <SingleActiveUser key={user.socketID} user={user} />
        ))} */}
        <SingleActiveUser />
        <SingleActiveUser />
        <SingleActiveUser />
        <SingleActiveUser />
        <SingleActiveUser />
        <SingleActiveUser />
      </ul>
    </div>
  );
}
