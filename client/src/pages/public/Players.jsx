import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePlayers } from "../../hooks/usePlayers";
import { setPlayers } from "../../slices/playerSlice";

const Players = () => {
  const dispatch = useDispatch();
  const players = useSelector((state) => state.player.players);

  const { data, isLoading, error } = usePlayers();

  useEffect(() => {
    if (data?.data) dispatch(setPlayers(data.data));
  }, [data, dispatch]);

  return (
    <main className="min-h-screen bg-background text-on-background">
      <div className="page-shell py-lg">
        <section className="mb-lg rounded-xl bg-surface-container p-lg shadow-card">
          <p className="text-label-caps text-primary">Player Catalogue</p>
          <h1 className="mt-xs text-headline-lg text-on-surface">
            Cricket Players
          </h1>
          <p className="mt-sm max-w-2xl text-body-md text-on-surface-variant">
            Explore player profiles, roles, countries, and playing styles.
          </p>
        </section>

        {isLoading && (
          <p className="text-body-md text-on-surface-variant">
            Loading players...
          </p>
        )}

        {error && <p className="text-body-md text-error">Error loading players</p>}

        {!isLoading && !error && (
          <section className="grid gap-md sm:grid-cols-2 lg:grid-cols-3">
            {players.map((player) => (
              <article
                key={player._id}
                className="group rounded-xl border border-outline-variant bg-surface-container-low p-lg shadow-card transition hover:-translate-y-1 hover:shadow-floating"
              >
                <div className="flex items-center gap-md">
                  <img
                    src={player.imageUrl}
                    alt={player.name}
                    className="h-20 w-20 rounded-full border border-outline object-cover"
                  />

                  <div>
                    <h2 className="text-title-md text-on-surface">
                      {player.name}
                    </h2>
                    <p className="text-body-sm text-on-surface-variant">
                      {player.country || "Unknown country"}
                    </p>
                  </div>
                </div>

                <div className="mt-md flex flex-wrap gap-sm">
                  <span className="rounded-full bg-primary-container px-sm py-xs text-label-data text-on-primary-container">
                    {player.role}
                  </span>
                  <span className="rounded-full bg-secondary-container px-sm py-xs text-label-data text-secondary">
                    {player.battingStyle || "Batting N/A"}
                  </span>
                </div>

                <div className="mt-md rounded-lg bg-surface-container p-md">
                  <p className="text-label-caps text-on-surface-variant">
                    Bowling Style
                  </p>
                  <p className="mt-xs text-body-md text-on-surface">
                    {player.bowlingStyle || "N/A"}
                  </p>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
};

export default Players;