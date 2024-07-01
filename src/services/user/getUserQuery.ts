import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { Params } from "@/@types/api/get";
import { userService } from ".";
import { Usage } from "@prisma/client";

async function getUsageRequest() {
  const { data } = await userService.usage();

  return data;
}

export function useGetUsageQuery(options?: UseQueryOptions<Usage | null>) {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUsageRequest,
    ...options,
  });
}
