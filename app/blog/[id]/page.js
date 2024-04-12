'use client'

import Header from "@/app/components/Header";
import { client } from "@/libs/client";
import styles from "../../page.module.css";
import { useEffect, useState } from "react";

export default function Details({params}) {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
      const fetchData = async() => {
          const response =await client.get({
            endpoint: "blogs",
            contentId: `${params.id}`
          })
          setBlogs(response);
      };
      fetchData();
    }, []);  

    return (
        <div>
          <Header />
          <div className={styles.details}>
            <h1>{blogs.title}</h1>
            <div dangerouslySetInnerHTML={{__html: `${blogs.body}`}}></div>
          </div>
        </div>
    )
}

