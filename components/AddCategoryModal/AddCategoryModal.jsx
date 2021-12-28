import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import ModalWindow from "../../containers/ModalWindow/ModalWindow";
import ModalWindowStyles from "../../containers/ModalWindow/ModalWindow.module.scss";
import { IconsBlock } from "../UI/IconsBlock/IconsBlock";
import Button from "../UI/Button/Button";

import { createCategory, updateCategory } from "../../store/slices/categories";

import styles from "./AddCategoryModal.module.scss";
import CategoriesIcons from "../icons/categoriesIcons/CategoriesIcons";
import { icons } from "../../utils/constants";

const AddCategoryModal = ({ type, onClose, method, initValues }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors }
  } = useForm({
    defaultValues: initValues || { total: true, color: "#8A16FF", type }
  });

  const [showIconsBlock, setShowIconsBlock] = React.useState(false);
  const [activeIcon, setActiveIcon] = React.useState(
    initValues?.icon || icons[0]
  );

  const handleIcon = () => {
    setActiveIcon(getValues("icon"));
    setShowIconsBlock(false);
  };

  const onSubmit = (data) => {
    method === "UPDATE"
      ? dispatch(
          updateCategory({ ...data, budget: +data.budget, id: initValues.id })
        )
      : dispatch(createCategory({ ...data, budget: +data.budget }));
    reset();
    onClose();
  };

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
        <div className={styles.title}>Add category</div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.form_body}>
            <div className={styles.form_block}>
              <div className={`${styles.form_item} ${styles.form_item__input}`}>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="Название категории"
                  {...register("title", { required: true })}
                />
                <div
                  className={styles.icon}
                  onClick={() => setShowIconsBlock(true)}
                >
                  <CategoriesIcons name={activeIcon} color="#fff" size="16" />
                </div>
              </div>
              <div className={styles.error}>
                {errors.title &&
                  errors.title.type === "required" &&
                  "This field is required"}
              </div>
            </div>
            <div className={styles.form_block}>
              <div className={`${styles.form_item} ${styles.form_item__input}`}>
                <input
                  className={styles.input}
                  type="number"
                  placeholder="Бюджет"
                  {...register("budget")}
                />
              </div>
            </div>
          </div>
          <div className={styles.btn_wrapper}>
            <Button
              innerText={method === "UPDATE" ? "Update" : "Create"}
              type="submit"
              padding="7px 35px"
            ></Button>
          </div>
        </form>
      </div>
      {showIconsBlock && (
        <IconsBlock
          icons={icons}
          onSubmit={handleIcon}
          register={register}
          onClose={() => setShowIconsBlock(false)}
        />
      )}
    </ModalWindow>
  );
};

export default AddCategoryModal;
