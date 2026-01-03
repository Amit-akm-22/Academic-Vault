import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import { FileText, Database, Shield, Zap, ArrowRight, ExternalLink, Search, Filter, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({ totalDocs: 0, categories: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${user.token}` }
                };
                const { data } = await axios.get('http://localhost:5000/api/documents', config);
                setStats({
                    totalDocs: data.length,
                    categories: [...new Set(data.map(d => d.category))].length
                });
            } catch (error) {
                console.error(error);
            }
        };
        if (user) fetchStats();
    }, [user]);

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem', paddingBottom: '2rem' }}>
            <header className="dashboard-header" style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontWeight: '800', marginBottom: '0.25rem', background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>
                    Welcome, {user?.name.split(' ')[0]} 👋
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Here's what's happening in your digital vault today.</p>
            </header>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'white', color: 'black', border: '1px solid white' }}>
                        <FileText size={24} />
                    </div>
                    <div>
                        <h3 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.1rem' }}>{stats.totalDocs}</h3>
                        <p style={{ color: 'var(--text-muted)', fontWeight: '500', fontSize: '0.85rem' }}>Documents Secured</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(255, 255, 255, 0.1)', color: 'white', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                        <Database size={24} />
                    </div>
                    <div>
                        <h3 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.1rem' }}>{stats.categories}</h3>
                        <p style={{ color: 'var(--text-muted)', fontWeight: '500', fontSize: '0.85rem' }}>Active Categories</p>
                    </div>
                </div>

                <div className="stat-card hide-on-mobile">
                    <div className="stat-icon" style={{ background: 'rgba(255, 255, 255, 0.05)', color: '#888', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                        <Shield size={24} />
                    </div>
                    <div>
                        <h3 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.1rem' }}>Active</h3>
                        <p style={{ color: 'var(--text-muted)', fontWeight: '500', fontSize: '0.85rem' }}>Protection Level</p>
                    </div>
                </div>
            </div>

            <div className="filter-bar" style={{ marginTop: '2rem' }}>
                <div className="search-wrapper">
                    <Search size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', zIndex: 1 }} />
                    <input
                        type="text"
                        placeholder="Search across all docs..."
                        className="form-input"
                        style={{ paddingLeft: '3.5rem' }}
                    />
                </div>
                <div className="filter-wrapper hide-on-mobile">
                    <Filter size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none', zIndex: 1 }} />
                    <select className="form-input" style={{ paddingLeft: '3.5rem', appearance: 'none' }}>
                        <option value="">Quick Filter</option>
                        <option value="Certificate">Certificates</option>
                        <option value="Result">Results</option>
                        <option value="Admit Card">Admit Cards</option>
                    </select>
                    <ChevronDown size={18} style={{ position: 'absolute', right: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none', zIndex: 1 }} />
                </div>
            </div>

            <div className="quick-actions-card" style={{
                marginTop: '3rem',
                background: 'rgba(255, 255, 255, 0.02)',
                padding: 'min(3rem, 5vw)',
                borderRadius: '2.5rem',
                border: '1px solid var(--glass-border)',
                backdropFilter: 'blur(10px)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        <Zap size={20} color="white" fill="white" />
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Quick Actions</h2>
                    </div>

                    <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
                        <Link to="/upload" className="btn" style={{ textDecoration: 'none', background: 'white', color: 'black', padding: '1.25rem' }}>
                            <span>Upload Document</span>
                            <ArrowRight size={18} />
                        </Link>

                        <Link to="/documents" className="btn" style={{ background: 'transparent', color: 'var(--text-main)', border: '1px solid #333', textDecoration: 'none', padding: '1.25rem' }}>
                            <span>Explore Library</span>
                            <ExternalLink size={18} />
                        </Link>
                    </div>
                </div>

                {/* Decorative glow */}
                <div style={{
                    position: 'absolute',
                    top: '-50%',
                    right: '-20%',
                    width: '300px',
                    height: '300px',
                    background: 'rgba(255,255,255,0.05)',
                    filter: 'blur(100px)',
                    opacity: 0.1,
                    zIndex: 0
                }}></div>
            </div>
        </div>
    );
};

export default Dashboard;
