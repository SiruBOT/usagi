import Link from "next/link";
import GuildIcon from "@components/GuildIcon";
import styles from "@components/GuildButton.module.css";
import { OAuth2Guild } from "@/typings";

export default function GuildButton({ guild }: { guild?: OAuth2Guild }) {
  return (
    <Link href={`/dashboard/${guild?.id}`} className={styles.guildButton}>
      <GuildIcon
        guild={guild}
        className={styles.guildButtonIcon}
      />
      {guild?.name}
    </Link>
  );
}
