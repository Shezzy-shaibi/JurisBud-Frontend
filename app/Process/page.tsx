'use client'

import Logo from "../components/Logo"
import styles from "./Process.module.css"
import MainTab from "../components/MainTab"
import NoHelloUser from "../components/NoHelloUser"
import FinishedTask from "../components/FinishedTask"
import AlterTask from "../components/AlterTask"
import NotFinishedTask from "../components/NotFinishedTask"
import NotConfirmedTask from "../components/NotConfirmedTask"
import Link from "next/link"
import Image from "next/image";
import { useEffect, useState } from "react"
import { apiClient } from "../utils/api"

const Process = () => {

    const [inputValue, setInputValue] = useState('');
  // State to store the response from the API (if needed)
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false); // State to track loading


  // Function to handle input changes
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Function to send the HTTP request
  const sendRequest = () => {
    setLoading(true); // Start loading


    // Here you would replace 'your-api-endpoint' with your actual API endpoint
    // and adjust headers and body according to your API requirements

    
    apiClient.post("/chat/create", {
        headers: {
            'Content-Type': 'application/json',
          Authorization: "Token " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ prompt: inputValue }),
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setResponse(data);
        setLoading(false); // Stop loading after the data is received

      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false); // Stop loading after the data is received

      });
  };

  // UseEffect hook to handle the sending of the request 2 seconds after input value changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue) { // Only send request if the input value is not empty
        sendRequest();
      }
    }, 2000); // 2000 milliseconds = 2 seconds

    // Cleanup the timeout if the component is unmounted or the inputValue changes again before the 2 seconds
    return () => clearTimeout(timer);
  }, [inputValue]);
  return (
    <main>
        <div className={styles.logo}><Logo></Logo></div>
        <div className={styles.maintab}>
          <MainTab></MainTab>
        </div>
        <div className={styles.chatName}>
            <h1>Chat name</h1>
        </div>
        <div className={styles.prompt}>
            <Image width={0} height={0} sizes="100vw" src='/home/search.png' className={styles.promptPic} alt='prompt' />
            <input type="text" placeholder="Prompt: typed" className={styles.promptText} value={inputValue} onChange={handleInputChange} disabled={false}></input>
            <p className={styles.taskDes}>
                    {loading ? "Loading..." : response?.chat?.response}
                </p>
         
        </div>
       
        <div className={styles.tasks}>
            <h1 className={styles.taskTag}>Requested Taskssss</h1>
           
            {/* <p className={styles.taskDes}>Tasks are split to descriptions, with Agents supervision and handling</p> */}
            <p className={styles.taskDes}>
                    {loading ? "Loading..." : response?.chat?.response}
                </p>
              <div className={styles.tasksList}>
                  <div className={styles.finishedTask}>
                      <FinishedTask initialText="Done"></FinishedTask>
                  </div>
                  <div className={styles.alterTask}>
                      <AlterTask initialText="Choose to alter"></AlterTask>
                  </div>
                  <div className={styles.notFinishedTask}>
                      <NotFinishedTask initialText="Not Finished"></NotFinishedTask>
                  </div>
                  <div className={styles.notConfirmedTask}>
                      <NotConfirmedTask initialText="Done, asks for your confirmation"></NotConfirmedTask>  
                  </div>
                  <div className={styles.error}>
                      <Image width={0} height={0} sizes="100vw" src='/process/error.png' className={styles.errorPic} alt='error' /> {/* Think about where to put it */}
                  </div>



                  <button className={styles.addTask}><p>- Add your task here...</p></button>
              </div>
                <Link href='/NewChat'>
                    <button className={styles.submit}><Image width={0} height={0} sizes="100vw" src='/process/submit.png' alt='submit' /></button>
                </Link>
        </div>
        
        <div className={styles.processBackground}>
            <Image width={0} height={0} sizes="100vw" src="/process/background2.png" alt="process" />
        </div>
        <NoHelloUser></NoHelloUser>
    </main>
  )
}

export default Process