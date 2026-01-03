import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, googleLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
        } catch (error) {
            console.error('Login Failed', error);
            alert('Invalid credentials');
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            await googleLogin(credentialResponse.credential);
            navigate('/'); // Redirect to dashboard
        } catch (error) {
            console.error('Google Login Failed', error);
            alert(error.response?.data?.error || error.response?.data?.message || 'Google Login Failed');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-sidebar">
                <div className="auth-box">
                    <div style={{ marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                            <div style={{ padding: '6px', background: 'white', borderRadius: '10px' }}>
                                <LogIn color="black" size={20} />
                            </div>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: '800', letterSpacing: '-0.5px' }}>EduVault</h2>
                        </div>
                        <h1 style={{ fontSize: '2rem', fontWeight: '900', color: 'white', marginBottom: '0.5rem', letterSpacing: '-1px' }}>
                            Sign in to continue
                        </h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
                            Please enter your details to access your vault.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
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
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ height: '3.25rem', fontSize: '0.95rem', fontWeight: '800', background: 'white', color: 'black' }}>
                            <span>Sign In</span>
                            <ArrowRight size={18} />
                        </button>

                        <div style={{ margin: '1.5rem 0', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ flex: 1, height: '1px', background: '#222' }}></div>
                            <span style={{ fontSize: '0.65rem', color: '#444', fontWeight: '800' }}>OR CONTINUE WITH</span>
                            <div style={{ flex: 1, height: '1px', background: '#222' }}></div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                            <GoogleLogin
                                theme="filled_black"
                                shape="pill"
                                size="large"
                                text="continue_with"
                                width="340"
                                onSuccess={handleGoogleSuccess}
                                onError={() => {
                                    console.log('Login Failed');
                                    alert('Google Login Failed');
                                }}
                            />
                        </div>
                    </form>

                    <p style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.85rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Don't have an account? </span>
                        <Link to="/signup" style={{ color: 'white', fontWeight: '800', textDecoration: 'none', borderBottom: '2px solid white' }}>Create Account</Link>
                    </p>
                </div>
            </div>

            <div className="auth-visual">
                <div className="glow-text">EDAVAULT PROTECTED RECORD SECURE</div>
                <div className="moving-images-container">
                    <img
                        src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                        className="floating-image"
                        style={{ animationDelay: '0s', left: '10%' }}
                        alt="Vault"
                    />
                    <img
                        src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                        className="floating-image"
                        style={{ animationDelay: '-3s', left: '40%', scale: '0.8', opacity: '0.6' }}
                        alt="Security"
                    />
                    <img
                        src="https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                        className="floating-image"
                        style={{ animationDelay: '-6s', left: '25%', top: '60%', scale: '0.9' }}
                        alt="Encrypted"
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;
