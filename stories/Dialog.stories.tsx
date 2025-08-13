import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { argType } from "./utils/argTypes";
import { clickAction } from "./utils/clickAction";
import { Button, Dialog, DialogAction } from "../src";

const meta = {
  title: "Your Tasks/Dialog",
  component: Dialog,
  argTypes: {
    title: argType.string(),
    description: argType.string(),
    confirm: argType.disabled(),
    cancel: argType.disabled(),
  },
  args: {
    title: "Allow Location Access",
    description:
      "This app needs access to your location to operate correctly. Do you want to allow it? (This will not actually access your location)",
    confirm: {
      label: "Confirm",
      onClick: clickAction("Dialog", "confirm.onClick"),
    },
    cancel: {
      label: "Cancel",
      onClick: clickAction("Dialog", "cancel.onClick"),
    },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/** */
export const Standard: Story = {
  render: function RenderDialog({ confirm, cancel, ...args }) {
    const [open, setOpen] = useState(false);

    const actionWithClose = (action: DialogAction): DialogAction => ({
      label: action.label,
      onClick: () => {
        //action.onClick();
        setOpen(false);
      },
    });

    return (
      <>
       {!open ? <Button onClick={() => setOpen(true) }>Open Dialog</Button>: null} 
        {open ?  (
          <Dialog
            {...args}
            confirm={actionWithClose(confirm)}
            cancel={actionWithClose(cancel)}
          />
        ): null}
      </>
    );
  },
};
