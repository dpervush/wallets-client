import React from "react";
import styles from "./PostItem.module.scss";

const PostItem = ({ percentTop, percentBottom }) => {
  return (
    <div className={styles.post}>
      <div className={styles.top}>
        <div className={styles.bg}></div>
        <div
          className={styles.color}
          style={{ height: percentTop + "%" }}
        ></div>
      </div>
      <div
        className={styles.bottom}
        style={{ height: percentBottom + "%" }}
      ></div>
    </div>
  );
};

export default PostItem;
