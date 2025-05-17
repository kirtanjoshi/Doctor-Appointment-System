import React from 'react';

const StatsCard = ({ icon: Icon, count, title, subtitle, borderColor }) => {
  return (
    <div className={`flex items-start p-4 bg-white rounded-lg shadow-sm border-l-4 ${borderColor}`}>
      <div className="flex-1">
        <div className="text-3xl font-bold mb-1">{count}</div>
        <div className="text-gray-600">{title}</div>
        <div className="text-sm text-gray-500">{subtitle}</div>
      </div>
      <div className="ml-4">
        <Icon className="w-6 h-6 text-gray-400" />
      </div>
    </div>
  );
};

export default StatsCard;