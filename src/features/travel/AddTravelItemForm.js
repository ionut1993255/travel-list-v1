import { useState } from "react";

import { useTravel } from "../../contexts/TravelContext";

export default function AddTravelItemForm() {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { handleAddTravelItems } = useTravel();

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newTravelItem = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    };

    handleAddTravelItems(newTravelItem);

    setQuantity(1);
    setDescription("");
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>

      <select
        id="quantity-select"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        id="description-input"
        type="text"
        placeholder="Add travel item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
