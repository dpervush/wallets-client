import React from "react";
import Calendar from "react-calendar";

import ModalWindow from "../../../../containers/ModalWindow/ModalWindow";

import styles from "./CustomCalendar.module.scss";

export const CustomCalendar = ({ onDateChange, onClose }) => {
  const [date, setDate] = React.useState(new Date());

  const onChange = (e) => {
    onDateChange(e);
    setDate(e);
    onClose();
  };

  return (
    <ModalWindow onClose={onClose}>
      <div className={styles.body}>
        <Calendar onChange={onChange} value={date} maxDate={new Date()} />
      </div>
    </ModalWindow>
  );
};
