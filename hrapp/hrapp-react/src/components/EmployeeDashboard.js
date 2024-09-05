import React , {useState} from 'react';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import EmployeeProfile from './EmployeeProfile';
import MyInventories from './MyInventories';
import { logout } from '../utils/logout';

/*
const EmployeeDashboard = () => {
    const location = useLocation();

    // Dashboard sayfasında mıyız kontrolü
    const isDashboard = location.pathname === '/employee';

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-primary text-white py-4 flex justify-center items-center relative" style={{ backgroundColor: '#3336f3' }}>
                <h1 className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif', textAlign: 'center', width: '100%' }}>
                    Employee Dashboard
                </h1>
                <button onClick={logout} className="absolute right-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                    Logout
                </button>
            </header>
            <div className="flex">
                {!isDashboard && (
                    <nav className="w-64 bg-white shadow-lg p-4">
                        <ul className="space-y-4">
                            <li>
                                <Link to="/employee" className="block py-2 px-4 rounded hover:bg-primary hover:text-white transition">
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link to="/employee/profile" className="block py-2 px-4 rounded hover:bg-primary hover:text-white transition">
                                    My Profile
                                </Link>
                            </li>
                            <li>
                                <Link to="/employee/inventories" className="block py-2 px-4 rounded hover:bg-primary hover:text-white transition">
                                    My Inventories
                                </Link>
                            </li>
                        </ul>
                    </nav>
                )}
                <main className={`flex-1 p-2 ${isDashboard ? 'flex flex-col justify-center items-center' : ''}`}>
                    {isDashboard && (
                        <div className="flex flex-col justify-center items-center w-full h-[calc(100vh-4rem)]">
                            <div className="grid grid-cols-2 gap-8 w-full max-w-screen-lg">
                                <Link
                                    to="/employee/profile"
                                    className="flex justify-center items-center h-[20vh] bg-white rounded-lg hover:bg-primary hover:text-white transition transform hover:scale-105 duration-300 ease-in-out"
                                    style={{ boxShadow: '0 4px 6px rgb(51, 54, 243)' }}
                                >
                                    <span className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                                        My Profile
                                    </span>
                                </Link>
                                <Link
                                    to="/employee/inventories"
                                    className="flex justify-center items-center h-[20vh] bg-white rounded-lg hover:bg-primary hover:text-white transition transform hover:scale-105 duration-300 ease-in-out"
                                    style={{ boxShadow: '0 4px 6px rgb(51, 54, 243)' }}
                                >
                                    <span className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                                        My Inventories
                                    </span>
                                </Link>
                            </div>
                        </div>
                    )}
                    <Routes>
                        <Route path="profile" element={<EmployeeProfile />} />
                        <Route path="inventories" element={<MyInventories />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default EmployeeDashboard;
*/
const EmployeeDashboard = () => {
    const location = useLocation();
    const [hovered, setHovered] = useState(null);

    const isDashboard = location.pathname === '/employee';

    const handleMouseEnter = (index) => {
        setHovered(index);
    };

    const handleMouseLeave = () => {
        setHovered(null);
    };

    const getLinkStyle = (index) => {
        return hovered === index
            ? { ...styles.dashboardLink, ...styles.dashboardLinkHover }
            : styles.dashboardLink;
    };

    return (
        <div style={styles.body}>
            <header style={styles.header}>
                <h1 style={styles.title}>Employee Dashboard</h1>
                <button onClick={logout} style={styles.logoutButton}>Logout</button>
            </header>
            <div style={styles.mainContainer}>
                {!isDashboard && (
                    <nav style={styles.nav}>
                        <ul style={styles.navList}>
                            <li style={styles.navItem}>
                                <Link to="/employee" style={styles.navLink}>
                                    Dashboard
                                </Link>
                            </li>
                            <li style={styles.navItem}>
                                <Link to="/employee/profile" style={styles.navLink}>
                                    My Profile
                                </Link>
                            </li>
                            <li style={styles.navItem}>
                                <Link to="/employee/inventories" style={styles.navLink}>
                                    My Inventories
                                </Link>
                            </li>
                        </ul>
                    </nav>
                )}
                <main style={isDashboard ? styles.dashboardMain : styles.main}>
                    {isDashboard && (
                        <div style={styles.dashboardGrid}>
                            <Link
                                to="/employee/profile"
                                style={getLinkStyle(0)}
                                onMouseEnter={() => handleMouseEnter(0)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <span style={styles.dashboardLinkText}>My Profile</span>
                            </Link>
                            <Link
                                to="/employee/inventories"
                                style={getLinkStyle(1)}
                                onMouseEnter={() => handleMouseEnter(1)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <span style={styles.dashboardLinkText}>My Inventories</span>
                            </Link>
                        </div>
                    )}
                    <Routes>
                        <Route path="profile" element={<EmployeeProfile />} />
                        <Route path="inventories" element={<MyInventories />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

const styles = {
    body: {
        background: 'linear-gradient(135deg, #1E3C72, #2A5298, #6DD5FA, #FFFFFF)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        fontFamily: "'Montserrat', sans-serif",
    },
    header: {
        width: '100%',
        backgroundColor: 'rgba(205,216,251,0.38)',
        color: 'white',
        padding: '1rem 0',
        textAlign: 'center',
        position: 'relative',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    title: {
        fontSize: '2.5rem',
        fontFamily: 'Playfair Display, serif',
        margin: 0,
    },
    logoutButton: {
        position: 'absolute',
        right: '1rem',
        top: '50%',
        transform: 'translateY(-50%)',
        backgroundColor: '#FF4136',
        color: 'white',
        padding: '0.5rem 1rem',
        borderRadius: '0.5rem',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    mainContainer: {
        display: 'flex',
        width: '100%',
        flex: 1,
        paddingTop: '1rem',
    },
    nav: {
        width: '250px',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '1rem',
        borderRadius: '1rem',
        marginLeft: '1rem',
    },
    navList: {
        listStyle: 'none',
        padding: 0,
    },
    navItem: {
        marginBottom: '1rem',
    },
    navLink: {
        display: 'block',
        padding: '0.75rem 1rem',
        borderRadius: '0.5rem',
        color: '#fff',
        textDecoration: 'none',
        fontWeight: '500',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        transition: 'background-color 0.3s, color 0.3s',
    },
    dashboardMain: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    main: {
        flex: 1,
        padding: '1rem',
    },
    dashboardGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
        width: '100%',
        maxWidth: '900px',
    },
    dashboardLink: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '150px',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: '1rem',
        textDecoration: 'none',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: '1.5rem',
        transition: 'transform 0.3s, background-color 0.3s',
        boxShadow: '0 4px 6px rgba(51, 54, 243, 0.3)',
    },
    dashboardLinkHover: {
        transform: 'scale(1.05)',
        backgroundColor: 'rgba(230,237,255,0.99)',
        color: 'white',
    },
    dashboardLinkText: {
        fontFamily: 'Playfair Display, serif',
    },
};

export default EmployeeDashboard;