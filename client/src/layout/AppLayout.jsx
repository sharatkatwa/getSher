import { Outlet } from "react-router";

const AppLayout = () => {
  return (
    <div className="bg-green-500 text-black">
      <Outlet />
    </div>
  );
};

export default AppLayout;
