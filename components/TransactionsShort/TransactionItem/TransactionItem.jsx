import React from "react";
import classNames from "classnames/bind";

import styles from "./TransactionItem.module.scss";

const cx = classNames.bind(styles);

const TransactionItem = ({
  info = { amount: -20.0, name: "Uber" },
  date = "25 Dec 2019",
}) => {
  return (
    <div className={styles.row}>
      <div
        className={cx({
          icon: true,
          icon_down: info.amount < 0,
          icon_up: info.amount > 0,
        })}
      ></div>
      <div className={styles.info}>
        <div className={styles.name}>{info.name}</div>
        <div className={styles.amount}>{`${
          info.amount < 0 ? "-" : ""
        }$${Math.abs(info.amount).toFixed(2)}`}</div>
      </div>
      <div className={styles.date}>{date}</div>
    </div>
  );
};

export default TransactionItem;
