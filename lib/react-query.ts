import { QueryClient, QueryKey, QueryFunction } from "@tanstack/react-query";

const queryClient = new QueryClient();

export async function fetchQuery<T>({
  queryKey,
  queryFn,
}: {
  queryKey: QueryKey;
  queryFn: QueryFunction<T>;
}): Promise<T> {
  return queryClient.fetchQuery({
    queryKey,
    queryFn,
  });
}
