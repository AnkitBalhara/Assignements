
const EventCard = ({ event }) => (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-lg font-semibold">{event.name}</h2>
      <p className="text-sm text-gray-600">{event.date}</p>
      <p className="mt-2">{event.description}</p>
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Join Event</button>
    </div>
  );
  
  export default EventCard;
  

