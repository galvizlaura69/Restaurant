import axios from 'axios';

export const getUser = async (email: string): Promise<any[]> => {
    const response = await axios.get( `http://localhost/Restaurante/Restaurante/Model/gestion.php?accion=buscar_usuario_por_correo&usuario_correo=${email}`);
    return response.data;
};
