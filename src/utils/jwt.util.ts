import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "dontuseifnottokenenv";

export function signJWT(payload: object) {
	return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
}

export function verifyJWT(token: string) {
	return jwt.verify(token, SECRET_KEY);
}
