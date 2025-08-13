import type { Meta, StoryObj } from "@storybook/react";

import { argType } from "./utils/argTypes";
import { Icon, IconColor, IconType, Stack, theme } from "../src";

const icons: IconType[] = ["circle", "plus", "cat", "ghost"];
const iconColors: IconColor[] = ["default", "inverted", "inherit"];

const meta = {
  title: "Other Components/Icon",
  component: Icon,
  argTypes: {
    icon: argType.enum("select", icons),
    color: argType.enum("radio", iconColors),
  },
  args: {
    icon: "circle",
    color: "default",
  },
  decorators: (render) => (
    <Stack gap="md" wrap>
      {render()}
    </Stack>
  ),
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

/** By default, the icon is rendered with the default text color. */
export const Standard: Story = {};

/** To inherit the text color of the parent as stroke color, you can set the `color` prop to `inherit`. */
export const InheritColor: Story = {
  args: { color: "inherit" },
  render: (args) => (
    <span style={{ color: theme.color.active }}>
      <Icon {...args} />
    </span>
  ),
};

/** Here you can find all icons that are currently available. */
export const AvailableIcons: Story = {
  render: (args) => (
    <>
      {icons.map((icon) => (
        <Icon {...args} key={icon} icon={icon} />
      ))}
    </>
  ),
};
