import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import { getMatches } from "../../api/matchApi";
import { setMatches } from "../../slices/matchSlice";

function MatchList() {
  const dispatch = useDispatch();

  const matches = useSelector(
    (state) => state.matches.matches
  );

  const {
    data,
    isLoading,
    error,

  } = useQuery({
    queryKey: ["matches"],
    queryFn: getMatches,
    
  });

  console.log(data);
console.log(matches);
  useEffect(() => {
    if (data?.data) {
      dispatch(setMatches(data.data.matches));
    }
  }, [data, dispatch]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Something went wrong</h1>;
  }

  return (
    <div>
      <h1>Matches</h1>

      {matches?.map((match) => (
        <div key={match._id}>
          {match.team1?.name} vs {match.team2?.name}
        </div>
      ))}
    </div>
  );
}

export default MatchList;