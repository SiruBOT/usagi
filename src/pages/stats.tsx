import Header from "@components/Header";
import ShardInfo from "@components/ShardInfo";
import { ApiResponse } from "@/typings";
import styles from "@pages/stats.module.css";
import Divider from "@components/Divider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faHashtag, faUser } from "@fortawesome/free-solid-svg-icons";

const totalKeys = ["cachedGuilds", "cachedChannels", "cachedUsers"] as const;

export default function Stats({ stats }: { stats: ApiResponse }) {
  const [totalGuildCount, totalChannelCount, totalUserCount] = totalKeys.map((key): number => {
    return stats.clustersInfo.reduce((acc, cur) => {
      acc += cur.discordStats[key];
      return acc;
    }, 0);
  })
  return (
    <>
      <Header title="봇 정보" />
      <h1 className={styles.titleTypo}>클러스터 정보</h1>
      {/* TODO: Add total players */}
      <ul className={[styles.totalContainer, styles.totalTypo].join(" ")}>
        <li><FontAwesomeIcon icon={faBuilding} /> {totalGuildCount} 서버</li>
        <Divider orientation="vertical" />
        <li><FontAwesomeIcon icon={faHashtag} /> {totalChannelCount} 채널</li>
        <Divider orientation="vertical" />
        <li><FontAwesomeIcon icon={faUser} /> {totalUserCount} 유저</li>
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
  try {
    const res = await fetch("http://localhost:3300/stats");
    const data = await res.json();
  
    return {
      props: {
        stats: data,
        revalidate: 10,
      },
    };
  } catch (e) {
    return {
      props: {
        stats: {
          clusterId: 0,
          clustersInfo: []
        },
      },
    };
  }
}
