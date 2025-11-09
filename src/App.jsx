import { useState, useEffect } from "react";
import { signIn, signOut, getAccessToken, getActiveAccount } from "./msalService";
import { useEventsGraph } from "./useEventsGraph.js";
import EventList from "./components/EventList";
import EventDetail from "./components/EventDetail";

export default function App() {
  const [account, setAccount] = useState(getActiveAccount());
  useEffect(() => { setAccount(getActiveAccount()); }, []);

  const { events, loading, error } = useEventsGraph(getAccessToken, !!account);

  const [selectedId, setSelectedId] = useState("");
  const selected = events.find(e => e.id === selectedId);

  return (
    <div style={{ padding: 16, maxWidth: 800, margin: "0 auto" }}>
      <h2>RemSync — Event Tally</h2>

      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
        {!account
          ? <button onClick={async () => setAccount(await signIn())}>Sign in with Microsoft</button>
          : <>
              <span>Signed in as <b>{account.username || account.name}</b></span>
              <button onClick={async () => { await signOut(); setAccount(null); setSelectedId(""); }}>Sign out</button>
            </>
        }
      </div>

      {account ? null : <p>Select “Sign in with Microsoft” to load your events.</p>}
      {loading && <p>Loading events…</p>}
      {error && account && <p style={{ color: "red" }}>Error: {String(error.message || error)}</p>}

      <EventList events={events} value={selectedId} onChange={setSelectedId} />
      <EventDetail event={selected} />
    </div>
  );
}
