import EventCard from "../components/EventCard";

const Dashboard = () => {
  const events = [
    { id: 1, name: "Tech Conference", date: "March 15, 2025", description: "A conference on modern web technologies." },
    { id: 2, name: "Music Fest", date: "April 10, 2025", description: "Join us for a night of live music." }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map(event => <EventCard key={event.id} event={event} />)}
      </div>
    </div>
  );
};

export default Dashboard;
