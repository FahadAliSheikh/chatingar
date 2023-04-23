import { FaSearch, FaInbox } from "react-icons/fa";
import { BsChatRightTextFill } from "react-icons/bs";
type SidebarProps = {
  isOpen: boolean;
};

import { useDispatch } from "react-redux";
import { setDisplayedComponent } from "@slices/displaySlice";
import { Link } from "react-router-dom";

export function Sidebar() {
  //const [open, setOpen] = React.useState(true);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col bg-purple-500 text-white justify-left h-full w-20 rounded-bl-xl">
      {/* <div className=" p-1 my-5"> */}
      <button
        className="hover:text-gray-400 my-4"
        // onClick={() => dispatch(setDisplayedComponent("UserSearchForm"))}
      >
        <Link to="search">
          <FaSearch size={20} /> Search
        </Link>
      </button>

      {/* <button
          className="hover:text-gray-400 my-4"
          onClick={() => dispatch(setDisplayedComponent("ChatBox"))}
        >
          <BsChatRightTextFill size={20} /> ChatBox
        </button> */}

      <button
        className="hover:text-gray-400 my-4"
        // onClick={() => dispatch(setDisplayedComponent("Inbox"))}
      >
        <Link to="inbox">
          <FaInbox size={20} />
          Inbox
        </Link>
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
      {/* </div> */}
    </div>
  );
}
