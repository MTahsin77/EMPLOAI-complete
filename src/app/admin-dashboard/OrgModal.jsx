import React, { useState } from "react";

const OrgModal = ({ isOpen, toggleModal, users }) => {
  const [orgName, setOrgName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleUserSelection = (userId) => {
    // Toggle user selection
    if (selectedUsers.includes(userId)) {
      // If user ID is already in the selectedUsers array, remove it
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      // If user ID is not in the selectedUsers array, add it
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleAddOrganization = async (e) => {
    e.preventDefault();

    try {
      // Send request to update user profiles with organization name and selected users
      const response = await fetch("/api/user-profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          organization: orgName,
          userIds: selectedUsers,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add organization");
      }

      console.log("Organization added successfully");
      // Close modal
      toggleModal();
    } catch (error) {
      console.error("Error adding organization:", error.message);
      // Handle error
    }
  };

  // Flatten the users object into a single array
  const allUsers = Object.values(users).flat();

  return (
    isOpen && (
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none px-5 py-2">
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t py-6 px-3">
              <h3 className="text-3xl font=semibold">Add Organization</h3>
              <button
                className="bg-transparent border-0 text-black float-right"
                onClick={() => toggleModal()}
              >
                <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                  x
                </span>
              </button>
            </div>
            <div className="relative p-6 flex-auto">
              <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                <label className="block text-black text-sm font-bold mb-1">
                  Department Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                />
                <label className="block text-black text-sm font-bold mb-1">
                  Select Users
                </label>
                <div>
                  {allUsers.map((user) => (
                    <div key={user.id}>
                      <input
                        type="checkbox"
                        id={user.id}
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleUserSelection(user.id)}
                      />
                      <label htmlFor={user.id}>{user.firstName}</label>
                    </div>
                  ))}
                </div>
              </form>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                type="button"
                onClick={() => toggleModal()}
              >
                Close
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 border border-blue-700 rounded"
                type="button"
                onClick={handleAddOrganization}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default OrgModal;
