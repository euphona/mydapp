import React from "react";
import styles from "./header.module.css";
import Logo from "./Logo";
import NavMenu from "./NavMenu";

const Header = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <header className={styles.wheader}>
          {/* <div> */}
          <Logo />
          <NavMenu />
          {/* <HamburgerMenu /> */}
          {/* </div> */}
        </header>
      </div>
    </>
  );
};

export default Header;
