import React from "react";
import styles from "./MoreInfo.module.scss";
import closeIcon from "../../assets/close-icon.svg";
import { BookType } from "../../api/google-books-api";

type Props = {
  moreInfoData: BookType;
  toggleMoreInfo: () => void;
};

const MoreInfo = ({ moreInfoData, toggleMoreInfo }: Props) => {
  const {
    img,
    author,
    description,
    title,
    publishedDate,
    pageCount,
    languages,
    rating,
    ratingCount,
  } = moreInfoData;
  return (
    <div className={styles.Container}>
      <div onClick={toggleMoreInfo} className={styles.Background}>
        <img className={styles.Container_CloseIcon} src={closeIcon} alt="" />
      </div>

      {moreInfoData ? (
        <div className={styles.Book}>
          <h4 className={styles.Book__Title}>{title}</h4>
          <h5 className={styles.Book__Author}>
            {Array.isArray(author) && author?.length > 1
              ? `Authors: ${author.join(", ")}`
              : `Author: ${author}`}
          </h5>
          <div className={styles.Book__Details}>
            <p>Published Date: {publishedDate}</p>
            <p>Rating: {rating ? `${rating}/5 (${ratingCount})` : "-/5"}</p>
            <p>Pages: {pageCount}</p>
            <p>Languages: {languages}</p>
          </div>
          <div className={styles.Book__Img_Desc_Container}>
            <div className={styles.Book__Img_Container}>
              <img className={styles.Book__Img} src={img} alt="" />
            </div>
            <p className={styles.Book__Description}>{description}</p>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default MoreInfo;
