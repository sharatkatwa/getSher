import Icon from "./Icon";

const TopBar = ({ onMenuClick }) => {
  return (
    <header className="sticky top-0 z-20 border-b border-outline-variant bg-surface-container-lowest/95 backdrop-blur">
      <div className="flex h-16 items-center gap-md px-md lg:px-lg">
        <button
          className="grid size-10 place-items-center rounded-full text-primary hover:bg-surface-container lg:hidden"
          onClick={onMenuClick}
          type="button"
        >
          <Icon name="menu" className="h-6 w-6" />
        </button>

        <h1 className="text-headline-lg-mobile font-extrabold text-primary lg:min-w-56">
          getSher
        </h1>

        <div className="ml-auto hidden h-10 w-full max-w-80 items-center gap-sm rounded-full bg-surface-container px-md text-on-surface-variant sm:flex">
          <Icon name="search" className="h-5 w-5" />
          <span className="truncate text-body-md">
            Search matches, players...
          </span>
        </div>

        <button className="grid size-10 place-items-center rounded-full text-primary hover:bg-surface-container">
          <Icon name="bell" className="h-5 w-5" />
        </button>
        <button className="grid size-10 place-items-center rounded-full text-primary hover:bg-surface-container">
          <Icon name="user" className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
};

export default TopBar;
