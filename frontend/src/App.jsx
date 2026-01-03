import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import MyDocuments from './pages/MyDocuments';
import Profile from './pages/Profile';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute'; // Placeholder import
import Developer from './pages/Developer';
import BottomNav from './components/BottomNav';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ShieldCheck, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const MobileHeader = ({ onMenuClick }) => (
  <div className="mobile-header">
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <button
        onClick={onMenuClick}
        style={{ background: 'transparent', border: 'none', color: 'white', padding: '5px', cursor: 'pointer', display: 'flex' }}
      >
        <Menu size={24} />
      </button>
      <span style={{ fontWeight: 900, fontSize: '1.2rem', letterSpacing: '-0.5px' }}>EduVault</span>
    </div>
    <div className="profile-trigger">
      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#222', border: '1px solid #333' }}></div>
    </div>
  </div>
);

function AppContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Close sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/*" element={
            <ProtectedRoute>
              <div className="app-container">
                <MobileHeader onMenuClick={() => setIsSidebarOpen(true)} />
                <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                <div className="main-content">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/upload" element={<Upload />} />
                    <Route path="/documents" element={<MyDocuments />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/developer" element={<Developer />} />
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                </div>
                <BottomNav />
              </div>
            </ProtectedRoute>
          } />
        </Routes>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
