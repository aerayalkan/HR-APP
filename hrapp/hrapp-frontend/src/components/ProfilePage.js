import React, { useEffect, useState } from 'react';
import employeeService from '../services/employeeService';
import { useAuth } from '../services/authService';
import './ProfilePage.css';

const ProfilePage = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        employeeService.getEmployeeByUsername(user.username).then((response) => {
            setProfile(response.data);
        });
    }, [user.username]);

    return (
        <div className="profile-page">
            <h1>Profile</h1>
            {profile && (
                <div>
                    <p><strong>Ad:</strong> {profile.firstName}</p>
                    <p><strong>Soyad:</strong> {profile.lastName}</p>
                    <p><strong>Birim:</strong> {profile.department}</p>
                    <p><strong>Pozisyon:</strong> {profile.position}</p>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
