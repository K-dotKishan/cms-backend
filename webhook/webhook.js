import express from "express";

const router = express.Router();

router.post("/test", (req, res) => {
    console.log("Git hub recived");
    console.log(req.body)

    res.status(200).json({
        success: true,
        message: "Git hub recived"
    })
    res.json({
        success: true,
        message: "Git hub recived"
    })
})


export default router
