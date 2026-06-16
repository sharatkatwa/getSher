import { useQuery } from "@tanstack/react-query";

import { getHomeFeed } from "../api/home.api.js";

export const homeKeys = {
  all: ["home"],
  feed: () => [...homeKeys.all, "feed"],
};

export const useHome = () =>
  useQuery({
    queryKey: homeKeys.feed(),
    queryFn: async () => {
      const res = await getHomeFeed();
      return res.data?.data || {
        liveMatches: [],
        upcomingMatches: [],
        recentMatches: [],
      };
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
