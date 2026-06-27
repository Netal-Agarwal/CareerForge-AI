function RecommendationCard(){

    return(

        <div className="bg-slate-800 rounded-2xl p-8">

            <h2 className="text-2xl font-bold">

                AI Recommendation

            </h2>

            <div className="mt-8">

                <div className="bg-slate-900 rounded-xl p-5">

                    <h3 className="text-purple-400">

                        Recommended Skill

                    </h3>

                    <p className="mt-3">

                        Learn Docker to improve Backend readiness.

                    </p>

                </div>

                <div className="bg-slate-900 rounded-xl p-5 mt-5">

                    <h3 className="text-purple-400">

                        Next Milestone

                    </h3>

                    <p className="mt-3">

                        Complete 3 mock interviews.

                    </p>

                </div>

            </div>

        </div>

    )

}

export default RecommendationCard;