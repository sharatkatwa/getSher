const AdminTable = ({ columns, rows, renderActions }) => {
  return (
    <div className="overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left">
          <thead className="bg-surface-container text-label-data text-on-surface-variant">
            <tr>
              {columns.map((column) => (
                <th className="px-md py-sm" key={column.key}>
                  {column.label}
                </th>
              ))}
              {renderActions && <th className="px-md py-sm text-right">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr className="border-t border-outline-variant" key={row.id || row._id}>
                {columns.map((column) => (
                  <td className="px-md py-sm text-body-sm text-on-surface" key={column.key}>
                    {/* Optional column renderers keep table data-driven without custom tables per page. */}
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
                {renderActions && (
                  <td className="px-md py-sm">
                    <div className="flex justify-end gap-xs">{renderActions(row)}</div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTable;
