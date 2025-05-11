import React from 'react';

export const DeleteModal = ({ doctorToDelete, setShowDeleteModal, handleConfirmDelete }) => {
  if (!doctorToDelete) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Confirm Deletion</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete <strong>{doctorToDelete.name}</strong>?
        </p>
        <div className="flex justify-end gap-4">
          <button
            className="btn bg-gray-200 text-gray-800 hover:bg-gray-300"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </button>
          <button
            className="btn bg-red-600 text-white hover:bg-red-700"
            onClick={() => {
              handleConfirmDelete(doctorToDelete);
              setShowDeleteModal(false);
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
