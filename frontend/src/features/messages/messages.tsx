import React from "react";

import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
  isSentByMe,
} from "@config/chatLogics";
import { selectCurrentUser } from "@store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

export function Messages({ messages }: any) {
  const user = useSelector(selectCurrentUser);
  console.log("user selected from state", user);
  return (
    // <>

    //   <div className="flex w-full mt-2 space-x-3 max-w-xs">
    //     <div>
    //       <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
    //         <p className="text-sm">
    //           1= Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    //         </p>
    //       </div>
    //       <span className="text-xs text-gray-500 leading-none">2 min ago</span>
    //     </div>
    //   </div>
    //   <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
    //     <div>
    //       <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
    //         <p className="text-sm">
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    //           eiusmod.
    //         </p>
    //       </div>
    //       <span className="text-xs text-gray-500 leading-none">2 min ago</span>
    //     </div>
    //     <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
    //   </div>
    //   <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
    //     <div>
    //       <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
    //         <p className="text-sm">Lorem ipsum dolor sit amet.</p>
    //       </div>
    //       <span className="text-xs text-gray-500 leading-none">2 min ago</span>
    //     </div>
    //     <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
    //   </div>
    //   <div className="flex w-full mt-2 space-x-3 max-w-xs">
    //     <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
    //     <div>
    //       <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
    //         <p className="text-sm">
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    //           eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
    //         </p>
    //       </div>
    //       <span className="text-xs text-gray-500 leading-none">2 min ago</span>
    //     </div>
    //   </div>
    //   <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
    //     <div>
    //       <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
    //         <p className="text-sm">
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    //           eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
    //         </p>
    //       </div>
    //       <span className="text-xs text-gray-500 leading-none">2 min ago</span>
    //     </div>
    //     <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
    //   </div>
    //   <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
    //     <div>
    //       <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
    //         <p className="text-sm">
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    //           eiusmod tempor incididunt.
    //         </p>
    //       </div>
    //       <span className="text-xs text-gray-500 leading-none">2 min ago</span>
    //     </div>
    //     <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
    //   </div>
    //   <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
    //     <div>
    //       <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
    //         <p className="text-sm">Lorem ipsum dolor sit amet.</p>
    //       </div>
    //       <span className="text-xs text-gray-500 leading-none">2 min ago</span>
    //     </div>
    //     <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
    //   </div>
    //   <div className="flex w-full mt-2 space-x-3 max-w-xs">
    //     <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
    //     <div>
    //       <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
    //         <p className="text-sm">
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    //           eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
    //         </p>
    //       </div>
    //       <span className="text-xs text-gray-500 leading-none">2 min ago</span>
    //     </div>
    //   </div>
    //   <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
    //     <div>
    //       <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
    //         <p className="text-sm">Lorem ipsum dolor sit.</p>
    //       </div>
    //       <span className="text-xs text-gray-500 leading-none">2 min ago</span>
    //     </div>
    //     <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
    //   </div>
    // </>
    // <>
    //   {messages &&
    //     messages.map((m: any, i: any) => (
    //       <div key={i} className="flex w-full mt-2 space-x-3 max-w-xs">
    //         <div>
    //           <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
    //             <p className="text-sm">{m.content}</p>
    //           </div>
    //           <span className="text-xs text-gray-500 leading-none">
    //             2 min ago
    //           </span>
    //         </div>
    //       </div>
    //     ))}
    // </>
    <div className="flex flex-col h-full">
      {messages &&
        user &&
        messages.map((m: any, i: any) => (
          <div
            key={i}
            className={`flex ${
              isSentByMe(messages, m, i, user?._id)
                ? "justify-end"
                : "justify-start"
            } mb-4`}
          >
            <div
              className={`max-w-md py-2 px-4 ${
                isSentByMe(messages, m, i, user?._id)
                  ? "bg-blue-500 text-white rounded-br-md rounded-tl-md rounded-tr-md"
                  : "bg-gray-100 text-gray-700 rounded-bl-md rounded-tl-md rounded-tr-md"
              }`}
            >
              <p>{m.content}</p>
            </div>
          </div>
        ))}
    </div>
  );
}
