import React, { ReactNode, useEffect, useState } from "react";
import { ActiveUsers, Sidebar } from "@/features/chat";
import { GenderFilter } from "@/features/user-search";
import { Outlet } from "react-router-dom";
import { userApi } from "@/store/api/userApi";
import { useDispatch, useSelector } from "react-redux";
import { setActiveUsers } from "@slices/userSlice";
import { selectCurrentUser } from "@slices/authSlice";
import { getSocket } from "@/socket";
import { getDispalyClasses } from "@/store/slices/displaySlice";

export function ChatLayoutPage() {
  console.log("CHAT PAGE =>");

  const currentUser = useSelector(selectCurrentUser);
  const displayClasses = useSelector(getDispalyClasses);
  const [userUpdated, setUserUpdated] = useState([]);
  const [userDivClasse, setUseDivClass] = useState("");
  const [outletDivClasses, setOutletDivClasses] = useState("");
  const dispatch = useDispatch();
  let socket = getSocket();
  const [
    executeGetActiveUsersQuery,
    { data: activeUsers = [], isError, error, isLoading, isSuccess },
  ] = userApi.endpoints.getActiveUsers.useLazyQuery();

  useEffect(() => {
    setUseDivClass(displayClasses[0]);
    setOutletDivClasses(displayClasses[1]);
  }, [displayClasses]);

  useEffect(() => {
    console.log("socket emit wala uf -3");
    socket.on("connected", () => {
      console.log("getting response after connection");
      socket.emit("setUp", currentUser);
    });

    // console.log(currentUser);
  });
  useEffect(() => {
    socket.on("getUsers", (userdata) => {
      console.log("user coming from socket", userdata);
      setUserUpdated(userdata);
    });
  });

  let searchData = {
    name: "",
    gender: "",
    country: "",
  };

  useEffect(() => {
    console.log("UF-1");
    executeGetActiveUsersQuery(searchData);
  }, [userUpdated]);

  useEffect(() => {
    console.log("UF-2");

    if (isSuccess) {
      console.log(activeUsers);
      dispatch(setActiveUsers(activeUsers));
    }
  });

  return (
    <div className="mb-12 flex  flex-col justify-center gap-2 py-10 sm:flex-row h-screen">
      <section className={userDivClasse}>
        <GenderFilter />
        <div className="flex flex-row h-full">
          <Sidebar />

          <ActiveUsers />
        </div>
      </section>
      <section className={outletDivClasses}>
        {/* <ChatWindowLayout /> */}
        <Outlet></Outlet>
      </section>
    </div>
  );
}
