import express, { Request, Response } from 'express';
import verifyToken from '../middleware/auth';
import Hotel from '../models/hotel';

const router = express.Router();

router.get("/", verifyToken, async (req: Request, res: Response) => {
    try {
        const hotels = await Hotel.find({
            bookings: { $elemMatch: { userId: req.userId } },
        });

        const results = hotels.map((hotel)=>{
            const userBookings = hotel.bookings.filter(
                (booking) => booking.userId === req.userId
            );
            
            const hotelWithUserBookings ={
                ...hotel.toObject(),
                bookings: userBookings,
            };
            return hotelWithUserBookings;
        });
        res.status(200).json(results);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Unable to Fetch Bookings" });
    }
})

export default router;