/** Clickable button for user interactions */
import styled from "@emotion/styled";
import { Icon, IconType } from "../icon/Icon";
import { theme } from "../theme";

export const BUTTON_LOOKS = {
  KEY: "key",
  GHOST: "ghost",
  FLAT: "flat",
} as const;

export type ButtonLook = (typeof BUTTON_LOOKS)[keyof typeof BUTTON_LOOKS];

export interface ButtonProps {
  children: React.ReactNode;
  look?: ButtonLook;
  icon?: IconType;
  hideCaption?: boolean;
  onClick: () => void;
  ariaLabel?: string;
}

// BaseButton component is created with button element with styles
const BaseButton = styled.button<ButtonProps>`
  cursor: pointer;
  background: ${({ look }) =>
    look === BUTTON_LOOKS.KEY
      ? theme.color.background.keyButton
      : theme.color.background.default};
  font-size: ${theme.fontSize.md};
  color: ${({ look }) =>
    look === BUTTON_LOOKS.KEY
      ? theme.color.background.default
      : theme.color.background.keyButton};
  height: ${theme.space.xl};
  width: fit-content;
  padding: ${theme.space.md};
  border: ${({ look }) =>
    look === BUTTON_LOOKS.GHOST
      ? theme.space.px + " solid " + theme.color.background.keyButton
      : "none"};
  border-radius: ${theme.radius.md};
  outline: none;
  display: inline-flex;
  justify-content: center;
  font-weight: ${theme.fontWeight.regular};
  gap: ${theme.space.xs};

  &:hover {
    /* Shows when button is mouse hover */
    background: ${({ look }) =>
      look === BUTTON_LOOKS.KEY
        ? theme.color.background.keyButtonHover
        : theme.color.background.hover};
  }
  &:active {
    /* Shows when button is pressed */
    background-color: ${({ look }) =>
      look === BUTTON_LOOKS.KEY
        ? theme.color.background.keyButtonPress
        : theme.color.background.press};
  }
  &:focus-visible {
    /* Only shows outline when focus comes from keyboard */
    box-shadow: 0 0 0 ${theme.space.xxs} ${theme.color.stroke.focus};
    background: ${({ look }) =>
      look === BUTTON_LOOKS.KEY
        ? theme.color.background.keyButtonFocus
        : theme.color.background.focus};
  }
`;
export const Button = ({
  children,
  look = BUTTON_LOOKS.KEY,
  hideCaption = false,
  icon,
  onClick,
  ariaLabel,
  ...props
}: ButtonProps) => {
  return (
    <BaseButton
      type="button"
      onClick={onClick}
      look={look}
      hideCaption={hideCaption}
      icon={icon}
      aria-label={ariaLabel || (hideCaption ? String(children) : undefined)}
      {...props}
    >
      {/* Logic for showing icon when icon is provided   */}
      {icon && (
        <Icon
          color={look === BUTTON_LOOKS.KEY ? "inverted" : "default"}
          icon={icon}
        />
      )}
      {/* Condition for showing/hiding caption based on hideCaption boolean value */}
      {!hideCaption && children}
    </BaseButton>
  );
};

export default Button;
