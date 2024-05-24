import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { Params } from "@/@types/api/get";
import { Model, countService } from ".";

async function getCountRequest(model: Model) {
  const { data } = await countService.find(model);

  return data;
}

export function useGetCountQuery(
  model: Model,
  options?: UseQueryOptions<number>
) {
  return useQuery({
    queryKey: ["count", model],
    queryFn: () => getCountRequest(model),
    ...options,
  });
}
