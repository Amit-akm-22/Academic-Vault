import React from 'react';
import { Github, Linkedin, Globe, Code2, GitBranch, Mail } from 'lucide-react';

const Developer = () => {
    const developerInfo = {
        name: "Amit   Manmode",
        role: "Computer Science Student",
        status: "In the Learning Phase",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit",
        github: "https://github.com/amitm-edu",
        linkedin: "https://linkedin.com/in/amitm-edu",
        email: "amit.akm.work@gmail.com",
        branch: "Computer Science",
        portfolio: "https://portfolio.example.com",
        stats: [
            { label: "Experience", value: "1+ Year" },
            { label: "Projects", value: "5+" },
            { label: "Stack", value: "MERN" }
        ]
    };

    return (
        <div className="developer-page">
            <div className="developer-card">
                <div className="developer-content">
                    <div className="profile-img-container">
                        <img src="image.png" alt={developerInfo.name} />
                    </div>

                    <h1 className="developer-name">{developerInfo.name}</h1>
                    <p className="developer-role">{developerInfo.role}</p>
                    <p className="developer-status">{developerInfo.status}</p>

                    <div className="developer-links">
                        <a href="https://github.com/Amit-akm-22" target="_blank" rel="noopener noreferrer" className="dev-link" title="GitHub">
                            <Github size={20} />
                        </a>
                        <a href="https://www.linkedin.com/in/amit-manmode-5b1a23328?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="dev-link" title="LinkedIn">
                            <Linkedin size={20} />
                        </a>
                        <a href={developerInfo.portfolio} target="_blank" rel="noopener noreferrer" className="dev-link" title="Portfolio">
                            <Globe size={20} />
                        </a>
                        <a href={`mailto:amit.akm.work@gmail.com`} className="dev-link" title="Email">
                            <Mail size={20} />
                        </a>
                    </div>

                    <div className="dev-stats">
                        <div className="dev-stat-item">
                            <span className="dev-stat-value branch-stat">
                                <GitBranch size={16} />
                                {developerInfo.branch}
                            </span>
                            <span className="dev-stat-label">System Branch</span>
                        </div>
                        {developerInfo.stats.map((stat, index) => (
                            <div key={index} className="dev-stat-item">
                                <span className="dev-stat-value">{stat.value}</span>
                                <span className="dev-stat-label">{stat.label}</span>
                            </div>
                        ))}
                        <div className="dev-stat-item">
                            <span className="dev-stat-value stack-stat">
                                <Code2 size={16} />
                                Modern Stack
                            </span>
                            <span className="dev-stat-label">Core Engine</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Developer;
