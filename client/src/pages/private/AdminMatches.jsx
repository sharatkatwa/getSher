import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import AdminActionButton from "../../components/admin/AdminActionButton";
import AdminTable from "../../components/admin/AdminTable";
import AdminToolbar from "../../components/admin/AdminToolbar";
import PageHeader from "../../components/shared/PageHeader";
import StatusPill from "../../components/shared/StatusPill";

import { deleteMatch, getMatches } from "../../api/matchApi";
import { getApiError } from "../../components/admin/matchFormUtils";
import { setMatches } from "../../slices/matchSlice";


;

const AdminMatches = () => {
  const dispatch = useDispatch();
const navigate = useNavigate();
const queryClient = useQueryClient();

  // Get matches from redux store
  const matches = useSelector(
    (state) => state.matches.matches
  );

  // Fetch matches from backend
  const { data, isLoading, error } = useQuery({
    queryKey: ["matches"],
    queryFn: getMatches,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteMatch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matches"] });
    },
  });

  const handleDelete = (row) => {
    if (!window.confirm(`Delete ${row.match}?`)) return;
    deleteMutation.mutate(row.id);
  };

  // Store fetched matches in redux so other pages can use them
  useEffect(() => {
    if (data?.data?.matches) {
      dispatch(setMatches(data.data.matches));
    }
  }, [data, dispatch]);

  // Show loading state while api request is in progress
  if (isLoading) {
    return <h1>Loading matches...</h1>;
  }

  // Show error state if request fails
  if (error) {
    return <h1>Failed to fetch matches</h1>;
  }

  // Convert api response into table format
  const rows = matches.map((match) => ({
    id: match._id,
    match: `${match.team1?.name || "TBD"} vs ${
      match.team2?.name || "TBD"
    }`,
    series: match.seriesId?.name || "-",
    venue: match.venue || "-",
    startTime: match.startTime
      ? new Date(match.startTime).toLocaleString()
      : "-",
    status: match.status || "UPCOMING",
  }));

  // Calculate counts for header pills
  const liveCount = matches.filter(
    (match) => match.status === "LIVE"
  ).length;

  const upcomingCount = matches.filter(
    (match) => match.status === "UPCOMING"
  ).length;

  return (
    <div className="space-y-lg px-md py-lg lg:px-lg">
      <PageHeader
        action={
          <div className="flex gap-2">
            <StatusPill tone="live">
              {liveCount} Live
            </StatusPill>

            <StatusPill tone="upcoming">
              {upcomingCount} Upcoming
            </StatusPill>
          </div>
        }
        description="Schedule fixtures, update venues, manage status, and prepare match operations."
        eyebrow="Fixtures"
        title="Manage Matches"
      />

     <AdminToolbar
  primaryAction="Create Match"
  onPrimaryAction={() => navigate("/admin/matches/create")}
  searchPlaceholder="Search match, venue, or series..."
/>

      {deleteMutation.error && (
        <div className="rounded-md border border-error bg-red-50 p-md text-body-md font-semibold text-error">
          {getApiError(deleteMutation.error)}
        </div>
      )}

      <AdminTable
        columns={[
          { key: "match", label: "Match" },
          { key: "series", label: "Series" },
          { key: "venue", label: "Venue" },
          { key: "startTime", label: "Start Time" },
          {
            key: "status",
            label: "Status",
            render: (row) => (
              <StatusPill
                tone={
                  row.status === "LIVE"
                    ? "live"
                    : "upcoming"
                }
              >
                {row.status}
              </StatusPill>
            ),
          },
        ]}
        renderActions={(row) => (
          <>
            <AdminActionButton
              variant="secondary"
              onClick={() => navigate(`/admin/playing-xi/${row.id}`)}
            >
              Set Playing XI
            </AdminActionButton>

            <AdminActionButton
              variant="secondary"
              onClick={() => navigate(`/admin/matches/edit/${row.id}`)}
            >
              Edit
            </AdminActionButton>

            <AdminActionButton
              variant="danger"
              onClick={() => handleDelete(row)}
            >
              Delete
            </AdminActionButton>
          </>
        )}
        rows={rows}
      />
    </div>
  );
};

export default AdminMatches;
