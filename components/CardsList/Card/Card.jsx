import React from "react";
import { useDispatch } from "react-redux";
import classNames from "classnames/bind";
import styled from "styled-components";

import AddCardModal from "../../AddCardModal/AddCardModal";
import { deleteCard } from "../../../store/slices/cards";
import { formatCurrency } from "../../../utils/formatCurrency";

import styles from "./Card.module.scss";

const cx = classNames.bind(styles);

const Wrapper = styled.li`
  background-color: ${(props) => props.color};
`;

const Card = ({
  balance,
  currency,
  name,
  number,
  color,
  total,
  onClick,
  isActive,
  id,
}) => {
  const dispatch = useDispatch();

  const [showActions, setShowActions] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);

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

  return (
    <Wrapper
      color={color}
      onClick={onClick}
      className={cx({ card: true, active: true })}
    >
      <div className={styles.more} onClick={() => setShowActions(!showActions)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      {showActions && (
        <div className={styles.actions}>
          <button className={styles.btn} onClick={onUpdateClickHandler}>
            Update
          </button>
          <button className={styles.btn} onClick={onDeleteClickHandler}>
            Delete
          </button>
        </div>
      )}
      <div className={styles.system}></div>
      <div className={styles.balance}>{formatCurrency(balance, currency)}</div>
      <div className={styles.title}>{name ?? formatNumber(number)}</div>
      {showModal && (
        <AddCardModal
          onClose={() => setShowModal(false)}
          initValues={{ id, balance, currency, name, number, color, total }}
          method="UPDATE"
        />
      )}
    </Wrapper>
  );
};

export default Card;
