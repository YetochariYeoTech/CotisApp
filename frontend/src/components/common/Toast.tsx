import React, { useEffect, useState } from 'react';
import { LuCheck, LuX } from 'react-icons/lu';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onDismiss: () => void;
  duration?: number; // in milliseconds
}

const Toast: React.FC<ToastProps> = ({ message, type, onDismiss, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onDismiss();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onDismiss]);

  if (!isVisible) return null;

  const alertClasses = type === 'success' ? 'alert-success' : 'alert-error';
  const Icon = type === 'success' ? LuCheck : LuX;

  return (
    <div className={`alert ${alertClasses} shadow-lg`}>
      <Icon className="h-6 w-6" />
      <div>
        <h3 className="font-bold">{type === 'success' ? 'Succès' : 'Erreur'}</h3>
        <div className="text-xs">{message}</div>
      </div>
      <button className="btn btn-ghost btn-sm" onClick={onDismiss}>
        <LuX className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Toast;
