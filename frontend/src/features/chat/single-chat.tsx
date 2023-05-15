import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
//COMPONENTS
import { Messages } from "../messages/messages";
//API
import { chatApi } from "@/store/api/chatApi";
//SLICES
import { setMessages } from "@/store/slices/chatSlice";
import { Spinner } from "../spinner";

export function SingleChat({ selectedChat }: any) {
  console.log("single chat component=>");
  let dispatch = useDispatch();

  let content: any = <p>single chat component loading</p>;

  const timestampRef = useRef(Date.now()).current;

  const [
    executeGetMessagesQuery,
    { data, isError, error, isLoading, isSuccess },
  ] = chatApi.endpoints.getChatMessages.useLazyQuery();

  if (!selectedChat) {
    content = <p>Please Select a user to start chat single chat...</p>;
  }

  useEffect(() => {
    if (selectedChat) {
      executeGetMessagesQuery({
        chatId: selectedChat?._id,
        sessionId: timestampRef,
      })
        .unwrap()
        .then((data: any) => {
          dispatch(setMessages(data));
        });
    }
  }, [selectedChat]);

  if (isLoading) {
    content = (
      <div className="flex items-center justify-center h-screen py-8 rounded-xl">
        <Spinner height={"h-24"} width={"w-24"} />
      </div>
    );
  }
  if (isError) {
    content = (
      <p className="border border-white-800 text-center text-white hover:cursor-pointer rounded-md bg-red-500 py-8">
        Error in loading messages!
      </p>
    );
  }
  if (isSuccess && data) {
    content = <>{data && <Messages />}</>;
  }

  return content;
}
