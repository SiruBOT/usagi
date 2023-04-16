import Link from "next/link";
import Image from "next/image";
import styles from "@components/Navbar.module.css";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Navbar() {
  const { data, status } = useSession();
  const router = useRouter();
  return (
    <nav className={[styles.navbar, "center"].join(" ")}>
      <div className={styles.align}>
        <Link href="/" className={`${styles.align} ${styles.logoButton}`}>
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={100}
            height={100}
            className={styles.logo}
          />
          <h1>치노봇</h1>
        </Link>
      </div>
      <div className={styles.align}>
      <Link href="/stats" className={styles.button}>
          봇 상태
        </Link>
        <Link href="/dashboard" className={styles.button}>
          대시보드
        </Link>
        <button
          onClick={
            status == "authenticated"
              ? () => {
                  router.push("/");
                  signOut({ redirect: true, callbackUrl: "/" });
                }
              : () => signIn("discord")
          }
          className={
            status == "loading" || status == "authenticated"
              ? styles.button
              : styles.loginButton
          }
        >
          {status == "authenticated"
            ? `${data?.user?.name}#${data?.discordInfo.discriminator}`
            : status == "unauthenticated"
            ? "디스코드로 로그인"
            : "로딩중..."}
        </button>
      </div>
    </nav>
  );
}
