import React from 'react';
import { Delete, Pencil } from 'lucide-react';
const EditButton=({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
      title="Edit"
    >
      <Pencil className="h-5 w-5" />
    </button>
  );
}
const DeleteButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-2 text-red-600 hover:bg-red-50 rounded-full"
      title="Delete"
    >
      <Delete className="h-5 w-5" />
    </button>
  );
}

export { EditButton,DeleteButton };