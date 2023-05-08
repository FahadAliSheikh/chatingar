import { SingleActiveUser } from "./single-active-user";
import { useSelector } from "react-redux";
import { getActiveUsers } from "@slices/userSlice";
import { getInbox } from "@/store/slices/notificationSlice";

export function ActiveUsers({ flag }: any) {
  // export function ActiveUsers() {
  console.log("ACTIVE USERS COMPONENT=>");
  let activeUsers = [];
  if (flag === "usersList") {
    activeUsers = useSelector(getActiveUsers);
  } else if (flag === "inbox") {
    activeUsers = useSelector(getInbox);
  }

  return (
    <div className="flex flex-col flex-grow overflow-auto">
      {activeUsers ? (
        activeUsers.map((user: any) => (
          <SingleActiveUser key={user._id} user={user} />
        ))
      ) : (
        <p>No active user so far..</p>
      )}
    </div>
  );
}
