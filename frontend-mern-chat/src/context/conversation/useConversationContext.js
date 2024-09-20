import { useContext } from "react";
import { ConversationContext } from "./ConversationContext";

export const useConversationContext = () => {
  return useContext(ConversationContext);
};