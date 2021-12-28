import React from "react";
import Link from "next/link";
import Loader from "react-loader-spinner";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getRecentTransactions } from "../../store/slices/transactions";
import TransactionItem from "./TransactionItem/TransactionItem";

import styles from "./TransactionsShort.module.scss";

const TransactionsShort = () => {
  const dispatch = useDispatch();

  const { recentTransactions, loading } = useSelector(
    ({ transactions }) => transactions
  );

  React.useEffect(() => {
    dispatch(getRecentTransactions());
  }, []);

  return (
    <div className={styles.transactions}>
      <div className={styles.header}>
        <div className={styles.title}>Transactions</div>
        <div>
          <Link href="/transactions">
            <a className={styles.all}>See All</a>
          </Link>{" "}
        </div>
      </div>
      <div className={styles.body}>
        {loading && (
          <div className={styles.loader}>
            <Loader type="Oval" color="#24dffe" height={60} width={60} />
          </div>
        )}
        {!loading && recentTransactions.length === 0 && (
          <div className={styles.no_data}>No transactions here yet :(</div>
        )}
        {!loading &&
          recentTransactions?.map((item) => (
            <TransactionItem
              key={item.id}
              date={item.date}
              type={item.type}
              amount={item.amount}
              currency={item.card.currency}
              comment={item.title}
              category={item.category.title}
            />
          ))}
      </div>
    </div>
  );
};

export default TransactionsShort;
