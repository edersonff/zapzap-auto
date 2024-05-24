import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { bulkService } from ".";
import { BulkParams, TotalBulks } from "./type";

async function getBulksRequest(params: BulkParams) {
  const { data } = await bulkService.findAll(params);

  return data;
}

export function useGetBulksQuery(
  params: BulkParams,
  options?: UseQueryOptions<TotalBulks>
) {
  return useQuery({
    queryKey: ["bulks", params],
    queryFn: () => getBulksRequest(params),
    ...options,
  });
}
