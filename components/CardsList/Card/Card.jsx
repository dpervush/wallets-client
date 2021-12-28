import React from "react";
import { useDispatch } from "react-redux";
import classNames from "classnames/bind";
import styled from "styled-components";
import { SwipeableListItem } from "@sandstreamdev/react-swipeable-list";

import AddCardModal from "../../AddCardModal/AddCardModal";
import { deleteCard } from "../../../store/slices/cards";
import { bodyWidth, formatCurrency, isTouchDevice } from "../../../utils";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";

import styles from "./Card.module.scss";
import { DeleteConfirmModal } from "../../../containers/DeleteConfirmModal/DeleteConfirmModal";

const cx = classNames.bind(styles);

const Wrapper = styled.div`
  background-color: ${(props) => props.color};
`;

const SwipeableWrapper = ({ children, onSlideCard }) => {
  if (isTouchDevice || bodyWidth < 710) {
    return (
      <SwipeableListItem
        threshold={0.12}
        swipeLeft={{
          action: () => onSlideCard("left")
        }}
        swipeRight={{
          action: () => onSlideCard("rigth")
        }}
      >
        {children}
      </SwipeableListItem>
    );
  } else {
    return <div>{children}</div>;
  }
};

const Card = ({
  onSlideCard,
  balance,
  currency,
  name,
  number,
  color,
  total,
  onClick,
  isActive,
  icon,
  id
}) => {
  const dispatch = useDispatch();

  const [showActions, setShowActions] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);

  const formatNumber = (number) => {
    const formattedNumber =
      number.slice(0, 14).replace("[0-9]*/g", "*") + " " + number.slice(15, 19);
    return formattedNumber;
  };

  const onUpdateClickHandler = () => {
    setShowModal(true);
  };
  const onDeleteClickHandler = () => dispatch(deleteCard(id));

  React.useEffect(() => {
    !isActive && setShowActions(false);
  }, [isActive]);

  const ref = React.useRef();

  useOnClickOutside(ref, () => setShowActions(false));

  const openModal = () => {
    setShowDeleteModal(true);
  };
  const closeModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <SwipeableWrapper onSlideCard={onSlideCard}>
      <li className={styles.card_wrapper}>
        <Wrapper
          color={color}
          onClick={onClick}
          className={cx({ card: true, active: isActive })}
        >
          <div className={styles.card_inner}>
            <div className={styles.actions_wrapper} ref={ref}>
              <div
                className={styles.more}
                onClick={() => setShowActions(!showActions)}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>
              {showActions && (
                <div className={styles.actions}>
                  <button className={styles.btn} onClick={onUpdateClickHandler}>
                    Update
                  </button>
                  <button className={styles.btn} onClick={openModal}>
                    Delete
                  </button>
                </div>
              )}
            </div>
            <div className={styles.system}></div>
            <div className={styles.balance}>
              {formatCurrency(balance, currency)}
            </div>
            <div className={styles.title}>{formatNumber(name) ?? name}</div>
            {showModal && (
              <AddCardModal
                onClose={() => setShowModal(false)}
                initValues={{
                  id,
                  balance,
                  currency,
                  name,
                  number,
                  color,
                  total,
                  icon
                }}
                method="UPDATE"
              />
            )}
          </div>
        </Wrapper>
      </li>

      {showDeleteModal && (
        <DeleteConfirmModal
          title={"Delete card?"}
          onClose={closeModal}
          onSubmit={onDeleteClickHandler}
        />
      )}
    </SwipeableWrapper>
  );
};

export default Card;
