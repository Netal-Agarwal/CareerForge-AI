function StatCard({ title, value, subtitle, icon, trend }) {
  const trendColor =
    trend > 0
      ? "text-emerald-400"
      : trend < 0
        ? "text-red-400"
        : "text-slate-400";

  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-800/50 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-400">{title}</p>
          <p className="mt-2 text-3xl font-bold text-white">{value}</p>
          {subtitle && (
            <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
          )}
          {typeof trend === "number" && (
            <p className={`mt-2 text-sm font-medium ${trendColor}`}>
              {trend > 0 ? "+" : ""}
              {trend}%
            </p>
          )}
        </div>
        {icon && (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

export default StatCard;
