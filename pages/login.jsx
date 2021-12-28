import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { getValueFromCookie } from "../utils/getValueFromCookie";

import { useDispatch, useSelector } from "react-redux";
import { clearError, login } from "../store/slices/auth";
import $api from "../http";

import styles from "../styles/Login.module.scss";
import axios from "axios";

const emailPattern =
  '/^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/i';

const Login = () => {
  const dispatch = useDispatch();
  const { isAuth, error } = useSelector(({ auth }) => auth);

  const router = useRouter();

  React.useEffect(() => {
    if (isAuth) {
      router.push("/");
    }
  }, [isAuth]);

  const onChangedForm = () => {
    if (error) {
      dispatch(clearError());
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  console.log(errors);

  return (
    <div className={styles.login}>
      <div className={styles.container}>
        <h1 className={styles.title}>Log in to your account</h1>
        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <div className={styles.form_block}>
            <div className={`${styles.form_item} ${styles.form_item_input}`}>
              <input
                className={styles.input}
                {...register("email", {
                  required: {
                    value: true,
                    message: "email is required"
                  },
                  pattern: {
                    value: emailPattern,
                    message: "enter valid email"
                  }
                })}
                onChange={onChangedForm}
                type="email"
                placeholder="email"
                autoComplete="off"
              />
            </div>
            <div className={styles.error}>
              {errors.email &&
                errors.email.type === "required" &&
                errors.email.message}
            </div>
          </div>
          <div className={styles.form_block}>
            <div className={`${styles.form_item} ${styles.form_item_input}`}>
              <input
                className={styles.input}
                type="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "password is required"
                  },
                  maxLength: {
                    value: 32,
                    message: "max length exceeded"
                  }
                })}
                onChange={onChangedForm}
                placeholder="password"
              />
            </div>
            <div className={styles.error}>
              {errors.password && errors.password.message}
            </div>
          </div>

          <div className={`${styles.form_item} ${styles.info}`}>
            <div className={styles.register}>
              Нет аккаунта?{" "}
              <Link href="/registration">
                <a className={styles.link}>Зарегестрироваться</a>
              </Link>
            </div>
            {/* <div className={styles.reset}>
              <Link href="/login">
                <a className={styles.link}>Забыли пароль?</a>
              </Link>
            </div> */}
          </div>
          <button type="submit" className={styles.submit_btn}>
            Login
          </button>
        </form>
        {error ? <div className={styles.login_error}>{error}</div> : null}
      </div>
    </div>
  );
};

export default Login;

export const getServerSideProps = async (context) => {
  let isAuth = false;

  const cookie = getValueFromCookie("refreshToken", context.req.headers.cookie);
  // const cookie = context.req.headers.cookie?.split(";")[0].trim().split("=")[1];

  const $api = axios.create({
    withCredentials: true,
    baseURL: "http://server:8080/api"
  });

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
        destination: "/"
      }
    };
  }
  return { props: {} };
};
