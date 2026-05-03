/**
 * 标签页操作的键值对象
 * @readonly
 * @enum {string}
 * @property {string} REFRESH - 重新加载当前标签页
 * @property {string} CLOSE - 关闭当前标签页
 * @property {string} CLOSE_RIGHT - 关闭右侧标签页
 * @property {string} CLOSE_LEFT - 关闭左侧标签页
 * @property {string} CLOSE_OTHERS - 关闭其他标签页
 * @property {string} CLOSE_ALL - 关闭所有标签页
 */
export const TabActionKeys = {
	REFRESH: "refresh",
	CLOSE: "close",
	CLOSE_RIGHT: "closeRight",
	CLOSE_LEFT: "closeLeft",
	CLOSE_OTHERS: "closeOthers",
	CLOSE_ALL: "closeAll",
} as const;

export type TabActionKey = (typeof TabActionKeys)[keyof typeof TabActionKeys];
