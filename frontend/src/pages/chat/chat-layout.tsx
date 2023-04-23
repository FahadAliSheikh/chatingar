import React, { ReactNode } from "react";
import { ActiveUsers, Sidebar, ChatWindowLayout } from "@/features/chat";
import { GenderFilter } from "@/features/user-search";
import { selectCurrentUser } from "@store/slices/authSlice";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

export function ChatLayoutPage() {
  const user = useSelector(selectCurrentUser);
  return (
    <div className="mb-12 flex  flex-col justify-center gap-2 py-10 sm:flex-row h-screen">
      <section className="h-full md:h-5/6 flex flex-col w-full md:w-1/3">
        <GenderFilter />
        <div className="flex flex-row h-full">
          <Sidebar />

          {/* <section className=" mb-12 flex h-full"> */}
          {/* <div className="h-full"> */}
          {/* <div className="h-30"> */}
          <ActiveUsers />
        </div>
        {/* </div> */}
        {/* </div> */}
        {/* </section> */}
      </section>
      <section className="bg-purple-100 hidden sm:block w-full rounded-xl text-black h-full">
        {/* <ChatWindowLayout /> */}
        <Outlet></Outlet>
      </section>
    </div>
  );
}
