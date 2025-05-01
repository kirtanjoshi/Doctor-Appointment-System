import React from 'react';
import { DocumentIcon } from '@heroicons/react/24/outline';

const RecentRecords = ({ records }) => {
  if (!records || records.length === 0) {
    return (
      <div className="py-6 text-center text-gray-500">
        No recent medical records
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {records.map((record) => (
        <div key={record.id} className="flex items-start p-4 bg-gray-50 rounded-lg">
          <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
            <DocumentIcon className="w-6 h-6 text-primary" />
          </div>
          <div className="ml-4 flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">{record.title}</h4>
              <span className="text-sm text-gray-500">{record.date}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{record.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentRecords;