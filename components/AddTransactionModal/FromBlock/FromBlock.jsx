import React from "react";
import Image from "next/image";
import icon from "../../../public/assets/icons/shopping.svg";

import { formatCurrency } from "../../../utils/formatCurrency";

import styles from "../AddTransactionModal.module.scss";

export const FromBlock = ({ items, register, onAddCardHandle }) => {
  return (
    <>
      <div className={styles.subtitle}>From</div>
      <div className={styles.from_block}>
        <div className={styles.from_item}>
          <button className={styles.add_btn} onClick={onAddCardHandle}>
            <span>account</span>
          </button>
        </div>
        {items?.map(({ id, name, balance, currency }) => (
          <div key={id} className={styles.from_item}>
            <label className={styles.label}>
              <input
                className={`${styles.radio} ${styles.visually_hidden}`}
                {...register("from", { required: true })}
                type="radio"
                value={id}
              />
              {name}
              <span className={styles.icon}>
                <Image src={icon} alt="icon" />
              </span>
              <span className={styles.balance}>
                {formatCurrency(balance, currency)}
              </span>
            </label>
          </div>
        ))}
      </div>
    </>
  );
};
