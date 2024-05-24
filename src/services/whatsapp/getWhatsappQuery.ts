import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { whatsappService } from ".";
import { Whatsapp } from "@prisma/client";
import { Params } from "@/@types/api/get";
import { TotalWhatsapps } from "./type";

async function getWhatsappsRequest(params: Params) {
  const { data } = await whatsappService.findAll(params);

  return data;
}

export function useGetWhatsappsQuery(
  params: Params,
  options?: UseQueryOptions<TotalWhatsapps>
) {
  return useQuery({
    queryKey: ["whatsapps", params],
    queryFn: () => getWhatsappsRequest(params),
    ...options,
  });
}
