import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import ModalWindow from "../../containers/ModalWindow/ModalWindow";
import Button from "../UI/Button/Button";

import styles from "../AddTransactionModal/AddTransactionModal.module.scss";
import { createCategory, updateCategory } from "../../store/slices/categories";

const AddCategoryModal = ({ onClose, method, initValues }) => {
  const dispatch = useDispatch();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: initValues || { total: true, color: "#8A16FF" },
  });

  const onSubmit = (data) => {
    method === "UPDATE"
      ? dispatch(updateCategory({ ...data, id: initValues.id }))
      : dispatch(createCategory({ ...data }));
    reset();
    onClose();
  };

  return (
    <ModalWindow onClose={onClose}>
      <div className={styles.body}>
        <div className={styles.title}>Add category</div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={`${styles.form_item} ${styles.form_item__input}`}>
            <input
              className={styles.input}
              type="text"
              placeholder="Название категории"
              {...register("title", { maxLength: 80 })}
            />
            <div className={styles.icon}></div>
          </div>
          <div className={`${styles.form_item} ${styles.form_item__input}`}>
            <input
              className={styles.input}
              type="number"
              placeholder="Бюджет"
              {...register("budget")}
            />
            <div className={styles.icon}></div>
          </div>
          <Button
            innerText={method === "UPDATE" ? "Update" : "Create"}
            type="submit"
            padding="13px 35px"
          ></Button>
        </form>
      </div>
    </ModalWindow>
  );
};

export default AddCategoryModal;
