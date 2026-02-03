import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { Upload as UploadIcon, AlertCircle, CheckCircle, File, X, Info, Shield, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Upload = () => {
    const { user } = useContext(AuthContext);
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Certificate');
    const [message, setMessage] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const navigate = useNavigate();

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            setFile(droppedFile);
        }
    };


    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('category', category);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${user.token}`,
                },
            };

            await axios.post('https://academic-vault.onrender.com/api/documents', formData, config);
            setMessage({ type: 'success', text: 'Document secured in vault!' });
            setTimeout(() => navigate('/documents'), 1500);
        } catch (error) {
            console.error(error);
            setMessage({ type: 'error', text: 'Security handshake failed. Please try again.' });
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
            <header style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem', background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>
                    Upload Document
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Your files are encrypted and secured in the vault.</p>
            </header>

            <div className="upload-form-card" style={{
                background: 'rgba(255, 255, 255, 0.02)',
                padding: 'min(3rem, 5vw)',
                borderRadius: '2.5rem',
                border: '1px solid var(--glass-border)',
                backdropFilter: 'blur(20px)',
                boxShadow: 'var(--card-shadow)'
            }}>
                {message && (
                    <div style={{
                        padding: '1.25rem',
                        marginBottom: '2rem',
                        borderRadius: '1rem',
                        background: message.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                        color: message.type === 'success' ? '#10b981' : '#ef4444',
                        border: message.type === 'success' ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid rgba(239, 68, 68, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        fontWeight: '600'
                    }}>
                        {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleUpload}>
                    <div className="form-responsive-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label">Document Title</label>
                            <input
                                type="text"
                                className="form-input"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                placeholder="e.g., Final Marksheet"
                            />
                        </div>

                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label">Category</label>
                            <div style={{ position: 'relative' }}>
                                <select
                                    className="form-input"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    style={{ appearance: 'none', paddingRight: '3rem' }}
                                >
                                    <option value="Certificate">Certificate</option>
                                    <option value="Result">Result</option>
                                    <option value="Admit Card">Admit Card</option>
                                    <option value="Resume">Resume</option>
                                    <option value="ID">ID Document</option>
                                    <option value="Other">Other</option>
                                </select>
                                <ChevronDown size={20} style={{ position: 'absolute', right: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Vault Storage</label>
                        <div
                            className={`upload-area ${isDragging ? 'dragging' : ''}`}
                            onClick={() => document.getElementById('fileInput').click()}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            style={{
                                borderColor: isDragging ? 'var(--text-main)' : 'var(--glass-border)',
                                background: isDragging ? 'rgba(255, 255, 255, 0.08)' : 'var(--glass-bg)',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {file ? (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <div style={{ width: '60px', height: '60px', borderRadius: '1rem', background: 'var(--glass-bg)', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1rem', border: '1px solid var(--glass-border)' }}>
                                        <File size={30} color="#7c3aed" />
                                    </div>
                                    <p style={{ fontWeight: '700', fontSize: '1.1rem', marginBottom: '0.25rem' }}>{file.name}</p>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{(file.size / 1024 / 1024).toFixed(2)} MB • Ready to secure</p>
                                    <button
                                        type="button"
                                        onClick={(e) => { e.stopPropagation(); setFile(null); }}
                                        style={{ marginTop: '1.5rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontSize: '0.875rem', fontWeight: 'bold', cursor: 'pointer' }}
                                    >
                                        Remove File
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div style={{ width: '80px', height: '80px', borderRadius: '2rem', background: 'var(--glass-bg)', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1rem', border: '1px solid var(--glass-border)' }}>
                                        <UploadIcon size={32} color="var(--text-muted)" />
                                    </div>
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Drop your file here</h3>
                                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>or click to browse your system</p>
                                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                        <Info size={14} />
                                        <span>PDF, JPG, PNG up to 10MB</span>
                                    </div>
                                </>
                            )}
                        </div>
                        <input
                            id="fileInput"
                            type="file"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                            accept=".pdf,.jpg,.jpeg,.png"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={!file} style={{ marginTop: '1rem', height: '3.5rem', fontSize: '1.1rem' }}>
                        <Shield size={20} />
                        <span>Secure to Vault</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Upload;
