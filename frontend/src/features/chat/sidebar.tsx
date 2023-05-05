import { FaSearch, FaInbox } from "react-icons/fa";
import { Link } from "react-router-dom";
import { setDisplayedClasses } from "@/store/slices/displaySlice";
import { useDispatch } from "react-redux";
export function Sidebar() {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(
      setDisplayedClasses([
        "h-full md:h-5/6 flex flex-col w-full md:w-3/5 hidden md:block lg:block",
        "bg-purple-100 sm:block w-full rounded-xl text-black h-full",
      ])
    );
  };
  return (
    <div className="flex flex-col bg-purple-500 text-white justify-left h-full w-20 rounded-bl-xl">
      <button className="hover:text-gray-400 my-4" onClick={handleClick}>
        <Link to="search">
          <FaSearch size={20} /> Search
        </Link>
      </button>

      <button className="hover:text-gray-400 my-4" onClick={handleClick}>
        <Link to="inbox">
          <FaInbox size={20} />
          Inbox
        </Link>
      </button>
    </div>
  );
}
