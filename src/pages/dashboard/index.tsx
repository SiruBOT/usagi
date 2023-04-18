import { signIn, useSession } from "next-auth/react";
import { GuildPermissions } from "@/typings";
import { useGuilds } from "@api/dashboard/guilds";
import GuildButton from "@components/GuildButton";
import styles from "@pages/dashboard/index.module.css";

export default function DashboardIndex() {
  const { status } = useSession(); // next-auth 세션 사용
  const { data, isInitialLoading, isLoading } = useGuilds({
    enabled: status === "authenticated", // 세션이 인증된 경우에만 불러오기
  });
  if (status === "unauthenticated") {
    // 세션이 인증되지 않은 경우
    signIn("discord"); // 디스코드 로그인 페이지로 리다이렉션
    return (
      <h1 className={styles.titleTypo}>리다이렉션 중...</h1> //  리다이렉션 중이라는 문구를 띄워줌
    );
  }
  return isInitialLoading || isLoading ? (
    <h1 className={styles.titleTypo}>로딩중...</h1>
  ) : (
    <div>
      <h1 className={styles.titleTypo}>서버를 선택해주세요.</h1>
      <div className={styles.guildSelectContainer}>
        {data?.guilds
          ?.filter(
            (guild) =>
              guild.permissions & GuildPermissions.Administrator ||
              guild.permissions & GuildPermissions.ManageGuild
          )
          .sort((a, b) => (a.name > b.name ? 1 : -1))
          .map((v, i) => (
            <GuildButton key={i} guild={v} />
          ))}
      </div>
    </div>
  );
}
