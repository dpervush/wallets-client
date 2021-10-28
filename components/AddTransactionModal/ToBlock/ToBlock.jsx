import React from "react";
import Image from "next/image";
import icon from "../../../public/assets/icons/shopping.svg";

import styles from "../AddTransactionModal.module.scss";

export const ToBlock = ({ items, register, onAddCategoryHandle }) => {
  return (
    <>
      <div className={styles.subtitle}>To</div>
      <div className={styles.to_block}>
        <div className={styles.from_item}>
          <button className={styles.add_btn} onClick={onAddCategoryHandle}>
            <span>category</span>
          </button>
        </div>
        {items?.map(({ id, title, budget }) => (
          <div key={id} className={styles.from_item}>
            <label className={styles.label}>
              <input
                className={`${styles.radio} ${styles.visually_hidden}`}
                {...register("to", { required: true })}
                type="radio"
                value={id}
              />
              {title}
              <span className={styles.icon}>
                <Image src={icon} alt="icon" />
              </span>
              <span className={styles.balance}>600</span>
              <span className={styles.budget}>{budget}</span>
            </label>
          </div>
        ))}
      </div>
    </>
  );
};
