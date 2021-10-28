import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "./Card/Card";
import AddCardModal from "../AddCardModal/AddCardModal";
import Button from "../UI/Button/Button";
import { PlusIcon, ExpandIcon } from "../icons";
import { getCards } from "../../store/slices/cards";

import styles from "./CardsList.module.scss";

const CardsList = () => {
  const ref = React.useRef();

  const dispatch = useDispatch();
  const { cards } = useSelector(({ cards }) => cards);

  const [showModal, setShowModal] = React.useState(false);

  React.useEffect(() => {
    dispatch(getCards());
  }, []);

  return (
    <div className={styles.card_list} ref={ref}>
      <ul>
        {cards.map((item, index) => {
          return (
            <Card
              key={item.id}
              {...item}
              // onClick={() => onCardClickHandle(index)}
              // isActive={activeCard === index}
            />
          );
        })}
      </ul>

      <div className={styles.btn_wrapper}>
        <Button
          innerText="New card"
          padding="18px 17px"
          onClick={() => setShowModal(true)}
        >
          <PlusIcon />
        </Button>
        <Button padding="15px 16px">
          <ExpandIcon />
        </Button>
      </div>
      {showModal && (
        <AddCardModal onClose={() => setShowModal(false)} show={showModal} />
      )}
    </div>
  );
};

export default CardsList;
