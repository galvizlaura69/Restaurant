import { z } from 'zod';

export const UserSchema = z.object({
  data: z.object({
    usuario_nombre: z.string().nonempty("El nombre es obligatorio"),
    usuario_correo: z.string().email("El correo debe ser válido").nonempty("El correo es obligatorio"),
    password: z.string().nonempty("La contraseña es obligatoria"),
    usuario_tipo_id: z.string().nullable(),
    usuario_id: z.number(),
  }),
});


export type UserType = z.infer<typeof UserSchema>;