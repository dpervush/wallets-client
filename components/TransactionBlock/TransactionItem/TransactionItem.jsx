import React from "react";
import { useDispatch } from "react-redux";
import { SwipeableListItem } from "@sandstreamdev/react-swipeable-list";

import { deleteTransaction } from "../../../store/slices/transactions";
import {
  bodyWidth,
  formatCurrency,
  formatDate,
  isTouchDevice
} from "../../../utils";
import { DeleteIcon, EditIcon } from "../../icons";
import AddTransactionModal from "../../AddTransactionModal/AddTransactionModal";

import styles from "./TransactionItem.module.scss";
import { DeleteConfirmModal } from "../../../containers/DeleteConfirmModal/DeleteConfirmModal";

const Wrapper = ({
  children,
  openModal,
  setShowEditModal,
  setShowDeleteModal
}) => {
  if (isTouchDevice || bodyWidth < 710) {
    return (
      <SwipeableListItem
        threshold={0.12}
        swipeLeft={{
          content: (
            <div className={styles.edit}>
              <EditIcon />
            </div>
          ),
          action: () => openModal(setShowEditModal)
        }}
        swipeRight={{
          content: (
            <div className={styles.delete}>
              <DeleteIcon />
            </div>
          ),
          action: () => openModal(setShowDeleteModal)
        }}
      >
        {children}
      </SwipeableListItem>
    );
  } else {
    return <div>{children}</div>;
  }
};

const TransactionItem = ({
  categoriesExpense,
  categoriesIncome,
  id,
  title,
  date,
  category,
  card,
  amount,
  type,
  comment,
  last,
  lastTransactionRef
}) => {
  const dispatch = useDispatch();

  const onDeleteHandle = () => dispatch(deleteTransaction(id));

  const [showEditModal, setShowEditModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);

  const openModal = (cb) => {
    cb(true);
  };
  const closeModal = (cb) => {
    cb(false);
  };

  return (
    <div className={styles.row_wrapper}>
      <Wrapper
        openModal={openModal}
        setShowEditModal={setShowEditModal}
        setShowDeleteModal={setShowDeleteModal}
      >
        <div className={styles.row} ref={last && lastTransactionRef}>
          <div className={styles.name}>{title}</div>
          <div className={styles.date}>{formatDate(date)}</div>
          <div className={styles.gap}></div>
          <div className={styles.category}>
            <span>{category.title}</span>
          </div>
          <div className={styles.card}>
            <span style={{ backgroundColor: card.color }}></span>
          </div>
          <div className={styles.amount}>
            <span className={styles.text}>
              {type === "income"
                ? formatCurrency(amount, card.currency)
                : "-" + formatCurrency(amount, card.currency)}
            </span>
            <button
              className={styles.edit}
              onClick={() => openModal(setShowEditModal)}
            >
              <EditIcon />
            </button>
            <button
              className={styles.delete}
              onClick={() => openModal(setShowDeleteModal)}
            >
              <DeleteIcon />
            </button>
          </div>
          {showEditModal && (
            <AddTransactionModal
              show={showEditModal}
              onClose={() => closeModal(setShowEditModal)}
              initValues={{ id, amount, card, category, type, comment, date }}
              method="UPDATE"
              categoriesExpense={categoriesExpense}
              categoriesIncome={categoriesIncome}
            />
          )}
          {showDeleteModal && (
            <DeleteConfirmModal
              title={"Delete transaction?"}
              onClose={() => closeModal(setShowDeleteModal)}
              onSubmit={onDeleteHandle}
            />
          )}
        </div>
      </Wrapper>
    </div>
  );
};

export default TransactionItem;
