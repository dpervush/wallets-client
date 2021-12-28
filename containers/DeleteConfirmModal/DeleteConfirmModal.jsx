import React from "react";

import ModalWindow from "../ModalWindow/ModalWindow";
import ModalWindowStyles from "../ModalWindow/ModalWindow.module.scss";

import Button from "../../components/UI/Button/Button";

import styles from "./DeleteConfirmModal.module.scss";

export const DeleteConfirmModal = ({ title, children, onClose, onSubmit }) => {
  const contentRef = React.useRef();

  const handleClickOnDocument = (e) => {
    if (
      contentRef.current &&
      !contentRef.current.contains(e.target) &&
      contentRef.current?.closest("." + ModalWindowStyles.wrapper) ===
        e.target.closest("." + ModalWindowStyles.wrapper)
    ) {
      onClose();
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClickOnDocument);

    return () => document.removeEventListener("click", handleClickOnDocument);
  }, []);

  return (
    <ModalWindow onClose={onClose}>
      <div className={styles.body} ref={contentRef}>
        <div className={styles.title}>{title}</div>
        <div className={styles.content}>{children}</div>
        <div className={styles.actions}>
          <div className={styles.btn}>
            <Button
              innerText="Cancel"
              type="button"
              padding="13px 35px"
              onClick={onClose}
            ></Button>
          </div>
          <div className={styles.btn}>
            <Button
              innerText="Delete"
              type="submit"
              padding="13px 35px"
              onClick={onSubmit}
            ></Button>
          </div>
        </div>
      </div>
    </ModalWindow>
  );
};
