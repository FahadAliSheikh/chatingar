import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from "@/pages/signup";
import LoginPage from "@pages/login";
import { HomePage } from "@pages/home";
import { UserSearchForm } from "@features/user-search/user-search-form";

import { Layout } from "@features/layout";
import { ChatLayoutPage } from "@pages/chat";
import RequireAuth from "@store/slices/RequireAuth";
import { ChatBox } from "@features/chat";
import { Inbox } from "@features/inbox";
import { ContactUs } from "./pages/contact-us";
import { Faqs } from "./pages/faqs";

function App() {
  return (
    // <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white">
    // <div className="max-w-md w-full space-y-8">
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />

          <Route path="/signin" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/frequely-asked" element={<Faqs />} />
          <Route element={<RequireAuth />}>
            <Route path="/chat" element={<ChatLayoutPage />}>
              <Route path="search" element={<UserSearchForm />} />
              <Route path="chat-box" element={<ChatBox />} />
              <Route path="inbox" element={<Inbox />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
    // </div>
    // </div>
  );
}

export default App;
