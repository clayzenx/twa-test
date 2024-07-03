import styled from "styled-components";
import { TonConnectButton, TonConnectButtonProps } from "@tonconnect/ui-react";
import React from "react";

interface ExtendedTonConnectButtonProps extends TonConnectButtonProps {
  disabled?: boolean;
}

const ExtendedTonConnectButton: React.FC<ExtendedTonConnectButtonProps> = (props) => {
  return <TonConnectButton {...props} />;
};

export const WalletConnectButton = styled(ExtendedTonConnectButton)`
  button {
    background-color: ${(props) =>
    props.disabled ? "var(--devy-disabled-button-color)" : "var(--tg-theme-button-color)"};
  }
`

export const StyledApp = styled.div`
  background-color: var(--tg-theme-secondary-bg-color)
  color: var(--tg-theme-text-color);

  min-height: 100vh;
  padding: 20px 20px;
`;

export const AppContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

export const Card = styled.div`
  padding: 18px 20px;
  border-radius: 8px;
  background-color: var(--tg-theme-section-bg-color);
`;

export const FlexBoxRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

export const FlexBoxCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Button = styled.button`
  background-color: ${(props) =>
    props.disabled ? "#6e6e6e" : "var(--tg-theme-button-color)"};
  border: 0;
  border-radius: 8px;
  padding: 10px 20px;
  color: var(--tg-theme-button-text-color);
  font-weight: 700;
  cursor: pointer;
  pointer-events: ${(props) => (props.disabled ? "none" : "inherit")};
`;

export const Ellipsis = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const Input = styled("input")`
  padding: 10px 20px;
  border-radius: 10px;
  width: 100%;
  border: 1px solid #c2c2c2;

  @media (prefers-color-scheme: dark) {
    border: 1px solid #fefefe;
  }
`;