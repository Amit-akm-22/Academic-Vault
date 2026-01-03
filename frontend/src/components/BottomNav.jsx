import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Upload, FileText, User, Code } from 'lucide-react';

const BottomNav = () => {
    return (
        <div className="bottom-nav">
            <NavLink to="/" className={({ isActive }) => (isActive ? 'bottom-nav-item active' : 'bottom-nav-item')}>
                <Home size={22} />
                <span>Home</span>
            </NavLink>
            <NavLink to="/upload" className={({ isActive }) => (isActive ? 'bottom-nav-item active' : 'bottom-nav-item')}>
                <Upload size={22} />
                <span>Upload</span>
            </NavLink>
            <NavLink to="/documents" className={({ isActive }) => (isActive ? 'bottom-nav-item active' : 'bottom-nav-item')}>
                <FileText size={22} />
                <span>Vault</span>
            </NavLink>
            <NavLink to="/profile" className={({ isActive }) => (isActive ? 'bottom-nav-item active' : 'bottom-nav-item')}>
                <User size={22} />
                <span>Profile</span>
            </NavLink>
            <NavLink to="/developer" className={({ isActive }) => (isActive ? 'bottom-nav-item active' : 'bottom-nav-item')}>
                <Code size={22} />
                <span>Dev</span>
            </NavLink>
        </div>
    );
};

export default BottomNav;
