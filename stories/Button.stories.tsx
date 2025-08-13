import type { Meta, StoryObj } from "@storybook/react";

import { argType } from "./utils/argTypes";
import { clickAction } from "./utils/clickAction";
import { Stack, Button, IconType } from "../src";

const icons: IconType[] = ["circle", "plus", "cat", "ghost"];

const meta = {
  title: "Your Tasks/Button",
  component: Button,
  argTypes: {
    children: argType.string(),
    look: argType.enum("select", [undefined, "key", "ghost", "flat"]),
    icon: argType.enum("select", [undefined, ...icons]),
    hideCaption: argType.boolean(),
    onClick: argType.callback(),
  },
  args: {
    children: "Button",
    look: undefined,
    icon: undefined,
    hideCaption: false,
    onClick: clickAction("Button", "onClick"),
  },
  decorators: (render) => (
    <Stack gap="md" wrap>
      {render()}
    </Stack>
  ),
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/** By default, the key button should be rendered. */
export const Standard: Story = {
  args: { children: "Button" },
};

/** The appearance of the Button component can be adjusted, by passing a `look` prop. */
export const Looks: Story = {
  argTypes: {
    look: argType.disabled(),
    children: argType.disabled(),
  },
  render: (args) => (
    <>
      <Button {...args} look="key">
        Key Button
      </Button>
      <Button {...args} look="ghost">
        Ghost Button
      </Button>
      <Button {...args} look="flat">
        Flat Button
      </Button>
    </>
  ),
};

/** An Icon can be displayed next to the Button caption, by passing an `icon` prop. */
export const Icon: Story = {
  argTypes: {
    look: argType.disabled(),
    children: argType.disabled(),
  },
  render: ({ icon, ...args }) => (
    <>
      <Button {...args} look="key" icon={icon ?? "circle"}>
        Key Button
      </Button>
      <Button {...args} look="ghost" icon={icon ?? "ghost"}>
        Ghost Button
      </Button>
      <Button {...args} look="flat" icon={icon ?? "cat"}>
        Flat Button
      </Button>
    </>
  ),
};

/** When passing an `icon` into a button, you might want to hide the passed `children`, to create an icon-only button.
 *  For this, you can use the `hideCaption` prop.
 **/
export const IconOnly: Story = {
  args: { hideCaption: true },
  argTypes: {
    look: argType.disabled(),
    children: argType.disabled(),
  },
  render: ({ icon, ...args }) => (
    <>
      <Button {...args} look="key" icon={icon ?? "circle"}>
        Key Button
      </Button>
      <Button {...args} look="ghost" icon={icon ?? "ghost"}>
        Ghost Button
      </Button>
      <Button {...args} look="flat" icon={icon ?? "cat"}>
        Flat Button
      </Button>
    </>
  ),
};
