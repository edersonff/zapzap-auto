import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { chatbotService } from ".";
import { Params } from "@/@types/api/get";
import { TotalChatbots } from "./type";

async function getChatbotsRequest(params: Params) {
  const { data } = await chatbotService.findAll(params);

  return data;
}

export function useGetChatbotsQuery(
  params: Params,
  options?: UseQueryOptions<TotalChatbots>
) {
  return useQuery({
    queryKey: ["chatbots", params],
    queryFn: () => getChatbotsRequest(params),
    ...options,
  });
}
