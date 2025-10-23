import React, { useState } from "react";
import { useEventStore } from "../../stores/eventStore";
import { useAuthStore } from "../../stores/authStore";
import { Role } from "../../types/enums";
import CreateEventModal from "../../components/CreateEventModal";
import EventCard from "../../components/EventCard";
import EventsTable from "../../components/EventsTable";
import { LuLayoutGrid, LuList, LuCalendarHeart, LuPlus } from "react-icons/lu";
import ContributeToEventModal from "../../components/events/ContributeToEventModal"; // Import the new modal
import type { Event } from "../../types/event"; // Import Event type
import { useToastStore } from "../../stores/toastStore"; // Import useToastStore

const EventsPage: React.FC = () => {
  const {
    events,
    loading,
    error,
    fetchEvents,
    totalPages,
    currentPage,
    contributeToEvent,
  } = useEventStore();
  const { user } = useAuthStore();
  const { showToast } = useToastStore(); // Get showToast from the store
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false); // Renamed for clarity
  const [isContributeModalOpen, setIsContributeModalOpen] = useState(false); // New state for contribute modal
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null); // State to hold the event for contribution
  const [view, setView] = useState("card");

  React.useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleCreateEvent = () => {
    setIsCreateModalOpen(true);
  };

  const handleEventCreated = () => {
    fetchEvents(); // Refetch events after a new one is created
    showToast("Événement créé avec succès !", "success"); // Show success toast
  };

  // Modified handleContribute to open the modal
  const handleContributeClick = (event: Event) => {
    setSelectedEvent(event);
    setIsContributeModalOpen(true);
  };

  // This function will be passed to the ContributeToEventModal
  const handleContributeSubmit = async (eventId: string, amount: number) => {
    if (user) {
      try {
        await contributeToEvent(eventId, user._id, amount);
        fetchEvents(); // Refetch events after contribution
        showToast("Contribution à l'événement réussie !", "success"); // Show success toast
      } catch (err: any) {
        showToast(err.response?.data || "Erreur lors de la contribution à l'événement.", "error"); // Show error toast
      }
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
            <LuCalendarHeart size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold font-serif text-primary">
              Événements
            </h1>
            <p className="text-base-content text-opacity-60">
              Gérez et participez aux événements de la communauté.
            </p>
          </div>
        </div>
        <div className="flex justify-end items-center gap-4">
          <div className="tabs tabs-boxed">
            <a
              className={`tab ${
                view === "card" ? "tab-active" : ""
              } lg:px-6 lg:py-3 lg:text-lg`}
              onClick={() => setView("card")}
            >
              <LuLayoutGrid />
            </a>
            <a
              className={`tab ${
                view === "table" ? "tab-active" : ""
              } lg:px-6 lg:py-3 lg:text-lg`}
              onClick={() => setView("table")}
            >
              <LuList />
            </a>
          </div>
          {user?.role === Role.ADMIN && (
            <button
              className="btn btn-primary font-sans shadow-md hover:shadow-lg transition-shadow rounded-full"
              onClick={handleCreateEvent}
            >
              <LuPlus className="mr-2" />
              Nouvel élément
            </button>
          )}
        </div>
      </div>

      {view === "card" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              onContribute={handleContributeClick}
            />
          ))}
        </div>
      ) : (
        <EventsTable events={events} onContribute={handleContributeClick} />
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

      {isCreateModalOpen && (
        <CreateEventModal
          onClose={() => setIsCreateModalOpen(false)}
          onEventCreated={handleEventCreated}
        />
      )}

      {/* Render the new ContributeToEventModal */}
      {isContributeModalOpen && selectedEvent && (
        <ContributeToEventModal
          event={selectedEvent}
          onClose={() => setIsContributeModalOpen(false)}
          onContribute={handleContributeSubmit}
        />
      )}
    </div>
  );
};

export default EventsPage;
