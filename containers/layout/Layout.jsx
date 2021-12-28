import React from "react";
import { useSelector } from "react-redux";
import CardsList from "../../components/CardsList/CardsList";
import { Footer } from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { Message } from "../../components/UI/Message/Message";
import { ProgressBar } from "../../components/UI/ProgressBar/ProgressBar";

import styles from "./Layout.module.scss";

const Layout = ({ children }) => {
  const {
    cards: { loading: cardsLoading }
  } = useSelector((state) => state);

  const {
    cards: { error: cardsError },
    categories: { error: categoriesError },
    transactions: { error: transactionsError },
    stats: { error: statsError }
  } = useSelector((state) => state);

  const hasError =
    cardsError || categoriesError || transactionsError || statsError;

  return (
    <div className={styles.layout}>
      {cardsLoading && <ProgressBar />}
      {hasError && <Message title="Something went wrong :(" type="error" />}
      <div className={styles.wrapper}>
        <Header />
        <div className={styles.cards_list}>
          <CardsList />
        </div>
        <div className={styles.container}>{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
