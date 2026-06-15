import { Outlet } from "react-router"

const AdminLayout = () => {
  return (
    <div className="bg-red-500 text-black">
        <Outlet/>
    </div>
  )
}

export default AdminLayout