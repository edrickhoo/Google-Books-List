import React from "react";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header>
      <div className={styles.Header}>
        <h1 className={styles.Header_Title}>Book Search</h1>
        <p>Search your favourite titles</p>
      </div>
    </header>
  );
};

export default Header;