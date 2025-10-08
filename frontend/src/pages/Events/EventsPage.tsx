import React from 'react';
import { useEventStore } from '../../stores/eventStore';
import { useAuthStore } from '../../stores/authStore';
import { Role } from '../../types/enums';

const EventsPage: React.FC = () => {
  const { events, loading, error, fetchEvents, createEvent, contributeToEvent } = useEventStore();
  const { user } = useAuthStore();

  React.useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleCreateEvent = async () => {
    // Placeholder for event creation form data
    await createEvent('Nouvel événement', 'Description', new Date().toISOString(), 100);
    fetchEvents();
  };

  const handleContribute = async (eventId: string, amount: number) => {
    if (user) {
      await contributeToEvent(eventId, user._id, amount);
      // Optionally refetch events or show a success message
    }
  };

  if (loading) return <p className="font-sans">Chargement...</p>;
  if (error) return <p className="text-error font-sans">Erreur: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold font-serif mb-4">Gestion des événements</h1>
      {user?.role === Role.ADMIN && (
        <button className="btn btn-primary mb-4 font-sans" onClick={handleCreateEvent}>
          Créer un nouvel événement
        </button>
      )}

      <div className="overflow-x-auto bg-base-100 rounded-box shadow-xl">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="font-sans">Nom</th>
              <th className="font-sans">Description</th>
              <th className="font-sans">Date</th>
              <th className="font-sans">Montant minimal</th>
              <th className="font-sans">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event._id}>
                <td className="font-sans">{event.name}</td>
                <td className="font-sans">{event.description}</td>
                <td className="font-sans">{new Date(event.date).toLocaleDateString()}</td>
                <td className="font-sans">{event.minimalAmount}</td>
                <td>
                  <button className="btn btn-sm btn-success font-sans" onClick={() => handleContribute(event._id, event.minimalAmount)}>
                    Contribuer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventsPage;
