import React from 'react';
import type { Event } from '../../types/event';
import { LuCalendar, LuDollarSign, LuHeart } from 'react-icons/lu';

interface EventCardProps {
  event: Event;
  onContribute: (event: Event) => void; // Changed to accept the full event object
}

const EventCard: React.FC<EventCardProps> = ({ event, onContribute }) => {
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out">
      <div className="card-body">
        <h2 className="card-title font-serif text-primary text-2xl">{event.name}</h2>
        <p className="font-sans text-base-content text-opacity-80">{event.description}</p>
        <div className="flex items-center mt-4 font-sans">
          <LuCalendar className="mr-2" />
          <span>{new Date(event.date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center mt-2 font-sans">
          <LuDollarSign className="mr-2" />
          <span>{event.minimalAmount} XAF</span>
        </div>
        <div className="card-actions justify-end mt-4">
          <button
            className="btn btn-success font-sans"
            onClick={() => onContribute(event)} // Changed to pass the full event object
          >
            <LuHeart className="mr-2" />
            Contribuer
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
