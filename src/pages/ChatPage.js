import { Flex } from "@chakra-ui/react";
import { ChatState } from "../context/ChatProvider";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";
import { useState } from "react";

const ChatPage = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);
  return (
    <div
      style={{
        width: "100%",
        color: "rgb(133, 23, 23)",
        backgroundImage:
          "linear-gradient(79deg, #fcfdfd, #cac9c3 48%, #feffff)",

        backgroundColor: "white",
      }}
    >
      {user && <SideDrawer />}

      <Flex>
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Flex>
    </div>
  );
};

export default ChatPage;
