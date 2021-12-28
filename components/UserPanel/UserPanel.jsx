import React from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames/bind";

import { AvatarIcon, FlagIcon, LogoutIcon, NotificationIcon } from "../icons";
import { logout } from "../../store/slices/auth";
import styles from "./UserPanel.module.scss";
import { useRouter } from "next/router";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

const cx = classNames.bind(styles);

const UserPanel = () => {
  const ref = React.useRef();
  const dispatch = useDispatch();
  const router = useRouter();

  const [showActions, setShowActions] = React.useState(false);

  const onUserClick = () => setShowActions(true);

  const onLogoutClick = () => {
    router.push("/login");
    dispatch(logout());
  };

  useOnClickOutside(ref, () => setShowActions(false));

  return (
    <div className={styles.panel}>
      <div className={styles.flag}>
        <FlagIcon />
      </div>
      <div className={styles.notification}>
        <NotificationIcon />
        <span></span>
      </div>
      <div className={styles.user} onClick={onUserClick} ref={ref}>
        <AvatarIcon />
        <div className={cx({ actions: true, active: showActions })}>
          <button className={styles.actions_btn} onClick={onLogoutClick}>
            <span>
              <LogoutIcon />
            </span>
            <span>logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
