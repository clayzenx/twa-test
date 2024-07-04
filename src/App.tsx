import "./App.css";
import { Button, FlexBoxCol, FlexBoxRow, StyledApp, AppContainer, WalletConnectButton } from "./components/styled/styled";
import { Storefront } from "./components/Storefront";
import { useTonConnect } from "./hooks/useTonConnect";
import { CHAIN } from "@tonconnect/protocol";
import "@twa-dev/sdk";

function App() {
  const { network } = useTonConnect();

  return (
    <StyledApp>
      <AppContainer>
        <FlexBoxCol>
          <FlexBoxRow>
            <WalletConnectButton disabled={!network} />
            <Button>
              {network
                ? network === CHAIN.MAINNET
                  ? "mainnet"
                  : "testnet"
                : "N/A"}
            </Button>
          </FlexBoxRow>
          <Storefront />
        </FlexBoxCol>
      </AppContainer>
    </StyledApp>
  );
}

export default App;
