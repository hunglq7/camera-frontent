import { request } from "#src/utils/request";
import type { DanhMucMayXucItemType } from "./types";

export * from "./types";

/* Lấy danh sách danh mục máy xúc */
export function fetchDanhMucMayXucList() {
	return request
		.get<DanhMucMayXucItemType[]>("danh-muc-may-xuc", {
			ignoreLoading: true,
		})
		.json();
}

/* Thêm mới danh mục máy xúc */
export function fetchAddDanhMucMayXucItem(
	data: Omit<DanhMucMayXucItemType, "id">,
) {
	return request.post("danh-muc-may-xuc", {
		json: data,
		ignoreLoading: true,
	});
}

/* Cập nhật danh mục máy xúc */
export function fetchUpdateDanhMucMayXucItem(
	id: number,
	data: Omit<DanhMucMayXucItemType, "id">,
) {
	return request.put(`danh-muc-may-xuc/${id}`, {
		json: data,
		ignoreLoading: true,
	});
}

/* Xóa một danh mục máy xúc */
export function fetchDeleteDanhMucMayXucItem(id: number) {
	return request.delete(`danh-muc-may-xuc/${id}`, { ignoreLoading: true });
}

/* Xóa nhiều danh mục máy xúc */
export function fetchDeleteMultipleDanhMucMayXucItems(ids: number[]) {
	return request.delete("danh-muc-may-xuc", {
		json: { ids },
		ignoreLoading: true,
	});
}
