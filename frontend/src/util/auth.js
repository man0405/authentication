import { redirect } from "react-router-dom";

export function getDurationToken() {
	const storedExpirationDate = localStorage.getItem("expiration");
	const expirationDate = new Date(storedExpirationDate);
	console.log("expiration" + expirationDate);
	const now = new Date();
	const duration = expirationDate.getTime() - now.getTime();
	console.log(duration);
	return duration;
}

export function getToken() {
	const token = localStorage.getItem("token");

	if (!token) {
		return null;
	}

	const tokenDuration = getDurationToken();

	if (tokenDuration < 0) {
		return "EXPIRED";
	}

	return token;
}

export function tokenLoader() {
	return getToken();
}

export function checkAuthLoader() {
	const token = getToken();
	if (!token) {
		return redirect("/auth");
	}
	return null;
}
