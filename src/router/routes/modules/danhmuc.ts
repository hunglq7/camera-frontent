import type { AppRouteRecordRaw } from "#src/router/types";
import ContainerLayout from "#src/layout/container-layout";
import { lazy } from "react";

const DanhMucMayCao = lazy(() => import("#src/pages/danhmuc/maycao"));
const DanhMucMayXuc = lazy(() => import("#src/pages/danhmuc/mayxuc"));

const routes: AppRouteRecordRaw[] = [
	{
		path: "/danhmuc",
		Component: ContainerLayout,
		handle: {
			icon: "SettingOutlined",
			title: "common.menu.danhmuc",
			order: 3,
			ignoreAccess: true,
		},
		children: [
			{
				path: "/danhmuc/maycao",
				Component: DanhMucMayCao,
				handle: {
					icon: "TableOutlined",
					title: "danhmuc.mayCaoManagement",
					ignoreAccess: true,
					permissions: [
						"permission:button:add",
						"permission:button:update",
						"permission:button:delete",
					],
				},
			},
			{
				path: "/danhmuc/mayxuc",
				Component: DanhMucMayXuc,
				handle: {
					icon: "TableOutlined",
					title: "danhmuc.mayXucManagement",
					ignoreAccess: true,
					permissions: [
						"permission:button:add",
						"permission:button:update",
						"permission:button:delete",
					],
				},
			},
		],
	},
];

export default routes;
