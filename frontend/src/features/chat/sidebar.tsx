import { FaSearch, FaInbox } from "react-icons/fa";
import { BsChatRightTextFill } from "react-icons/bs";
type SidebarProps = {
  isOpen: boolean;
};

import { useDispatch } from "react-redux";
import { setDisplayedComponent } from "@slices/displaySlice";

export function Sidebar() {
  //const [open, setOpen] = React.useState(true);
  const dispatch = useDispatch();

  return (
    <div className="bg-purple-500 text-white flex justify-left h-screen w-20 rounded-l-xl">
      <div className="w-2/4 p-1 my-5">
        <h1 className="text-2xl font-bold mb-4">LOGO</h1>
        <button
          className="hover:text-gray-400 my-4"
          onClick={() => dispatch(setDisplayedComponent("UserSearchForm"))}
        >
          <FaSearch size={20} /> Search
        </button>

        {/* <button
          className="hover:text-gray-400 my-4"
          onClick={() => dispatch(setDisplayedComponent("ChatBox"))}
        >
          <BsChatRightTextFill size={20} /> ChatBox
        </button> */}

        <button
          className="hover:text-gray-400 my-4"
          onClick={() => dispatch(setDisplayedComponent("Inbox"))}
        >
          <FaInbox size={20} />
          Inbox
        </button>

        {/* <ul>
          <li className="mb-5">
            <a href="#" className="hover:text-gray-400">
              {<FaSearch size={20} title="Search" />} Search
            </a>
          </li>
          <li className="mb-5">
            <a href="#" className="hover:text-gray-400">
              <FaInbox size={20} /> Inbox
            </a>
          </li>
          <li className="mb-5">
            <a href="#" className="hover:text-gray-400">
              <BsChatRightTextFill size={20} /> Active Chats
            </a>
          </li>
        </ul> */}
      </div>
    </div>
  );
}
