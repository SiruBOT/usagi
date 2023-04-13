import Header from "./components/Header";
import ShardInfo from "./components/ShardInfo";
import { ApiResponse } from "./types/StatsApiResponse";
import styles from "./stats.module.css";
import Divider from "./components/Divider";

export default function Stats({ stats }: { stats: ApiResponse }) {
  const totalGuildCount = stats.clustersInfo.reduce((acc, cur) => {
    acc += cur.discordStats.cachedGuilds;
    return acc;
  }, 0);
  const totalChannelCount = stats.clustersInfo.reduce((acc, cur) => {
    acc += cur.discordStats.cachedChannels;
    return acc;
  }, 0);
  const totalUserCount = stats.clustersInfo.reduce((acc, cur) => {
    acc += cur.discordStats.cachedUsers;
    return acc;
  }, 0);
  return (
    <>
      <Header title="봇 정보" />
      <h1 className={styles.titleTypo}>클러스터 정보</h1>

      <ul className={styles.totalContainer}>
        <li>{totalGuildCount}</li>
        <Divider orientation="vertical" />
        <li>{totalChannelCount}</li>
        <Divider orientation="vertical" />
        <li>{totalUserCount}</li>
      </ul>
      <div className={styles.shardContainer}>
        {stats.clustersInfo.map((info, index) => {
          return <ShardInfo key={index} clusterInfo={info} />;
        })}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch("http://localhost:3300/stats");
  const data = await res.json();

  return {
    props: {
      stats: data,
      revalidate: 10,
    },
  };
}
