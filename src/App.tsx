import React from "react";
import {
  Web3Provider,
  MegoButton,
  MegoPopup,
  useLanguage,
  LanguageSelector,
  type MegoPopupData,
} from "@megotickets/core";
import {
  Web3MegoClientProvider,
  MegoWalletButton,
  WalletConnectButton,
  useWeb3Context,
} from "@megotickets/wallet";
import {
  BuyTicketProvider,
  Ticket,
  MegoMetadataInputType,
  ShareEmailOptions,
} from "@megotickets/payments";
import "./App.css";

// Main App Component
function App() {
  return (
    <Web3Provider>
      <Web3MegoClientProvider>
        <BuyTicketProvider>
          <MegoTicketsDemo />
        </BuyTicketProvider>
      </Web3MegoClientProvider>
    </Web3Provider>
  );
}

// Demo Component showcasing all the components
function MegoTicketsDemo() {
  const {
    loggedAs,
    isConnectedWithMego,
  } = useWeb3Context();
  const { language } = useLanguage();
  const [popupData, setPopupData] = React.useState<MegoPopupData>({
    isOpen: false,
    message: "",
    title: "",
    modality: undefined,
  });

  const showPopup = (
    message: string,
    title: string = "",
    modality?: "success" | "error" | "info"
  ) => {
    setPopupData({
      isOpen: true,
      message,
      title,
      ...(modality && { modality: modality as never }),
    });
  };

  const closePopup = () => {
    setPopupData((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>MegoTickets React Components Demo</h1>
        <p>
          Demonstrating @megotickets/core, @megotickets/wallet, and
          @megotickets/payments
        </p>
      </header>

      <main className="app-main">
        {/* Language Selector */}
        <section className="demo-section">
          <h2>Language Selector</h2>
          <LanguageSelector />
          <p>Current language: {language}</p>
        </section>

        {/* Wallet Integration */}
        <section className="demo-section">
          <h2>Wallet Integration</h2>
          <div className="wallet-demo">
            {/* MegoWalletButton */}
            <h3>Complete Mego Wallet Button</h3>
            <MegoWalletButton
              customStyle={{
                megoWalletPosition: "center",
                megoWalletContainerStyle: { backgroundColor: "#000" },
                megoWalletIconStyle: { backgroundColor: "#000", color: "#fff" },
                modalStyle: {
                  headerStyle: { backgroundColor: "#8bfbd9", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" },
                  bodyStyle: { backgroundColor: "#000" },
                },
              }}
              providerConfiguration={{
                googleProvider: true,
                appleProvider: true,
                emailProvider: true,
                walletConnectProvider: true,
              }}
            />
            {/* WalletConnectButton */}
            <h3 style={{ marginTop: "20px" }}>Simple RainbowKit/WalletConnect Button</h3>
            <WalletConnectButton />
            {loggedAs && (
              <div className="user-info">
                <p>Logged in as: {loggedAs}</p>
                <p>
                  Connected with Mego: {isConnectedWithMego() ? "Yes" : "No"}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Payment Components */}
        <section className="demo-section">
          <h2>Payment Components</h2>
          <div className="payments-demo">
            <div className="ticket-demo">
              <h3>Ticket Component</h3>
              <Ticket
                ticketId={import.meta.env.VITE_TICKET_ID ?? "6f057f40-0cb5-42bb-b068-77e7b5fa4ed2"}
                googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                onTicketLoad={(data) => {
                  console.log("Ticket loaded:", data);
                }}
                metadataConfig={[
                  {
                    metadata: "name",
                    type: MegoMetadataInputType.TEXT,
                    placeholder: {
                      en: "Enter your name",
                      it: "Inserisci il tuo nome",
                    },
                    labelTranslations: { en: "Full Name", it: "Nome Completo" },
                  },
                  {
                    metadata: "email",
                    type: MegoMetadataInputType.EMAIL,
                    placeholder: {
                      en: "Enter your email",
                      it: "Inserisci la tua email",
                    },
                    labelTranslations: {
                      en: "Email Address",
                      it: "Indirizzo Email",
                    },
                  },
                ]}
                shareEmail={ShareEmailOptions.OPTIONAL}
              />
            </div>

          </div>
        </section>

        {/* Utility Components */}
        <section className="demo-section">
          <h2>Utility Components</h2>
          <div className="utility-demo">
            <MegoButton
              onClick={() =>
                showPopup("This is an info popup!", "Info", "info")
              }
              style={{ marginRight: "10px" }}
            >
              Show Info Popup
            </MegoButton>

            <MegoButton
              onClick={() =>
                showPopup("This is a success popup!", "Success", "success")
              }
              style={{ marginRight: "10px" }}
            >
              Show Success Popup
            </MegoButton>

            <MegoButton
              onClick={() =>
                showPopup("This is an error popup!", "Error", "error")
              }
            >
              Show Error Popup
            </MegoButton>
          </div>
        </section>
      </main>

      {/* Popup */}
      <MegoPopup popupData={popupData} onClose={closePopup} />
    </div>
  );
}

export default App;
