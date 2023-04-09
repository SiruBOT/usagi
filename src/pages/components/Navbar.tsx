import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
        <Link href="/" className={`${styles.align} ${styles.button} ${styles.logoHref}`}>
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={100}
            height={100}
            className={styles.logo}
          />
          <h1>치노봇</h1>
        </Link>
      <div className={styles.align}>
        <Link href="/stats" className={styles.button}>
          치노봇 샤드 상태
        </Link>
        <Link href="/login" className={styles.button}>
          로그인
        </Link>
      </div>
    </div>
  );
}
