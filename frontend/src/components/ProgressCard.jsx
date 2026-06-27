function ProgressCard({
  label,
  value = 0,
  max = 100,
  description,
  color = "purple",
}) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const barColors = {
    purple: "bg-purple-500",
    emerald: "bg-emerald-500",
    amber: "bg-amber-500",
    red: "bg-red-500",
  };

  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-800/50 p-5">
      <div className="mb-3 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-300">{label}</p>
          {description && (
            <p className="mt-1 text-xs text-slate-500">{description}</p>
          )}
        </div>
        <span className="text-lg font-semibold text-white">
          {Math.round(percentage)}%
        </span>
      </div>

      <div className="h-2.5 overflow-hidden rounded-full bg-slate-700">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColors[color] ?? barColors.purple}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressCard;
