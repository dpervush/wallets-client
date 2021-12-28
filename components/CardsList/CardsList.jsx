import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SwipeableList } from "@sandstreamdev/react-swipeable-list";

import Card from "./Card/Card";
import AddCardModal from "../AddCardModal/AddCardModal";
import Button from "../UI/Button/Button";
import { PlusIcon, ExpandIcon } from "../icons";
import { getCards } from "../../store/slices/cards";

import styles from "./CardsList.module.scss";
import { getStatsByCard } from "../../store/slices/stats";
import { bodyWidth } from "../../utils";

const CardsList = () => {
  const ref = React.useRef();

  const dispatch = useDispatch();
  const {
    cards: { cards, loading }
  } = useSelector((state) => ({
    cards: state.cards
  }));

  const [showModal, setShowModal] = React.useState(false);
  const [activeCard, setActiveCard] = React.useState(-1);
  const [orederedCards, setOrderedCards] = React.useState(null);

  React.useEffect(() => {
    dispatch(getCards());
  }, []);

  React.useEffect(() => {
    setOrderedCards(cards);
  }, [cards]);

  const onCardClickHandle = (event, index) => {
    if (index === activeCard) {
      // setActiveCard(-1);
    } else {
      // setActiveCard(index);
    }
  };

  const onSlideCard = (direction) => {
    if (direction === "left") {
      setOrderedCards([...orederedCards.slice(1), orederedCards[0]]);
    } else {
      setOrderedCards([
        orederedCards[orederedCards.length - 1],
        ...orederedCards.slice(0, -1)
      ]);
    }
  };

  return (
    <div ref={ref}>
      <SwipeableList>
        <ul className={styles.card_list}>
          {orederedCards?.map((item, index) => (
            <>
              <div
                className={styles.card_wrapper}
                key={item.id}
                style={
                  bodyWidth <= 710
                    ? {
                        top: 40 - 20 * index + "px",
                        transform:
                          index < 3
                            ? `translateX(-50%) scale(${1 - index * 0.1})`
                            : `translateX(-50%) scale(0)`,
                        zIndex: cards.length - index
                      }
                    : null
                }
              >
                <Card
                  {...item}
                  onClick={(event) => onCardClickHandle(event, index)}
                  // isActive={activeCard === index}
                  isActive={true}
                  onSlideCard={onSlideCard}
                />
              </div>
            </>
          ))}
        </ul>
      </SwipeableList>

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
