import React, { useState } from "react";
import { useEventStore } from "../../stores/eventStore";
import { useAuthStore } from "../../stores/authStore";
import { Role } from "../../types/enums";
import CreateEventModal from "../../components/CreateEventModal";
import EventCard from "../../components/EventCard";
import EventsTable from "../../components/EventsTable";
import { LuLayoutGrid, LuList, LuCalendarHeart, LuPlus } from "react-icons/lu";

const EventsPage: React.FC = () => {
  const { events, loading, error, fetchEvents, totalPages, currentPage, contributeToEvent } =
    useEventStore();
  const { user } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [view, setView] = useState('card');

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

  const handlePageChange = (page: number) => {
    fetchEvents(page);
  };

  if (loading)
    return <p className="font-sans text-base-content">Chargement...</p>;
  if (error) return <p className="text-error font-sans">Erreur: {error}</p>;

  return (
    <div className="p-4 text-base-content">
      <div className="mb-6 bg-base-100 p-4 rounded-box shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-2 bg-primary rounded-full text-white">
            <LuCalendarHeart size={24}/>
          </div>
          <div>
            <h1 className="text-3xl font-bold font-serif text-primary">Événements</h1>
            <p className="text-base-content text-opacity-60">Gérez et participez aux événements de la communauté.</p>
          </div>
        </div>
        <div className="flex justify-end items-center gap-4">
          <div className="tabs tabs-boxed">
            <a className={`tab ${view === 'card' ? 'tab-active' : ''}`} onClick={() => setView('card')}><LuLayoutGrid/></a> 
            <a className={`tab ${view === 'table' ? 'tab-active' : ''}`} onClick={() => setView('table')}><LuList/></a>
          </div>
          {user?.role === Role.ADMIN && (
            <button
              className="btn btn-primary font-sans shadow-md hover:shadow-lg transition-shadow"
              onClick={handleCreateEvent}
            >
              <LuPlus className="mr-2"/>
              Créer un Événement
            </button>
          )}
        </div>
      </div>

      {view === 'card' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event._id} event={event} onContribute={handleContribute} />
          ))}
        </div>
      ) : (
        <EventsTable events={events} onContribute={handleContribute} />
      )}

      {totalPages > 1 && (
        <div className="pt-4 flex justify-center">
          <div className="join">
            <button
              className="join-item btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              «
            </button>
            <button className="join-item btn">
              Page {currentPage} sur {totalPages}
            </button>
            <button
              className="join-item btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              »
            </button>
          </div>
        </div>
      )}

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
