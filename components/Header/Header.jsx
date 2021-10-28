import React from "react";
import Link from "next/link";
import classNames from "classnames/bind";

import UserPanel from "../UserPanel/UserPanel";
import { ChartIcon, DotsIcon } from "../icons";

import styles from "./Header.module.scss";
import { useRouter } from "next/dist/client/router";

const cx = classNames.bind(styles);

const Header = () => {
  const { route } = useRouter();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.menu}>
            <DotsIcon />
            <span>Wallets</span>
          </div>
          <nav className={styles.nav}>
            <ul className={styles.nav_list}>
              <li className={styles.nav_item}>
                <Link href="/">
                  <a className={cx({ nav_link: true, active: route === "/" })}>
                    <ChartIcon />
                    <span>Overview</span>
                  </a>
                </Link>
              </li>
              <li className={styles.nav_item}>
                <Link href="/transactions">
                  <a
                    className={cx({
                      nav_link: true,
                      active: route === "/transactions",
                    })}
                  >
                    Transactions
                  </a>
                </Link>
              </li>
              <li className={styles.nav_item}>
                <Link href="/">
                  <a
                    className={cx({
                      nav_link: true,
                      active: route === "/statistics",
                    })}
                  >
                    Statistics
                  </a>
                </Link>
              </li>
            </ul>
          </nav>
          <UserPanel />
        </div>
      </div>
    </header>
  );
};

export default Header;
