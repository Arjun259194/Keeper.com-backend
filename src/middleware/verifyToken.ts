import jwt from "jsonwebtoken"
import { Response, Request, NextFunction } from "express"

const JWT_KEY = process.env.JWT_KEY || "topSecret"

const verifyToken = async (request: Request, response: Response, next: NextFunction) => {
  try {
    let token = request.get("authorization")?.split(" ")[1]
    if (!token)
      return response.status(401).json({
        status: "Not Authorized",
        message: "Authorization token not found",
      })
    const verified = jwt.verify(token, JWT_KEY)
    if (!verified)
      return response.status(401).json({
        status: "Not authorized",
        message: "Token not verified",
      })
    request.userId = verified
    return next()
  } catch (err: any) {
    return response.status(400).json({
      Error: err.message,
    })
  }
}

export default verifyToken
