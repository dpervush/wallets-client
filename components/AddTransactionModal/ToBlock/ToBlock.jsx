import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import Image from "next/image";
import icon from "../../../public/assets/icons/shopping.svg";

import styles from "../AddTransactionModal.module.scss";
import { formatCurrency } from "../../../utils";
import CategoriesIcons from "../../icons/categoriesIcons/CategoriesIcons";

const ToBlock = ({ items, register, fieldName, onAddCategoryHandle }) => {
  const groupedItems = [{}, ...items].reduce((res, current, index) => {
    const group = Math.floor(index / 8);

    if (!res[group]) {
      res[group] = [];
    }

    res[group].push(current);

    return res;
  }, []);

  return (
    <div className={styles.to_block}>
      {items && (
        <Swiper
          modules={[Pagination]}
          slidesPerView={1}
          navigation={true}
          pagination={{
            type: "bullets",
            clickable: true
          }}
        >
          {groupedItems.map((items, index) => (
            <SwiperSlide key={index}>
              <div className={styles.categories_wrapper}>
                {items.map(({ id, title, budget, sum }, itemIndex) =>
                  itemIndex === 0 && index === 0 ? (
                    <div className={styles.add_btn}>
                      <button
                        className={styles.btn}
                        onClick={onAddCategoryHandle}
                        type="button"
                      >
                        <span>category</span>
                      </button>
                    </div>
                  ) : (
                    <div className={styles.from_item} key={id}>
                      <label className={styles.label}>
                        <input
                          className={`${styles.radio} ${styles.visually_hidden}`}
                          {...register(fieldName, { required: true })}
                          type="radio"
                          value={id}
                        />
                        <span className={styles.text}>{title}</span>
                        <span className={styles.icon}>
                          <CategoriesIcons
                            name="airplane"
                            color="#fff"
                            size="16"
                          />
                        </span>
                        <span className={styles.balance}>
                          {sum
                            ? formatCurrency(+sum).slice(0, -3)
                            : formatCurrency(0).slice(0, -3)}
                        </span>
                        {budget && (
                          <span className={styles.budget}>
                            {formatCurrency(+budget).slice(0, -3)}
                          </span>
                        )}
                      </label>
                    </div>
                  )
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default ToBlock;
