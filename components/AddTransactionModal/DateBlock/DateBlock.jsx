import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Virtual } from "swiper";

import icon from "../../../public/assets/icons/calendar.svg";
import { CustomCalendar } from "./Calendar/CustomCalendar";

import { monthNamesShort, weekDayNames } from "../../../utils/constants";

import styles from "../AddTransactionModal.module.scss";

const Day = ({ date, register, checked }) => {
  return (
    <div className={styles.date_item}>
      <label className={styles.label}>
        <input
          className={`${styles.radio} ${styles.visually_hidden}`}
          {...register("date", { required: true })}
          type="radio"
          value={date.toISOString()}
          checked={checked}
        />
        <div className={styles.date_day}>
          <span className={styles.number}>{date.getDate()}</span>
          <span className={styles.day}>
            {monthNamesShort[date.getMonth()]}, {weekDayNames[date.getDay()]}
          </span>
        </div>
      </label>
    </div>
  );
};

const SWIPER_SLIDES_COUNT = 7;

const formDates = (date = new Date()) => {
  const dates = Array.from({ length: SWIPER_SLIDES_COUNT }).map((_, index) => {
    const d = new Date(date);

    return new Date(d.setDate(d.getDate() - index));
  });

  return dates;
};

const DateBlock = ({ initialDate = new Date(), register, onSelectDate }) => {
  const [showCalendar, setShowCalendar] = React.useState(false);
  const [swiperRef, setSwiperRef] = React.useState(null);
  const [date, setDate] = React.useState(initialDate);
  const [calendarDate, setCalendarDate] = React.useState(new Date());

  const [dates, setDates] = React.useState([]);

  const openCalendar = () => setShowCalendar(true);
  const closeCalendar = () => setShowCalendar(false);

  React.useEffect(() => {
    setDates([...formDates(date)]);
  }, []);

  const onDateChange = (newDate) => {
    setDate(newDate);
    setCalendarDate(newDate);

    setDates(formDates(newDate));
  };

  const onDateSlideChange = (event) => {
    const d = new Date(date);

    setDate(
      new Date(
        d.setDate(d.getDate() - (event.activeIndex - event.previousIndex))
      )
    );
  };

  React.useEffect(() => {
    swiperRef && swiperRef.slideTo(0);
  }, [swiperRef, calendarDate]);

  React.useEffect(() => {
    onSelectDate(date);
  }, [onSelectDate, date]);

  return (
    <>
      <div className={styles.subtitle}>Date</div>
      <div className={styles.date_block}>
        <div className={`${styles.date_item} ${styles.date_item__calendar}`}>
          <button
            className={styles.calendar_btn}
            onClick={openCalendar}
            type="button"
          >
            <Image src={icon} alt="icon" />
          </button>
        </div>

        <Swiper
          modules={[Virtual]}
          onSwiper={setSwiperRef}
          dir="rtl"
          slidesPerView={4}
          pagination={{
            type: "fraction"
          }}
          spaceBetween={13}
          navigation={true}
          freeMode={true}
          className={styles.swiper}
          onSlideChange={onDateSlideChange}
        >
          {dates.map((date, index) => (
            <SwiperSlide key={date} onClick={() => swiperRef.slideTo(index)}>
              {({ isActive }) => (
                <Day register={register} date={date} checked={isActive} />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {showCalendar && (
        <CustomCalendar
          onClose={closeCalendar}
          show={showCalendar}
          onDateChange={onDateChange}
        />
      )}
    </>
  );
};

export default DateBlock;
