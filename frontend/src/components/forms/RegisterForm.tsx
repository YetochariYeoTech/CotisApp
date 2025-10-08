import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuthStore } from "../../stores/authStore";
import { useNavigate } from "react-router-dom";

const registerSchema = z
  .object({
    fullName: z.string().min(1, { message: "Le nom complet est requis" }),
    email: z.string().email({ message: "Adresse e-mail invalide" }),
    phoneNumber: z.string().min(10, {
      message: "Le numéro de téléphone doit contenir au moins 10 chiffres",
    }),
    password: z.string().min(6, {
      message: "Le mot de passe doit contenir au moins 6 caractères",
    }),
    confirmPassword: z.string().min(6, {
      message:
        "La confirmation du mot de passe doit contenir au moins 6 caractères",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

type RegisterFormInputs = z.infer<typeof registerSchema>;

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const registerUser = useAuthStore((state) => state.register);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      await registerUser(
        data.fullName,
        data.email,
        data.phoneNumber,
        data.password
      );
      navigate("/login"); // Redirect to login after successful registration
    } catch (error) {
      console.error("Registration failed", error);
      // TODO: Display error message to the user
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-control gap-4">
      <div>
        <label className="label">
          <span className="label-text font-sans">Nom complet</span>
        </label>
        <input
          type="text"
          placeholder="John Doe"
          className="input input-bordered w-full font-sans"
          {...register("fullName")}
        />
        {errors.fullName && (
          <p className="text-error text-sm mt-1 font-sans">
            {errors.fullName.message}
          </p>
        )}
      </div>

      <div>
        <label className="label">
          <span className="label-text font-sans">Email</span>
        </label>
        <input
          type="email"
          placeholder="email@example.com"
          className="input input-bordered w-full font-sans"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-error text-sm mt-1 font-sans">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label className="label">
          <span className="label-text font-sans">Numéro de téléphone</span>
        </label>
        <input
          type="tel"
          placeholder="123-456-7890"
          className="input input-bordered w-full font-sans"
          {...register("phoneNumber")}
        />
        {errors.phoneNumber && (
          <p className="text-error text-sm mt-1 font-sans">
            {errors.phoneNumber.message}
          </p>
        )}
      </div>

      <div>
        <label className="label">
          <span className="label-text font-sans">Mot de passe</span>
        </label>
        <input
          type="password"
          placeholder="******"
          className="input input-bordered w-full font-sans"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-error text-sm mt-1 font-sans">
            {errors.password.message}
          </p>
        )}
      </div>

      <div>
        <label className="label">
          <span className="label-text font-sans">
            Confirmer le mot de passe
          </span>
        </label>
        <input
          type="password"
          placeholder="******"
          className="input input-bordered w-full font-sans"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-error text-sm mt-1 font-sans">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-primary mt-4 font-sans"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Inscription en cours..." : "S'inscrire"}
      </button>
    </form>
  );
};

export default RegisterForm;
