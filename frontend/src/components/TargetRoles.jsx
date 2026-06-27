function TargetRoles( {roles} ){


    if (!roles) {

        return null;
    
    }


    return(

        <div className="bg-slate-800 rounded-2xl p-8">

            <h2 className="text-2xl font-bold">

                Target Roles

            </h2>

            {

                roles?.map((role) => (

                    <div
                        key={role.role}
                        className="mt-8"
                    >

                        <div className="flex justify-between">

                            <span>

                                {role.role}

                            </span>

                            <span>

                                {role.match_score}%

                            </span>

                        </div>

                        <div className="bg-slate-700 h-3 rounded-full mt-3">

                            <div

                                className="bg-purple-600 h-3 rounded-full"

                                style={{
                                    width: `${role.match_score}%`
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


