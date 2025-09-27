import { createReservation, getReservation, updateReservation, deleteReservation} from '../services/reservationService.js';

export const createReservationController = async (req, res) => {
  try {
    const reservation = await createReservation(
      req.body
    );
    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getReservationController = async (req, res) => {
  try {
    const reservation = await getReservation(req.params.id);
    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    res.json(reservation);
  } catch (error) {
    res.status(400).json({ errr: error.message });
  }
};

export const updateReservationController = async (req, res) => {
  try {
    const reservation = await updateReservation(
      req.params.id,
      req.body
    );
    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    res.json(reservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteReservationController = async (req, res) => {
  try {
    const result = await deleteReservation(req.params.id);
    if (!result) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};