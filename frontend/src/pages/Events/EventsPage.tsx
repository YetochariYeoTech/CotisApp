import React from 'react';
import { useEventStore } from '../../stores/eventStore';
import { useAuthStore } from '../../stores/authStore';
import { Role } from '../../types/enums';
import CreateEventModal from '../../components/CreateEventModal';

const EventsPage: React.FC = () => {
  const { events, loading, error, fetchEvents, contributeToEvent } = useEventStore();
  const { user } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  React.useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleCreateEvent = () => {
    setIsModalOpen(true);
  };

  const handleEventCreated = () => {
    fetchEvents(); // Refetch events after a new one is created
  };

  const handleContribute = async (eventId: string, amount: number) => {
    if (user) {
      await contributeToEvent(eventId, user._id, amount);
      // Optionally refetch events or show a success message
    }
  };

  if (loading) return <p className="font-sans text-base-content">Chargement...</p>;
  if (error) return <p className="text-error font-sans">Erreur: {error}</p>;

  return (
    <div className="p-4 text-base-content">
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
              <th className="font-sans text-base-content">Nom</th>
              <th className="font-sans text-base-content">Description</th>
              <th className="font-sans text-base-content">Date</th>
              <th className="font-sans text-base-content">Montant minimal</th>
              <th className="font-sans text-base-content">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event._id}>
                <td className="font-sans text-base-content">{event.name}</td>
                <td className="font-sans text-base-content">{event.description}</td>
                <td className="font-sans text-base-content">{new Date(event.date).toLocaleDateString()}</td>
                <td className="font-sans text-base-content">{event.minimalAmount}</td>
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

      {isModalOpen && (
        <CreateEventModal
          onClose={() => setIsModalOpen(false)}
          onEventCreated={handleEventCreated}
        />
      )}
    </div>
  );
};

export default EventsPage;
