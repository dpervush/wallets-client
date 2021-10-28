import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { getValueFromCookie } from "../utils/getValueFromCookie";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slices/auth";
import $api from "../http";

import styles from "../styles/Login.module.scss";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(2).max(32).required(),
});

const Login = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(({ auth }) => auth);

  const router = useRouter();

  React.useEffect(() => {
    if (isAuth) {
      router.push("/");
    }
  }, [isAuth]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  return (
    <div className={styles.login}>
      <div className={styles.container}>
        <h1 className={styles.title}>Log in to your account</h1>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={`${styles.form_item} ${styles.form_item_input}`}>
            <input
              className={styles.input}
              {...register("email", {
                required: true,
                pattern: /^[A-Za-z]+$/i,
              })}
              type="email"
              placeholder="email"
            />
            {errors.email && (
              <span className={styles.error}>{errors.email.message}</span>
            )}
          </div>
          <div className={`${styles.form_item} ${styles.form_item_input}`}>
            <input
              className={styles.input}
              type="password"
              {...register("password", { required: true, maxLength: 32 })}
              placeholder="password"
            />
            {errors.password && (
              <span className={styles.error}>{errors.password.message}</span>
            )}
          </div>
          <div className={`${styles.form_item} ${styles.info}`}>
            <div className={styles.register}>
              Нет аккаунта?{" "}
              <Link href="/registration">
                <a className={styles.link}>Зарегестрироваться</a>
              </Link>
            </div>
            <div className={styles.reset}>
              <Link href="/login">
                <a className={styles.link}>Забыли пароль?</a>
              </Link>
            </div>
          </div>
          <button type="submit" className={styles.submit_btn}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

export const getServerSideProps = async (context) => {
  let isAuth = false;

  const cookie = getValueFromCookie("refreshToken", context.req.headers.cookie);
  console.log(cookie);
  // const cookie = context.req.headers.cookie?.split(";")[0].trim().split("=")[1];

  await $api
    .get("/auth/me", { headers: { Authorization: "Bearer " + cookie } })
    .then((req) => {
      isAuth = true;
    })
    .catch((err) => {
      console.log(err);
      isAuth = false;
    });

  if (isAuth) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
  return { props: {} };
};
