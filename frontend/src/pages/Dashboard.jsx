import { useEffect, useState } from "react";

import DashboardLayout from "../components/DashboardLayout";

import AnalyticsCard from "../components/AnalyticsCard";
import RecommendationCard from "../components/RecommendationCard";
import TargetRoles from "../components/TargetRoles";
import RecentActivity from "../components/RecentActivity";

import {
    getCareerReport,
    getCareerReadiness,
} from "../services/dashboardServices";



function Dashboard() {

    const [report, setReport] = useState(null);

    const [loading, setLoading] = useState(true);

    const [careerReadiness, setCareerReadiness] = useState(null);


    useEffect(() => {

        async function loadDashboard() {

            try {

                const reportData = await getCareerReport(
                    "backend_developer"
                );

                const readinessData = await getCareerReadiness("backend_developer");



                setReport(reportData);

                console.log("Career Report");

                console.log(reportData);

                setCareerReadiness(readinessData);

                console.log("Career Readiness");

                console.log(readinessData);



            }

            catch (error) {

                console.log(error);

            }

            finally {

                setLoading(false);

            }

        }

        loadDashboard();

    }, []);


    if (loading) {

        return (

            <div className="min-h-screen flex justify-center items-center bg-slate-900 text-white text-3xl">

                Loading Dashboard...

            </div>

        );

    }

    return (

        <DashboardLayout>

            <div className="grid grid-cols-3 gap-6">

                <div className="bg-slate-800 rounded-2xl p-8">

                    <h2 className="text-gray-400 text-xl">

                        Career Readiness

                    </h2>

                    <p className="text-gray-500 mt-2">

                        Backend Developer Track

                    </p>

                    <h1

                        className={`text-6xl font-bold mt-6

                        ${careerReadiness?.career_readiness_score >= 80

                                ? "text-green-400"

                                : careerReadiness?.career_readiness_score >= 60

                                    ? "text-yellow-400"

                                    : "text-red-400"

                            }`}

                    >

                        {careerReadiness?.career_readiness_score}

                    </h1>

                    <p className="text-xl mt-4 text-green-300">

                        {careerReadiness?.readiness_level}

                    </p>

                    <p className="text-gray-400 mt-6">

                        {careerReadiness?.advice}

                    </p>

                </div>

                <AnalyticsCard

                    title="ATS Score"

                    value="--"

                    subtitle="Upload Job Description"

                />

                <AnalyticsCard

                    title="Resume Score"

                    value={report?.resume_score ?? "--"}

                    subtitle={report?.grade ?? "Loading..."}

                />

                <div className="bg-slate-800 rounded-2xl p-8 mt-8">

                    <h2 className="text-2xl font-bold">

                        Career Summary

                    </h2>

                    <p className="text-gray-300 mt-6">

                        {report?.summary ?? "Loading Summary..."}

                    </p>

                </div>

            </div>

            <div className="grid grid-cols-3 gap-6 mt-8">

                <div className="col-span-2">

                    <RecommendationCard report={report} />

                </div>

                <TargetRoles roles={report?.recommended_roles} />

            </div>

            <div className="grid grid-cols-3 gap-6 mt-8">

                <div className="col-span-2">

                    <RecentActivity report={report} />

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