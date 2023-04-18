import styles from "@components/Footer.module.css";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className={[styles.footer, "center"].join(" ")}>
      <Image
        src="/next.svg"
        alt={"vercel logo"}
        width="128"
        height="512"
      ></Image>
    </footer>
  );
}
