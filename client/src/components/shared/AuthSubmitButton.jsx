const AuthSubmitButton = ({ children }) => {
  return (
    <button
      className="h-12 w-full rounded-md bg-primary px-md text-body-md font-extrabold text-on-primary transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-primary/30"
      type="submit"
    >
      {children}
    </button>
  );
};

export default AuthSubmitButton;
