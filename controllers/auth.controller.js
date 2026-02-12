import {
  initiateSignupService,
  verifySignupOtpService,
  loginService
} from "../services/auth.service.js";

/**
 * POST /auth/signup/initiate
 */
export const initiateSignup = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }

    const result = await initiateSignupService(email);

    res.status(200).json({
      success: true,
      message: "OTP generated successfully",
      ...result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * POST /auth/signup/verify
 */
export const verifySignupOtp = async (req, res) => {
  try {
    const { email, otp, name, password,role } = req.body;

    if (!email || !otp || !name || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const user = await verifySignupOtpService({
      email,
      otp,
      name,
      password,
      role
    });

    res.status(201).json({
      success: true,
      message: "User signed up successfully",
      user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Email and password required"
//       });
//     }

//     const result = await loginService(email, password);

//     res.status(200).json({
//       success: true,
//       message: "Login successful",
//       ...result
//     });
//   } catch (error) {
//     res.status(401).json({
//       success: false,
//       message: error.message
//     });
//   }
// };


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required"
      });
    }

    const result = await loginService(email, password);

    // Set the cookie for browser-based sessions
    res.cookie("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: "lax",
      maxAge: 60 * 60 * 1000 // 1 hour
    });

    // Send JSON response with token for Postman/Frontend access
    res.status(200).json({
      success: true,
      message: "Login successful",
      token: result.token, // <--- Add this so you can copy it in Postman
      user: result.user
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message
    });
  }
};




// // //cookies version  