import jwt from "jsonwebtoken";
const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: `User not authenticated.`,
      });
    }
    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      return res.status(401).json({
        success: false,
        message: `Invalid token.`,
      });
    }
    req.id = decode.userId;
    next();
  } catch (error) {
    console.log(
      `Internal Server Error in Authenticated-Middleware API: ${error} `
    );
    return res.status(500).json({
      success: false,
      message: `Internal Server Error in Authenticated-Middleware API: ${error} `,
    });
  }
};
export default isAuthenticated;
