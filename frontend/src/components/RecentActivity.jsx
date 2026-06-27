function RecentActivity({report}){

    if (!report) {

        return null;
    
    }

    return(

        <div className="bg-slate-800 rounded-2xl p-8">

            <h2 className="text-2xl font-bold">

                Recent Activity

            </h2>

            <ul className="mt-8 space-y-5">

            {

                report?.learning_roadmap?.map((item) => (

                    <li
                        key={item.skill}
                        className="bg-slate-900 rounded-lg p-4"
                    >

                        <p className="font-semibold">

                            {item.skill}

                        </p>

                        <p className="text-gray-400 mt-2">

                            Priority : {item.priority}

                        </p>

                    </li>

                ))

            }

            </ul>

        </div>

    )

}

export default RecentActivity;