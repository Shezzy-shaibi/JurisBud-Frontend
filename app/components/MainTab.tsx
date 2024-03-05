import Logo from "./Logo"
import styles from "./MainTab.module.css"
import ChatDropDown from "./ChatDropdown"
import SpaceDropDown from "./SpaceDropdown"
import Image from "next/image";
import { useEffect, useState } from "react";
import { apiClient } from "../utils/api";
import ChatList from "./ChatList";

const MainTab = () => {

  const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false); // S
  const [chats, setChats] = useState([]);


    const sendRequest = () => {
        setLoading(true); // Start loading
    
    
        // Here you would replace 'your-api-endpoint' with your actual API endpoint
        // and adjust headers and body according to your API requirements
    
        
        apiClient.get("/chats", {
            headers: {
                'Content-Type': 'application/json',
              Authorization: "Token " + localStorage.getItem("token"),
            },
          })
          .then(response => response.json())
          .then(data => {
            console.log(data)
            setResponse(data);
            setChats(data?.chats)
            setLoading(false); // Stop loading after the data is received
    
          })
          .catch(error => {
            console.error('Error:', error);
            setLoading(false); // Stop loading after the data is received
    
          });
      };
    
      // UseEffect hook to handle the sending of the request 2 seconds after input value changes
      useEffect(() => {
          sendRequest();
        }, []) // 2000

  return (
    <main>
      <div className={styles.background}>
        <div className={styles.dashboard}>
            <Image width={0} height={0} sizes="100vw" src="/maintab/dashboard.png" alt="dashboard" className={styles.tabpic}/>
            <p>Dashboard</p>
        </div>
        <div className={styles.space}>
            <Image width={0} height={0} sizes="100vw" src="/maintab/space.png" alt="space" className={styles.tabpic} />
            <SpaceDropDown></SpaceDropDown>
        </div>
        <div className={styles.chat}>
            <Image width={0} height={0} sizes="100vw" src="/maintab/chat.png" alt="chat" className={styles.tabpic} />
            <ChatDropDown></ChatDropDown>
        </div>
        <div className={styles.chatList}>
          <ChatList items={chats} setItems={setChats} />    
        </div>
        <div className={styles.logo}>
            <Logo></Logo>
        </div>
      </div>

    </main>
  )
}

export default MainTab