import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { Trash2, FileText, Download, Filter, Search, MoreVertical, ExternalLink, ChevronDown } from 'lucide-react';

const MyDocuments = () => {
    const { user } = useContext(AuthContext);
    const [documents, setDocuments] = useState([]);
    const [filter, setFilter] = useState('');
    const [search, setSearch] = useState('');

    const fetchDocuments = async () => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` },
                params: {
                    category: filter,
                    keyword: search
                }
            };
            const { data } = await axios.get('http://localhost:5000/api/documents', config);
            setDocuments(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, [user, filter, search]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to permanently delete this document from your vault?')) {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${user.token}` }
                };
                await axios.delete(`http://localhost:5000/api/documents/${id}`, config);
                fetchDocuments();
            } catch (error) {
                console.error(error);
                alert('Failed to delete document');
            }
        }
    };

    const handleDownload = (fileUrl) => {
        window.open(`http://localhost:5000${fileUrl}`, '_blank');
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem', paddingBottom: '2rem' }}>
            <header style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontWeight: '800', marginBottom: '0.25rem', background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>
                    My Secure Vault
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Manage and access your encrypted academic records.</p>
            </header>

            <div className="filter-bar">
                <div className="search-wrapper">
                    <Search size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', zIndex: 1 }} />
                    <input
                        type="text"
                        placeholder="Search your library..."
                        className="form-input"
                        style={{ paddingLeft: '3.5rem' }}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="filter-wrapper hide-on-mobile">
                    <Filter size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none', zIndex: 1 }} />
                    <select
                        className="form-input"
                        style={{ paddingLeft: '3.5rem', appearance: 'none' }}
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        <option value="Certificate">Certificates</option>
                        <option value="Result">Results</option>
                        <option value="Admit Card">Admit Cards</option>
                        <option value="Resume">Resumes</option>
                        <option value="ID">ID Documents</option>
                    </select>
                    <ChevronDown size={18} style={{ position: 'absolute', right: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none', zIndex: 1 }} />
                </div>
            </div>

            {documents.length === 0 ? (
                <div style={{
                    textAlign: 'center',
                    padding: 'clamp(4rem, 10vw, 8rem) 1.5rem',
                    background: 'rgba(255, 255, 255, 0.02)',
                    borderRadius: '2rem',
                    border: '1px dashed var(--glass-border)'
                }}>
                    <FileText size={48} color="var(--glass-border)" style={{ marginBottom: '1.5rem' }} />
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>No documents found</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Try adjusting your search or upload a new record to the vault.</p>
                </div>
            ) : (
                <div className="docs-grid">
                    {documents.map((doc) => (
                        <div key={doc._id} className="doc-card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                                <div style={{
                                    width: '3rem',
                                    height: '3rem',
                                    background: 'white',
                                    borderRadius: '0.75rem',
                                    color: 'black',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    border: '1px solid white'
                                }}>
                                    <FileText size={20} />
                                </div>
                                <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                                    <MoreVertical size={18} />
                                </button>
                            </div>

                            <div style={{ marginBottom: '2rem' }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-main)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {doc.title}
                                </h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{
                                        fontSize: '0.7rem',
                                        padding: '0.25rem 0.6rem',
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        borderRadius: '2rem',
                                        color: 'var(--text-muted)',
                                        fontWeight: '600',
                                        border: '1px solid var(--border-color)'
                                    }}>
                                        {doc.category}
                                    </span>
                                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                                        • {new Date(doc.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button
                                    onClick={() => handleDownload(doc.fileUrl)}
                                    className="btn"
                                    style={{ flex: 1, padding: '0.65rem', fontSize: '0.85rem', background: 'white', color: 'black' }}
                                >
                                    <ExternalLink size={14} />
                                    <span>Access</span>
                                </button>

                                <button
                                    onClick={() => handleDelete(doc._id)}
                                    className="btn"
                                    style={{
                                        padding: '0.65rem',
                                        background: 'rgba(239, 68, 68, 0.05)',
                                        color: '#ef4444',
                                        border: '1px solid rgba(239, 68, 68, 0.1)'
                                    }}
                                    title="Revoke & Delete"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyDocuments;
