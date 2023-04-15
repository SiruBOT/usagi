import { getSession, signIn, useSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { GuildPermissions } from "../types/DiscordPermissions";
import GuildSelect from "../components/GuildButton";
import styles from "./index.module.css";

export interface OAuth2Guild {
  id: string;
  name: string;
  icon: string | null;
  permissions: number;
}

export default function DashboardIndex({ guilds }: { guilds: OAuth2Guild[] }) {
  const { status } = useSession();
  if (status == "unauthenticated") {
    signIn("discord");
    return <h1>리다이렉션 중...</h1>;
  }
  const guildWithPermissions = guilds.filter(
    (guild) =>
      guild.permissions & GuildPermissions.Administrator ||
      guild.permissions & GuildPermissions.ManageGuild
  ).sort((a, b) => a.name > b.name ? 1 : -1); // 관리자 권한이나, 길드 관리 권한이 있는 길드만 불러오기
  return (
    <div>
      <h1 className={styles.titleTypo}>서버를 선택해주세요.</h1>
      <div className={styles.guildSelectContainer}>
        {guildWithPermissions.map((v, i) => (
          <GuildSelect key={i} guild={v} />
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // getServerSideProps 로 세션을 가져와서, 세션의 accessToken 으로 길드 목록을 가져옵니다.
  const session = await getSession(context);
  if (!session) {
    // 세션이 없다면, 로그인 시킴
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  const guilds = await fetch("https://discord.com/api/users/@me/guilds", {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  }).then((a) => a.json());

  return {
    props: { guilds },
  };
}
