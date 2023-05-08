import { BackToUserBtn } from "../chat/back-to-user-btn";

import { useSelector } from "react-redux";
import { getInbox } from "@slices/notificationSlice";
import { ActiveUsers } from "../chat";

export function Inbox() {
  console.log("INBOX COMPONENT=>");
  const currentInbox = useSelector(getInbox);

  return (
    <div className="h-full">
      <BackToUserBtn />
      <ActiveUsers flag="inbox" />
    </div>
  );
}
