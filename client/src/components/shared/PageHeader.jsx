const PageHeader = ({ eyebrow, title, description, action }) => {
  return (
    <header className="flex flex-col gap-md border-b border-outline-variant pb-lg sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-3xl">
        <p className="text-label-caps text-live">{eyebrow}</p>
        <h1 className="mt-xs text-headline-lg text-primary">{title}</h1>
        <p className="mt-sm text-body-md text-on-surface-variant">
          {description}
        </p>
      </div>
      {action}
    </header>
  );
};

export default PageHeader;
