import Icon from "./Icon";

const getInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "U";

const UserAvatar = ({ user, size = "md" }) => {
  const sizeClass = size === "sm" ? "size-9" : "size-10";

  if (user?.picture) {
    return (
      <img
        alt={user?.name || "User profile"}
        className={`${sizeClass} rounded-full object-cover ring-1 ring-outline-variant`}
        src={user.picture}
      />
    );
  }

  return (
    <div className={`${sizeClass} grid place-items-center rounded-full bg-primary text-on-primary`}>
      {user?.name ? (
        <span className="text-label-data font-extrabold">{getInitials(user.name)}</span>
      ) : (
        <Icon name="user" className="h-5 w-5" />
      )}
    </div>
  );
};

const UserProfile = ({
  user,
  fallbackName = "Guest User",
  fallbackRole = "Cricket Enthusiast",
  compact = false,
}) => {
  const displayName = user?.name || fallbackName;
  const displayRole = user?.role || fallbackRole;

  return (
    <div className="flex min-w-0 items-center gap-sm">
      <UserAvatar user={user} size={compact ? "sm" : "md"} />
      {!compact && (
        <div className="min-w-0">
          <p className="truncate text-body-md font-bold text-on-surface">{displayName}</p>
          <p className="truncate text-label-data text-on-surface-variant">{displayRole}</p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
