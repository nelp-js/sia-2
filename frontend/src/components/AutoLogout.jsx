import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TIMEOUT_MS = 5 * 60 * 1000; // 5 Minutes (in milliseconds)

function AutoLogout() {
    const navigate = useNavigate();

    useEffect(() => {
        // Only run this if we are actually logged in
        const token = localStorage.getItem('access');
        if (!token) return;

        let timeoutId;

        // The function that actually logs you out
        const handleLogout = () => {
            console.log("Auto-logging out due to inactivity...");
            localStorage.clear();
            navigate('/login');
            window.location.reload(); // Refresh to clear any memory states
        };

        // Reset the timer whenever the user does something
        const resetTimer = () => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(handleLogout, TIMEOUT_MS);
        };

        // Events to listen for (mouse moves, typing, clicking)
        const events = ['mousemove', 'keydown', 'click', 'scroll'];

        // Attach listeners
        events.forEach(event => window.addEventListener(event, resetTimer));

        // Start the initial timer
        resetTimer();

        // Cleanup: remove listeners when component unmounts (or user logs out)
        return () => {
            if (timeoutId) clearTimeout(timeoutId);
            events.forEach(event => window.removeEventListener(event, resetTimer));
        };
    }, [navigate]);

    return null; // This component is invisible
}

export default AutoLogout;