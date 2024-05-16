import axios from "axios";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import ChatList from "./ChatList";
import ChatlistCard from "../components/ChatlistCard";

const Home = () => {
    const [content, setContent] = useState("초기값 확인");
    const [chatlist, setChatlist] = useState([]);
    
    const onSubmitChat = async (e) => {
      
      try{
        e.preventDefault();
        console.log(e.target[0].value);

        if(!content) return;

        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions", {
            "model": "gpt-3.5-turbo",
            "messages": [
              { 
                "role": "user",
                content, 
                }
            ],
          }, {
            headers : {
              "Content-Type" : "application/json",
              Authorization : `Bearer ${import.meta.env.VITE_API_KEY}`,
            },
          }
        );

        setChatlist([
          {
          question : content, 
          answer : response.data.choices[0].message.content,
      },
      ...chatlist,
      
    ]);
      } catch(error) {
        console.error(error);
      };
    };
  
    const onChangeContent = (e) => {
        setContent(e.target.value);
        console.log(e.target.value);
    };

    useEffect(() => {
      console.log(chatlist);
    }, [chatlist]);

    return (
      <div className="mt-8 flex flex-col items-center">
        <form className="flex" onSubmit={onSubmitChat}>
            <input 
            className="text-2xl p-2 focus:outline-none rounded-lg border-2 border-pink-200 focus:border-pink-400"
            type="text" value={content} onChange={onChangeContent} />
            <button
              className="flex items-center ml-4 bg-pink-400 text-2xl px-4 py-[10px] rounded-full shadow-md shadow-pink-200 hover:bg-pink-500"
              type="submit"
            >
          <FiSearch className="mr-2"/> 검색
        </button>
        </form>
        <ul className="mt-8 px-4 flex flex-col gap-4">
          {chatlist.map((v, i) => (
            <ChatlistCard key={i} question={v.question} answer={v.answer} />
          ))}
        </ul>

      </div>
    );
  };
  
  export default Home;