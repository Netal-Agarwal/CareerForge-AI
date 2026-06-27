function SkillCard({
  name,
  status = "matched",
  proficiency,
  description,
}) {
  const statusStyles = {
    matched: {
      badge: "bg-emerald-500/10 text-emerald-400",
      label: "Matched",
    },
    missing: {
      badge: "bg-red-500/10 text-red-400",
      label: "Missing",
    },
    learning: {
      badge: "bg-amber-500/10 text-amber-400",
      label: "Learning",
    },
  };

  const style = statusStyles[status] ?? statusStyles.matched;

  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-800/50 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-white">{name}</h3>
          {description && (
            <p className="mt-1 text-sm text-slate-400">{description}</p>
          )}
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${style.badge}`}
        >
          {style.label}
        </span>
      </div>

      {proficiency && (
        <p className="mt-3 text-xs uppercase tracking-wide text-slate-500">
          Proficiency:{" "}
          <span className="font-medium text-slate-300">{proficiency}</span>
        </p>
      )}
    </div>
  );
}

export default SkillCard;
