import { DanhMucMayXucItemType } from "#src/api/danhmuc/mayxuc/types";
import type { ActionType, ProColumns, ProCoreActionType } from "@ant-design/pro-components";
import {
	fetchDanhMucMayXucList,
	fetchDeleteDanhMucMayXucItem,
	fetchDeleteMultipleDanhMucMayXucItems,
	fetchAddDanhMucMayXucItem,
	fetchUpdateDanhMucMayXucItem
} from "#src/api/danhmuc/mayxuc/index";
import { BasicButton } from "#src/components/basic-button";
import { BasicContent } from "#src/components/basic-content";
import { BasicTable } from "#src/components/basic-table";
import { accessControlCodes, useAccess } from "#src/hooks/use-access";
import { PlusCircleOutlined, DownloadOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import * as XLSX from "xlsx";
import { Detail } from "./component/detail";
import { getConstantColumns } from "./constants";

export default function DanhMucMayXuc() {
	const { t } = useTranslation();
	const { hasAccessByCodes } = useAccess();
	const [isOpen, setIsOpen] = useState(false);
	const [title, setTitle] = useState("");
	const [detailData, setDetailData] = useState<Partial<DanhMucMayXucItemType>>({});
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
	const actionRef = useRef<ActionType>(null);

	// Xóa một bản ghi
	const handleDeleteRow = async (id: number, action?: ProCoreActionType<object>) => {
		await fetchDeleteDanhMucMayXucItem(id);
		setSelectedRowKeys([]);
		await action?.reload?.();
		window.$message?.success(t("common.deleteSuccess"));
	};

	// Xóa nhiều bản ghi
	const handleBulkDelete = async () => {
		if (selectedRowKeys.length === 0) {
			return;
		}
		await fetchDeleteMultipleDanhMucMayXucItems(selectedRowKeys as number[]);
		setSelectedRowKeys([]);
		await actionRef.current?.reload();
		window.$message?.success(t("common.deleteSuccess"));
	};

	// Xuất ra file Excel
	const handleExportExcel = async () => {
		try {
			const data = await fetchDanhMucMayXucList();
			const exportData = data.map((item, index) => ({
				STT: index + 1,
				'Tên thiết bị': item.ten_thiet_bi,
				'Loại thiết bị': item.loai_thiet_bi,
			}));
			const worksheet = XLSX.utils.json_to_sheet(exportData, {
				header: ['STT', 'Tên thiết bị', 'Loại thiết bị']
			});
			// Set độ rộng cột
			worksheet['!cols'] = [{ wch: 5 }, { wch: 25 }, { wch: 35 }];
			const workbook = XLSX.utils.book_new();
			XLSX.utils.book_append_sheet(workbook, worksheet, "DanhMucMayXuc");
			XLSX.writeFile(workbook, "danh_muc_may_xuc.xlsx");
			window.$message?.success(t("common.exportSuccess"));
		} catch (error) {
			console.error("Export failed", error);
			window.$message?.error(t("common.exportFailed"));
		}
	};

	// Xử lý thêm mới
	const handleAdd = async (values: DanhMucMayXucItemType) => {
		await fetchAddDanhMucMayXucItem({
			ten_thiet_bi: values.ten_thiet_bi,
			loai_thiet_bi: values.loai_thiet_bi,
		});
		await actionRef.current?.reload();
		window.$message?.success(t("common.addSuccess"));
	};

	// Xử lý cập nhật
	const handleUpdate = async (values: DanhMucMayXucItemType) => {
		if (detailData.id) {
			await fetchUpdateDanhMucMayXucItem(detailData.id, {
				ten_thiet_bi: values.ten_thiet_bi,
				loai_thiet_bi: values.loai_thiet_bi,
			});
			await actionRef.current?.reload();
			window.$message?.success(t("common.updateSuccess"));
		}
	};

	const columns: ProColumns<DanhMucMayXucItemType>[] = [
		...getConstantColumns(t),
		{
			title: t("common.action"),
			valueType: "option",
			key: "option",
			width: 160,
			fixed: "right",
			render: (_, record, __, action) => [
				<BasicButton
					key="editable"
					type="link"
					size="small"
					disabled={false}
					onClick={() => {
						setIsOpen(true);
						setTitle(t("danhmuc.editMayXuc"));
						setDetailData(record);
					}}
				>
					{t("common.edit")}
				</BasicButton>,
				<Popconfirm
					key="delete"
					title={t("common.confirmDelete")}
					onConfirm={() => handleDeleteRow(record.id!, action)}
					okText={t("common.confirm")}
					cancelText={t("common.cancel")}
				>
					<BasicButton
						type="link"
						size="small"
						danger
						disabled={!hasAccessByCodes(accessControlCodes.delete)}
					>
						{t("common.delete")}
					</BasicButton>
				</Popconfirm>,
			],
		},
	];

	return (
		<BasicContent>
			<BasicTable<DanhMucMayXucItemType>
				headerTitle={t("danhmuc.mayXucManagement")}
				actionRef={actionRef}
				rowKey="id"
				search={false}
				columns={columns}
				request={async (_params, _sorter) => {
					const data = await fetchDanhMucMayXucList();
					return {
						data,
						success: true,
						total: data.length,
					};
				}}
				rowSelection={{
					selectedRowKeys,
					onChange: setSelectedRowKeys,
				}}
				toolBarRender={() => [
					<BasicButton
						key="add"
						type="primary"
						icon={<PlusCircleOutlined />}
						disabled={!hasAccessByCodes(accessControlCodes.add)}
						onClick={() => {
							setIsOpen(true);
							setTitle(t("danhmuc.addMayXuc"));
							setDetailData({});
						}}
					>
						{t("common.add")}
					</BasicButton>,
					<Button
						key="bulk-delete"
						danger
						disabled={selectedRowKeys.length === 0 || !hasAccessByCodes(accessControlCodes.delete)}
						onClick={handleBulkDelete}
					>
						{t("common.bulkDelete")}
					</Button>,
					<BasicButton
						key="export"
						icon={<DownloadOutlined />}
						onClick={handleExportExcel}
					>
						{t("common.export")}
					</BasicButton>,
				]}
			/>

			<Detail
				open={isOpen}
				setOpen={setIsOpen}
				title={title}
				detailData={detailData}
				onFinish={detailData.id ? handleUpdate : handleAdd}
			/>
		</BasicContent>
	);
}