import type { AppRouteRecordRaw } from "#src/router/types";

import ContainerLayout from "#src/layout/container-layout";
import { lazy } from "react";

const TaiKhoan = lazy(() => import("#src/pages/hethong/taikhoan"));

const routes: AppRouteRecordRaw[] = [
	{
		path: "/hethong",
		Component: ContainerLayout,
		handle: {
			icon: "SettingOutlined",
			title: "system.menu.system",
			order: 4,
			roles: ["admin"],
		},
		children: [
			{
				path: "/hethong/taikhoan",
				Component: TaiKhoan,
				handle: {
					icon: "UserOutlined",
					title: "system.menu.account",
					roles: ["admin"],
				},
			},
		],
	},
];

export default routes;
