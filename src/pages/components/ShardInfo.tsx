import { ClusterInfo } from "@/typings"
import styles from "./ShardInfo.module.css";

export default function ShardInfo({ clusterInfo }: { clusterInfo?: ClusterInfo }) {
  const discordStats = clusterInfo?.discordStats;
  const websocketStatus = clusterInfo?.websocketStatus;
  const clusterId = clusterInfo?.clusterId;
  const audioStats = clusterInfo?.audioStats;
  
  return (
    <div className={styles.card}>
      <h1>Cluster Id {clusterInfo?.clusterId}</h1>
      <a>{discordStats?.cachedChannels} Channels</a>
      <a>{discordStats?.cachedGuilds} Guilds</a>
      <a>{discordStats?.cachedUsers} Users</a>
      <a>{websocketStatus?.wsLatency}ms</a>
      <a>{clusterId}</a>
      <a>{audioStats?.audioNodes[0]?.name}</a>
      <a>{audioStats?.audioDispatchers} Players</a>
    </div>
  );
}
