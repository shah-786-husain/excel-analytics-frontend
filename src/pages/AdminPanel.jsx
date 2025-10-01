import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/"); // redirect if not admin
    } else {
      fetchUsers();
      fetchFiles();
    }
  }, [user, navigate]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "https://excel-analytics-backend-5umy.onrender.com/api/admin/users",
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchFiles = async () => {
    try {
      const res = await axios.get(
        "https://excel-analytics-backend-5umy.onrender.com/api/admin/files",
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setFiles(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("Delete this user?")) {
      try {
        await axios.delete(
          `https://excel-analytics-backend-5umy.onrender.com/api/admin/users/${id}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        fetchUsers();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const updateUserRole = async (id, role) => {
    try {
      await axios.put(
        `https://excel-analytics-backend-5umy.onrender.com/api/admin/users/${id}/role`,
        { role },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteFile = async (id) => {
    if (window.confirm("Delete this file?")) {
      try {
        await axios.delete(
          `https://excel-analytics-backend-5umy.onrender.com/api/admin/files/${id}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        fetchFiles();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

      {/* Users Table */}
      <h2 className="text-lg font-semibold mb-2">Users</h2>
      <table className="w-full border mb-6">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Change Role</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td className="p-2 border">{u.name}</td>
              <td className="p-2 border">{u.email}</td>
              <td className="p-2 border font-semibold">{u.role}</td>
              <td className="p-2 border text-center">
                <select
                  value={u.role}
                  onChange={(e) => updateUserRole(u._id, e.target.value)}
                  className="border p-1 rounded"
                  disabled={u._id === user._id} // prevent changing own role
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td className="p-2 border text-center">
                {u.role !== "admin" && (
                  <button
                    onClick={() => deleteUser(u._id)}
                    className="px-2 py-1 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Files Table */}
      <h2 className="text-lg font-semibold mb-2">Uploaded Files</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">File Name</th>
            <th className="p-2 border">Uploaded By</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {files.map((f) => (
            <tr key={f._id}>
              <td className="p-2 border">{f.fileName}</td>
              <td className="p-2 border">{f.user?.email || "N/A"}</td>
              <td className="p-2 border">
                {new Date(f.createdAt).toLocaleString()}
              </td>
              <td className="p-2 border text-center">
                <button
                  onClick={() => deleteFile(f._id)}
                  className="px-2 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
