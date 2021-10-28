import React from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames/bind";

import { AvatarIcon, FlagIcon, NotificationIcon } from "../icons";
import { logout } from "../../store/slices/auth";
import styles from "./UserPanel.module.scss";
import { useRouter } from "next/router";

const cx = classNames.bind(styles);

const UserPanel = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [showActions, setShowActions] = React.useState(false);

  const onUserClick = () => setShowActions(!showActions);

  const onLogoutClick = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <div className={styles.panel}>
      <div className={styles.flag}>
        <FlagIcon />
      </div>
      <div className={styles.notification}>
        <NotificationIcon />
        <span></span>
      </div>
      <div className={styles.user} onClick={onUserClick}>
        <AvatarIcon />
        <div className={cx({ actions: true, active: showActions })}>
          <button className={styles.actions_btn} onClick={onLogoutClick}>
            logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
