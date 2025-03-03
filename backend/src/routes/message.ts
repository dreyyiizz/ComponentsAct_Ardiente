
import { Router } from 'express'

const router = Router();

router.post("/POST", (req,res) => {
    const message = req.body;
})
