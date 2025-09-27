import { createTimeBlockService, listReservationsService } from '../services/adminService.js';

export const createTimeBlocks=async (req,res)=>{
     if(req.user.role !== 'ADMIN' ) return res.status(403).json({error:'Acceso denegado'});
     const {startTime, endTime}=req.body;
     try {
          const newTimeBlock = await createTimeBlockService(startTime, endTime);
          return res.status(201).json(newTimeBlock);
     } catch (error) {
          return res.status(500).json({error: 'Error al crear el bloque de tiempo'});
     }
};

export const listReservations=async (req, res)=>{
     if(req.user.role !== 'ADMIN' ) return res.status(403).json({error:'Acceso denegado'});
     try {
          const reservations= await listReservationsService();
          return res.json(reservations);
     } catch (error) {
          return res.status(500).json({error: 'Error al obtener las reservas'});
     }
};