import Link from "next/link";
import GuildIcon from "@components/GuildIcon";
import styles from "@components/GuildButton.module.css";
import { OAuth2Guild } from "@/typings";

export default function GuildButton({
  guild: { name, icon, id },
}: {
  guild: OAuth2Guild;
}) {
  return (
    <Link href={`/dashboard/${id}`} className={styles.guildButton}>
        <GuildIcon id={id} name={name} icon={icon} className={styles.guildButtonIcon} />
        {name}
    </Link>
  );
}
