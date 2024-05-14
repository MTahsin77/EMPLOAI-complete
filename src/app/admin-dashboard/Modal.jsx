import React, { useState } from "react";

function Modal({ isOpen, onClose }) {
  const [organizationName, setOrganizationName] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [memberEmails, setMemberEmails] = useState([]);
  const [newMemberEmail, setNewMemberEmail] = useState("");

  const handleAddMember = () => {
    if (newMemberEmail && !memberEmails.includes(newMemberEmail)) {
      setMemberEmails([...memberEmails, newMemberEmail]);
      setNewMemberEmail("");
    }
  };

  const handleRemoveMember = (emailToRemove) => {
    setMemberEmails(memberEmails.filter((email) => email !== emailToRemove));
  };

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto px-10">
          <div className="flex items-center justify-center min-h-screen">
            <div
              className="fixed inset-0 bg-black opacity-25"
              onClick={onClose}
            />
            <div className="relative bg-white rounded-lg shadow-lg w-3/4 h-5/6 p-4 ">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Add Organization</h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 flex justify-center items-center"
                  onClick={onClose}
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 6.707a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414L11.414 12l3.293 3.293a1 1 0 01-1.414 1.414L10 13.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 12 5.293 8.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <form className="space-y-4" action="#">
                <div>
                  <label
                    htmlFor="organizationName"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Department Name
                  </label>
                  <input
                    type="text"
                    id="organizationName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="departmentName"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Department Name
                  </label>
                  <input
                    type="text"
                    id="departmentName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    value={departmentName}
                    onChange={(e) => setDepartmentName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="memberEmail"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Member Emails
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="email"
                      id="memberEmail"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={newMemberEmail}
                      onChange={(e) => setNewMemberEmail(e.target.value)}
                    />
                    <button
                      type="button"
                      className="bg-blue-500 text-white px-3 py-2 rounded-lg text-sm"
                      onClick={handleAddMember}
                    >
                      Add
                    </button>
                  </div>
                  <ul className="mt-2">
                    {memberEmails.map((email) => (
                      <li key={email} className="flex items-center space-x-2">
                        <span>{email}</span>
                        <button
                          type="button"
                          className="text-red-500"
                          onClick={() => handleRemoveMember(email)}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Add Organization
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
