import styles from "./navMenu.module.css";
import Link from "next/link";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

const NavMenu = () => {
  return (
    <div className={styles.navMenu}>
      <nav className={styles.root}>
        <div className={styles.menuList}>
          <Link href={"/"} className={`${styles.menuItem} ${inter.className}`}>
            Sign
          </Link>
          <Link
            href={"/verify"}
            className={`${styles.menuItem} ${inter.className}`}
          >
            Verify
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default NavMenu;
