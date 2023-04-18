import Image from "next/image";

export default function GuildIcon({
  id,
  icon,
  name,
  className,
}: {
  id: string;
  icon: string | null;
  name: string;
  className?: string;
}) {
  return icon ? (
    <Image
      src={`https://cdn.discordapp.com/icons/${id}/${icon}.webp?size=256`}
      alt={`server icon of ${name}`}
      width={256}
      height={256}
      quality={100}
      unoptimized
      className={className}
    />
  ) : (
    <div className={className}>
      {name.trim().split(" ").length == 1 && name.length <= 3
        ? name
        : name
            .split(" ")
            .map((e) => e.charAt(0))
            .slice(0, 3)
            .join("")}
    </div>
  );
}
