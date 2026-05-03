import type { ViTriLapDatItemType } from "./types";
import { request } from "#src/utils/request";

export * from "./types";

/* Lấy danh sách vị trí lắp đặt */
export function fetchViTriLapDatList() {
	return request
		.get<ViTriLapDatItemType[]>("vi-tri-lap-dat", {
			ignoreLoading: true,
		})
		.json();
}

/* Thêm mới vị trí lắp đặt */
export function fetchAddViTriLapDatItem(data: Omit<ViTriLapDatItemType, "id">) {
	return request.post("vi-tri-lap-dat", {
		json: data,
		ignoreLoading: true,
	});
}

/* Cập nhật vị trí lắp đặt */
export function fetchUpdateViTriLapDatItem(
	id: number,
	data: Omit<ViTriLapDatItemType, "id">,
) {
	return request.put(`vi-tri-lap-dat/${id}`, {
		json: data,
		ignoreLoading: true,
	});
}

/* Xóa một vị trí lắp đặt */
export function fetchDeleteViTriLapDatItem(id: number) {
	return request.delete(`vi-tri-lap-dat/${id}`, { ignoreLoading: true });
}

/* Xóa nhiều vị trí lắp đặt */
export function fetchDeleteMultipleViTriLapDatItems(ids: number[]) {
	return request.delete("vi-tri-lap-dat", {
		json: { ids },
		ignoreLoading: true,
	});
}
