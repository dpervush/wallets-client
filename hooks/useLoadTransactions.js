import React from "react";
import { useSelector } from "react-redux";
import $api from "../http";

import { TRANSACTIONS_PER_PAGE } from "../utils/constants";

export const useLoadTransactions = (filters, page) => {
  const { transactions: stateTransactions } = useSelector(
    (state) => state.transactions
  );

  const [hasMore, setHasMore] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [transactions, setTransactions] = React.useState([]);

  const getFlowFilter = () => {
    let flowFilter;

    if (filters.flow === 0 || !filters.flow) {
      flowFilter = null;
    } else {
      flowFilter = filters.flow === 1 ? "income" : "expense";
    }

    return flowFilter;
  };

  React.useEffect(() => {
    setTransactions([]);
  }, [filters]);

  React.useEffect(() => {
    setTransactions(stateTransactions);
  }, [stateTransactions]);

  React.useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      await $api
        .get("/transactions/", {
          params: {
            card: filters.card === 0 ? null : filters.card,
            category: filters.category === 0 ? null : filters.category,
            flow: getFlowFilter(),
            page,
            size: TRANSACTIONS_PER_PAGE
          }
        })
        .then((res) => {
          setHasMore(res.data.count > res.data.rows.length);

          setTransactions({
            count: res.data.count,
            items: [
              ...res.data.rows.map((item) => ({
                id: item.id,
                ...item.transaction_info,
                card: {
                  id: item.account_card.id,
                  ...item.account_card.card_info
                },
                category: {
                  id: item.account_category.id,
                  ...item.account_category.category_info
                }
              }))
            ]
          });
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    };

    fetchTransactions();
  }, [page, filters]);

  return { transactions: transactions.items, hasMore, loading };
};
