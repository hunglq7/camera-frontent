import { request } from "#src/utils/request";
import type { DanhMucMayCaoItemType } from "./types";

export * from "./types";

/* Lấy danh sách danh mục máy cao */
export function fetchDanhMucMayCaoList() {
	return request
		.get<DanhMucMayCaoItemType[]>("danh-muc-may-cao", {
			ignoreLoading: true,
		})
		.json();
}

/* Thêm mới danh mục máy cao */
export function fetchAddDanhMucMayCaoItem(
	data: Omit<DanhMucMayCaoItemType, "id">,
) {
	return request.post("danh-muc-may-cao", {
		json: data,
		ignoreLoading: true,
	});
}

/* Cập nhật danh mục máy cao */
export function fetchUpdateDanhMucMayCaoItem(
	id: number,
	data: Omit<DanhMucMayCaoItemType, "id">,
) {
	return request.put(`danh-muc-may-cao/${id}`, {
		json: data,
		ignoreLoading: true,
	});
}

/* Xóa một danh mục máy cao */
export function fetchDeleteDanhMucMayCaoItem(id: number) {
	return request.delete(`danh-muc-may-cao/${id}`, { ignoreLoading: true });
}

/* Xóa nhiều danh mục máy cao */
export function fetchDeleteMultipleDanhMucMayCaoItems(ids: number[]) {
	return request.delete("danh-muc-may-cao", {
		json: { ids },
		ignoreLoading: true,
	});
}
