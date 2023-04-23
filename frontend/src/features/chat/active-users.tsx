import React, { useState, useEffect } from "react";
import { SingleActiveUser } from "./single-active-user";
// import { useSocket, getSocket } from "../../socket/get-socket";
import { User } from "@/interfaces/user";
import { useDispatch, useSelector } from "react-redux";
import { useGetActiveUsersQuery } from "@/store/api/userApi";
import { setDisplayedComponent } from "@slices/displaySlice";
import {
  getSelectedUser,
  setSelectedUser,
  setActiveUsers,
} from "@slices/userSlice";
// const socket = getSocket();

export function ActiveUsers() {
  console.log("inside active users");
  const dispatch = useDispatch();
  const {
    data: activeUsers = [],
    isLoading,
    error,
    isError,
    isSuccess,
  } = useGetActiveUsersQuery();

  useEffect(() => {
    if (isSuccess) {
      console.log("inside iss successfull", activeUsers);
      // toast.success("Logged in successfully");
      // setOpenPostModal(false);
      dispatch(setActiveUsers(activeUsers));
    }

    if (isError) {
      console.log("inside iss error");

      // if (Array.isArray((error as any).data.error)) {
      //   (error as any).data.error.forEach((el: any) =>
      //     // toast.error(el.message, {
      //     //   position: "top-right",
      //     // })
      //   );
      // } else {
      //   // toast.error((error as any).data.message, {
      //   //   position: "top-right",
      //   // });
      // }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeUsers]);

  return (
    // <section className="h-full">
    // <div className="flex flex-col overflow-y-auto w-full">
    <div className="flex flex-col flex-grow overflow-auto">
      {/* <Messages selectedChat={data} /> */}
      {/* <div className="flex w-full mt-2 space-x-3 max-w-xs"> */}
      {activeUsers ? (
        activeUsers.map((user) => (
          <SingleActiveUser key={user._id} user={user} />
        ))
      ) : (
        <p>no active user</p>
      )}
    </div>
    // </section>
  );
  // return (
  //   <div className="flow-root lg:h-[34rem]">
  //     <ul
  //       role="list"
  //       className="divide-y divide-gray-200 dark:divide-gray-700 overflow-auto"
  //     >
  //       {activeUsers ? (
  //         activeUsers.map((user) => (
  //           <SingleActiveUser key={user._id} user={user} />
  //         ))
  //       ) : (
  //         <p>no active user</p>
  //       )}
  //     </ul>
  //   </div>
  // );
}
