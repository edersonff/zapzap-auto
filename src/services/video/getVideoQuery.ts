import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";
import { scriptsService } from ".";
import { Video } from "@prisma/client";
import { GetAllScriptParams } from "./type";

async function getScriptRequest(params: GetAllScriptParams) {
  const { data } = await scriptsService.get(params);

  return data;
}

export function useGetScriptQuery(
  params: GetAllScriptParams
): UseQueryResult<Video[]> {
  return useQuery({
    queryKey: ["scripts", params],
    queryFn: () => getScriptRequest(params),
  });
}
