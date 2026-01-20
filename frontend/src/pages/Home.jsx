import { useState, useEffect } from "react";
import api from "../api";
import "../styles/Home.css";

function Home() {
    const [events, setEvents] = useState([]);
    
    // State for the Form Fields
    const [eventName, setEventName] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [venue, setVenue] = useState("");
    const [category, setCategory] = useState("");

    useEffect(() => {
        getEvents();
    }, []);

    const getEvents = () => {
        api
            .get("/api/events/")
            .then((res) => res.data)
            .then((data) => {
                setEvents(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const deleteEvent = (id) => {
        api
            .delete(`/api/events/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Event deleted!");
                else alert("Failed to delete event.");
                getEvents();
            })
            .catch((error) => alert(error));
    };

    const createEvent = (e) => {
        e.preventDefault();
        
        // Match these keys exactly with your Django Serializer
        const payload = {
            event_name: eventName,
            event_description: eventDescription,
            start_date: startDate,
            start_time: startTime,
            venue: venue,
            category: category
        };

        api
            .post("/api/events/", payload)
            .then((res) => {
                if (res.status === 201) alert("Event created!");
                else alert("Failed to create event.");
                // Clear form
                setEventName("");
                setEventDescription("");
                setStartDate("");
                setStartTime("");
                setVenue("");
                setCategory("");
                getEvents();
            })
            .catch((err) => alert(err));
    };

    return (
        <div>
            {/* --- SECTION 1: EVENT LIST --- */}
            <div className="events-section">
                <h2>Upcoming Events</h2>
                {events.map((event) => (
                    <div className="event-card" key={event.id}>
                        <h3>{event.event_name}</h3>
                        <p><strong>Date:</strong> {event.start_date} at {event.start_time}</p>
                        <p><strong>Venue:</strong> {event.venue}</p>
                        <p><strong>Category:</strong> {event.category}</p>
                        <p>{event.event_description}</p>
                        <p className="status">
                            Status: {event.is_approved ? "✅ Published" : "⏳ Pending Admin Approval"}
                        </p>
                        <button className="delete-button" onClick={() => deleteEvent(event.id)}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>

            {/* --- SECTION 2: CREATE EVENT FORM --- */}
            <h2>Create a New Event</h2>
            <form onSubmit={createEvent}>
                <label>Event Name:</label>
                <br />
                <input
                    type="text"
                    required
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                />
                <br />
                
                <label>Description:</label>
                <br />
                <textarea
                    required
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                ></textarea>
                <br />

                <label>Start Date:</label>
                <br />
                <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <br />

                <label>Start Time:</label>
                <br />
                <input
                    type="time"
                    required
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                />
                <br />

                <label>Venue:</label>
                <br />
                <input
                    type="text"
                    required
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                />
                <br />

                <label>Category:</label>
                <br />
                <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)} 
                    required
                >
                    <option value="">Select a category...</option>
                    <option value="Academic">Academic</option>
                    <option value="Sports">Sports</option>
                    <option value="Social">Social</option>
                </select>
                <br />

                <input type="submit" value="Submit Event"></input>
            </form>
        </div>
    );
}

export default Home;