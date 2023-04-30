import React, { ReactNode, useEffect } from "react";
import { ActiveUsers, Sidebar, ChatWindowLayout } from "@/features/chat";
import { GenderFilter } from "@/features/user-search";
import { Outlet } from "react-router-dom";
import { userApi } from "@/store/api/userApi";
import { useDispatch } from "react-redux";
import { setActiveUsers } from "@slices/userSlice";

export function ChatLayoutPage() {
  const dispatch = useDispatch();

  let searchData = {
    name: "",
    gender: "",
    country: "",
  };
  const [
    executeGetActiveUsersQuery,
    { data: activeUsers = [], isError, error, isLoading, isSuccess },
  ] = userApi.endpoints.getActiveUsers.useLazyQuery();
  useEffect(() => {
    executeGetActiveUsersQuery(searchData);
  }, []);
  useEffect(() => {
    if (isSuccess) {
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
