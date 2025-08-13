import styled from "@emotion/styled";
import type { Meta, StoryObj } from "@storybook/react";

import { argType } from "./utils/argTypes";
import { createRange } from "./utils/createRange";
import { Stack, theme } from "../src";

const Item = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  height: ${theme.space.lg};
  width: ${theme.space.lg};
  border: ${theme.space.px} solid ${theme.color.stroke.default};
`;

const RenderStory: typeof Stack = (props) => (
  <Stack {...props}>
    {createRange(10).map((item) => (
      <Item key={item}>{item}</Item>
    ))}
  </Stack>
);

const meta = {
  title: "Other Components/Stack",
  component: Stack,
  render: RenderStory,
  argTypes: {
    children: argType.disabled(),
    gap: argType.enum("select", [undefined, ...Object.keys(theme.space)]),
    direction: argType.enum("radio"),
    align: argType.enum("select"),
    justify: argType.enum("select"),
    wrap: argType.boolean(),
    inline: argType.boolean(),
  },
  args: {
    direction: "row",
    align: "start",
    justify: "start",
    gap: undefined,
    wrap: false,
    inline: false,
  },
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

/** By default, the Stack just renders a div with the `display: flex` attribute around its children. */
export const Standard: Story = {};

/** By passing `direction={column}` as prop, the children can also be ordered vertically. */
export const Direction: Story = {
  args: { direction: "column" },
};

/** Content can be aligned in flex direction, by passing a `justify` prop. */
export const Justify: Story = {
  args: { justify: "center" },
};

/** Content can be aligned opposed to the flex direction, by passing an `align` prop. */
export const Align: Story = {
  args: { direction: "column", align: "center" },
};

/** Pass a `gap` prop to add spacing between children. */
export const Gap: Story = {
  args: { gap: "lg" },
};
