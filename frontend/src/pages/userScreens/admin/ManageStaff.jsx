import React, { useState, useEffect } from "react";
import {
  getAllStaff,
  createStaff,
  updateStaff,
  deactivateStaff,
  activateStaff,
  deleteStaff,
  getAllRoles,
} from "../../../services/adminService";

const ManageStaff = () => {
  const [staffList, setStaffList] = useState([]);
  const [roles, setRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [formData, setFormData] = useState({
    sname: "",
    snic: "",
    semail: "",
    stelno: "",
    uname: "",
    upswrd: "",
    roleId: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadStaff();
    loadRoles();
  }, []);

  const loadStaff = async () => {
    try {
      const data = await getAllStaff();
      setStaffList(data);
    } catch (err) {
      setError("Failed to load staff");
    }
  };

  const loadRoles = async () => {
    try {
      const data = await getAllRoles();
      setRoles(data);
    } catch (err) {
      setError("Failed to load roles");
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (editingStaff) {
        await updateStaff(editingStaff.staffid, formData);
      } else {
        await createStaff(formData);
      }
      setShowModal(false);
      setEditingStaff(null);
      setFormData({
        sname: "",
        snic: "",
        semail: "",
        stelno: "",
        uname: "",
        upswrd: "",
        roleId: "",
      });
      loadStaff();
    } catch (err) {
      setError(err.response?.data || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (staff) => {
    setEditingStaff(staff);
    setFormData({
      sname: staff.sname,
      snic: staff.snic,
      semail: staff.semail,
      stelno: staff.stelno,
      uname: staff.uname,
      upswrd: "",
      roleId: staff.role?.roleId || "",
    });
    setShowModal(true);
  };

  const handleDeactivate = async (id) => {
    if (
      !window.confirm("Are you sure you want to deactivate this staff member?")
    )
      return;
    try {
      await deactivateStaff(id);
      loadStaff();
    } catch (err) {
      setError("Failed to deactivate staff");
    }
  };

  const handleActivate = async (id) => {
    try {
      await activateStaff(id);
      loadStaff();
    } catch (err) {
      setError("Failed to activate staff");
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to permanently delete this staff member?",
      )
    )
      return;
    try {
      await deleteStaff(id);
      loadStaff();
    } catch (err) {
      setError("Failed to delete staff");
    }
  };

  const handleRoleChange = async (staffId, newRoleId) => {
    try {
      await updateStaff(staffId, { roleId: newRoleId });
      loadStaff();
    } catch (err) {
      setError("Failed to update role");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Staff Management</h1>
        <button
          onClick={() => {
            setEditingStaff(null);
            setFormData({
              sname: "",
              snic: "",
              semail: "",
              stelno: "",
              uname: "",
              upswrd: "",
              roleId: "",
            });
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add New Staff
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                NIC
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {staffList.map((staff) => (
              <tr key={staff.staffid} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {staff.sname}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {staff.snic}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {staff.semail}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {staff.stelno}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {staff.uname}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <select
                    value={staff.role?.roleId || ""}
                    onChange={(e) =>
                      handleRoleChange(staff.staffid, e.target.value)
                    }
                    className="border rounded px-2 py-1 text-sm"
                  >
                    {roles.map((role) => (
                      <option key={role.roleId} value={role.roleId}>
                        {role.roleName}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {staff.isDeleted === 0 ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      Inactive
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(staff)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    Edit
                  </button>
                  {staff.isDeleted === 0 ? (
                    <button
                      onClick={() => handleDeactivate(staff.staffid)}
                      className="text-yellow-600 hover:text-yellow-900 mr-3"
                    >
                      Deactivate
                    </button>
                  ) : (
                    <button
                      onClick={() => handleActivate(staff.staffid)}
                      className="text-green-600 hover:text-green-900 mr-3"
                    >
                      Activate
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(staff.staffid)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">
              {editingStaff ? "Edit Staff" : "Add New Staff"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="sname"
                  value={formData.sname}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  NIC Number
                </label>
                <input
                  type="text"
                  name="snic"
                  value={formData.snic}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="semail"
                  value={formData.semail}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="stelno"
                  value={formData.stelno}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Username
                </label>
                <input
                  type="text"
                  name="uname"
                  value={formData.uname}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password {editingStaff && "(leave blank to keep current)"}
                </label>
                <input
                  type="password"
                  name="upswrd"
                  value={formData.upswrd}
                  onChange={handleInputChange}
                  required={!editingStaff}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Role
                </label>
                <select
                  name="roleId"
                  value={formData.roleId}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Role</option>
                  {roles.map((role) => (
                    <option key={role.roleId} value={role.roleId}>
                      {role.roleName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {loading ? "Saving..." : editingStaff ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStaff;
