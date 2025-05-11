import React from 'react';

function StatCard({ title, value, icon, color }) {
  const borderColors = {
    blue: 'border-blue-500',
    teal: 'border-teal-500',
    orange: 'border-orange-500',
    red: 'border-red-500'
  };
  
  const bgColors = {
    blue: 'bg-blue-50',
    teal: 'bg-teal-50',
    orange: 'bg-orange-50',
    red: 'bg-red-50'
  };
  
  const textColors = {
    blue: 'text-blue-600',
    teal: 'text-teal-600',
    orange: 'text-orange-600',
    red: 'text-red-600'
  };

  return (
    <div className={`stat-card ${borderColors[color]}`}>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${bgColors[color]}`}>
        <div className={textColors[color]}>
          {icon}
        </div>
      </div>
    </div>
  );
}

export default StatCard;