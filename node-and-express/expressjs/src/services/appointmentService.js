import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const appointmentService = async (userId) => {
     try {
          const appointments = await prisma.appointment.findMany({
               where: { userId: parseInt(userId) },
               include: { timeBlock: true }
          });
          return appointments;
     } catch (error) {
          throw new Error('Error al obtener el historial de citas');
     }
};