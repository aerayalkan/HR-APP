import React, { useEffect, useState } from 'react';
import { updateEmployee } from '../api';

const AdminProfile = () => {
    const [adminProfile, setAdminProfile] = useState({ firstName: '', lastName: '', username: '', password: '' });

    useEffect(() => {
        // Burada mevcut admin profilini API'den çekip state'e set edebilirsiniz.
    }, []);

    const handleUpdate = async () => {
        const employeeId = 1; // Admin'in ID'si, genelde sabit veya kullanıcıdan alınabilir.
        const response = await updateEmployee(employeeId, adminProfile);
        setAdminProfile(response.data);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Admin Profile</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="mb-4">
                    <label className="block text-gray-700">First Name:</label>
                    <input type="text" value={adminProfile.firstName} onChange={(e) => setAdminProfile({ ...adminProfile, firstName: e.target.value })} className="border rounded-lg px-4 py-2 mb-2 w-full" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Last Name:</label>
                    <input type="text" value={adminProfile.lastName} onChange={(e) => setAdminProfile({ ...adminProfile, lastName: e.target.value })} className="border rounded-lg px-4 py-2 mb-2 w-full" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Username:</label>
                    <input type="text" value={adminProfile.username} onChange={(e) => setAdminProfile({ ...adminProfile, username: e.target.value })} className="border rounded-lg px-4 py-2 mb-2 w-full" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password:</label>
                    <input type="password" value={adminProfile.password} onChange={(e) => setAdminProfile({ ...adminProfile, password: e.target.value })} className="border rounded-lg px-4 py-2 mb-2 w-full" />
                </div>
                <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition" onClick={handleUpdate}>Update Profile</button>
            </div>
        </div>
    );
};

export default AdminProfile;
