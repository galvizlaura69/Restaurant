import { BiHome, BiMenu, BiUser, BiLogOut, BiRestaurant } from 'react-icons/bi';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const MenuApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const location = useLocation();
  const navigate = useNavigate();

  const handleRedirect = (path: string) => {
    navigate(path);
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { path: '/inicio', icon: <BiHome className={`text-3xl ${location.pathname === '/inicio' ? 'fill-[#800020]' : ''}`} />, label: 'Inicio' },
    { path: '/perfil', icon: <BiUser className={`text-3xl ${location.pathname === '/perfil' ? 'fill-[#800020]' : ''}`} />, label: 'Perfil' },
    { path: '/restaurantes', icon: <BiRestaurant className={`text-3xl ${location.pathname === '/restaurantes' ? 'fill-[#800020]' : ''}`} />, label: 'Restaurantes' },
  ];


  const logoutItem = {
    path: '/cerrar-sesion',
    icon: <BiLogOut className={`text-3xl ${location.pathname === '/cerrar-sesion' ? 'fill-[#800020]' : ''}`} />,
    label: 'Cerrar sesión'
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav className={`sticky top-0 left-0 bg-gray-200 shadow-lg z-60 h-screen ${isOpen ? 'w-64' : 'w-16'} flex flex-col transition-width duration-300`}>
      <div className={`flex justify-end p-2 ${!isOpen && "m-auto"}`}>
        <button className="text-xl" onClick={toggleMenu}>
          <BiMenu className="text-5xl" />
        </button>
      </div>
      <div className="flex-grow pt-8 flex flex-col items-start m-auto">
        {isOpen && (
          <div className="flex flex-col items-start gap-4 w-full">
            {menuItems.map(({ path, icon, label }) => (
              <div
                key={path}
                className={`flex items-center cursor-pointer mb-4 text-xl w-full py-3 px-5 ${location.pathname === path ? 'bg-gray-300 rounded-md' : ''}`} 
                onClick={() => handleRedirect(path)}
              >
                {icon}
                <span className={`ml-2 ${location.pathname === path ? 'font-bold text-[#800020]' : ''}`}>{label}</span>
              </div>
            ))}
          </div>
        )}
        {!isOpen && (
          <div className="flex flex-col items-start gap-6">
            {menuItems.map(({ path, icon }) => (
              <div
                key={path}
                className={`flex items-center cursor-pointer mb-4 text-lg py-3 px-2 ${location.pathname === path ? 'bg-gray-300 rounded-md' : ''}`} 
                onClick={() => handleRedirect(path)}
              >
                {icon}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={`py-4 ${isOpen ? 'w-full' : 'w-16'} flex justify-center`}>
        <div
          className={`flex items-center cursor-pointer text-xl py-3 px-5 w-full ${location.pathname === logoutItem.path ? 'bg-gray-300 rounded-md' : ''}`} 
          onClick={() => handleRedirect(logoutItem.path)}
        >
          {logoutItem.icon}
          {isOpen && <span className={`ml-2 ${location.pathname === logoutItem.path ? 'font-bold text-[#800020]' : ''}`}>{logoutItem.label}</span>}
        </div>
      </div>
    </nav>
  );
};
