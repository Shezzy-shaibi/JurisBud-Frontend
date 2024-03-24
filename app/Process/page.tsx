"use client";

import Logo from "../components/Logo";
import styles from "./Process.module.css";
import MainTab from "../components/MainTab";
import NoHelloUser from "../components/NoHelloUser";
import FinishedTask from "../components/FinishedTask";
import AlterTask from "../components/AlterTask";
import NotFinishedTask from "../components/NotFinishedTask";
import NotConfirmedTask from "../components/NotConfirmedTask";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { apiClient } from "../utils/api";

const Process = () => {
  const [inputValue, setInputValue] = useState("");
  const [name, setName] = useState("Chat Name");

  // State to store the response from the API (if needed)
  const queryParams = new URLSearchParams(window.location.search);
  const promptParam = queryParams.get("prompt");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false); // State to track loading

  useEffect(() => {
    setInputValue(promptParam);
  }, [promptParam]);

  // Function to handle input changes
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Function to send the HTTP request
  const sendRequest = () => {
    setLoading(true); // Start loading

    // Here you would replace 'your-api-endpoint' with your actual API endpoint
    // and adjust headers and body according to your API requirements
    apiClient
      .post("/chat/create", { prompt: inputValue, name: name })
      .then((data) => {
        console.log(data);
        setResponse(data);
        setLoading(false); // Stop loading after the data is received
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false); // Stop loading after the data is received
      });
  };

  // UseEffect hook to handle the sending of the request 2 seconds after input value changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue) {
        // Only send request if the input value is not empty
        sendRequest();
      }
    }, 2000); // 2000 milliseconds = 2 seconds

    // Cleanup the timeout if the component is unmounted or the inputValue changes again before the 2 seconds
    return () => clearTimeout(timer);
  }, [inputValue]);
  return (
    <div>
      <div className={styles.chatName}>
        <input
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
        />{" "}
      </div>
      <div className={styles.prompt}>
        <Image
          width={0}
          height={0}
          sizes="100vw"
          src="/home/search.png"
          className={styles.promptPic}
          alt="prompt"
        />
        <input
          type="text"
          placeholder="Prompt: typed"
          className={styles.promptText}
          value={inputValue}
          onChange={handleInputChange}
          disabled={false}
        ></input>
      </div>

      <div className={styles.tasks} style={{ marginRight: "20%" }}>
        <div
          className={styles.res}
          style={{
            marginLeft: "20%",
            marginRight: "25%",
            padding: "40px",
            backgroundColor: "whitesmoke",
            borderRadius: "5px",
          }}
        >
          {loading ? "Loading..." : response?.chat?.response}
        </div>

        {/* <h1 className={styles.taskTag}>Requested Tasks</h1> */}

        {/* <p className={styles.taskDes}>Tasks are split to descriptions, with Agents supervision and handling</p> */}
      </div>

      <div className={styles.processBackground}>
        <Image
          width={0}
          height={0}
          sizes="100vw"
          src="/process/background2.png"
          alt="process"
        />
      </div>
      <NoHelloUser></NoHelloUser>
    </div>
  );
};

export default Process;
