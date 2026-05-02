import { DanhMucMayXucItemType } from "#src/api/danhmuc/mayxuc/types";
import { BasicButton } from "#src/components/basic-button";
import { TEN_THIET_BI_RULES, LOAI_THIET_BI_RULES } from "#src/constants/rules";

import { Form, Input, Modal } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface DetailProps {
	open: boolean;
	setOpen: (open: boolean) => void;
	title: string;
	detailData: Partial<DanhMucMayXucItemType>;
	onFinish: (values: DanhMucMayXucItemType) => Promise<void>;
}

export function Detail({ open, setOpen, title, detailData, onFinish }: DetailProps) {
	const { t } = useTranslation();
	const [form] = Form.useForm();

	useEffect(() => {
		if (open) {
			form.setFieldsValue(detailData);
		}
	}, [open, detailData, form]);

	const handleFinish = async (values: DanhMucMayXucItemType) => {
		await onFinish(values);
		form.resetFields();
		setOpen(false);
	};

	const handleCancel = () => {
		form.resetFields();
		setOpen(false);
	};

	return (
		<Modal
			title={title}
			open={open}
			onCancel={handleCancel}
			footer={null}
			width={600}
		>
			<Form
				form={form}
				layout="vertical"
				onFinish={handleFinish}
				initialValues={detailData}
			>
				<Form.Item
					label={t("danhmuc.tenThietBi")}
					name="ten_thiet_bi"
					rules={TEN_THIET_BI_RULES(t)}
				>
					<Input placeholder={t("danhmuc.tenThietBiPlaceholder")} />
				</Form.Item>

				<Form.Item
					label={t("danhmuc.loaiThietBi")}
					name="loai_thiet_bi"
					rules={LOAI_THIET_BI_RULES(t)}
				>
					<Input placeholder={t("danhmuc.loaiThietBiPlaceholder")} />
				</Form.Item>

				<div className="flex justify-end gap-2">
					<BasicButton onClick={handleCancel}>
						{t("common.cancel")}
					</BasicButton>
					<BasicButton type="primary" htmlType="submit">
						{t("common.save")}
					</BasicButton>
				</div>
			</Form>
		</Modal>
	);
}