export function getConstantColumns(t: (key: string) => string) {
	return [
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
			width: 80,
			sorter: true,
		},
		{
			title: t("danhmuc.tenViTri"),
			dataIndex: "ten_vi_tri",
			key: "ten_vi_tri",
			width: 240,
			sorter: true,
		},
		{
			title: t("danhmuc.moTa"),
			dataIndex: "mo_ta",
			key: "mo_ta",
			ellipsis: true,
		},
	];
}
