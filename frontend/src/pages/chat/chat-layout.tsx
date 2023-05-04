import React, { ReactNode, useEffect } from "react";
import { ActiveUsers, Sidebar, ChatWindowLayout } from "@/features/chat";
import { GenderFilter } from "@/features/user-search";
import { Outlet } from "react-router-dom";
import { userApi } from "@/store/api/userApi";
import { useDispatch, useSelector } from "react-redux";
import { setActiveUsers } from "@slices/userSlice";
import { selectCurrentUser } from "@slices/authSlice";
import { getSocket } from "@/socket";

export function ChatLayoutPage() {
  const currentUser = useSelector(selectCurrentUser);
  console.log("CHAT PAGE =>");
  const dispatch = useDispatch();
  let socket = getSocket();
  console.log("socket id in single layout comp", socket.id);

  useEffect(() => {
    console.log("socket emit wala uf -3");
    socket.on("connected", (user) => {
      console.log("getting response after connection");
      socket.emit("setUp", currentUser);
    });
    console.log(currentUser);
    // socket.on("getUsers", (userdata) => {
    //   console.log("user coming from socket", userdata);
    // });
  });
  let searchData = {
    name: "",
    gender: "",
    country: "",
  };
  const [
    executeGetActiveUsersQuery,
    { data: activeUsers = [], isError, error, isLoading, isSuccess },
  ] = userApi.endpoints.getActiveUsers.useLazyQuery();
  let newActiveUsers: any = [];

  useEffect(() => {
    console.log("UF-1");
    executeGetActiveUsersQuery(searchData);
  }, []);
  useEffect(() => {
    console.log("UF-2");

    if (isSuccess) {
      // socket.on("getUsers", (userdata) => {
      //   console.log("user coming from socket", userdata);
      //   userdata.forEach((sUser: any) => {
      //     activeUsers.forEach((dbuser: any) => {
      //       if (sUser.userId === dbuser._id) {
      //         newActiveUsers.push(dbuser);
      //       }
      //     });
      //     console.log("new active USer", newActiveUsers);
      //   });
      // });
      dispatch(setActiveUsers(activeUsers));
    }
  });

  return (
    <div className="mb-12 flex  flex-col justify-center gap-2 py-10 sm:flex-row h-screen">
      <section className="h-full md:h-5/6 flex flex-col w-full md:w-1/3">
        <GenderFilter />
        <div className="flex flex-row h-full">
          <Sidebar />

          <ActiveUsers />
        </div>
      </section>
      <section className="bg-purple-100 hidden sm:block w-full rounded-xl text-black h-full">
        {/* <ChatWindowLayout /> */}
        <Outlet></Outlet>
      </section>
    </div>
  );
}
