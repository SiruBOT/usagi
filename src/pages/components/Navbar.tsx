import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data, status } = useSession();
  return (
    <div className={[styles.navbar, "center"].join(" ")}>
      <div className={styles.align}>
      <Link
        href="/"
        className={`${styles.align} ${styles.logoButton}`}
      >
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={100}
          height={100}
          className={styles.logo}
        />
        <h1>치노봇</h1>
      </Link>
      <Link href="/stats" className={styles.button}>
          봇 상태
        </Link>
      </div>
      <div className={styles.align}>
      <Link href="/dashboard" className={styles.button}>
          대시보드
        </Link>
        {status == "authenticated" ? (
          <button onClick={() => signOut()} className={styles.button}>{`${data.user?.name}#${data.discordInfo.discriminator}`}</button>
        ) : (
          <button
            onClick={() => signIn("discord")}
            className={styles.loginButton}
          >
            <a>디스코드로 로그인</a>
          </button>
        )}
      </div>
    </div>
  );
}
