import React, { ReactNode } from "react";
import { ActiveUsers, Sidebar, ChatWindowLayout } from "@/features/chat";
import { GenderFilter } from "@/features/user-search";

export function ChatLayoutPage() {
  return (
    <div className="mb-12 flex flex-col justify-center gap-2 py-10 sm:flex-row">
      <section className=" mb-12 flex">
        <Sidebar />
        <div>
          <GenderFilter />
          <ActiveUsers />
        </div>
      </section>
      <section className="bg-purple-100 hidden sm:block h-screen w-full rounded-xl text-black ">
        <ChatWindowLayout />
      </section>
    </div>
  );
}
