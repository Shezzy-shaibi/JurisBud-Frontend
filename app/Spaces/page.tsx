"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./SpacesList.module.css"; // Link to your CSS module
import { apiClient } from "../utils/api";

const SpacesList = () => {
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    const fetchSpaces = async () => {
      const response = await apiClient.get("/spaces", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      setSpaces(data);
    };

    fetchSpaces();
  }, []);

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <div
              style={{
                alignContent: "right",
                color: "greenyellow",
                fontSize: "30px",
              }}
            >
              <Link href={`/create-space`} legacyBehavior>
                +
              </Link>
            </div>
          </div>
          <div className={styles.tableHeader}>
            <div className={styles.headerItem}>Name</div>
            <div className={styles.headerItem}>Tags</div>
            <div className={styles.headerItem}>Created At</div>
            <div className={styles.headerItem}>Group</div>
          </div>
          {Array.isArray(spaces) &&
            spaces.map((space) => (
              <Link href={`/Space/${space.id}`} key={space.id} passHref>
                <div className={styles.tableRow}>
                  <div className={styles.rowItem}>{space?.name}</div>
                  <div className={styles.rowItem}>
                    {space?.tags?.map((tag) => (
                      <span
                        key={tag.id}
                        style={{
                          backgroundColor: tag.color,
                          color: tag.color === "#FFFFFF" ? "black" : "white",
                          borderRadius: "5px",
                          padding: "3px 5px",
                          marginRight: "5px",
                        }}
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                  <div className={styles.rowItem}>
                    {formatDate(space?.created_at)}
                  </div>
                  <div className={styles.rowItem}>{space?.group?.name}</div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
};

export default SpacesList;
