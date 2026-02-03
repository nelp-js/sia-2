import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import {
    FiUsers,
    FiCalendar,
    FiBriefcase,
    FiDollarSign,
    FiFileText,
    FiBarChart2,
} from 'react-icons/fi';
import '../styles/Dashboard.css';
import { useTitle } from '../Hooks/useTitle';

const ICON_COLOR = '#040354';

const STAT_CARDS = [
    { icon: 'people', value: '5,243', label: 'Total Alumni' },
    { icon: 'calendar', value: '24', label: 'Upcoming Events' },
    { icon: 'briefcase', value: '156', label: 'Active Job Postings' },
];

const MODULE_CARDS = [
    { icon: 'users', title: 'User Management', description: 'Manage registration and accounts of users.', button: 'Manage Users', to: '/dashboard/users' },
    { icon: 'document', title: 'CMS & News Feed', description: 'Manage website content, news articles, and information dissemination', button: 'Manage Content', to: '#' },
    { icon: 'calendar', title: 'Event Management', description: 'Create, manage, and track alumni events and attendance', button: 'Manage Events', to: '/events' },
    { icon: 'briefcase', title: 'Job & Internship', description: 'Job postings, applications, and career tracking', button: 'Manage Jobs', to: '#' },
    { icon: 'survey', title: 'Feedback & Surveys', description: 'Create surveys, collect feedback, and analyze tracer studies', button: 'Manage Surveys', to: '#' },
    { icon: 'fundraising', title: 'Fundraising & Donations', description: 'Campaign management, donations, and financial support', button: 'Manage Campaigns', to: '#' },
];

const RECENT_ACTIVITIES = [
    { date: 'Nov 10, 2025 10:30 AM', activity: 'New job posting approved', module: 'Job & Internship', user: 'Admin User', status: 'Completed' },
    { date: 'Nov 10, 2025 9:15 AM', activity: 'Event registration opened', module: 'Event Management', user: 'Alumni Affairs', status: 'Active' },
    { date: 'Nov 10, 2025 8:45 AM', activity: 'Donation received - ₱50,000', module: 'Fundraising', user: 'System', status: 'Processed' },
    { date: 'Nov 9, 2025 4:20 PM', activity: 'Survey published', module: 'Feedback & Surveys', user: 'QA Office', status: 'Live' },
];

const STAT_ICON_MAP = {
    people: FiUsers,
    calendar: FiCalendar,
    briefcase: FiBriefcase,
    donation: FiDollarSign,
};

const MODULE_ICON_MAP = {
    users: FiUsers,
    document: FiFileText,
    calendar: FiCalendar,
    briefcase: FiBriefcase,
    survey: FiBarChart2,
    fundraising: FiDollarSign,
};

function StatIcon({ type }) {
    const Icon = STAT_ICON_MAP[type];
    if (!Icon) return null;
    return <Icon size={48} color={ICON_COLOR} strokeWidth={1.5} />;
}

function ModuleIcon({ type }) {
    const Icon = MODULE_ICON_MAP[type];
    if (!Icon) return null;
    return <Icon size={28} color={ICON_COLOR} strokeWidth={1.5} />;
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
