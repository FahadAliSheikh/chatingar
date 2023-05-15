import { FaSearch, FaInbox } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//SLICES
import { setDisplayedClasses } from "@/store/slices/displaySlice";
import { getSelectedChat, setChatInitialState } from "@slices/chatSlice";
import { moveNewMsgOnTop, removeSelectedUser } from "@slices/userSlice";
import { addToInbox, getInbox } from "@/store/slices/notificationSlice";
import { useEffect } from "react";
import {
  getSocket,
  offSocketReceiveMessage,
  onSocketReceiveMessage,
} from "@/socket";

export function Sidebar() {
  const dispatch = useDispatch();
  const currentInbox = useSelector(getInbox);
  const handleClick = () => {
    dispatch(
      setDisplayedClasses([
        "h-full lg:h-5/6 flex flex-col w-full lg:w-3/5 hidden lg:block",
        "bg-purple-100 sm:block w-full rounded-xl text-black h-full",
      ])
    );
    dispatch(setChatInitialState());
    dispatch(removeSelectedUser());
  };
  let socket = getSocket();
  let selectedChat = useSelector(getSelectedChat);
  // this useEffect will handle onreceivemessage socket function if chat layout component hasn't been loaded yet
  useEffect(() => {
    console.log("hook running");
    onSocketReceiveMessage((newMessageReceived: any) => {
      console.log("inside message received");
      if (!selectedChat || selectedChat._id != newMessageReceived.chat._id) {
        dispatch(addToInbox(newMessageReceived));
        dispatch(moveNewMsgOnTop(newMessageReceived.sender));
      }
    });
    // cleanup function to unsubscribe the event listener
    return () => {
      // socket.off("message received");
      offSocketReceiveMessage();
    };
  }, [selectedChat]);

  return (
    <div className="flex flex-col bg-purple-500 text-white justify-left h-full w-20 rounded-bl-xl">
      <button className="hover:text-gray-400 m-4" onClick={handleClick}>
        <Link to="search">
          <FaSearch size={20} /> Search
        </Link>
      </button>

      <button className="hover:text-gray-400 m-4" onClick={handleClick}>
        <Link to="inbox">
          {/* <FaInbox size={20} />
          Inbox {currentInbox?.length} */}
          <span className="relative inline-block">
            <svg
              className="w-10 h-10 text-white-700 fill-current"
              viewBox="0 0 20 20"
            >
              <path
                d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                clipRule="evenodd"
                fillRule="evenodd"
              ></path>
            </svg>
            Inbox
            {currentInbox.length > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                {currentInbox?.length}
              </span>
            )}
          </span>
        </Link>
      </button>
    </div>
  );
}
