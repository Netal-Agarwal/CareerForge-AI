function AnalyticsCard({
    title,
    value,
    subtitle
}){

    return(

        <div className="bg-slate-800 rounded-2xl p-8">

            <h3 className="text-gray-400 text-lg">

                {title}

            </h3>

            <h1 className="text-5xl font-bold mt-5">

                {value}

            </h1>

            <p className="text-green-400 mt-5">

                {subtitle}

            </p>

        </div>

    )

}

export default AnalyticsCard;