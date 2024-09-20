import { List } from "@mui/material";
import useGetConversations from "../../hooks/useGetConversations";

import Conversation from "./Conversation";

const Conversations = () => {
  const { conversations } = useGetConversations();

  return (
    <>
      <List>
        {conversations?.map((user, index) => (
          <Conversation user={user} key={user?._id} length={conversations?.length} index={index} />
        ))}
      </List>
    </>
  );
};

export default Conversations;
