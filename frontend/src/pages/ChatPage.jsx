import React, { useState } from "react";
import { useParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import {Channel,ChannelHeader,Chat,MessageInput,MessageList,Thread,Window} from "stream-chat-react"
const ChatPage = () => {
  const { id: targetUserId } = useParams();
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const {authUser} = useAuthUser();
  const {data:streamToken} = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled:!!authUser
  });
  return <div>ChatPage {targetUserId}</div>;
};

export default ChatPage;
