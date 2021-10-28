import React from "react";
import styles from "../AddTransactionModal.module.scss";

export const TypesBlock = ({ register }) => {
  return (
    <div className={styles.types}>
      <div className={styles.types_item}>
        <label className={styles.label}>
          <input
            className={`${styles.radio} ${styles.visually_hidden}`}
            {...register("type", { required: true })}
            type="radio"
            value={"Expense"}
          />
          <span>Expense</span>
        </label>
      </div>
      <div className={styles.types_item}>
        <label className={styles.label}>
          <input
            className={`${styles.radio} ${styles.visually_hidden}`}
            {...register("type", { required: true })}
            type="radio"
            value={"Income"}
          />
          <span>Income</span>
        </label>
      </div>
    </div>
  );
};
