import DashboardLayout from "../components/DashboardLayout";

function Dashboard() {
  return (
    <DashboardLayout>

      <div className="grid grid-cols-3 gap-8">

        <div className="bg-slate-800 rounded-2xl p-8 h-52">
          Dashboard Cards Coming Tomorrow
        </div>

        <div className="bg-slate-800 rounded-2xl p-8 h-52" />

        <div className="bg-slate-800 rounded-2xl p-8 h-52" />

      </div>

    </DashboardLayout>
  );
}

export default Dashboard;