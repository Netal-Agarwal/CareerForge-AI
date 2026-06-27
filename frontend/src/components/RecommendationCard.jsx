function RecommendationCard( {report} ){

    if (!report) {

        return null;
    
    }

    return(

        <div className="bg-slate-800 rounded-2xl p-8">

            <h2 className="text-2xl font-bold">

                AI Recommendation

            </h2>

            <div className="mt-8">

            {
                report?.strengths?.map((skill) => (

                    <div
                        key={skill}
                        className="bg-slate-900 rounded-xl p-4 mt-3"
                    >

                        <h3 className="text-purple-400">

                            Strength

                        </h3>

                        <p className="mt-2">

                            {skill}

                        </p>

                    </div>

                ))
            }

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