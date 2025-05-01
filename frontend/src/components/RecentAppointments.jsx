import React from 'react';
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';

const RecentAppointments = ({ appointments }) => {
  if (!appointments || appointments.length === 0) {
    return (
      <div className="py-6 text-center text-gray-500">
        No recent appointments
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <div key={appointment.id} className="flex items-start p-4 bg-gray-50 rounded-lg">
          <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
            <span className="text-primary font-medium">{appointment.doctorInitials}</span>
          </div>
          <div className="ml-4 flex-1">
            <h4 className="font-medium">{appointment.doctorName}</h4>
            <p className="text-sm text-gray-600">{appointment.specialty}</p>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <CalendarIcon className="w-4 h-4 mr-1" />
              <span>{appointment.date}</span>
              <ClockIcon className="w-4 h-4 ml-3 mr-1" />
              <span>{appointment.time}</span>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs ${
            appointment.status === 'Completed' ? 'bg-green-100 text-green-800' :
            appointment.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {appointment.status}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentAppointments;