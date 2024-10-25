import { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { Button, Input } from "@/components/ui";
import { useNavigate } from 'react-router-dom';
import { getUser } from '@/services/getUser';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  useEffect(() => {
    if (email || password) {
      setErrorMessage('');
    }
  }, [email, password]);


  const isFormValid = () => {
    return email.trim() !== '' &&
      password.trim() !== '';
  };

  const handleSuccess = async (): Promise<void> => {
    try {
      const response = await getUser(email);
      if (response) {
        if (response[0]?.password !== password) {
          setErrorMessage('Error: La contraseña es incorrecta.');
          return;
        }else{
          localStorage.setItem('user', JSON.stringify({ email }));
          navigate('/inicio');
        }
      } else {
        setErrorMessage('Error: Credenciales no válidas.');
      }
    } catch (error) {
      setErrorMessage('Error al iniciar sesión. Intente nuevamente.');
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div className="mx-auto p-4">
      <form onSubmit={(e) => { e.preventDefault(); handleSuccess(); }}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-lg text-gray-700">
            Correo electrónico
          </label>
          <Input
            id="email"
            type="email"
            name='usuario_correo'
            placeholder="Ingrese su correo"
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-lg text-gray-700">
            Contraseña
          </label>
          <div className="relative">
            <Input
              id="password"
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Ingrese su contraseña"
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              <FaEye className="h-5 w-5 text-gray-500" />
            </div>
          </div>
        </div>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <div className="mt-10">
          <Button className="w-full py-6 bg-[#800020] text-white rounded-md hover:bg-[#800020]/40 mb-6 text-xl"
            type="submit"
            disabled={!isFormValid()}>
            Iniciar sesión
          </Button>
        </div>
      </form>
    </div>
  );
};
