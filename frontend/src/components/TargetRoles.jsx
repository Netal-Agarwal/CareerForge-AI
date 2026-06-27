function TargetRoles(){

    const roles=[

        {
            name:"Backend Developer",
            score:88
        },

        {
            name:"Cloud Engineer",
            score:76
        },

        {
            name:"DevOps Engineer",
            score:69
        }

    ]

    return(

        <div className="bg-slate-800 rounded-2xl p-8">

            <h2 className="text-2xl font-bold">

                Target Roles

            </h2>

            {

                roles.map(role=>(

                    <div
                    key={role.name}
                    className="mt-8">

                        <div className="flex justify-between">

                            <span>

                                {role.name}

                            </span>

                            <span>

                                {role.score}%

                            </span>

                        </div>

                        <div className="bg-slate-700 h-3 rounded-full mt-3">

                            <div

                            className="bg-purple-600 h-3 rounded-full"

                            style={{

                                width:`${role.score}%`

                            }}

                            />

                        </div>

                    </div>

                ))

            }

        </div>

    )

}

export default TargetRoles;