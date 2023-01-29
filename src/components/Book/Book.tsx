import React from "react";
import { BookType } from "../../api/google-books-api";
import styles from "./Book.module.scss";

type Props = {
  bookData: BookType;
  setAndToggleMoreInfo: (bookData: BookType) => void;
};

const Book = ({ bookData, setAndToggleMoreInfo }: Props) => {
  const { img, author, title, shortDescription } = bookData;

  return (
    <div className={styles.Book}>
      <h4 className={styles.Title}>{title}</h4>
      <h5>{author}</h5>
      <div className={styles.Book__Img_Desc_Container}>
        <div className={styles.Book__Img_Container}>
          <img className={styles.Book__Img} src={img} alt="" />
        </div>

        <p className={styles.Book__Description}>{shortDescription}</p>
      </div>
      <div className={styles.Book__MoreInfo_Container}>
        <button onClick={() => setAndToggleMoreInfo(bookData)}>
          More Info
        </button>
      </div>
    </div>
  );
};

export default Book;
