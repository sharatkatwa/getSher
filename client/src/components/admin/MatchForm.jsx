import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useCreateMatch, useMatchFormQueries, useUpdateMatch } from "../../hooks/useMatch";
import {
  AdvancedSection,
  CompetitorsSection,
  CoreSection,
  FormHeader,
  ScheduleSection,
  StatusSection,
} from "./MatchFormSections";
import {
  DEFAULT_MATCH_VALUES,
  getApiError,
  toFormValues,
  toMatchPayload,
  toOptions,
} from "../../utils/match/matchUtils";

const MatchForm = ({ mode = "create", matchId }) => {
  const isEdit = mode === "edit";
  const { register, handleSubmit, reset, watch, formState } = useForm({
    defaultValues: DEFAULT_MATCH_VALUES,
  });

  const { teamsQuery, seriesQuery, matchQuery, loading, loadError } = useMatchFormQueries({ matchId, isEdit });

  useEffect(() => {
    if (isEdit && matchQuery.data?.data) reset(toFormValues(matchQuery.data.data));
  }, [isEdit, matchQuery.data, reset]);

  const createMutation = useCreateMatch();
  const updateMutation = useUpdateMatch(matchId);

  const mutationError = createMutation.error || updateMutation.error;
  const isSaving = createMutation.isPending || updateMutation.isPending;
  const errors = formState.errors;

  if (isEdit && !matchId) {
    return <FormNotice tone="error" title="Missing match id. Open this page from a match edit action." />;
  }

  if (loading) {
    return <FormNotice tone="primary" title="Loading match configuration..." />;
  }

  if (loadError) {
    return <FormNotice tone="error" title="Could not load match form" message={getApiError(loadError)} />;
  }

  return (
    <form
      onSubmit={handleSubmit((data) => (isEdit ? updateMutation : createMutation).mutate(toMatchPayload(data, isEdit)))}
      className="overflow-hidden rounded-md border border-outline-variant bg-surface-container-lowest shadow-card"
    >
      <FormHeader isEdit={isEdit} isSaving={isSaving} />
      <div className="space-y-lg px-lg py-lg">
        <CoreSection register={register} seriesOptions={toOptions(seriesQuery.data?.data)} selectedType={watch("matchType")} errors={errors} />
        <CompetitorsSection register={register} teams={toOptions(teamsQuery.data?.data)} errors={errors} team1Id={watch("team1Id")} />
        <ScheduleSection register={register} errors={errors} />
        {isEdit && <StatusSection register={register} selectedStatus={watch("status")} />}
        <AdvancedSection register={register} />
        {mutationError && <div className="rounded-md border border-error bg-red-50 p-md text-body-md font-semibold text-error">{getApiError(mutationError)}</div>}
      </div>
    </form>
  );
};

const FormNotice = ({ tone, title, message }) => (
  <div className={`rounded-lg border bg-surface-container-lowest p-xl shadow-card ${tone === "error" ? "border-error text-error" : "border-outline-variant text-primary"}`}>
    <h2 className="text-title-md font-extrabold">{title}</h2>
    {message && <p className="mt-xs text-body-md text-on-surface-variant">{message}</p>}
  </div>
);

export default MatchForm;
