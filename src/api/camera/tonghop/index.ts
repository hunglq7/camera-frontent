import { request } from "#src/utils/request";
import type { TonghopCameraItemType } from "./types";

export * from "./types";

export const fetchTonghopCamerasList = () => {
	return request
		.get<TonghopCameraItemType[]>("/tong-hop-camera", {
			ignoreLoading: true,
		})
		.json();
};

export function fetchAddTonghopCameraItem(
	data: Omit<TonghopCameraItemType, "id" | "last_updated">,
) {
	return request.post("tong-hop-camera", {
		json: data,
		ignoreLoading: true,
	});
}

export function fetchUpdateTonghopCameraItem(
	id: number,
	data: Omit<TonghopCameraItemType, "id" | "camera_id" | "last_updated">,
) {
	return request.put(`tong-hop-camera/${id}`, {
		json: data,
		ignoreLoading: true,
	});
}

export function fetchDeleteTonghopCameraItem(id: number) {
	return request.delete(`tong-hop-camera/${id}`, { ignoreLoading: true });
}
