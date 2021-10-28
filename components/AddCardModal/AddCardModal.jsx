import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import ModalWindow from "../../containers/ModalWindow/ModalWindow";
import { createCard, updateCard } from "../../store/slices/cards";
import Button from "../UI/Button/Button";

import styles from "./AddCardModal.module.scss";
import { CurrencyBlock } from "./CurrencyBlock/CurrencyBlock";

const AddCardModal = ({ onClose, method, initValues }) => {
  const dispatch = useDispatch();

  const [activeCurrency, setActiveCurrency] = React.useState(
    initValues?.currency || "RUB"
  );
  const [showCurrencyBlock, setShowCurrencyBlock] = React.useState(false);

  const { register, handleSubmit, reset, getValues } = useForm({
    defaultValues: initValues || {
      total: true,
      color: "#8A16FF",
      currency: activeCurrency,
    },
  });

  const handleCurrency = () => {
    setActiveCurrency(getValues("currency"));
    setShowCurrencyBlock(false);
  };

  const onSubmit = (data) => {
    method === "UPDATE"
      ? dispatch(updateCard({ ...data, id: initValues.id }))
      : dispatch(createCard({ ...data }));
    reset();
    onClose();
  };

  return (
    <ModalWindow onClose={onClose}>
      <div className={styles.body}>
        <div className={styles.title}>Add new card</div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={`${styles.form_item} ${styles.form_item__input}`}>
            <input
              className={styles.input}
              type="text"
              placeholder="Название или номер карты"
              {...register("name", { maxLength: 80 })}
            />
            {/* <div className={styles.icon}></div> */}
          </div>
          <div className={`${styles.form_item} ${styles.form_item__input}`}>
            <div
              className={styles.icon}
              style={{
                backgroundImage: `url(/assets/icons/${activeCurrency.toLowerCase()}-icon.svg)`,
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
