import { useTravel } from "../../contexts/TravelContext";

export default function TravelItem({ travelItem }) {
  const { handleToggleTravelItem, handleDeleteTravelItem } = useTravel();

  return (
    <li>
      <input
        id={`checkbox-${travelItem.id}`}
        type="checkbox"
        checked={travelItem.packed}
        onChange={() => handleToggleTravelItem(travelItem.id)}
      />
      <span style={travelItem.packed ? { textDecoration: "line-through" } : {}}>
        {travelItem.quantity} {travelItem.description}
      </span>
      <button
        onClick={() => {
          handleDeleteTravelItem(travelItem.id);
        }}
      >
        ❌
      </button>
    </li>
  );
}
