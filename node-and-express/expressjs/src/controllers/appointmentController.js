import { appointmentService } from '../services/appointmentService.js';
export const getUserAppoinment = async (req, res) => {
     try {
          const userId = req.params.id;
          const appointments = await appointmentService.getUserAppointments(userId);
          res.json(appointments);
     } catch (error) {
          res.status(500).json({ error: 'Error al obtener el historial de citas' });
     }
};