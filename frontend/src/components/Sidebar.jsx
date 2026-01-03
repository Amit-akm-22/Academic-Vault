import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Upload, FileText, User, LogOut, ShieldCheck, Code } from 'lucide-react';
import AuthContext from '../context/AuthContext';

const Sidebar = ({ isOpen, onClose }) => {
    const { logout } = useContext(AuthContext);

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <ShieldCheck size={32} color="white" />
                <span style={{ fontWeight: 900, fontSize: '1.25rem', letterSpacing: '-0.5px' }}>EduVault</span>
                <button className="sidebar-close" onClick={onClose}>
                    <LogOut size={24} style={{ transform: 'rotate(180deg)' }} />
                </button>
            </div>

            <nav style={{ flex: 1, marginTop: '2rem' }}>
                <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                    <Home size={20} />
                    <span>Dashboard</span>
                </NavLink>
                <NavLink to="/upload" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                    <Upload size={20} />
                    <span>Upload Docs</span>
                </NavLink>
                <NavLink to="/documents" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                    <FileText size={20} />
                    <span>Secure Vault</span>
                </NavLink>
                <NavLink to="/profile" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                    <User size={20} />
                    <span>User Profile</span>
                </NavLink>
                <NavLink to="/developer" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                    <Code size={20} />
                    <span>Developer</span>
                </NavLink>
            </nav>

            <div style={{ padding: '1rem', borderTop: '1px solid #222', marginTop: '2rem' }}>
                <button
                    onClick={logout}
                    className="nav-link"
                    style={{
                        background: 'transparent',
                        border: '1px solid #333',
                        cursor: 'pointer',
                        width: '100%',
                        textAlign: 'left',
                        color: '#ef4444',
                        borderRadius: '0.75rem'
                    }}
                >
                    <LogOut size={20} />
                    <span>End Session</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
