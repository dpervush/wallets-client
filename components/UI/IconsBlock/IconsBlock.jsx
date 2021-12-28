import React from "react";
import Image from "next/image";

import ModalWindow from "../../../containers/ModalWindow/ModalWindow";
import Button from "../Button/Button";

import styles from "./IconsBlock.module.scss";
import CategoriesIcons from "../../icons/categoriesIcons/CategoriesIcons";

export const IconsBlock = ({ icons, onSubmit, register, onClose }) => {
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
        <div className={styles.subtitle}>Choose category icon</div>
        <div className={styles.icons}>
          {icons.map((icon, index) => (
            <label key={`${icon}_${index}`} className={styles.icon}>
              <input
                className={`${styles.radio} ${styles.visually_hidden}`}
                {...register("icon")}
                type="radio"
                value={icon}
              />
              <span className={styles.icon_item}>
                <CategoriesIcons name={icon} color="#fff" size="16" />
              </span>
            </label>
          ))}
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
