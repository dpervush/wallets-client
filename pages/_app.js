import React from "react";
import { Provider } from "react-redux";
import { store } from "../store";

import "swiper/css";
import "swiper/css/pagination";
import "@sandstreamdev/react-swipeable-list/dist/styles.css";

import "../styles/globals.scss";
import "../styles/fonts.scss";
import "../styles/null.scss";
import "../styles/Calendar.scss";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
