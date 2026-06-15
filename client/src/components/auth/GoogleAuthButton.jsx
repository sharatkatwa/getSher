const GoogleAuthButton = ({ children = "Continue with Google" }) => {
  return (
    <button
      className="flex h-12 w-full items-center justify-center gap-sm rounded-md border border-outline-variant bg-surface-container-lowest px-md text-body-md font-bold text-on-surface transition hover:bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary/20"
      type="button"
    >
      <span className="grid size-6 place-items-center rounded-full bg-surface text-sm font-extrabold text-primary shadow-card">
        G
      </span>
      {children}
    </button>
  );
};

export default GoogleAuthButton;
