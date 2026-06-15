import { useQuery } from "@tanstack/react-query";
import { getPlayers } from "../api/playersApi";

export const usePlayers = () => {
  return useQuery({
    queryKey: ["players"],
    queryFn: getPlayers,
  });
};