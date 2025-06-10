import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';
import { toast } from 'react-toastify';
import * as XLSX from 'xlsx'; // Import xlsx library

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]); // State for filtered users
    const [searchQuery, setSearchQuery] = useState(""); // State for search input
    const [showUsers, setShowUsers] = useState(false);
    const [verifying, setVerifying] = useState({});
    const [codeInputs, setCodeInputs] = useState({});
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem('adminToken');
    const navigate = useNavigate();

    // Fetch users from backend
    const fetchUsers = async () => {
        console.log('Token:', token); // Debug log
        setLoading(true);
        setShowUsers(true);
        setMessage('');
        try {
            const res = await axios.get(`${serverUrl}/api/admin/get-users`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(res.data.users || []);
            setFilteredUsers(res.data.users || []); // Initialize filtered users
        } catch (err) {
            if (err.response?.status === 401) {
                toast.error('Session expired. Please log in again.');
                localStorage.removeItem('adminToken'); // Clear the token
                navigate('/login'); // Redirect to login
            } else {
                setMessage('Failed to fetch users.');
            }
        } finally {
            setLoading(false);
        }
    };

    // Verify a user by email and code
    const verifyUser = async (email) => {
        setVerifying((prev) => ({ ...prev, [email]: true }));
        setMessage('');
        try {
            const code = codeInputs[email];
            const res = await axios.post(
                `${serverUrl}/api/admin/verify-code`,
                { email, code },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success(res.data.message || 'User verified!');
            setUsers((users) =>
                users.map((user) =>
                    user.email === email ? { ...user, checkedIn: true } : user
                )
            );
            setFilteredUsers((users) =>
                users.map((user) =>
                    user.email === email ? { ...user, checkedIn: true } : user
                )
            );
        } catch (err) {
            if (err.response?.status === 401) {
                toast.error('Session expired. Please log in again.');
                navigate('/login'); // Redirect to login if token is invalid
            } else {
                toast.error(err.response?.data?.message || 'Verification failed.');
            }
        } finally {
            setVerifying((prev) => ({ ...prev, [email]: false }));
        }
    };

    // Search functionality
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = users.filter(
            (user) =>
                user.name.toLowerCase().includes(query) ||
                user.email.toLowerCase().includes(query)
        );
        setFilteredUsers(filtered);
    };

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem('adminToken'); // Clear the token
        navigate('/login'); // Redirect to login page
    };

    // Download users as Excel file
    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(users); // Convert users to worksheet
        const workbook = XLSX.utils.book_new(); // Create a new workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, "Users"); // Append worksheet to workbook
        XLSX.writeFile(workbook, "users.xlsx"); // Download the file
    };

    return (
        <div className="min-h-screen bg-[#f5f5f5] flex flex-col items-center p-4">
            <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold text-[#060606]">Admin Dashboard</h1>
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                    >
                        Logout
                    </button>
                </div>
                <button
                    onClick={fetchUsers}
                    className="bg-[#060606] text-white px-6 py-2 rounded-md hover:bg-[#222] transition mb-4"
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Show All Users'}
                </button>
                {message && (
                    <div className="my-2 text-center text-sm text-red-600">{message}</div>
                )}
                {showUsers && (
                    <>
                        {/* Search Input */}
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Search by name or email"
                                value={searchQuery}
                                onChange={handleSearch}
                                className="w-full border px-4 py-2 rounded-md text-sm"
                            />
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full border mt-4 text-sm">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="border px-4 py-2 text-left">Name</th>
                                        <th className="border px-4 py-2 text-left">Email</th>
                                        <th className="border px-4 py-2 text-center">Checked In</th>
                                        <th className="border px-4 py-2 text-center">Verify</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="text-center py-4">
                                                No users found.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredUsers.map((user) => (
                                            <tr key={user._id} className="hover:bg-gray-50">
                                                <td className="border px-4 py-2">{user.name}</td>
                                                <td className="border px-4 py-2">{user.email}</td>
                                                <td className="border px-4 py-2 text-center">
                                                    {user.checkedIn ? (
                                                        <span className="text-green-600 font-semibold">Yes</span>
                                                    ) : (
                                                        <span className="text-orange-600">No</span>
                                                    )}
                                                </td>
                                                <td className="border px-4 py-2 text-center">
                                                    {user.checkedIn ? (
                                                        <span className="text-green-500">Verified</span>
                                                    ) : (
                                                        <div className="flex flex-col sm:flex-row items-center gap-2">
                                                            <input
                                                                type="text"
                                                                placeholder="Enter code"
                                                                value={codeInputs[user.email] || ''}
                                                                onChange={(e) =>
                                                                    setCodeInputs({
                                                                        ...codeInputs,
                                                                        [user.email]: e.target.value,
                                                                    })
                                                                }
                                                                className="border px-2 py-1 rounded w-28 text-sm"
                                                            />
                                                            <button
                                                                onClick={() => verifyUser(user.email)}
                                                                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition text-sm"
                                                                disabled={verifying[user.email]}
                                                            >
                                                                {verifying[user.email] ? 'Verifying...' : 'Verify'}
                                                            </button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                        {/* Download Button */}
                        <div className="mt-6 text-center">
                            <button
                                onClick={downloadExcel}
                                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
                            >
                                Download Data
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;