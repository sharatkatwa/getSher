const TeamBadge = ({ code, muted = false }) => {
  const colors = {
    IND: "from-[#ff9933] via-white to-[#138808]",
    AUS: "from-[#314c38] via-[#c7c7c7] to-[#2e3430]",
    ENG: "from-[#f7f7f7] via-[#d72638] to-[#071a52]",
    RSA: "from-[#007a4d] via-[#ffb612] to-[#de3831]",
    PAK: "from-[#0b5d45] via-[#f5f5f5] to-[#0b5d45]",
  };

  return (
    <div
      className={`grid size-12 shrink-0 place-items-center rounded-full border border-outline-variant bg-gradient-to-br ${colors[code] || "from-surface-container-high to-surface-container-highest"} shadow-card ${muted ? "opacity-45 grayscale" : ""}`}
    >
      <div className="grid size-8 place-items-center rounded-full bg-surface-container-lowest text-label-data font-bold text-primary">
        {code.slice(0, 1)}
      </div>
    </div>
  );
};

export default TeamBadge;
