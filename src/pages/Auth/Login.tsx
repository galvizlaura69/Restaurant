import { Wrapper } from "@/components/common";
import fondo from '../../assets/fondo.jpg';
import fonLogin from '../../assets/fonLogin.jpg';
import { useState } from "react";
import { LoginForm, RegisterForm } from "@/components";

export const Login: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className='relative flex min-h-screen w-full'>
      <div
        className='absolute inset-0 bg-cover bg-center'
        style={{ backgroundImage: `url(${fondo})` }}
      />
      <div className='absolute inset-0 bg-black  opacity-20' />
      <Wrapper className="relative z-10 w-full flex justify-end">
        <div
          className="w-[40%] flex flex-col justify-center  px-12 !border-none"
          style={{
            backgroundImage: `url(${fonLogin})`,
            backgroundPosition: 'center', 
            backgroundSize: 'cover',     
            backgroundRepeat: 'no-repeat',
            clipPath: 'polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%)',
          }}
        >
          <div className=' text-center'>
            <h2 className='text-[#800020] text-6xl font-bold'>Bienvenid@</h2>
            <p className='text-base font-semibold text-[#676767]'>
              {!isRegister ? "Ingrese sus credenciales de acceso" : "Diligencie los campos requeridos"}
            </p>
          </div>
          <div className='mt-8 mb-5'>
            {!isRegister ? (
              <>
                <LoginForm />
                <div className="w-full text-center">
                <button onClick={() => { setIsRegister(true) }} className="text-sm text-[#676767] text-center">
                  No tiene una cuenta <span className="hover:text-red-600">regístrese aquí</span>
                </button>
                </div>
              </>
            ) : (
              <>
                <RegisterForm />
                <div className="w-full text-center">
                <button onClick={() => { setIsRegister(false) }} className="text-sm text-[#676767]">
                  Tiene una cuenta <span className="hover:text-red-600">ingrese aquí</span>
                </button>
                </div>
                </>
            )}
          </div>
        </div>
      </Wrapper>
      <div className='text-center absolute bottom-0 w-full py-6'>
        <p className='text-white text-sm font-bold'>
          © 2024 Copyright RESTAURANTE ( ,+)
        </p>
      </div>
    </div>
  );
};
