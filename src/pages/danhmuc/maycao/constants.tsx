import { useTranslation } from "react-i18next";

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
			title: t("danhmuc.tenThietBi"),
			dataIndex: "ten_thiet_bi",
			key: "ten_thiet_bi",
			width: 200,
			sorter: true,
		},
		{
			title: t("danhmuc.loaiThietBi"),
			dataIndex: "loai_thiet_bi",
			key: "loai_thiet_bi",
			width: 200,
			sorter: true,
		},
	];
}