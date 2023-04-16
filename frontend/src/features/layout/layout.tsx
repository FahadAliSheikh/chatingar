import React from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { Navbar } from "@features/navbar";
import { Footer } from "@features/footer";

export function Layout() {
  return (
    <>
      <Navbar />
      <main className=" w-full md:px-20 lg:px-40">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
