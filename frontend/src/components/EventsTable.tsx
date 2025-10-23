import React from 'react';
import type { Event } from '../../types/event';
import { LuHeart } from 'react-icons/lu';

interface EventsTableProps {
  events: Event[];
  onContribute: (event: Event) => void; // Changed to accept the full event object
}

const EventsTable: React.FC<EventsTableProps> = ({ events, onContribute }) => {
  return (
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
              <td className="font-sans text-base-content">
                {event.description}
              </td>
              <td className="font-sans text-base-content">
                {new Date(event.date).toLocaleDateString()}
              </td>
              <td className="font-sans text-base-content">
                {event.minimalAmount}
              </td>
              <td>
                <button
                  className="btn btn-sm btn-success font-sans tooltip"
                  data-tip="Contribuer à cet événement"
                  onClick={() => onContribute(event)} // Changed to pass the full event object
                >
                  <span className="flex items-center">
                    <LuHeart className="mr-2" />
                    Contribuer
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventsTable;
