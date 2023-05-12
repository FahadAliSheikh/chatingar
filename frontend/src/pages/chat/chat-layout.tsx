import React, { ReactNode, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//COMPONENTS
import { ActiveUsers, Sidebar } from "@/features/chat";
import { GenderFilter } from "@/features/user-search";
//API
import { userApi } from "@/store/api/userApi";
//SLICES
import {
  setActiveUsers,
  getActiveUsers,
  setSelectedUser,
} from "@slices/userSlice";
import { selectCurrentUser } from "@slices/authSlice";
import { getDispalyClasses } from "@/store/slices/displaySlice";
import { addMessage } from "@/store/slices/chatSlice";
import { addNotification } from "@/store/slices/notificationSlice";
//SOCKET
import { getSocket } from "@/socket";

export function ChatLayoutPage() {
  console.log("CHAT PAGE =>");

  const currentUser = useSelector(selectCurrentUser);
  const displayClasses = useSelector(getDispalyClasses);
  const [userUpdated, setUserUpdated] = useState([]);
  const [userDivClasse, setUseDivClass] = useState("");
  const [outletDivClasses, setOutletDivClasses] = useState("");
  const dispatch = useDispatch();
  let socket = getSocket();

  //RTK QUERY TO FETCH ACTIVE USERS FROM DB
  const [
    executeGetActiveUsersQuery,
    { data: activeUsers = [], isError, error, isLoading, isSuccess },
  ] = userApi.endpoints.getActiveUsers.useLazyQuery();

  // DISPLAY OR HIDE ROUTER OUTLET COMPONENT ON MOBILE VIEW
  useEffect(() => {
    console.log("uf-1");
    setUseDivClass(displayClasses[0]);
    setOutletDivClasses(displayClasses[1]);
  }, [displayClasses]);

  // SENT EVEN TO SOCKER SERVER,FOR CONNECTION AND JOINING THE CHAT
  useEffect(() => {
    console.log("socket emit wala uf -2");
    socket.on("connected", () => {
      console.log("getting response after connection");
      socket.emit("setUp", currentUser);
    });

    // console.log(currentUser);
  });

  let searchData = {
    name: "",
    gender: "",
    country: "",
  };

  useEffect(() => {
    console.log("UF-4");
    executeGetActiveUsersQuery(searchData);
  }, [userUpdated]);

  useEffect(() => {
    console.log("get user wala uf -3");

    socket.on("getUsers", (userdata) => {
      console.log("user coming from socket", userdata);
      setUserUpdated(userdata);
    });
    // cleanup function to unsubscribe the event listener
    return () => {
      socket.off("getUsers");
    };
  });

  useEffect(() => {
    console.log("UF-5");
    if (isSuccess) {
      dispatch(setActiveUsers(activeUsers));
    }
  });

  return (
    <div className="mb-12 flex  flex-col justify-center gap-2 py-10 sm:flex-row h-screen">
      <section className={userDivClasse}>
        <GenderFilter />
        <div className="flex flex-row h-full">
          <Sidebar />
          <ActiveUsers flag="usersList" />
          {/* {isSuccess && <ActiveUsers />} */}
        </div>
      </section>
      <section className={outletDivClasses}>
        {/* <ChatWindowLayout /> */}
        <Outlet></Outlet>
      </section>
    </div>
  );
}
