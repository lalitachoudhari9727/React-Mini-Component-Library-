import { PropsWithChildren } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { theme } from "../theme";

export interface StackProps {
  /** Direction in which children are placed */
  direction?: "row" | "column";
  /** Position elements along the flex direction */
  justify?: "start" | "center" | "end" | "between" | "around";
  /** Position elements opposing the flex direction */
  align?: "start" | "center" | "end" | "stretch";
  /** Spacing between children */
  gap?: keyof typeof theme.space;
  /** Position the stack inline or as a block element. */
  inline?: boolean;
  /** Children will wrap into multiple columns / rows if enabled */
  wrap?: boolean;
}

interface FlexBoxProps extends Omit<StackProps, "wrap"> {
  flexWrap?: boolean;
}
const FlexBox = styled.div<FlexBoxProps>(
  ({ gap, direction, justify, align, inline, flexWrap }) => css`
    display: ${inline ? "inline-flex" : "flex"};
    gap: ${gap && theme.space[gap]};
    flex-direction: ${direction};
    justify-content: ${justify};
    align-items: ${align};
    flex-wrap: ${flexWrap && "wrap"};
  `,
);

/** Utility flexbox component to position elements.
 *
 *  > **Note:** This is a component used as a code example and for the stories in the storybook.
 *  > You can, but don't have to use it.
 **/
export const Stack = ({ wrap, ...props }: PropsWithChildren<StackProps>) => (
  <FlexBox {...props} flexWrap={wrap} />
);
