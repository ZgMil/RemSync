// src/useEventsGraph.js
import { useEffect, useState, useCallback } from "react";
import { getAccessToken } from "./msalService"; // keep this path in sync with your project

const GRAPH_BASE = "https://graph.microsoft.com/v1.0";

export function useEventsGraph() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch top 25 upcoming events for the signed-in user
  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await getAccessToken();
      if (!token) {
        // harmless fallback so the UI renders instead of dying
        setEvents([]);
        throw new Error("No access token. Sign in first.");
      }

      const resp = await fetch(
        `${GRAPH_BASE}/me/events?$top=25&$orderby=start/dateTime`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!resp.ok) throw new Error(`Graph error: ${resp.status}`);
      const data = await resp.json();
      const items = Array.isArray(data.value) ? data.value : [];
      setEvents(items);
      return items;
    } catch (e) {
      setError(e);
      setEvents([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Optional: let callers inject mock data without touching internals
  const setMockEvents = useCallback(list => setEvents(Array.isArray(list) ? list : []), []);

  return { events, loading, error, fetchEvents, setMockEvents };
}
