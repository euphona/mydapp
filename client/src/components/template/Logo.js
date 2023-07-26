import Link from "next/link";
import Image from "next/image";
import styles from "./logo.module.css";

const Logo = () => {
  return (
    <div className={styles.navLogo}>
      <Link href={"/"}>
        <div className={styles.logo}>
          <Image
            src="/vercel.svg"
            alt="Logo"
            className={styles.logo}
            width={100}
            height={24}
            priority
          />
        </div>
      </Link>
    </div>
  );
};

export default Logo;
