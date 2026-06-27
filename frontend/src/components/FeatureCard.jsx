function FeatureCard({ title, description, icon }) {
    return (
      <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-purple-500 hover:-translate-y-2 transition duration-300">
  
        <div className="text-5xl mb-5">
          {icon}
        </div>
  
        <h2 className="text-2xl font-semibold mb-3">
          {title}
        </h2>
  
        <p className="text-gray-400">
          {description}
        </p>
  
      </div>
    );
  }
  
  export default FeatureCard;