import { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { Button, Input } from "@/components/ui"; 
import { RegisterUser } from '@/services/postUser';

export const RegisterForm: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); 

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const userData = {
      usuario_nombre: nombre,
      usuario_correo: email,
      password: password,
    };
    try {
      await RegisterUser(userData); 
      setSuccessMessage('Registro exitoso. Redirigiendo...');
      setTimeout(() => {
        window.location.reload(); 
      }, 2000); 
    } catch (error) {
      setErrorMessage('Error al registrar. Intente nuevamente.');
      console.error('Error al registrar:', error);
    }
  };

  useEffect(() => {
    if (nombre || email || password) {
      setErrorMessage('');
    }
  }, [nombre, email, password]);
  
  const isFormValid = () => {
    return nombre.trim() !== '' && 
           email.trim() !== '' && 
           password.trim() !== '';
  };

  return (
    <div className="mx-auto p-4">
      <form onSubmit={handleRegister}>
        <div className="mb-4">
          <label htmlFor="usuario_nombre" className="block text-lg text-gray-700">
            Nombre completo*
          </label>
          <Input 
            id="usuario_nombre" 
            type="text" 
            name='usuario_nombre'
            placeholder="Ingrese su nombre completo" 
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-lg text-gray-700">
            Correo electrónico*
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
            Contraseña*
          </label>
          <div className="relative">
            <Input 
              id="password" 
              name='password'
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
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        <div className="mt-10">
          <Button 
            className="w-full py-6 bg-[#800020] text-white rounded-md hover:bg-[#800020]/40 mb-6 text-xl"
            disabled={!isFormValid()}
          >
            Registrar 
          </Button>
        </div>
      </form>
    </div>
  );
};
