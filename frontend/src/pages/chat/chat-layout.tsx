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
  removeLoggedOutUser,
  addNewUser,
} from "@slices/userSlice";
import { selectCurrentUser } from "@slices/authSlice";
import { getDispalyClasses } from "@/store/slices/displaySlice";
import { addMessage } from "@/store/slices/chatSlice";
import { addNotification } from "@/store/slices/notificationSlice";
//SOCKET
import {
  getSocket,
  emitSocketSetup,
  onSocketConnected,
  onSocketGetUsers,
  offSocketGetUsers,
  offSocketSetup,
  offSocketConnected,
  emitSocketSearchUsers,
  onSocketGetRemovedUser,
  oFFSocketGetRemovedUser,
  onSocketGetNewUser,
  oFFSocketGetNewUser,
} from "@/socket";

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

  // SEND EVEN TO SOCKER SERVER,FOR CONNECTION AND JOINING THE CHAT
  let searchData = {
    name: "",
    gender: "",
    country: "",
  };

  useEffect(() => {
    console.log("uf-2");
    onSocketConnected(() => {
      console.log("getting response after connection");
      emitSocketSetup(currentUser);
      emitSocketSearchUsers(searchData);
    });
    return () => {
      offSocketConnected();
      offSocketSetup();
    };
  }, [currentUser]);

  useEffect(() => {
    console.log("UF-3");
    onSocketGetUsers((userdata: any) => {
      console.log("user coming from socket", userdata);
      // setUserUpdated(userdata);
      const index = userdata.findIndex(
        (obj: any) => obj._id === currentUser._id
      );
      if (index !== -1) {
        userdata.splice(index, 1);
      }
      dispatch(setActiveUsers(userdata));
    });
    // cleanup function to unsubscribe the event listener
    return () => {
      offSocketGetUsers();
    };
  });

  useEffect(() => {
    onSocketGetRemovedUser((removedUser: any) => {
      console.log("a user has been removed", removedUser);
      dispatch(removeLoggedOutUser(removedUser));
    });
    onSocketGetNewUser((newUser: any) => {
      console.log("a user has been added", newUser);
      dispatch(addNewUser(newUser));
    });
    return () => {
      oFFSocketGetRemovedUser();
      oFFSocketGetNewUser();
    };
  });
  // useEffect(() => {
  //   console.log("UF-4");
  //   // const request = executeGetActiveUsersQuery(searchData);
  //   // Clean up the query
  //   // return () => {
  //   //   // getActiveUsers.unsubscribe();
  //   //   if (activeUsers) {
  //   //     request.abort();
  //   //     // dispatch(setActiveUsers(activeUsers));
  //   //   }
  //   // };
  // }, [userUpdated]);

  // useEffect(() => {
  //   console.log("UF-5");
  //   if (activeUsers) {
  //     dispatch(setActiveUsers(activeUsers));
  //   }
  // });

  return (
    <div className="h-screen flex flex-col items-center">
      <div className="mb-12 flex  flex-col justify-center gap-2 py-10 sm:flex-row w-full h-5/6 lg:w-4/5">
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
      {/* <div className="bg-pink-500">add div</div> */}
    </div>
  );
}
