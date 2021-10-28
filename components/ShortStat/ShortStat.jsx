import React from "react";
import Dropdown from "../UI/Dropdown/Dropdown";
import PostItem from "./PostItem/PostItem";

import styles from "./ShortStat.module.scss";

const state = {
  periods: [
    {
      id: 0,
      title: "Week",
      selected: true,
      key: "periods",
    },
    {
      id: 1,
      title: "Month",
      selected: false,
      key: "periods",
    },
    {
      id: 1,
      title: "Year",
      selected: false,
      key: "periods",
    },
  ],
};

const ShortStat = () => {
  const [dropdownState, setDropdownState] = React.useState(state);
  const resetThenSet = (id, key) => {
    const temp = [...dropdownState[key]];

    temp.forEach((item) => (item.selected = false));
    temp[id].selected = true;

    setDropdownState({ ...dropdownState, [key]: temp });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.title}>Short Statistics</div>
        <Dropdown
          title="Week"
          list={dropdownState.periods}
          resetThenSet={resetThenSet}
        />
      </div>
      <div className={styles.posts}>
        <PostItem percentTop={70} percentBottom={20} />
        <PostItem percentTop={70} percentBottom={20} />
        <PostItem percentTop={70} percentBottom={20} />
        <PostItem percentTop={70} percentBottom={20} />
        <PostItem percentTop={70} percentBottom={20} />
        <PostItem percentTop={70} percentBottom={20} />
        <PostItem percentTop={70} percentBottom={20} />
      </div>
    </div>
  );
};

export default ShortStat;
