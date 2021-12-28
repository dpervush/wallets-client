import React from "react";
import { useDispatch } from "react-redux";
import { clearError } from "../../../store/slices/auth";
import classNames from "classnames/bind";

import styles from "./Message.module.scss";
import { CloseIcon } from "../../icons";

const cx = classNames.bind(styles);

let timerId;

export const Message = ({ title, type }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    timerId = setTimeout(() => {
      dispatch(clearError());
    }, 5000);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  return (
    <div className={cx({ message: true, error: type === "error" })}>
      <button className={styles.close} onClick={() => dispatch(clearError())}>
        <CloseIcon />
      </button>
      {title}
    </div>
  );
};
