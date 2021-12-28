import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import ModalWindow from "../../containers/ModalWindow/ModalWindow";
import ModalWindowStyles from "../../containers/ModalWindow/ModalWindow.module.scss";

import { createCard, updateCard } from "../../store/slices/cards";
import Button from "../UI/Button/Button";
import { CurrencyBlock } from "./CurrencyBlock/CurrencyBlock";
import { IconsBlock } from "../UI/IconsBlock/IconsBlock";

import styles from "./AddCardModal.module.scss";
import CategoriesIcons from "../icons/categoriesIcons/CategoriesIcons";
import { icons } from "../../utils/constants";

const AddCardModal = ({ onClose, method, initValues }) => {
  const dispatch = useDispatch();

  const [activeCurrency, setActiveCurrency] = React.useState(
    initValues?.currency || "RUB"
  );
  const [showCurrencyBlock, setShowCurrencyBlock] = React.useState(false);

  const [activeIcon, setActiveIcon] = React.useState(
    initValues?.icon || icons[0]
  );
  const [showIconsBlock, setShowIconsBlock] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors }
  } = useForm({
    defaultValues: initValues || {
      total: true,
      color: "#8A16FF",
      currency: activeCurrency,
      icon: icons[0]
    }
  });

  const handleCurrency = () => {
    setActiveCurrency(getValues("currency"));
    setShowCurrencyBlock(false);
  };

  const handleIcon = () => {
    setActiveIcon(getValues("icon"));
    setShowIconsBlock(false);
  };

  const onSubmit = (data) => {
    method === "UPDATE"
      ? dispatch(
          updateCard({ ...data, balance: +data.balance, id: initValues.id })
        )
      : dispatch(createCard({ ...data, balance: +data.balance }));
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
        <div className={styles.title}>Add new card</div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.form_body}>
            <div className={styles.form_block}>
              <div className={`${styles.form_item} ${styles.form_item__input}`}>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="Название или номер карты"
                  {...register("name", { required: true, maxLength: 80 })}
                />
                <div
                  className={styles.icon}
                  onClick={() => setShowIconsBlock(true)}
                >
                  <CategoriesIcons name={activeIcon} color="#fff" size="29" />
                </div>
              </div>
              <div className={styles.error}>
                {errors.name &&
                  errors.name.type === "required" &&
                  "This field is required"}
              </div>
            </div>
            <div className={`${styles.form_item} ${styles.form_item__input}`}>
              <div
                className={styles.icon}
                style={{
                  backgroundImage: `url(/assets/icons/${activeCurrency.toLowerCase()}-icon.svg)`
                }}
                onClick={() => setShowCurrencyBlock(true)}
              ></div>
              <input
                className={styles.input}
                type="number"
                placeholder="Баланс"
                {...register("balance")}
              />
            </div>
            <div className={`${styles.form_item} ${styles.form_item__color}`}>
              <div className={styles.subtitle}>Pick a color</div>
              <div className={styles.colors}>
                <label>
                  <input
                    className={`${styles.radio} ${styles.visually_hidden}`}
                    {...register("color")}
                    type="radio"
                    value="#8A16FF"
                  />
                  <span
                    className={styles.color}
                    style={{ backgroundColor: "#8A16FF" }}
                  ></span>
                </label>
                <label>
                  <input
                    className={`${styles.radio} ${styles.visually_hidden}`}
                    {...register("color")}
                    type="radio"
                    value="#FF25C2"
                  />
                  <span
                    className={styles.color}
                    style={{ backgroundColor: "#FF25C2" }}
                  ></span>
                </label>
                <label>
                  <input
                    className={`${styles.radio} ${styles.visually_hidden}`}
                    {...register("color")}
                    type="radio"
                    value="#24DFFE"
                  />
                  <span
                    className={styles.color}
                    style={{ backgroundColor: "#24DFFE" }}
                  ></span>
                </label>
                <label>
                  <input
                    className={`${styles.radio} ${styles.visually_hidden}`}
                    {...register("color")}
                    type="radio"
                    value="#FF253F"
                  />
                  <span
                    className={styles.color}
                    style={{ backgroundColor: "#FF253F" }}
                  ></span>
                </label>
                <label>
                  <input
                    className={`${styles.radio} ${styles.visually_hidden}`}
                    {...register("color")}
                    type="radio"
                    value="#2BF06C"
                  />
                  <span
                    className={styles.color}
                    style={{ backgroundColor: "#2BF06C" }}
                  ></span>
                </label>
                <label>
                  <input
                    className={`${styles.radio} ${styles.visually_hidden}`}
                    {...register("color")}
                    type="radio"
                    value="#F4FF26"
                  />
                  <span
                    className={styles.color}
                    style={{ backgroundColor: "#F4FF26" }}
                  ></span>
                </label>
              </div>
            </div>
            {showCurrencyBlock && (
              <CurrencyBlock
                onSubmit={handleCurrency}
                register={register}
                onClose={() => setShowCurrencyBlock(false)}
              />
            )}
            {showIconsBlock && (
              <IconsBlock
                icons={icons}
                onSubmit={handleIcon}
                register={register}
                onClose={() => setShowIconsBlock(false)}
              />
            )}

            <div className={`${styles.form_item} ${styles.form_item__total}`}>
              <div className={styles.subtitle}>Consider in total balance</div>
              <label>
                <input
                  className={`${styles.checkbox} ${styles.visually_hidden}`}
                  type="checkbox"
                  placeholder="total"
                  {...register("total", {})}
                />
                <span className={styles.switch}></span>
              </label>
            </div>
          </div>
          <div className={styles.btn_wrapper}>
            <Button
              innerText={method === "UPDATE" ? "Update" : "Create"}
              type="submit"
              padding="13px 35px"
            ></Button>
          </div>
        </form>
      </div>
    </ModalWindow>
  );
};

export default AddCardModal;
