import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Events.css';

function Events() {
    const [searchQuery, setSearchQuery] = useState('');
    const [weekdays, setWeekdays] = useState('Weekdays');
    const [eventType, setEventType] = useState('Event type');
    const [category, setCategory] = useState('Any category');

    const events = [
        {
            id: 1,
            image: '/ateneo homecoming 3.jpg',
            title: 'Alumni Career Fair & Networking Night',
            date: 'October 13, 2025',
            location: 'Finster Auditorium',
        },
        {
            id: 2,
            image: '/martinhall.jpg',
            title: 'Alumni Sports Fest',
            date: 'August 14, 2025',
            location: 'Martin Hall, 4F',
        },
        {
            id: 3,
            image: '/ateneo homecoming 1.jpg',
            title: 'Homecoming Gala 2025',
            date: 'July 30, 2025',
            location: 'SMX Convention, SM Lanang',
        },
    ];

    return (
        <div className="events-page">
            <Header />

            <main className="events-main">
                {/* Hero banner - image spans 60px margins, 596px tall, 10px radius */}
                <section className="events-hero">
                    <img
                        src="/cs alumni 2.jpg"
                        alt="Alumni events - interior conference scene"
                        className="events-hero-image"
                    />
                </section>

                {/* Search bar - hovers half on/half off hero (72px overlap) */}
                <section className="events-search-section">
                    <div className="events-search-box">
                        <input
                            type="search"
                            placeholder="Search for events"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="events-search-input"
                        />
                        <button type="button" className="events-search-btn" aria-label="Search">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                        </button>
                    </div>
                </section>

                {/* Upcoming Events + Filters */}
                <section className="events-upcoming">
                    <h2 className="events-section-title">
                        <span className="events-title-upcoming">Upcoming</span>{' '}
                        <span className="events-title-events">Events</span>
                    </h2>
                    <div className="events-filters">
                        <select
                            value={weekdays}
                            onChange={(e) => setWeekdays(e.target.value)}
                            className="events-filter-select"
                        >
                            <option value="Weekdays">Weekdays</option>
                            <option value="Weekend">Weekend</option>
                            <option value="Any">Any</option>
                        </select>
                        <select
                            value={eventType}
                            onChange={(e) => setEventType(e.target.value)}
                            className="events-filter-select"
                        >
                            <option value="Event type">Event type</option>
                            <option value="Workshop">Workshop</option>
                            <option value="Gala">Gala</option>
                            <option value="Sports">Sports</option>
                        </select>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="events-filter-select"
                        >
                            <option value="Any category">Any category</option>
                            <option value="Academic">Academic</option>
                            <option value="Social">Social</option>
                            <option value="Sports">Sports</option>
                        </select>
                    </div>
                </section>

                {/* Event cards */}
                <section className="events-cards">
                    {events.map((event) => (
                        <article key={event.id} className="events-card">
                            <div className="events-card-image-wrap">
                                <img
                                    src={event.image}
                                    alt=""
                                    className="events-card-image"
                                />
                            </div>
                            <h3 className="events-card-title">{event.title}</h3>
                            <p className="events-card-date">{event.date}</p>
                            <p className="events-card-location">{event.location}</p>
                        </article>
                    ))}
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default Events;
