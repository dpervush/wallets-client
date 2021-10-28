import React from "react";
import { useDispatch } from "react-redux";
import { deleteTransaction } from "../../../store/slices/transactions";
import { formatCurrency } from "../../../utils/formatCurrency";
import { DeleteIcon, EditIcon } from "../../icons";

import styles from "./TransactionItem.module.scss";

const monthNamesShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const TransactionItem = ({ id, title, date, category, card, amount }) => {
  const dispatch = useDispatch();

  const formateDate = (date) =>
    `${new Date(date).getDate()} ${
      monthNamesShort[new Date(date).getMonth()]
    } ${new Date(date).getFullYear()}`;

  const onDeleteHandle = () => dispatch(deleteTransaction(id));

  return (
    <div className={styles.row}>
      <div className={styles.name}>{title}</div>
      <div className={styles.date}>{formateDate(date)}</div>
      <div className={styles.gap}></div>
      <div className={styles.category}>
        <span>{category.title}</span>
      </div>
      <div className={styles.card}>
        <span style={{ backgroundColor: card.color }}></span>
      </div>
      <div className={styles.amount}>
        <span className={styles.text}>
          {formatCurrency(amount, card.currency)}
        </span>
        <button className={styles.edit}>
          <EditIcon />
        </button>
        <button className={styles.delete} onClick={onDeleteHandle}>
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

export default TransactionItem;
