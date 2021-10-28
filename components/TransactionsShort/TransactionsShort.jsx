import React from "react";
import TransactionItem from "./TransactionItem/TransactionItem";

import styles from "./TransactionsShort.module.scss";

const TransactionsShort = () => {
  return (
    <div className={styles.transactions}>
      <div className={styles.header}>
        <div className={styles.title}>Transactions</div>
        <div className={styles.all}>See All</div>
      </div>
      <div className={styles.body}>
        <TransactionItem />
        <TransactionItem />
        <TransactionItem />
      </div>
    </div>
  );
};

export default TransactionsShort;
