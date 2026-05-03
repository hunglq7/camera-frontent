/**
 * 检查当前运行环境是否为 macOS。
 *
 * 通过检查 navigator.userAgent 字符串来判断当前运行环境。
 */
const macRegex = /macintosh|mac os x/i;

export function isMacOs() {
	return macRegex.test(navigator.userAgent);
}
