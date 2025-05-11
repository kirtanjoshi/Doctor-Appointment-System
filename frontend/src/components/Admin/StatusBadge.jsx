import React from 'react';

function StatusBadge({ status }) {
  const badgeClasses = {
    completed: 'status-badge status-completed',
    pending: 'status-badge status-pending',
    scheduled: 'status-badge status-scheduled',
  };
  
  const statusText = {
    completed: 'Completed',
    pending: 'Pending',
    scheduled: 'Scheduled',
  };
  
  return (
    <span className={badgeClasses[status]}>
      {statusText[status]}
    </span>
  );
}

export default StatusBadge;