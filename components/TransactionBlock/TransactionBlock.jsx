import React from "react";
import { SwipeableList } from "@sandstreamdev/react-swipeable-list";

import TransactionItem from "./TransactionItem/TransactionItem";
import { monthNamesLong } from "../../utils/constants";
import { bodyWidth, isTouchDevice } from "../../utils";

import styles from "./TransactionBlock.module.scss";

const SwipeableWrapper = ({ children }) => {
  if (isTouchDevice || bodyWidth < 710) {
    return <SwipeableList>{children}</SwipeableList>;
  } else {
    return <div>{children}</div>;
  }
};

const TransactionBlock = ({
  items,
  lastTransactionRef,
  categoriesExpense,
  categoriesIncome
}) => {
  const parsedItems = Object.keys(items).reduce((obj, key) => {
    const dataArray = Object.keys(items[key]).reduce((objYear, keyMonth) => {
      objYear.push({ month: +keyMonth, transactions: items[key][keyMonth] });

      return objYear;
    }, []);

    obj.push({
      year: key,
      data: dataArray
    });

    return obj;
  }, []);

  const renderBlock = (blockData) => {
    return (
      <div className={styles.block} key={blockData.month}>
        <div className={styles.title}>
          {`${monthNamesLong[blockData.month]}, ${blockData.year}`}
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.name}></div>
            <div className={styles.date}>Date</div>
            <div className={styles.gap}></div>
            <div className={styles.category}>Category</div>
            <div className={styles.card}>Card</div>
            <div className={styles.amount}>Amount</div>
          </div>
          <SwipeableWrapper>
            {blockData.transactions.map((item) => (
              <TransactionItem
                key={item.id}
                {...item}
                lastTransactionRef={lastTransactionRef}
                categoriesExpense={categoriesExpense}
                categoriesIncome={categoriesIncome}
              />
            ))}
          </SwipeableWrapper>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      {parsedItems.reverse().map((yearData) => {
        return yearData.data.reverse().map((monthData) => {
          return renderBlock({ ...monthData, year: yearData.year });
        });
      })}
    </div>
  );
};

export default TransactionBlock;
