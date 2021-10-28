import React from "react";
import CardsList from "../../components/CardsList/CardsList";
import Header from "../../components/Header/Header";

import styles from "./Layout.module.scss";

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <div className={styles.wrapper}>
        <Header />
        {/* <div className={styles.bg}></div> */}
        <div className={styles.cards_list}>
          <CardsList />
        </div>
        <div className={styles.container}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
