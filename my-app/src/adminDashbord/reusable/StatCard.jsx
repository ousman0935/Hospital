export const StatCard = ({ title, value, color }) => (
  <div className="bg-white rounded shadow p-4 text-center">
    <p className="text-sm text-slate-500">{title}</p>
    <p className={`text-2xl font-bold text-${color}-600`}>{value}</p>
  </div>
);
