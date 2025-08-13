import styled from "@emotion/styled";

import { icons } from "./icons";
import { theme } from "../theme";

export type IconType = keyof typeof icons;
export type IconColor = "default" | "inverted" | "inherit";

export interface IconProps {
  /** Icon to display */
  icon: IconType;
  /** Color of the icon */
  color?: IconColor;
}

const iconColor: Record<IconColor, string> = {
  default: theme.color.text.default,
  inverted: theme.color.text.inverted,
  inherit: "currentColor",
};

const Svg = styled.svg`
  height: ${theme.space.md};
  width: ${theme.space.md};
  stroke-width: ${theme.space.xxs};
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
  flex-shrink: 0;
  flex-grow: 0;
`;

/** Displays small vector graphics to provide visual hints */
export const Icon = ({ icon, color = "default" }: IconProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    stroke={iconColor[color]}
  >
    {icons[icon]}
  </Svg>
);
