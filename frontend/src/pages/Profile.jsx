import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { User, Mail, Shield, Calendar, Award, Fingerprint } from 'lucide-react';

const Profile = () => {
    const { user } = useContext(AuthContext);

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <header style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem', background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>
                    Digital Identity
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Manage your verified profile and security settings.</p>
            </header>

            <div style={{
                background: 'rgba(255, 255, 255, 0.02)',
                padding: '3.5rem 3rem',
                borderRadius: '2.5rem',
                border: '1px solid var(--glass-border)',
                backdropFilter: 'blur(20px)',
                boxShadow: 'var(--card-shadow)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '3.5rem', position: 'relative', zIndex: 1 }}>
                    <div style={{
                        width: '7rem',
                        height: '7rem',
                        borderRadius: '2rem',
                        background: 'var(--accent-gradient)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white',
                        marginRight: '2.5rem',
                        fontSize: '3rem',
                        fontWeight: '800',
                        boxShadow: '0 10px 30px rgba(124, 58, 237, 0.4)',
                        transform: 'rotate(-5deg)'
                    }}>
                        {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--text-main)' }}>{user?.name}</h2>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <span style={{
                                padding: '0.4rem 1rem',
                                background: 'rgba(16, 185, 129, 0.1)',
                                color: '#10b981',
                                border: '1px solid rgba(16, 185, 129, 0.2)',
                                borderRadius: '2rem',
                                fontSize: '0.85rem',
                                fontWeight: '700',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem'
                            }}>
                                <Shield size={14} />
                                {user?.role || 'Verified User'}
                            </span>
                            <span style={{
                                padding: '0.4rem 1rem',
                                background: 'rgba(255, 255, 255, 0.05)',
                                color: 'var(--text-muted)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '2rem',
                                fontSize: '0.85rem',
                                fontWeight: '700'
                            }}>
                                ID: {user?._id?.slice(-8).toUpperCase()}
                            </span>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', position: 'relative', zIndex: 1 }}>
                    <div style={{ padding: '1.5rem', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-color)', borderRadius: '1.5rem', transition: 'var(--transition)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', color: 'var(--text-muted)', gap: '0.75rem' }}>
                            <User size={18} color="#7c3aed" />
                            <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>Full Name</span>
                        </div>
                        <p style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--text-main)' }}>{user?.name}</p>
                    </div>

                    <div style={{ padding: '1.5rem', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-color)', borderRadius: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', color: 'var(--text-muted)', gap: '0.75rem' }}>
                            <Mail size={18} color="#db2777" />
                            <span style={{ fontSize: '0.90rem', fontWeight: '600' }}>Email Address</span>
                        </div>
                        <p style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--text-main)' }}>{user?.email}</p>
                    </div>

                    <div style={{ padding: '1.5rem', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-color)', borderRadius: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', color: 'var(--text-muted)', gap: '0.75rem' }}>
                            <Calendar size={18} color="#10b981" />
                            <span style={{ fontSize: '0.90rem', fontWeight: '600' }}>Member Since</span>
                        </div>
                        <p style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--text-main)' }}>{new Date(user?.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric', day: 'numeric' })}</p>
                    </div>

                    <div style={{ padding: '1.5rem', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-color)', borderRadius: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', color: 'var(--text-muted)', gap: '0.75rem' }}>
                            <Fingerprint size={18} color="#f59e0b" />
                            <span style={{ fontSize: '0.90rem', fontWeight: '600' }}>Encryption Status</span>
                        </div>
                        <p style={{ fontWeight: '700', fontSize: '1.1rem', color: '#10b981' }}>Active & Secure</p>
                    </div>
                </div>

                {/* Decorative background element */}
                <div style={{
                    position: 'absolute',
                    top: '-20%',
                    right: '-10%',
                    width: '400px',
                    height: '400px',
                    background: 'var(--primary-glow)',
                    filter: 'blur(120px)',
                    opacity: 0.05,
                    zIndex: 0
                }}></div>
            </div>

            <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'center' }}>
                <button className="btn" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>
                    <Award size={18} />
                    <span>Request Digital Verification</span>
                </button>
            </div>
        </div>
    );
};

export default Profile;
