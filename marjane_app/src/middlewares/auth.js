import { verifyToken } from "../utils";
export const Auth =
  (role = "") =>
  async (req, res, next) => {
    const bearer = req?.headers?.authorization;
    if (!bearer) {
      return res.status(401).json({ error: "unauthorized" });
    }
    const token = bearer.split(" ")[1];
    console.log("token is :" + token);
    const payload = verifyToken(token, "");
    console.log("payload is :" + payload);
    if (!payload) {
      return res.status(401).json({ error: "unauthenticated" });
    }
    next();
  };
