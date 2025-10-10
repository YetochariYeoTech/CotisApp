import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEventStore } from "../stores/eventStore.ts";

interface CreateEventModalProps {
  onClose: () => void;
  onEventCreated: () => void;
}

const eventSchema = z.object({
  name: z.string().min(1, { message: "Le nom de l'événement est requis" }),
  description: z.string().min(1, { message: "La description est requise" }),
  date: z.string().min(1, { message: "La date est requise" }),
  minimalAmount: z.coerce
    .number()
    .min(0, { message: "Le montant minimal doit être positif" }),
});

type EventFormInputs = z.infer<typeof eventSchema>;

const CreateEventModal: React.FC<CreateEventModalProps> = ({
  onClose,
  onEventCreated,
}) => {
  const createEvent = useEventStore((state) => state.createEvent);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EventFormInputs>({
    resolver: zodResolver(eventSchema) as any,
  });

  const onSubmit = async (data: EventFormInputs) => {
    try {
      await createEvent(
        data.name,
        data.description,
        data.date,
        data.minimalAmount
      );
      onEventCreated();
      onClose();
    } catch (error) {
      console.error("Failed to create event", error);
      // TODO: Display error message to the user
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box bg-base-100 text-base-content">
        <h3 className="font-bold text-lg font-serif">
          Créer un nouvel événement
        </h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="form-control gap-4 py-4"
        >
          <div>
            <label className="label">
              <span className="label-text font-sans text-base-content">
                Nom de l'événement
              </span>
            </label>
            <input
              type="text"
              placeholder="Nom de l'événement"
              className="input input-bordered w-full font-sans text-base-content"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-error text-sm mt-1 font-sans">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label className="label">
              <span className="label-text font-sans text-base-content">
                Description
              </span>
            </label>
            <textarea
              placeholder="Description de l'événement"
              className="textarea textarea-bordered w-full font-sans text-base-content"
              {...register("description")}
            ></textarea>
            {errors.description && (
              <p className="text-error text-sm mt-1 font-sans">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label className="label">
              <span className="label-text font-sans text-base-content">
                Date
              </span>
            </label>
            <input
              type="date"
              className="input input-bordered w-full font-sans text-base-content"
              {...register("date")}
            />
            {errors.date && (
              <p className="text-error text-sm mt-1 font-sans">
                {errors.date.message}
              </p>
            )}
          </div>

          <div>
            <label className="label">
              <span className="label-text font-sans text-base-content">
                Montant minimal
              </span>
            </label>
            <input
              type="number"
              placeholder="0"
              className="input input-bordered w-full font-sans text-base-content"
              {...register("minimalAmount")}
            />
            {errors.minimalAmount && (
              <p className="text-error text-sm mt-1 font-sans">
                {errors.minimalAmount.message}
              </p>
            )}
          </div>

          <div className="modal-action">
            <button
              type="button"
              className="btn btn-ghost font-sans"
              onClick={onClose}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="btn btn-primary font-sans"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Création..." : "Créer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEventModal;
