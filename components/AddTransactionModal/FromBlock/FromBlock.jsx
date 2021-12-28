import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import Image from "next/image";
import icon from "../../../public/assets/icons/shopping.svg";

import { formatCurrency } from "../../../utils";

import styles from "../AddTransactionModal.module.scss";
import CategoriesIcons from "../../icons/categoriesIcons/CategoriesIcons";

const FromBlock = ({ items, register, fieldName, onAddCardHandle }) => {
  return (
    <div className={styles.from_block}>
      {items && (
        <Swiper
          modules={[Pagination]}
          slidesPerView={4}
          navigation={true}
          freeMode={true}
          pagination={{
            type: "bullets",
            clickable: true
          }}
        >
          <SwiperSlide>
            <div className={styles.add_btn}>
              <button
                className={styles.btn}
                onClick={onAddCardHandle}
                type="button"
              >
                <span>account</span>
              </button>
            </div>
          </SwiperSlide>
          {items.map(({ id, name, balance, currency, icon, sum }) => (
            <SwiperSlide key={id}>
              <div className={styles.from_item}>
                <label className={styles.label}>
                  <input
                    className={`${styles.radio} ${styles.visually_hidden}`}
                    {...register(fieldName, { required: true })}
                    type="radio"
                    value={id}
                  />
                  <span className={styles.text}>{name}</span>
                  <span className={styles.icon}>
                    <CategoriesIcons name={icon} color="#fff" size="16" />
                  </span>
                  <span className={styles.balance}>
                    {sum && formatCurrency(+sum).slice(0, -3)}
                    {balance && formatCurrency(balance, currency).slice(0, -3)}
                  </span>
                </label>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default FromBlock;
