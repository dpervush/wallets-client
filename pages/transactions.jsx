import React from "react";
import Layout from "../containers/layout/Layout";
import TransactionBlock from "../components/TransactionBlock/TransactionBlock";

import styles from "../styles/Transactions.module.scss";
import Dropdown from "../components/UI/Dropdown/Dropdown";
import Button from "../components/UI/Button/Button";
import { PlusIcon } from "../components/icons";
import AddTransactionModal from "../components/AddTransactionModal/AddTransactionModal";
import { useDispatch, useSelector } from "react-redux";
import { getTransactions } from "../store/slices/transactions";
import $api from "../http";
import { getValueFromCookie } from "../utils/getValueFromCookie";
import { getCategories } from "../store/slices/categories";

const state = {
  flow: [
    {
      id: 0,
      title: "All",
      selected: false,
      key: "flow",
    },
    {
      id: 1,
      title: "Income",
      selected: false,
      key: "flow",
    },
    {
      id: 2,
      title: "Expence",
      selected: false,
      key: "flow",
    },
  ],
};

const Transactions = ({ user }) => {
  const dispatch = useDispatch();
  const {
    transactions: { transactions },
    categories: { categories },
    cards: { cards },
  } = useSelector((state) => state);

  const [dropdownState, setDropdownState] = React.useState(state);

  const [showModal, setShowModal] = React.useState(false);

  React.useEffect(() => {
    dispatch(getTransactions());
    dispatch(getCategories());
  }, []);

  const filteredTransactions = transactions.reduce((obj, current) => {
    const year = new Date(current.date).getFullYear();
    const month = new Date(current.date).getMonth();

    if (!Object.prototype.hasOwnProperty.call(obj, year)) {
      obj[year] = {};
    }
    if (!Object.prototype.hasOwnProperty.call(obj[year], month)) {
      obj[year][month] = [];
    }

    obj[year][month].push(current);

    return obj;
  }, {});

  const resetThenSet = (id, items) => {
    const temp = [...items];

    temp.forEach((item) => (item.selected = false));
    temp[id].selected = true;

    setDropdownState({ ...items, ...temp });
  };

  const dropdownCards = cards.map((card) => ({
    id: card.id,
    title: card.name || card.number,
    selected: false,
    key: "cards",
  }));

  const dropdownCategories = categories.map((category) => ({
    id: category.id,
    title: category.title,
    selected: false,
    key: "categories",
  }));

  return (
    <Layout>
      {showModal && <AddTransactionModal onClose={() => setShowModal(false)} />}
      <div className={styles.content}>
        <div className={styles.filters}>
          <div className={styles.filter}>
            {categories && (
              <Dropdown
                title="Category"
                list={dropdownCategories}
                resetThenSet={resetThenSet}
              />
            )}
          </div>
          <div className={styles.filter}>
            <Dropdown
              title="Flow"
              list={dropdownState.flow}
              resetThenSet={resetThenSet}
            />
          </div>
          <div className={styles.filter}>
            <Dropdown
              title="Card"
              list={dropdownCards}
              resetThenSet={resetThenSet}
            />
          </div>
          <div className={styles.filter}>
            <Button padding="8px" onClick={() => setShowModal(true)}>
              <PlusIcon />
            </Button>
          </div>
        </div>
        <div className={styles.transactions_list}>
          <TransactionBlock items={filteredTransactions} />
        </div>
      </div>
    </Layout>
  );
};

export default Transactions;

export const getServerSideProps = async (context) => {
  let isAuth = false;
  let user = {};

  const cookie = getValueFromCookie("refreshToken", context.req.headers.cookie);

  await $api
    .get("/auth/me", { headers: { Authorization: "Bearer " + cookie } })
    .then((response) => {
      isAuth = true;
      user = response.data.currentUser;
    })
    .catch((err) => {
      console.log(err);
      isAuth = false;
    });

  if (!isAuth) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }

  return { props: { user } };
};
