import React from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { clearError, registration } from "../store/slices/auth";

import styles from "../styles/Registration.module.scss";

const Registration = () => {
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
    watch,
    getValues,
    formState: { errors }
  } = useForm({});

  const password = React.useRef();
  password.current = watch("password");

  const onSubmit = (data) => {
    dispatch(registration(data));
  };

  return (
    <div className={styles.registration}>
      <div className={styles.container}>
        <h1 className={styles.title}>Create new account</h1>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={`${styles.form_item} ${styles.form_item_input}`}>
            <input
              className={styles.input}
              {...register("firstName", {
                required: {
                  value: true,
                  message: "first name is required"
                }
              })}
              placeholder="First name"
              onChange={onChangedForm}
            />
            {errors.firstName && (
              <span className={styles.error}>{errors.firstName.message}</span>
            )}
          </div>
          <div className={`${styles.form_item} ${styles.form_item_input}`}>
            <input
              className={styles.input}
              {...register("secondName", {
                required: {
                  value: true,
                  message: "second name is required"
                }
              })}
              placeholder="Second name"
              onChange={onChangedForm}
            />
            {errors.secondName && (
              <span className={styles.error}>{errors.secondName.message}</span>
            )}
          </div>
          <div className={`${styles.form_item} ${styles.form_item_input}`}>
            <input
              className={styles.input}
              {...register("email", {
                required: {
                  value: true,
                  message: "email is required"
                }
              })}
              placeholder="email"
              onChange={onChangedForm}
            />
            {errors.email && (
              <span className={styles.error}>{errors.email.message}</span>
            )}
          </div>
          <div className={`${styles.form_item} ${styles.form_item_input}`}>
            <input
              className={styles.input}
              type="password"
              {...register("password", {
                required: "you must specify a password",
                minLength: {
                  value: 2,
                  message: "password must have at least 2 characters"
                }
              })}
              placeholder="enter password"
              onChange={onChangedForm}
            />
            {errors.password && (
              <span className={styles.error}>{errors.password.message}</span>
            )}
          </div>
          <div className={`${styles.form_item} ${styles.form_item_input}`}>
            <input
              className={styles.input}
              type="password"
              {...register("passwordConfirmation", {
                required: "you must specify a password",
                minLength: {
                  value: 2,
                  message: "password must have at least 2 characters"
                },
                validate: (value) =>
                  value === watch("password") || "The passwords do not match"
              })}
              placeholder="repeat password"
              onChange={onChangedForm}
            />
            {errors.passwordConfirmation && (
              <span className={styles.error}>
                {errors.passwordConfirmation.message}
              </span>
            )}
          </div>
          <div className={`${styles.form_item} ${styles.info}`}>
            <div className={styles.register}>
              Уже есть аккаунт?{" "}
              <Link href="/login">
                <a className={styles.link}>Войти</a>
              </Link>
            </div>
          </div>
          <button type="submit" className={styles.submit_btn}>
            Sign up
          </button>
        </form>
        {error ? (
          <div className={styles.registration_error}>{error}</div>
        ) : null}
      </div>
    </div>
  );
};

export default Registration;
