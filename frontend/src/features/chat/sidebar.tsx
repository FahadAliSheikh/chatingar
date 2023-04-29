import { FaSearch, FaInbox } from "react-icons/fa";
import { Link } from "react-router-dom";

export function Sidebar() {
  return (
    <div className="flex flex-col bg-purple-500 text-white justify-left h-full w-20 rounded-bl-xl">
      <button className="hover:text-gray-400 my-4">
        <Link to="search">
          <FaSearch size={20} /> Search
        </Link>
      </button>

      <button className="hover:text-gray-400 my-4">
        <Link to="inbox">
          <FaInbox size={20} />
          Inbox
        </Link>
      </button>
    </div>
  );
}
