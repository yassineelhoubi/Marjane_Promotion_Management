import jwt from "jsonwebtoken";
// generate tokens :
export const createToken = (payload = null, role = null) => {
  if (!payload) return null;
  if (!role) return null;
  switch (role) {
    case "ADMIN":
      return jwt.sign(payload, process.env.SECRET_KEY_ADMIN, {
        expiresIn: "1h",
      });
    case "SUBADMIN":
      return jwt.sign(payload, process.env.SECRET_KEY_SUBADMIN, {
        expiresIn: "1h",
      });
    case "MANAGER":
      return jwt.sign(payload, process.env.SECRET_KEY_MANAGER, {
        expiresIn: "1h",
      });
    default:
      return null;
  }
};
// verify tokens
export const verifyToken = (token = null, role = null) => {
  if (!token) return null;
  if (!role) return null;
  try {
    switch (role) {
      case "ADMIN":
        return jwt.verify(token, process.env.SECRET_KEY_ADMIN);
        break;
      case "SUBADMIN":
        return jwt.verify(token, process.env.SECRET_KEY_SUBADMIN);
        break;
      case "MANAGER":
        return jwt.verify(token, process.env.SECRET_KEY_MANAGER);
        break;
      default:
        return null;
    }
  } catch (err) {
    return null;
  }
};
