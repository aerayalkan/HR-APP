import React, { useState } from 'react';

const AdminProfile = () => {
    const [password, setPassword] = useState('');

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Password güncelleme işlemi burada yapılacak
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Admin Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">New Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                    Update Password
                </button>
            </form>
        </div>
    );
};

export default AdminProfile;
