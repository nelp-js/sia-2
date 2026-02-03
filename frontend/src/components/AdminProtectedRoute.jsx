import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN, USER_IS_ADMIN } from "../constants";
import { useState, useEffect } from "react";

function AdminProtectedRoute({ children }) {
    const [status, setStatus] = useState(null); // null loading, true admin, false not admin

    useEffect(() => {
        let cancelled = false;

        const refreshToken = async () => {
            const refresh = localStorage.getItem(REFRESH_TOKEN);
            if (!refresh) return false;
            try {
                const res = await api.post("/api/token/refresh/", { refresh });
                if (res.status === 200) {
                    localStorage.setItem(ACCESS_TOKEN, res.data.access);
                    return true;
                }
            } catch (_) {}
            return false;
        };

        const check = async () => {
            const token = localStorage.getItem(ACCESS_TOKEN);
            if (!token) {
                if (!cancelled) setStatus(false);
                return;
            }
            try {
                const decoded = jwtDecode(token);
                const now = Date.now() / 1000;
                if (decoded.exp < now) {
                    const ok = await refreshToken();
                    if (!ok && !cancelled) {
                        setStatus(false);
                        return;
                    }
                }
                // Prefer is_superuser from JWT (backend adds it to token); else call /api/user/me/
                let isAdmin = false;
                try {
                    const decoded = jwtDecode(localStorage.getItem(ACCESS_TOKEN));
                    if (typeof decoded.is_superuser === "boolean") {
                        isAdmin = decoded.is_superuser;
                    }
                } catch (_) {}
                if (!isAdmin) {
                    const me = await api.get("/api/user/me/");
                    isAdmin = Boolean(me.data?.is_superuser);
                }
                if (!cancelled) {
                    localStorage.setItem(USER_IS_ADMIN, isAdmin ? "true" : "false");
                    setStatus(isAdmin);
                }
            } catch (err) {
                if (cancelled) return;
                // Fallback: use cached value set at login (from JWT or /api/user/me/)
                const cachedAdmin = localStorage.getItem(USER_IS_ADMIN) === "true";
                setStatus(cachedAdmin);
            }
        };

        check();
        return () => { cancelled = true; };
    }, []);

    if (status === null) {
        return (
            <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F5F5F7', color: '#6d7280' }}>
                Loading...
            </div>
        );
    }
    if (status === false) {
        return <Navigate to="/" replace />;
    }
    return children;
}

export default AdminProtectedRoute;
