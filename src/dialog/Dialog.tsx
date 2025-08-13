import { DialogContent, DialogContentProps } from "./DialogContent";
export type { DialogAction } from "./DialogContent";
import styled from "@emotion/styled";
import { createPortal } from "react-dom";
import { theme } from "../theme";

export interface DialogProps extends DialogContentProps {}

/** Dialog to request confirmation from the user.
 *  Provides buttons to confirm or cancel the action.
 **/

// Styling for dialog backdrop
const DialogRoot = styled.div`
  background: ${theme.color.background.backdrop};
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Dialog = ({
  title,
  description,
  confirm,
  cancel,
}: DialogProps) => {
  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      cancel.onClick();
    }
  };

  return createPortal(
    <DialogRoot onClick={handleClickOutside}>
      <DialogContent
        title={title}
        description={description}
        confirm={confirm}
        cancel={cancel}
      />
    </DialogRoot>,
    document.body,
  );
};
