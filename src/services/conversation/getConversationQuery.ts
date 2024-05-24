import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { conversationService } from ".";
import { Params } from "@/@types/api/get";
import { TotalConversations } from "./type";

async function getConversationsRequest(params: Params) {
  const { data } = await conversationService.findAll(params);

  return data;
}

export function useGetConversationsQuery(
  params: Params,
  options?: UseQueryOptions<TotalConversations>
) {
  return useQuery({
    queryKey: ["conversations", params],
    queryFn: () => getConversationsRequest(params),
    ...options,
  });
}
