import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import {  UseQueryOptions, useQuery } from "@tanstack/react-query";
import { GuildsResponse, UnAuthorizedResponse} from "@/typings";
import { NextApiWrapper } from "@/utils/NextApiWrapper";

type GuildsHandlerData = UnAuthorizedResponse | GuildsResponse;

async function guildsHandler(
  req: NextApiRequest,
  res: NextApiResponse<GuildsHandlerData>
) {
  const session = await getSession({ req });
  if (!session) {
    // 세션이 없다면
    res.status(401).send({
      error: "Unauthorized",
      message: "You are not authorized to access this resource.",
      timeStamp: new Date().getTime(),
      ok: false,
    });
    return;
  }
  // Discord OAuth2 Guilds API를 이용하여 유저가 가입한 서버 목록을 가져옵니다. (api/users/@me/guilds)
  const guilds = await fetch("https://discord.com/api/users/@me/guilds", {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  }).then((res) => res.json());
  // 유저가 가입한 서버 목록을 반환합니다.
  res.status(200).send({
    ok: true,
    guilds,
  });
  return;
}

export default NextApiWrapper(guildsHandler);

export const queryKey = ["/api/dashboard/guilds"] // Query key
export const endpoint = "/api/dashboard/guilds" // API endpoint
export function useGuilds({ ...options }: UseQueryOptions<GuildsResponse>= {}) {
  return useQuery<GuildsResponse>(
    { // react-query 사용
      queryKey,
      queryFn: () => fetch(endpoint).then((res) => res.json()), // 쿼리 함수
      ...options
    }
  );
};