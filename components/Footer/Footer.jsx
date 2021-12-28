import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames/bind";

import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { logout } from "../../store/slices/auth";

import {
  ChartIcon,
  AvatarIcon,
  TransactionsIcon,
  StatisticsIcon,
  LogoutIcon
} from "../icons";

import styles from "./Footer.module.scss";

const cx = classNames.bind(styles);

export const Footer = () => {
  const { route, push } = useRouter();
  const dispatch = useDispatch();

  const ref = React.useRef();

  const [showActions, setShowActions] = React.useState(false);

  const onUserClick = () => setShowActions(true);

  const onLogoutClick = () => {
    push("/login");
    dispatch(logout());
  };

  useOnClickOutside(ref, () => setShowActions(false));

  return (
    <footer className={styles.footer}>
      <nav className={styles.nav}>
        <ul className={styles.nav_list}>
          <li className={styles.nav_item}>
            <Link href="/">
              <a className={cx({ nav_link: true, active: route === "/" })}>
                <span className={styles.icon}>
                  <ChartIcon />
                </span>
              </a>
            </Link>
          </li>
          <li className={styles.nav_item}>
            <Link href="/transactions">
              <a
                className={cx({
                  nav_link: true,
                  active: route === "/transactions"
                })}
              >
                <span className={styles.icon}>
                  <TransactionsIcon />
                </span>
              </a>
            </Link>
          </li>
          <li className={styles.nav_item}>
            <Link href="/">
              <a
                className={cx({
                  nav_link: true,
                  active: route === "/statistics"
                })}
              >
                <span className={styles.icon}>
                  <StatisticsIcon />
                </span>
              </a>
            </Link>
          </li>
          <li className={styles.nav_item}>
            <Link href="">
              <a
                ref={ref}
                className={cx({
                  nav_link: true,
                  active: route === "/account"
                })}
                onClick={onUserClick}
              >
                <span className={styles.icon}>
                  <AvatarIcon />
                </span>
                <div className={cx({ actions: true, active: showActions })}>
                  <button
                    className={styles.actions_btn}
                    onClick={onLogoutClick}
                  >
                    <span>
                      <LogoutIcon />
                    </span>
                    <span>logout</span>
                  </button>
                </div>
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};
