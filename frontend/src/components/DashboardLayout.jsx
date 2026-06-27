import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function DashboardLayout({ children }) {
  return (
    <div className="flex bg-slate-900 text-white">

      <Sidebar />

      <main className="flex-1 p-10">

        <Topbar />

        {children}

      </main>

    </div>
  );
}

export default DashboardLayout;