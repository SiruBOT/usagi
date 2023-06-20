export enum GuildPermissions {
  Administrator = 0x00000008,
  ManageChannels = 0x00000010,
  ManageGuild = 0x00000020,
  AddReactions = 0x00000040,
}

export interface OAuth2Guild {
  id: string;
  name: string;
  icon: string | null;
  permissions: number;
}

export interface NodeStats {
  players: number;
  playingPlayers: number;
  memory: {
    reservable: number;
    used: number;
    free: number;
    allocated: number;
  };
  frameStats: {
    sent: number;
    deficit: number;
    nulled: number;
  };
  cpu: {
    cores: number;
    systemLoad: number;
    lavalinkLoad: number;
  };
  uptime: number;
}

export interface AudioNodeStats {
  name: string;
  players: number;
  usageByDispatchers: number;
  state: string;
  reconnects: number;
  stats: NodeStats | null;
}

export interface ClusterInfo {
  clusterId: number;
  ready: boolean;
  discordStats: {
    cachedGuilds: number;
    cachedUsers: number;
    cachedChannels: number;
  };
  audioStats: {
    audioDispatchers: number;
    audioNodes: AudioNodeStats[];
  };
  websocketStatus: {
    wsStatus: number;
    wsLatency: number;
  };
}

export interface ApiResponse {
  clusterCount: number;
  clusterSize: number;
  clustersInfo: ClusterInfo[];
}

// NextApi route response
export interface StatsResponse extends Response {
  ok: true;
  stats: ApiResponse;
  timeStamp: number;
}

export interface UnAuthorizedResponse extends ErrorResponse {
  ok: false;
  error: string;
  message: string;
}

export interface GuildsResponse extends Response {
  ok: true;
  guilds: OAuth2Guild[];
}

export interface ErrorResponse extends Response {
  ok: false;
  error: string;
  timeStamp: number;
  message: string;
}

export interface Response {
  ok: boolean;
}

