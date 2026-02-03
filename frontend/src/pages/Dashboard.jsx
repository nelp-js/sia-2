import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import '../styles/Dashboard.css';
import { useTitle } from '../Hooks/useTitle';

const STAT_CARDS = [
    { icon: 'people', value: '5,243', label: 'Total Alumni' },
    { icon: 'calendar', value: '24', label: 'Upcoming Events' },
    { icon: 'briefcase', value: '156', label: 'Active Job Postings' }
];

const MODULE_CARDS = [
    { icon: 'document', title: 'CMS & News Feed', description: 'Manage website content, news articles, and information dissemination', button: 'Manage Content', to: '#' },
    { icon: 'calendar', title: 'Event Management', description: 'Create, manage, and track alumni events and attendance', button: 'Manage Events', to: '/events' },
    { icon: 'briefcase', title: 'Job & Internship', description: 'Job postings, applications, and career tracking', button: 'Manage Jobs', to: '#' },
    { icon: 'survey', title: 'Feedback & Surveys', description: 'Create surveys, collect feedback, and analyze tracer studies', button: 'Manage Surveys', to: '#' },
    { icon: 'community', title: 'Teaching & Community', description: 'Alumni engagement in teaching, projects, and outreach', button: 'Track Engagement', to: '#' },
    { icon: 'fundraising', title: 'Fundraising & Donations', description: 'Campaign management, donations, and financial support', button: 'Manage Campaigns', to: '#' },
];

const RECENT_ACTIVITIES = [
    { date: 'Nov 10, 2025 10:30 AM', activity: 'New job posting approved', module: 'Job & Internship', user: 'Admin User', status: 'Completed' },
    { date: 'Nov 10, 2025 9:15 AM', activity: 'Event registration opened', module: 'Event Management', user: 'Alumni Affairs', status: 'Active' },
    { date: 'Nov 10, 2025 8:45 AM', activity: 'Donation received - ₱50,000', module: 'Fundraising', user: 'System', status: 'Processed' },
    { date: 'Nov 9, 2025 4:20 PM', activity: 'Survey published', module: 'Feedback & Surveys', user: 'QA Office', status: 'Live' },
];

function StatIcon({ type }) {
    const color = '#040354';
    if (type === 'people') {
        return (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        );
    }
    if (type === 'calendar') {
        return (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
                <path d="M9 14l2 2 4-4" />
            </svg>
        );
    }
    if (type === 'briefcase') {
        return (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
        );
    }
    if (type === 'donation') {
        return (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
        );
    }
    return null;
}

function ModuleIcon({ type }) {
    const color = '#040354';
    const size = 28;
    if (type === 'document') {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
            </svg>
        );
    }
    if (type === 'calendar') {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
        );
    }
    if (type === 'briefcase') {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
        );
    }
    if (type === 'survey') {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
        );
    }
    if (type === 'community') {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        );
    }
    if (type === 'fundraising') {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
        );
    }
    return null;
}

function Dashboard() {
    useTitle('Admin Dashboard');

    return (
        <div className="dashboard-page">
            <Header />
            <main className="dashboard-main">
                <h1 className="dashboard-title">Admin Dashboard</h1>

                <section className="dashboard-stats">
                    {STAT_CARDS.map((card) => (
                        <div key={card.label} className="dashboard-stat-card">
                            <div className="dashboard-stat-icon">
                                <StatIcon type={card.icon} />
                            </div>
                            <div className="dashboard-stat-value">{card.value}</div>
                            <div className="dashboard-stat-label">{card.label}</div>
                        </div>
                    ))}
                </section>

                <section className="dashboard-modules">
                    {MODULE_CARDS.map((card) => (
                        <div key={card.title} className="dashboard-module-card">
                            <div className="dashboard-module-icon">
                                <ModuleIcon type={card.icon} />
                            </div>
                            <h2 className="dashboard-module-title">{card.title}</h2>
                            <p className="dashboard-module-desc">{card.description}</p>
                            <Link to={card.to} className="dashboard-module-btn">{card.button}</Link>
                        </div>
                    ))}
                </section>

                <section className="dashboard-activities">
                    <h2 className="dashboard-activities-title">Recent Activities</h2>
                    <div className="dashboard-table-wrap">
                        <table className="dashboard-table">
                            <thead>
                                <tr>
                                    <th>DATE</th>
                                    <th>ACTIVITY</th>
                                    <th>MODULE</th>
                                    <th>USER</th>
                                    <th>STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {RECENT_ACTIVITIES.map((row, i) => (
                                    <tr key={i}>
                                        <td>{row.date}</td>
                                        <td>{row.activity}</td>
                                        <td>{row.module}</td>
                                        <td>{row.user}</td>
                                        <td><span className="dashboard-status">✓ {row.status}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default Dashboard;
