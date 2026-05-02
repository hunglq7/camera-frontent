import type { UserInfoType } from "#src/api/user/types";
import { fetchUserInfo } from "#src/api/user";

import { create } from "zustand";

const initialState = {
	id: "",
	avatar: "",
	username: "",
	email: "",
	phoneNumber: "",
	description: "",
	roles: [],
	// menus: [],
};

type UserState = UserInfoType;

interface UserAction {
	getUserInfo: () => Promise<UserInfoType>
	setAvatar: (avatar: string) => void
	reset: () => void
};

export const useUserStore = create<UserState & UserAction>()(

	set => ({
		...initialState,

		getUserInfo: async () => {
			const response = await fetchUserInfo();
			set({
				...response,
			});
			return response;
		},

		setAvatar: (avatar: string) => {
			set({ avatar });
		},

		reset: () => {
			return set({
				...initialState,
			});
		},

	}),

);
