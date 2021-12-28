import React from "react";
import dynamic from "next/dynamic";
import Loader from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";

import AddTransactionModal from "../AddTransactionModal/AddTransactionModal";
import Button from "../UI/Button/Button";
import { CoinsIcon, PlayIcon, PlusIcon, SettingsIcon } from "../icons";

import { getStatsByCard, getStatsByCategory } from "../../store/slices/stats";

import styles from "./RoundStat.module.scss";
import { useLastMonthCategories } from "../../hooks/useLastMonthCategories";

const StatConva = dynamic(() => import("./StatConva"), {
  ssr: false
});

const calcRotationAndAngle = (cards, allMoney) => {
  const array = [...cards];

  for (let i = 0; i < array.length; i++) {
    if (i === 0) {
      array[i].rotation = 0;
      array[i].angle = (array[i].balance / allMoney) * 360;
    } else {
      array[i].rotation = array[i - 1].angle + array[i - 1].rotation;
      array[i].angle = (array[i].balance / allMoney) * 360;
    }
  }

  return array;
};

export const RoundStat = () => {
  const dispatch = useDispatch();
  const {
    stats: {
      statsByCard,
      cardStatLoading,
      statsByCategoryExpense,
      statsByCategoryIncome
    },
    categories: { categories, categoriesIncome }
  } = useSelector((store) => store);

  const { categoriesBalance: categoriesBalanceExpense } =
    useLastMonthCategories(
      statsByCategoryExpense?.length > 0 ? statsByCategoryExpense : categories
    );

  const { categoriesBalance: categoriesBalanceIncome } = useLastMonthCategories(
    statsByCategoryIncome?.length > 0 ? statsByCategoryIncome : categoriesIncome
  );

  const [allAmount, setAllAmount] = React.useState(null);
  const [allAmountConsidered, setAllAmountConsidered] = React.useState(null);
  const [cardsWithAngles, setCardsWithAngles] = React.useState(null);

  const [showModal, setShowModal] = React.useState(false);

  const toggleNewTransactionModal = () => {
    setShowModal(!showModal);
  };

  React.useEffect(() => {
    dispatch(getStatsByCategory());
    dispatch(getStatsByCard());
  }, []);

  React.useEffect(() => {
    const allMoney = statsByCard.reduce((sum, current) => {
      return sum + current.balance;
    }, 0);

    setAllAmount(allMoney);

    const allMoneyConsidered = statsByCard.reduce((sum, current) => {
      return current.total ? sum + current.balance : sum;
    }, 0);

    let cardsConsidered = statsByCard
      .filter((card) => card.total)
      .map((item) => ({ ...item, rotation: 0, angle: 0 }));

    cardsConsidered = calcRotationAndAngle(cardsConsidered, allMoneyConsidered);

    setAllAmountConsidered(allMoneyConsidered);
    setCardsWithAngles(cardsConsidered);
  }, [statsByCard]);

  return (
    <div className={styles.wrapper}>
      {/* <div className={styles.settings}>
        <Button padding="12px">
          <SettingsIcon />
        </Button>
      </div> */}
      <div className={styles.add_transaction}>
        <Button padding="12px" onClick={toggleNewTransactionModal}>
          <PlusIcon />
        </Button>
      </div>
      <div className={styles.canvas}>
        {cardStatLoading && (
          <div className={styles.loader}>
            <Loader type="Oval" color="#24dffe" height={60} width={60} />
          </div>
        )}
        {!cardStatLoading && (
          <StatConva
            allAmount={allAmount}
            allAmountConsidered={allAmountConsidered}
            cardsWithAngles={cardsWithAngles}
          />
        )}
      </div>
      {/* <div className={styles.goals}>
        <div className={styles.coins}>
          <CoinsIcon />
        </div>
        <div className={styles.text}>Set new financial goals for 2021</div>
        <button className={styles.btn}>
          <PlayIcon />
        </button>
      </div> */}

      {showModal && (
        <AddTransactionModal
          onClose={toggleNewTransactionModal}
          categoriesExpense={categoriesBalanceExpense}
          categoriesIncome={categoriesBalanceIncome}
        />
      )}
    </div>
  );
};
