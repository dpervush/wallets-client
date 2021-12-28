import React from "react";
import classNames from "classnames/bind";
import { formatCurrency, formatDate } from "../../../utils";

import styles from "./TransactionItem.module.scss";

const cx = classNames.bind(styles);

const TransactionItem = ({
  date,
  type,
  amount,
  comment,
  category,
  currency,
}) => {
  return (
    <div className={styles.row}>
      <div
        className={cx({
          icon: true,
          icon_down: type === "expense",
          icon_up: type === "income",
        })}
      ></div>
      <div className={styles.info}>
        <div className={styles.name}>{comment || category}</div>
        <div className={styles.amount}>{`${
          type === "income" ? "" : "-"
        }${formatCurrency(amount, currency)}`}</div>
      </div>
      <div className={styles.date}>{formatDate(date)}</div>
    </div>
  );
};

export default TransactionItem;
