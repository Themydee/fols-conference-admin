import React from 'react';
import { Link } from 'react-router-dom';

const AdminHome = () => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-[#f5f5f5] px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#060606] mb-6">Welcome, Admin</h1>
        <p className="text-gray-700 mb-8">
          Please choose an option below to continue:
        </p>
        <div className="flex flex-col gap-4">
          <Link to="/register">
            <button className="w-full bg-[#060606] text-white py-3 rounded-md font-semibold transition hover:bg-[#222]">
              Create Admin Account
            </button>
          </Link>
          <Link to="/login">
            <button className="w-full border border-[#060606] text-[#060606] py-3 rounded-md font-semibold transition hover:bg-[#060606] hover:text-white">
              Login as Admin
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;