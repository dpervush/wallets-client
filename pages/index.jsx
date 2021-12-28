import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import Layout from "../containers/layout/Layout";
import ShortStat from "../components/ShortStat/ShortStat";
import { RoundStat } from "../components/RoundStat/RoundStat";
import TransactionsShort from "../components/TransactionsShort/TransactionsShort";

import $api from "../http";
import { getMe } from "../store/slices/auth";
import { getValueFromCookie } from "../utils/getValueFromCookie";

import styles from "../styles/Home.module.scss";
import { getCategories } from "../store/slices/categories";
import axios from "axios";

const BubbleStat = dynamic(
  () => import("../components/BubbleStat/BubbleStat"),
  { ssr: false }
);

export default function Home({ user }) {
  const { auth } = useSelector(({ auth }) => ({
    auth
  }));

  const router = useRouter();

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getCategories());
  }, []);

  React.useEffect(() => {
    if (!auth.isAuth) {
      router.push("/login");
    }
  }, [auth.isAuth]);

  return (
    <Layout>
      <div className={styles.grid}>
        <div className={styles.block}>
          <BubbleStat />
        </div>
        <div className={styles.block}>
          <RoundStat />
        </div>
        <div className={styles.block}>
          <ShortStat />
        </div>
        <div className={styles.block}>
          <TransactionsShort />
        </div>
      </div>
    </Layout>
  );
}

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
