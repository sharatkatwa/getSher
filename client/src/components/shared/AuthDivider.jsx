const AuthDivider = () => {
  return (
    <div className="flex items-center gap-md">
      <div className="h-px flex-1 bg-outline-variant" />
      <span className="text-label-data text-on-surface-variant">OR</span>
      <div className="h-px flex-1 bg-outline-variant" />
    </div>
  );
};

export default AuthDivider;
