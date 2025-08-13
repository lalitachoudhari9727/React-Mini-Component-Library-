import styled from "@emotion/styled";

import { Button } from "../button/Button";
import { theme } from "../theme";
import { useEffect, useRef } from "react";

const Title = styled.h2`
  height: max-content;
  margin: 0;
  flex: 1;
  overflow: hidden;
  text-wrap: nowrap;
  text-overflow: ellipsis;
  color: ${theme.color.text.default};
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.medium};
`;

const Header = styled.div`
  height: ${theme.space.xl};
  padding-left: ${theme.space.md};
  display: flex;
  gap: ${theme.space.md};
  justify-content: space-between;
  align-items: center;
`;

const Divider = styled.div`
  height: ${theme.space.px};
  margin: 0 ${theme.space.md};
  border-radius: ${theme.space.px};
  background-color: ${theme.color.stroke.default};
`;

const Description = styled.p`
  padding: ${theme.space.md};
  margin: 0;
  color: ${theme.color.text.default};
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.regular};
`;

const ButtonRow = styled.div`
  padding: ${theme.space.md};
  display: flex;
  gap: ${theme.space.sm};
  flex-wrap: wrap;
`;

//Created DialogPanel for styling dialog.
const DialogPanel = styled.div`
  background: ${theme.color.background.default};
  border-radius: ${theme.radius.lg};
  width: ${theme.size.dialogWidth};
  overflow: auto;
  box-shadow: ${theme.shadow.lg};
  max-height: ${theme.size.dialogMaxHeight};
  padding: ${theme.space.md}; // Added for large content in description area.
  box-sizing: border-box;
`;

export interface DialogAction {
  label: string;
  onClick: () => void;
}

export interface DialogContentProps {
  /** Title of the modal */
  title: string;
  /** Describes the modal's purpose */
  description: string;
  /** Label and click handler for the confirm button */
  confirm: DialogAction;
  /** Label and click handler for the cancel button */
  cancel: DialogAction;
}

export const DialogContent = ({
  title,
  description,
  confirm,
  cancel,
}: DialogContentProps) => {

  const dialogRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      // Added code for trapping focus inside dialog when dialog opens.
      if (dialogRef.current) {
        const focusable = dialogRef.current.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        focusable?.focus();
      }
    }, []);
  return (
    <DialogPanel ref={dialogRef}>
      <Header>
        <Title>{title}</Title>
        <Button look="flat" icon="xmark" onClick={cancel.onClick}>
          {null}
        </Button>
      </Header>
      <Divider />
      <Description>{description}</Description>
      <ButtonRow>
        <Button
          ariaLabel="confirm"
          look="key"
          onClick={() => confirm.onClick()}
        >
          {confirm.label}
        </Button>
        <Button
          ariaLabel="cancel"
          look="ghost"
          onClick={() => cancel.onClick()}
        >
          {cancel.label}
        </Button>
      </ButtonRow>
    </DialogPanel>
  );
};
