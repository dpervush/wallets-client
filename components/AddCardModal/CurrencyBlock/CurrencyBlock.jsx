import React from "react";
import Image from "next/image";

import ModalWindow from "../../../containers/ModalWindow/ModalWindow";
import Button from "../../UI/Button/Button";

import styles from "./CurrencyBlock.module.scss";

export const CurrencyBlock = ({ onSubmit, register, onClose }) => {
  const contentRef = React.useRef();

  const handleClickOnDocument = (e) => {
    if (contentRef.current && !contentRef.current.contains(e.target)) {
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
        <div className={styles.subtitle}>Choose base currency</div>
        <div className={styles.currencies}>
          <label>
            <input
              className={`${styles.radio} ${styles.visually_hidden}`}
              {...register("currency")}
              type="radio"
              value="RUB"
            />
            <span className={styles.currency}>
              <Image
                src="/assets/icons/rub-icon.svg"
                width={18}
                height={29}
                alt="RUB"
              />
            </span>
          </label>
          <label>
            <input
              className={`${styles.radio} ${styles.visually_hidden}`}
              {...register("currency")}
              type="radio"
              value="USD"
            />
            <span className={styles.currency}>
              <Image
                src="/assets/icons/usd-icon.svg"
                width={15}
                height={29}
                alt="USD"
              />
            </span>
          </label>
          <label>
            <input
              className={`${styles.radio} ${styles.visually_hidden}`}
              {...register("currency")}
              type="radio"
              value="EUR"
            />
            <span className={styles.currency}>
              <Image
                src="/assets/icons/eur-icon.svg"
                width={20}
                height={29}
                alt="EUR"
              />
            </span>
          </label>
        </div>
        <div className={styles.btn_wrapper}>
          <Button
            innerText={"Choose"}
            type="button"
            onClick={onSubmit}
            padding="10px 20px"
          />
        </div>
      </div>
    </ModalWindow>
  );
};
