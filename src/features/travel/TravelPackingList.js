import { useState } from "react";

import TravelItem from "./TravelItem";

import { useTravel } from "../../contexts/TravelContext";

export default function TravelPackingList() {
  const [sortBy, setSortBy] = useState("input");
  const { handleClearTravelItemsList, travelItems } = useTravel();

  let sortedTravelItems;

  if (sortBy === "input") sortedTravelItems = travelItems;

  if (sortBy === "description")
    sortedTravelItems = travelItems
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedTravelItems = travelItems
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedTravelItems.map((item) => (
          <TravelItem travelItem={item} key={item.id} />
        ))}
      </ul>

      <div className="actions">
        <select
          id="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={handleClearTravelItemsList}>Clear list</button>
      </div>
    </div>
  );
}
