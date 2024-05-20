import { Toaster } from "react-hot-toast";

import Logo from "./ui/Logo";
import AddTravelItemForm from "./features/travel/AddTravelItemForm";
import TravelPackingList from "./features/travel/TravelPackingList";
import TravelStats from "./features/travel/TravelStats";

import { TravelContextProvider } from "./contexts/TravelContext";

export default function App() {
  return (
    <>
      <div className="app">
        <Logo />
        <TravelContextProvider>
          <AddTravelItemForm />
          <TravelPackingList />
          <TravelStats />
        </TravelContextProvider>
      </div>

      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#76c7ad",
              secondary: "#ffebb3",
            },
          },
          style: {
            maxWidth: "500px",
            fontSize: "16px",
            fontWeight: 600,
            padding: "16px 24px",
            color: "#5a3e2b",
            backgroundColor: "#ffebb3",
          },
        }}
      />
    </>
  );
}
