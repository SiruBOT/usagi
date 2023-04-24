import { OAuth2Guild } from "@/typings";
import Image from "next/image";

interface Props {
  guild?: OAuth2Guild;
  className: string;
}

export default function GuildIcon({ guild, className }: Props) {
  const hasIcon = !!guild?.icon;
  const guildName = guild?.name ?? "";

  if (hasIcon) {
    return (
      <Image
        src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp?size=256`}
        alt={`server icon of ${guildName}`}
        width={256}
        height={256}
        quality={100}
        unoptimized
        className={className}
      />
    );
  }

  const words = guildName.trim().split(" ");
  const abbreviation =
    words.length === 1 && guildName.length <= 3
      ? guildName
      : words
          .map((word) => word.charAt(0))
          .slice(0, 3)
          .join("");

  return <div className={className}>{abbreviation}</div>;
}
