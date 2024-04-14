'use client';

import { client } from "@/libs/client";
import styles from "./page.module.css";
import Link from "next/link";
import Header from "./components/Header";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const[searchQuery, setSearchQuery] = useState([]);

  //ブログデータの取得
  useEffect(() => {
    const fetchData = async() => {
      try {
        const response =await client.get({
          endpoint: "blogs"
        });
        setBlogs(response.contents);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchData();
  }, []);


  //検索バーに入力された内容を保持する
  const handleSearch = (e) => {
    setSearchQuery(e.currentTarget.value);
  }

  //タグによる絞り込み機能の実装
  const filterList = blogs.filter((blog) => {
    // タグが存在しない場合は常に表示
    if (!searchQuery) {
      return true;
    }
    // タグをループして検索クエリと一致するかチェック
    for (const tag of blog.tags) {
      if (tag.tag.includes(searchQuery)) {
        return true;
      }
    }
    return false;
  });

  //pagenationの実装
  const itemsPerPage = 5;
  const [itemsOffset, setItemsOffset] = useState(0);
  const endOffset = itemsOffset + itemsPerPage;
  const currentFilterList = filterList.slice(itemsOffset, endOffset);
  const pageCount = Math.ceil(blogs.length / itemsPerPage);

  const handlePageClick = (e) => {
    const newOffset = (e.selected  * itemsPerPage) % blogs.length;
    setItemsOffset(newOffset);
  };

  return (
    <div className={styles.main}>
      <Header />

      {loading ? ( 
        <div>Loading...</div>
      ) : (
      <div className={styles.container}>
        <input type="text" placeholder="タグで絞り込む" onInput={handleSearch}/>
          <ul className={styles.articles}>
            {currentFilterList.map((blog) => 
            <li key = {blog.id} className={styles.article}>
              <p>{blog.createdAt}</p>
              <Link href={`./blog/${blog.id}`}>
                {blog.title}
              </Link>
              <br />
              {blog.tags.map((tag) => (
              <span key={tag.id}>#{tag.tag}</span>
              ))}
            </li>
            )}
          </ul>
      </div>
      )}

      <div className={styles.paginationContainer}>
          <ReactPaginate 
          containerClassName={styles.pagination}
          activeClassName={styles.active}
          breakLabel="..."
          nextLabel="next >"
          pageRangeDisplayed={5}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          pageCount={pageCount} 
          onPageChange={handlePageClick}
          />
      </div>
    </div>
  );
}

