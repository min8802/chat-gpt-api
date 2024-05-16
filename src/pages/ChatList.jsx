import { useEffect, useState } from "react";
import ChatlistCard from "../components/ChatlistCard";

const ChatList = () => {
  const [chatlist, setChatlist] = useState([]);

  useEffect(() => {
    const savedChatlist = localStorage.getItem("savedChatlist");

    if (!savedChatlist) return;
    console.log(savedChatlist);
    console.log(chatlist);
    setChatlist(JSON.parse(savedChatlist));
  }, []);

  return (
    <div>
      <ul className="mt-8 px-4 flex flex-col gap-4">
        {chatlist.map((v, i) => (
          <ChatlistCard key={i} question={v.question} answer={v.answer} />
        ))}
      </ul>
      {console.log(chatlist.question)}
    </div>
  );
};

export default ChatList;