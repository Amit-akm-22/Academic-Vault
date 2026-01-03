import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { Mail, Lock, User, UserPlus, ArrowRight } from 'lucide-react';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(name, email, password);
            navigate('/');
        } catch (error) {
            console.error('Signup Failed', error);
            alert(error.response?.data?.message || 'Error creating account');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-sidebar">
                <div className="auth-box">
                    <div style={{ marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                            <div style={{ padding: '6px', background: 'white', borderRadius: '10px' }}>
                                <UserPlus color="black" size={20} />
                            </div>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: '800', letterSpacing: '-0.5px' }}>EduVault</h2>
                        </div>
                        <h1 style={{ fontSize: '2rem', fontWeight: '900', color: 'white', marginBottom: '0.5rem', letterSpacing: '-1px' }}>
                            Join the vault
                        </h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
                            Secure your academic credentials today.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                            <label className="form-label" style={{ color: 'white', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Full Name</label>
                            <div style={{ position: 'relative' }}>
                                <User size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input
                                    type="text"
                                    className="form-input"
                                    style={{ paddingLeft: '3rem', height: '3.25rem', background: '#111', border: '1px solid #222', fontSize: '0.9rem' }}
                                    placeholder="Amit Maurya"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                            <label className="form-label" style={{ color: 'white', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input
                                    type="email"
                                    className="form-input"
                                    style={{ paddingLeft: '3rem', height: '3.25rem', background: '#111', border: '1px solid #222', fontSize: '0.9rem' }}
                                    placeholder="name@university.edu"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                            <label className="form-label" style={{ color: 'white', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Password</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input
                                    type="password"
                                    className="form-input"
                                    style={{ paddingLeft: '3rem', height: '3.25rem', background: '#111', border: '1px solid #222', fontSize: '0.9rem' }}
                                    placeholder="Create strong password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ height: '3.25rem', fontSize: '0.95rem', fontWeight: '800', background: 'white', color: 'black' }}>
                            <span>Create Account</span>
                            <ArrowRight size={18} />
                        </button>
                    </form>

                    <p style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.85rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Already a member? </span>
                        <Link to="/login" style={{ color: 'white', fontWeight: '800', textDecoration: 'none', borderBottom: '2px solid white' }}>Sign In</Link>
                    </p>
                </div>
            </div>

            <div className="auth-visual">
                <div className="glow-text">EDAVAULT PROTECTED RECORD SECURE</div>
                <div className="moving-images-container">
                    <img
                        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                        className="floating-image"
                        style={{ animationDelay: '0s', right: '10%' }}
                        alt="Vault"
                    />
                    <img
                        src="https://images.unsplash.com/photo-1558494949-ef010cbdcc48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                        className="floating-image"
                        style={{ animationDelay: '-4s', right: '40%', scale: '0.8', opacity: '0.6' }}
                        alt="Data Center"
                    />
                    <img
                        src="https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                        className="floating-image"
                        style={{ animationDelay: '-8s', right: '25%', top: '60%', scale: '0.9' }}
                        alt="Digital Security"
                    />
                </div>
            </div>
        </div>
    );
};

export default Signup;
