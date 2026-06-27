import DashboardLayout from "../components/DashboardLayout";

import AnalyticsCard from "../components/AnalyticsCard";
import RecommendationCard from "../components/RecommendationCard";
import TargetRoles from "../components/TargetRoles";
import RecentActivity from "../components/RecentActivity";

function Dashboard(){

    return(

        <DashboardLayout>

            <div className="grid grid-cols-3 gap-6">

                <AnalyticsCard

                title="Career Readiness"

                value="72"

                subtitle="+5% this month"

                />

                <AnalyticsCard

                title="ATS Score"

                value="68"

                subtitle="Keyword Density"

                />

                <AnalyticsCard

                title="Resume Score"

                value="75"

                subtitle="Strong Experience"

                />

            </div>

            <div className="grid grid-cols-3 gap-6 mt-8">

                <div className="col-span-2">

                    <RecommendationCard/>

                </div>

                <TargetRoles/>

            </div>

            <div className="grid grid-cols-3 gap-6 mt-8">

                <div className="col-span-2">

                    <RecentActivity/>

                </div>

                <div className="bg-purple-600 rounded-2xl p-8">

                    <h2 className="text-3xl font-bold">

                        Unlock AI Interview Prep

                    </h2>

                    <p className="mt-5">

                        Practice technical interviews powered by AI.

                    </p>

                </div>

            </div>

        </DashboardLayout>

    )

}

export default Dashboard;