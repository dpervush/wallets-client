import React from "react";
import { useDispatch, useSelector } from "react-redux";
import $api from "../http";
import Loader from "react-loader-spinner";

import Layout from "../containers/layout/Layout";
import TransactionBlock from "../components/TransactionBlock/TransactionBlock";
import AddTransactionModal from "../components/AddTransactionModal/AddTransactionModal";
import Button from "../components/UI/Button/Button";
import Dropdown from "../components/UI/Dropdown/Dropdown";
import { PlusIcon } from "../components/icons";

import { getCategories } from "../store/slices/categories";
import { getValueFromCookie } from "../utils/getValueFromCookie";
import { useLoadTransactions } from "../hooks/useLoadTransactions";

import styles from "../styles/Transactions.module.scss";
import { getStatsByCategory } from "../store/slices/stats";
import { useLastMonthCategories } from "../hooks/useLastMonthCategories";
import axios from "axios";

const dropdownFlow = [
  {
    id: 0,
    title: "All",
    as: "Flow",
    selected: false,
    key: "flow"
  },
  {
    id: 1,
    title: "Income",
    selected: false,
    key: "flow"
  },
  {
    id: 2,
    title: "Expense",
    selected: false,
    key: "flow"
  }
];
const Transactions = ({ user }) => {
  const dispatch = useDispatch();
  const {
    categories: { categories, categoriesIncome },
    cards: { cards }
  } = useSelector((state) => state);

  const { statsByCategoryExpense, statsByCategoryIncome } = useSelector(
    ({ stats }) => stats
  );

  const { categoriesBalance: categoriesBalanceExpense } =
    useLastMonthCategories(
      statsByCategoryExpense?.length > 0 ? statsByCategoryExpense : categories
    );

  const { categoriesBalance: categoriesBalanceIncome } = useLastMonthCategories(
    statsByCategoryIncome?.length > 0 ? statsByCategoryIncome : categoriesIncome
  );

  const [showModal, setShowModal] = React.useState(false);
  const [activePage, setActivePage] = React.useState(1);
  const [dropdownState, setDropdownState] = React.useState({
    flow: dropdownFlow
  });
  const [filters, setFilteres] = React.useState({
    card: null,
    category: null,
    flow: null
  });

  const { transactions, hasMore, loading } = useLoadTransactions(
    filters,
    activePage
  );

  const observer = React.useRef();
  const lastTransactionRef = React.useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setActivePage((prevActivePage) => prevActivePage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  React.useEffect(() => {
    dispatch(getStatsByCategory());
    dispatch(getCategories());
  }, []);

  React.useEffect(() => {
    const dropdownCards = cards.map((card) => ({
      id: card.id,
      title: card.name || card.number,
      selected: false,
      key: "cards"
    }));

    const dropdownCategories = categories.map((category) => ({
      id: category.id,
      title: category.title,
      selected: false,
      key: "categories"
    }));

    setDropdownState({
      ...dropdownState,
      cards: [
        {
          id: 0,
          title: "All",
          as: "Card",
          selected: false,
          key: "card"
        },
        ...dropdownCards
      ],
      categories: [
        {
          id: 0,
          title: "All",
          as: "Category",
          selected: false,
          key: "category"
        },
        ...dropdownCategories
      ]
    });
  }, [cards, categories]);

  const filteredTransactions = transactions?.reduce((obj, current, index) => {
    const year = new Date(current.date).getFullYear();
    const month = new Date(current.date).getMonth();

    if (!Object.prototype.hasOwnProperty.call(obj, year)) {
      obj[year] = {};
    }
    if (!Object.prototype.hasOwnProperty.call(obj[year], month)) {
      obj[year][month] = [];
    }

    if (index === transactions.length - 1) {
      obj[year][month].push({ ...current, last: true });
    } else {
      obj[year][month].push(current);
    }

    return obj;
  }, {});

  const resetThenSet = (id, items) => {
    const temp = [...items];

    let currentFilter;
    temp.forEach((item) => {
      if (item.id === id) {
        currentFilter = id;
        return (item.selected = true);
      } else {
        return (item.selected = false);
      }
    });

    setDropdownState({ ...dropdownState, [temp[0].key]: [...temp] });
    setFilteres({ ...filters, [temp[0].key]: currentFilter });
  };

  React.useEffect(() => {
    setActivePage(1);
  }, [filters]);

  return (
    <Layout>
      {showModal && (
        <AddTransactionModal
          onClose={() => setShowModal(false)}
          categoriesExpense={categoriesBalanceExpense}
          categoriesIncome={categoriesBalanceIncome}
        />
      )}
      <div className={styles.content}>
        <div className={styles.filters}>
          <div className={styles.filter}>
            {categories && (
              <Dropdown
                title="Category"
                list={dropdownState.categories}
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
              list={dropdownState.cards}
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
          {filteredTransactions && (
            <TransactionBlock
              items={filteredTransactions}
              lastTransactionRef={lastTransactionRef}
              categoriesExpense={categoriesBalanceExpense}
              categoriesIncome={categoriesBalanceIncome}
            />
          )}
        </div>
        {!loading &&
          filteredTransactions &&
          Object.keys(filteredTransactions).length == 0 && (
            <div className={styles.no_data}>No transactions here yet :(</div>
          )}
        {loading && (
          <div className={styles.loader}>
            <Loader type="Oval" color="#24dffe" height={60} width={60} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Transactions;

export const getServerSideProps = async (context) => {
  let isAuth = false;
  let user = {};

  const cookie = getValueFromCookie("refreshToken", context.req.headers.cookie);

  const $api = axios.create({
    withCredentials: true,
    baseURL: "http://server:8080/api"
  });

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
        destination: "/login"
      }
    };
  }

  return { props: { user } };
};
