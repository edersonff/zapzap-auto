import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { Params } from "@/@types/api/get";
import { subscriptionService } from ".";
import { Subscription } from "@prisma/client";

async function getSubscriptionRequest() {
  const { data } = await subscriptionService.get();

  return data;
}

export function useGetSubscriptionQuery(
  options?: UseQueryOptions<Subscription | null>
) {
  return useQuery({
    queryKey: ["subscription"],
    queryFn: () => getSubscriptionRequest(),
    ...options,
  });
}
