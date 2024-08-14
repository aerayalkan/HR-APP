import React, { useEffect, useState } from 'react';
import { updateEmployee } from '../api';

const EmployeeProfile = () => {
    const [employeeProfile, setEmployeeProfile] = useState({ password: '' });

    useEffect(() => {
        // Burada mevcut çalışan profilini API'den çekip state'e set edebilirsiniz.
    }, []);

    const handleUpdate = async () => {
        const employeeId = 1; // Çalışan'ın ID'si, oturumdan veya kullanıcıdan alınabilir.
        const response = await updateEmployee(employeeId, employeeProfile);
        setEmployeeProfile(response.data);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">My Profile</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="mb-4">
                    <label className="block text-gray-700">New Password:</label>
                    <input type="password" value={employeeProfile.password} onChange={(e) => setEmployeeProfile({ ...employeeProfile, password: e.target.value })} className="border rounded-lg px-4 py-2 mb-2 w-full" />
                </div>
                <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition" onClick={handleUpdate}>Update Password</button>
            </div>
        </div>
    );
};

export default EmployeeProfile;
