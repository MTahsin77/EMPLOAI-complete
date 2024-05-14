"use client";
import React, { useEffect, useState } from "react";
import OrgModal from "./OrgModal";
import UserModal from "./UserModal";
import EditModal from "./EditModal";
import { Button } from "@/components/ui/button";

function AddUser() {
  const [users, setUsers] = useState({});
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isOrgModalOpen, setIsOrgModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const toggleUserModal = () => {
    setIsUserModalOpen(!isUserModalOpen);
  };

  const toggleOrgModal = () => {
    setIsOrgModalOpen(!isOrgModalOpen);
  };
  const toggleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  useEffect(() => {
    fetchUsers();
  }, [toggleUserModal, toggleOrgModal, toggleEditModal]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      const data = await response.json();
      const groupedUsers = {};

      // Group users by organization
      data.users.forEach((user) => {
        if (!groupedUsers[user.organization]) {
          groupedUsers[user.organization] = [user];
        } else {
          groupedUsers[user.organization].push(user);
        }
      });

      setUsers(groupedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto mt-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold mb-4">
              Add User to Department
            </h1>
            <div className="flex w-full justify-between items-center  ">
              <Button
                onClick={toggleOrgModal}
                type="button"
               
              >
                Add Department
              </Button>
              <button
                type="button"
                className="font-semibold bg-blackhover:bg-blue-700 text-black hover:cursor-pointer py-2 px-4 rounded"
                onClick={toggleUserModal}
              >
                Add User
              </button>
            </div>
          </div>

          <UserModal isOpen={isUserModalOpen} toggleModal={toggleUserModal} />
          <OrgModal
            isOpen={isOrgModalOpen}
            toggleModal={toggleOrgModal}
            users={users}
          />
          <EditModal
            isOpen={isEditModalOpen}
            toggleModal={toggleEditModal}
            users={users}
          />

          {/* Render users grouped by organization */}
          {Object.entries(users).map(([organization, userList]) => (
            <div
              key={organization}
              className="border border-gray-300 rounded mb-4"
            >
              <div className="flex  items-center justify-between m-2 ">
                <h2 className="text-lg font-semibold mb-2 px-4 py-2 bg-gray-200">
                  {organization !== "null" ? organization : "No Organization"}
                </h2>
                {/* <Button onClick={toggleEditModal}>Edit Department</Button> */}
              </div>

              <div className="overflow-hidden">
                <table className="py-5 w-full">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Last Name
                      </th>
                      <th className="px-6 py-3 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Address
                      </th>
                      <th className="px-6 py-3 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        City
                      </th>
                      <th className="px-6 py-3 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {userList.map((user) => (
                      <tr
                        key={user.id}
                        className="cursor-pointer hover:bg-gray-100"
                      >
                        <td className="px-6 py-4 whitespace-no-wrap">
                          {user.firstName}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap">
                          {user.lastName}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap">
                          {user.address}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap">
                          {user.city}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap">
                          {user.email}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default AddUser;
