import "./App.css";
import React, { useState, useEffect, useRef } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from "@/pages/signup";
import LoginPage from "@pages/login";
import { HomePage } from "@pages/home";

import { Layout } from "@features/layout";
import { ChatLayoutPage } from "@pages/chat";
// import socketIO from "socket.io-client";
// import { io } from "socket.io-client";

// import { Rout} from "@config/routes";
// const socket = io("http://localhost:4000");

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
          <Route path="/chat" element={<ChatLayoutPage />} />
        </Route>
      </Routes>
    </>
    // </div>
    // </div>
  );
}

export default App;
