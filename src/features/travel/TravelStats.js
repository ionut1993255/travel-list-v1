import { useTravel } from "../../contexts/TravelContext";

export default function TravelStats() {
  const { travelItems } = useTravel();

  if (!travelItems.length)
    return (
      <p className="stats">
        <em>Start adding some items to your travel packing list 🚀</em>
      </p>
    );

  const numTravelItems = travelItems.length;
  const numTravelItemsPacked = travelItems.filter((item) => item.packed).length;
  const percentage = Math.round((numTravelItemsPacked / numTravelItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything! Ready to go ✈"
          : `💼 You have ${numTravelItems}
            ${
              numTravelItems === 0 || numTravelItems !== 1 ? "items" : "item"
            } on your travel packing list,
            and you already packed ${numTravelItemsPacked} (${percentage}%).`}
      </em>
    </footer>
  );
}
