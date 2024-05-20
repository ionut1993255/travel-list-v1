import { createContext, useContext, useEffect, useReducer } from "react";
import toast from "react-hot-toast";

import { useLocalStorageState } from "../hooks/useLocalStorageState";

const TravelContext = createContext();

const initialState = {
  travelItems: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "addTravelItems":
      return { ...state, travelItems: [...state.travelItems, action.payload] };
    case "toggleTravelItem":
      return {
        ...state,
        travelItems: state.travelItems.map((item) =>
          item.id === action.payload ? { ...item, packed: !item.packed } : item
        ),
      };
    case "deleteTravelItem":
      return {
        ...state,
        travelItems: state.travelItems.filter(
          (item) => item.id !== action.payload
        ),
      };
    case "clearTravelItemsList":
      return initialState;
    default:
      return "Unknown action";
  }
}

function TravelContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { travelItems: items } = state;
  const [travelItems, setTravelItems] = useLocalStorageState([], "travelItems");

  useEffect(
    function () {
      if (items.length > 0) {
        setTravelItems(items);
      }
    },
    [items, setTravelItems]
  );

  function handleAddTravelItems(travelItem) {
    dispatch({ type: "addTravelItems", payload: travelItem });
    toast.success("The travel item was successfully added !");
  }

  function handleToggleTravelItem(id) {
    dispatch({ type: "toggleTravelItem", payload: id });
    setTravelItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
    toast.success("The travel item status was successfully changed !");
  }

  function handleDeleteTravelItem(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this travel item?"
    );

    if (confirmed) {
      dispatch({ type: "deleteTravelItem", payload: id });
      setTravelItems((prevItems) => prevItems.filter((item) => item.id !== id));
      toast.success("The travel item was successfully deleted !");
    }
  }

  function handleClearTravelItemsList() {
    if (!travelItems.length) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete all travel items?"
    );

    if (confirmed) {
      dispatch({ type: "clearTravelItemsList" });
      setTravelItems([]);
      toast.success("The travel packing list was successfully cleared !");
    }
  }

  return (
    <TravelContext.Provider
      value={{
        travelItems,
        handleAddTravelItems,
        handleToggleTravelItem,
        handleDeleteTravelItem,
        handleClearTravelItemsList,
      }}
    >
      {children}
    </TravelContext.Provider>
  );
}

function useTravel() {
  const context = useContext(TravelContext);

  if (context === undefined)
    throw new Error("TravelContext was used outside of the TravelProvider.");

  return context;
}

export { TravelContextProvider, useTravel };
