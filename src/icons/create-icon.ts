import type { IconComponentProps } from "@ant-design/icons/lib/components/Icon";

import Icon from "@ant-design/icons";
import { createElement } from "react";

interface SvgModule {
	default: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

// Eagerly load all SVG files in the svg directory
const svgModules: Record<string, SvgModule> = import.meta.glob("./svg/*.svg", {
	query: "?react",
	eager: true,
});

// Create a map of icon names to components
const SVG_NAME_REGEX = /^\.\/svg\/(.*)\.svg$/;
const SVG_PREFIX_REGEX = /^svg:/;

const iconMap = Object.fromEntries(
	Object.entries(svgModules).map(([path, module]) => {
		const iconName = path.replace(SVG_NAME_REGEX, "$1");
		return [iconName, module.default];
	}),
);

export function createIconifyIcon(iconPath: string) {
	const iconName = iconPath.replace(SVG_PREFIX_REGEX, "");
	const SvgComponent = iconMap[iconName];

	if (!SvgComponent) {
		console.error(`Icon not found: ${iconName}`);
		return () => null;
	}
	return function IconComponent(props: IconComponentProps) {
		return createElement(Icon, { component: SvgComponent, ...props });
	};
}
