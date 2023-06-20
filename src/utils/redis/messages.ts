export type BasePubSubMessage = {
    _id: string;
}

export type BaseBotPubMessage = {
    clusterId: number;
    shardIds: number[];
} & BasePubSubMessage