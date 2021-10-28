import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import Layout from "../containers/layout/Layout";
import ShortStat from "../components/ShortStat/ShortStat";
import TransactionsShort from "../components/TransactionsShort/TransactionsShort";

import styles from "../styles/Home.module.scss";
import $api from "../http";
import { getMe } from "../store/slices/auth";
import { getValueFromCookie } from "../utils/getValueFromCookie";

const BubbleStat = dynamic(
  () => import("../components/BubbleStat/BubbleStat"),
  { ssr: false }
);
const RoundStat = dynamic(() => import("../components/RoundStat/RoundStat"), {
  ssr: false,
});

export default function Home({ user }) {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(({ auth }) => auth);

  const router = useRouter();

  console.log(user);

  React.useEffect(() => {
    if (!isAuth) {
      router.push("/login");
    }
  }, [isAuth]);

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
