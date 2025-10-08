import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuthStore } from '../../stores/authStore';
import { useNavigate } from 'react-router-dom';

const loginSchema = z.object({
  email: z.string().email({ message: "Adresse e-mail invalide" }),
  password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await login(data.email, data.password);
      navigate('/');
    } catch (error) {
      console.error('Login failed', error);
      // TODO: Display error message to the user
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-control gap-4">
      <div>
        <label className="label">
          <span className="label-text font-sans">Email</span>
        </label>
        <input
          type="email"
          placeholder="email@example.com"
          className="input input-bordered w-full font-sans"
          {...register('email')}
        />
        {errors.email && <p className="text-error text-sm mt-1 font-sans">{errors.email.message}</p>}
      </div>

      <div>
        <label className="label">
          <span className="label-text font-sans">Mot de passe</span>
        </label>
        <input
          type="password"
          placeholder="******"
          className="input input-bordered w-full font-sans"
          {...register('password')}
        />
        {errors.password && <p className="text-error text-sm mt-1 font-sans">{errors.password.message}</p>}
      </div>

      <button type="submit" className="btn btn-primary mt-4 font-sans" disabled={isSubmitting}>
        {isSubmitting ? 'Connexion en cours...' : 'Se connecter'}
      </button>
    </form>
  );
};

export default LoginForm;
