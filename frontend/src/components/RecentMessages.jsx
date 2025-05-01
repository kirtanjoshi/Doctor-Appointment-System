import React from 'react';
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';

const RecentMessages = ({ messages }) => {
  if (!messages || messages.length === 0) {
    return (
      <div className="py-6 text-center text-gray-500">
        No recent messages
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div key={message.id} className="flex items-start p-4 bg-gray-50 rounded-lg">
          <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
            <span className="text-primary font-medium">{message.senderInitials}</span>
          </div>
          <div className="ml-4 flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">{message.senderName}</h4>
              <span className="text-sm text-gray-500">{message.time}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{message.content}</p>
          </div>
          {message.unread && (
            <div className="w-2 h-2 bg-primary rounded-full"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RecentMessages;