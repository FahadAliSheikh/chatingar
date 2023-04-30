import { SingleActiveUser } from "./single-active-user";
import { useSelector } from "react-redux";
import { getActiveUsers } from "@slices/userSlice";

export function ActiveUsers() {
  console.log("ACTIVE USERS COMPONENT=>");
  const activeUsers = useSelector(getActiveUsers);

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
