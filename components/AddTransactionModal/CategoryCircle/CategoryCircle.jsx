import React from "react";
import styles from "./CategoryCircle.module.scss";

const CategoryCircle = ({ children }) => {
  return (
    <div className={styles.circular}>
      <div className={styles.inner}></div>
      <div className={styles.number}>{children}</div>
      <div className={styles.circle}>
        <div className={`${styles.bar} ${styles.left}`}>
          <div className={styles.progress}></div>
        </div>
        <div className={`${styles.bar} ${styles.right}`}>
          <div className={styles.progress}></div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCircle;
