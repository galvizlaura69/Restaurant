import axios from 'axios';

export const RegisterUser = async (data: any) => {
    const response = await axios.post("http://localhost/Restaurante/Restaurante/Model/gestion.php",
        {
            accion: "insertar_usuario",
            data
        }
    );
    return response.data;
};
