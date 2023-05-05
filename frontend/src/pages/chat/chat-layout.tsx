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
  const currentUser = useSelector(selectCurrentUser);
  const displayClasses = useSelector(getDispalyClasses);
  // const displayClasses = useSelector(
  //   (state: any) => state.display.userDiveClasses
  // );
  console.log("display classes", displayClasses);
  const [userDivClasse, setUseDivClass] = useState("");
  const [outletDivClasses, setOutletDivClasses] = useState("");
  useEffect(() => {
    console.log("insideee eeeeeeeeeeeeeeeeeeee");
    setUseDivClass(displayClasses[0]);
    setOutletDivClasses(displayClasses[1]);
    console.log(userDivClasse);
    console.log(outletDivClasses);
  }, [displayClasses]);

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
