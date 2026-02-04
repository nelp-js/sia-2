import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getEventById } from '../data/eventsData';
import '../styles/EventView.css';
import { useTitle } from '../Hooks/useTitle';

function EventView() {
    const { id } = useParams();
    const event = getEventById(id);

    useTitle(event ? event.title : 'Event');

    if (!event) {
        return (
            <div className="event-view-page">
                <Header />
                <main className="event-view-main">
                    <p className="event-view-not-found">Event not found.</p>
                    <Link to="/events" className="event-view-back-link">« All Events</Link>
                </main>
                <Footer />
            </div>
        );
    }

    const detailsDate = event.detailsDate || event.date;
    const venueLines = event.venueAddress ? event.venueAddress.split('\n') : [event.location || '—'];

    return (
        <div className="event-view-page">
            <Header />

            <main className="event-view-main">
                <Link to="/events" className="event-view-all-events">« All Events</Link>

                <h1 className="event-view-title">{event.title}</h1>
                <p className="event-view-date-time">
                    {event.date}{event.startTime ? ` at ${event.startTime}` : ''}
                </p>

                <div className="event-view-banner-wrap">
                    <img
                        src={event.image}
                        alt=""
                        className="event-view-banner"
                    />
                </div>

                {event.tagline && (
                    <p className="event-view-tagline">{event.tagline}</p>
                )}

                {event.description && (
                    <p className="event-view-description">{event.description}</p>
                )}

                {event.registrationDeadline && (
                    <p className="event-view-deadline">
                        Deadline to register: {event.registrationDeadline}. Registration is required to attend the event.
                    </p>
                )}

                <p className="event-view-date-repeat">{detailsDate}</p>

                <div className="event-view-actions">
                    <a
                        href={event.registerUrl || '#register'}
                        className="event-view-btn event-view-btn-calendar"
                        aria-label="Add to calendar"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        <span>Add to Calendar</span>
                    </a>
                    <a
                        href={event.registerUrl || '#register'}
                        className="event-view-btn event-view-btn-register"
                    >
                        Register
                    </a>
                </div>

                <section className="event-view-info">
                    <div className="event-view-info-col event-view-details">
                        <h3>DETAILS</h3>
                        <p><strong>Date:</strong> {detailsDate}</p>
                        <p><strong>Time:</strong> {event.startTime && event.endTime
                            ? `${event.startTime} — ${event.endTime}`
                            : event.startTime || '—'}</p>
                        <p><strong>Cost:</strong> {event.cost || '—'}</p>
                    </div>
                    <div className="event-view-info-col event-view-venue">
                        <h3>VENUE</h3>
                        {venueLines.map((line, i) => (
                            <p key={i}>{line}</p>
                        ))}
                    </div>
                    <div className="event-view-info-col event-view-organizer">
                        <h3>ORGANIZER</h3>
                        <p>{event.organizerName || '—'}</p>
                    </div>
                    <div className="event-view-info-col event-view-share">
                        <h3>SHARE</h3>
                        <div className="event-view-share-icons">
                            <a href="#facebook" aria-label="Facebook">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                            </a>
                            <a href="#linkedin" aria-label="LinkedIn">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                            </a>
                            <a href="#youtube" aria-label="YouTube">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                            </a>
                            <a href="#instagram" aria-label="Instagram">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default EventView;
