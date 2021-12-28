import React from "react";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";

import styles from "./Dropdown.module.scss";

const Dropdown = ({ title, list, resetThenSet }) => {
  const ref = React.useRef();

  const [isListOpen, setIsListOpen] = React.useState(false);
  const [headerTitle, setHeaderTitle] = React.useState(title);

  useOnClickOutside(ref, () => setIsListOpen(false));

  const toggleList = () => {
    setIsListOpen(!isListOpen);
  };

  const selectItem = (item) => {
    const { title, id, key, as } = item;

    setIsListOpen(false);
    setHeaderTitle(as || title);
    resetThenSet(id, list);
  };

  return (
    <div className={styles.wrapper} ref={ref}>
      <button type="button" className={styles.header} onClick={toggleList}>
        <span className={styles.header_title}>{headerTitle}</span>
      </button>
      {isListOpen && (
        <div className={styles.list}>
          {list.map((item) => (
            <button
              type="button"
              className={styles.list_item}
              key={item.id}
              onClick={() => selectItem(item)}
            >
              {item.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
