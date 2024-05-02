import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";
import { Social } from "./type";
import { socialsService } from ".";

async function getSocialsRequest() {
  const { data } = await socialsService.get();

  return data;
}

export function useGetSocialsQuery(
  options?: UseQueryOptions<Social[]>
): UseQueryResult<Social[]> {
  return useQuery({
    queryKey: ["socials"],
    queryFn: getSocialsRequest,
    ...options,
  });
}
