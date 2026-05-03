import type {
	LoginInfo,
	UserInfoType,
	UserItemType,
	UserListResponse,
	UserRegisterPayload,
	UserSavePayload,
	UserUpdatePayload,
} from "./types";

import { useAuthStore } from "#src/store/auth";
import { request } from "#src/utils/request";

const BASE64_URL_DASH_REGEX = /-/g;
const BASE64_URL_UNDERSCORE_REGEX = /_/g;

function base64UrlDecode(value: string) {
	return value
		.replace(BASE64_URL_DASH_REGEX, "+")
		.replace(BASE64_URL_UNDERSCORE_REGEX, "/");
}

export * from "./types";

// export function fetchLogin(data: LoginInfo) {
// 	return request
// 		.post("api/Users/authenticate", { json: data })
// 		.json<{ isSuccessed: boolean; message: string; resultObj: string }>();
// }

export function fetchLogin(data: LoginInfo) {
	return request.post("auth/login", { json: data }).json<{
		access_token: string
		refresh_token: string
		token_type: string
		user_id: number
	}>();
}

export function fetchRegister(data: UserRegisterPayload) {
	return request.post("auth/register", { json: data }).json<{
		access_token: string
		refresh_token: string
		token_type: string
		user_id: number
	}>();
}

export function fetchLogout() {
	return request.post("auth/logout").json();
}

export function fetchAsyncRoutes() {
	return request.get("api/Users/get-async-routes").json();
}

export function fetchUserInfo(): UserInfoType {
	const token = useAuthStore.getState().token;
	if (!token) {
		throw new Error("No token");
	}

	try {
		// Decode JWT token to get user info
		const payload = token.split(".")[1];
		const base64 = base64UrlDecode(payload);
		const jsonPayload = decodeURIComponent(
			atob(base64)
				.split("")
				.map(c => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`)
				.join(""),
		);
		const decoded = JSON.parse(jsonPayload);
		const roles: string[] = decoded.roles
			? Array.isArray(decoded.roles)
				? decoded.roles.map((role: string) => String(role).toLowerCase())
				: [String(decoded.roles).toLowerCase()]
			: [];
		return {
			id: decoded.sub || "",
			username: decoded.username || "",
			email: decoded.email || "",
			phoneNumber: "",
			description: "",
			avatar: decoded.avatar || "",
			roles,
		};
	}
	catch (error) {
		console.error("Failed to decode token", error);
		throw error;
	}
}

export interface RefreshTokenResult {
	access_token: string
	refresh_token: string
	token_type: string
	user_id: number
}

export function fetchRefreshToken(data: { readonly refresh_token: string }) {
	return request
		.post("auth/refresh", { json: data })
		.json<RefreshTokenResult>();
}

export function fetchUserList(skip = 0, limit = 100) {
	return request
		.get("users", { searchParams: { skip, limit } })
		.json<UserListResponse>();
}

export function fetchCreateUser(data: UserSavePayload) {
	return request.post("users", { json: data }).json<UserItemType>();
}

export function fetchUpdateUser(id: number, data: UserUpdatePayload) {
	return request.put(`users/${id}`, { json: data }).json<UserItemType>();
}

export function fetchDeleteUser(id: number) {
	return request.delete(`users/${id}`).json<{ deleted: number }>();
}

export function fetchDeleteUsers(ids: number[]) {
	return request.delete("users", { json: { ids } }).json<{ deleted: number }>();
}

export function fetchUploadAvatar(file: File) {
	const formData = new FormData();
	formData.append("file", file);

	// Use fetch directly for FormData to avoid ky issues
	return fetch(`${import.meta.env.VITE_API_BASE_URL}upload/avatar`, {
		method: "POST",
		body: formData,
		headers: {
			Authorization: `Bearer ${useAuthStore.getState().token}`,
		},
	}).then((response) => {
		if (!response.ok) {
			throw new Error(`Upload failed: ${response.status}`);
		}
		return response.json();
	});
}
