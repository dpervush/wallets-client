import React from "react";

export function useLastMonthCategories(categories) {
  const [categoriesBalance, setCategoriesBalance] = React.useState(null);

  React.useEffect(() => {
    const todayMonth = new Date().getMonth() + 1;
    const todayYear = new Date().getFullYear();

    categories && categories.length > 0 && categories[0].year
      ? setCategoriesBalance(
          categories.filter(
            (item) => +item.year === todayYear && +item.month === todayMonth
          )
        )
      : setCategoriesBalance(categories);
  }, [categories]);

  return { categoriesBalance };
}
