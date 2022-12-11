import React, { useState } from "react";
import Book from "../../components/Book/Book";
import { bookType } from "../../api/google-books-api";
import styles from "./Books.module.scss";
import MoreInfo from "../../components/MoreInfo/MoreInfo";
import searchIcon from "../../assets/search.svg";

type Props = {
  booksData: bookType[];
  fetchWithSearchInput: Function;
  error: string;
};

const Books = ({ booksData, fetchWithSearchInput, error }: Props) => {
  const [searchInput, setSearchInput] = useState("");
  const [moreInfo, setMoreInfo] = useState(false);
  const [moreInfoData, setMoreInfoData] = useState<object | null>(null);

  const toggleMoreInfo = () => {
    setMoreInfo(!moreInfo);
  };

  const setAndToggleMoreInfo = (data: object) => {
    setMoreInfoData(data);
    toggleMoreInfo();
  };
  return (
    <div className={styles.Container}>
      <form
        onSubmit={(e) => {
          fetchWithSearchInput(searchInput, e);
          setSearchInput("");
        }}
        className={styles.Search_Form}
      >
        <label
          className={styles.Search_Form__Search_Label}
          htmlFor="bookSearch"
        >
          Search:{" "}
        </label>
        <input
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          type="text"
        />
        <button className={styles.Search_Form__Submit}>
          <img
            className={styles.Search_Form__Submit__Icon}
            src={searchIcon}
            alt="Search Icon"
          />
        </button>
      </form>
      <div className={styles.Books}>
        {booksData && booksData.length > 0 ? (
          booksData.map((book: any, idx: number) => {
            return (
              <Book
                setAndToggleMoreInfo={setAndToggleMoreInfo}
                key={idx}
                bookData={book}
              />
            );
          })
        ) : (
          <div className={styles.Search_Error}>
            {error ? error : "Loading..."}
          </div>
        )}
      </div>

      {moreInfo ? (
        <MoreInfo toggleMoreInfo={toggleMoreInfo} moreInfoData={moreInfoData} />
      ) : null}
    </div>
  );
};

export default Books;
