import { useEffect, useRef } from "react";
import { Messages } from "../messages/messages";
import { chatApi } from "@/store/api/chatApi";

export function SingleChat({ selectedChat }: any) {
  console.log("single chat component=>");
  let content: any = <p>single chat component loading</p>;

  const timestampRef = useRef(Date.now()).current;

  const [
    executeGetMessagesQuery,
    { data, isError, error, isLoading, isSuccess },
  ] = chatApi.endpoints.getChatMessages.useLazyQuery();

  if (!selectedChat) {
    content = <p>Please Select a user to start chat...</p>;
  }

  useEffect(() => {
    if (selectedChat) {
      executeGetMessagesQuery({
        chatId: selectedChat?._id,
        sessionId: timestampRef,
      });
    }
  }, [selectedChat]);

  if (isLoading) {
    content = <p>Messages are loading...</p>;
  }
  if (isError) {
    content = <p>Some Error occured</p>;
  }
  if (isSuccess && data) {
    content = <>{data && <Messages messagesData={data} />}</>;
  }

  return content;
}
