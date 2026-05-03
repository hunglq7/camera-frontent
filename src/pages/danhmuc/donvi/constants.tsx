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
			title: t("danhmuc.tenDonVi"),
			dataIndex: "ten_don_vi",
			key: "ten_don_vi",
			width: 200,
			sorter: true,
		},
	];
}
