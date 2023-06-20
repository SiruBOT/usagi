import type { NextApiRequest, NextApiResponse } from "next";

import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { ErrorResponse, StatsResponse } from "@/typings";
import { NextApiWrapper } from "@/utils/NextApiWrapper";

type StatsHandlerData = ErrorResponse | StatsResponse;

async function statsHandler(
  req: NextApiRequest,
  res: NextApiResponse<StatsHandlerData>
) {
    res.status(200).send({
        ok: true,
        stats: {
            clusterCount: 1,
            clusterSize: 1,
            clustersInfo: []
        },
        timeStamp: new Date().getTime(),
    })
}

export default NextApiWrapper(statsHandler);

// Redis: pub/sub 구현

export const queryKey = ["/api/stats"]; // Query key
export const endpoint = "/api/stats"; // API endpoint
export function useStats({
  ...options
}: UseQueryOptions<StatsHandlerData> = {}) {
  return useQuery<StatsHandlerData>({
    // react-query 사용
    queryKey,
    queryFn: () => fetch(endpoint).then((res) => res.json()), // 쿼리 함수
    ...options,
  });
}
