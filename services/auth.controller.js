import { loginService } from "./auth.service.js";

export const createArtifact = async (req,res) => {
    try {
        const artifact = await createArtifactService({
            title: req.body.title,
            content: req.body.content,
            userId: req.user.id
        });
        res.status(201).json({
            success: true,
            message: "Artifact created successfully",
            artifact
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create artifact",
            error: error.message
        })
    }
}

export const login = async (req,res) => {
    try {
       const {email,password} = req.body
       const result = await loginService(email,password)
       
       res.cookie("token",result.token,{
        httpOnly:true,
        secure:true,
        sameSite:"strict",
        maxAge:1000*60*60
       })

       res.status(200).json({
        success: true,
        message: "Login successful",
        result
       })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to login",
            error: error.message
        })
    }
}