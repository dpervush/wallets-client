import { monthNamesShort } from "./constants";

export const formatDate = (date) =>
  `${new Date(date).getDate()} ${
    monthNamesShort[new Date(date).getMonth()]
  } ${new Date(date).getFullYear()}`;

export function formatCurrency(
  number,
  currency = "RUB",
  currencyDisplay = "code"
) {
  if (currency === "USD") {
    return number.toLocaleString("en-IN", {
      style: "currency",
      currency
    });
  } else if (currency === "RUB") {
    return number.toLocaleString("ru-RU", {
      style: "currency",
      currency: "RUB",
      currencyDisplay
    });
  } else if (currency === "EUR") {
    return number.toLocaleString("de-DE", {
      style: "currency",
      currency
    });
  }
}

export let isTouchDevice;
export let bodyWidth;
if (process.browser) {
  isTouchDevice = "ontouchstart" in document.documentElement;
  bodyWidth = window.innerWidth;
}
