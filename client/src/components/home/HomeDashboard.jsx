import Commentary from "./Commentary";
import LiveMatches from "./LiveMatches";
import RightRail from "./RightRail";

const HomeDashboard = () => {
  return (
    <div className="space-y-xl px-md py-lg lg:px-lg">
      <LiveMatches />
      <div className="grid gap-lg xl:grid-cols-[minmax(0,1fr)_16rem]">
        <Commentary />
        <RightRail />
      </div>
    </div>
  );
};

export default HomeDashboard;
