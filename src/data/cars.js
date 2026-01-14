import carsData from "./cars.json";

// Map the detailed JSON data to the simplified structure used by the App
// App Expects: id, name, price, type, fuel, transmission, mileage, seats, safetyRating, use, tags, features, image
// JSON Provides: id, brand, model, bodyType, fuel, price, priceLabel, mileage, seating, useCase, rating, image

const cars = carsData.map((car) => {
  // Determine Type for App logic (Hatchback/Sedan/SUV)
  let type = car.bodyType;

  // Determine Use for App filtering (Must match one of the 4 questionnaire options)
  // Options: "Daily city commute", "Long highway drives", "Family trips", "Off-road or adventure use"
  let use = "Daily city commute"; // Default
  if (car.useCase.includes("Highway")) use = "Long highway drives";
  if (car.useCase.includes("Family")) use = "Family trips";
  if (car.useCase.includes("Off-road") || car.useCase.includes("Adventure")) use = "Off-road or adventure use";
  if (car.useCase.includes("City")) use = "Daily city commute"; // Priority check
  if (car.fuel === "Electric") use = "Daily city commute"; // EVs often city

  // Generate Tags (Mileage, Comfort, Performance, Safety)
  const tags = [];
  if (parseFloat(car.mileage) > 18 || car.fuel === "Electric") tags.push("Mileage / Fuel efficiency");
  if (car.price > 1000000) tags.push("Comfort & space");
  if (car.bodyType === "Sedan" || car.fuel === "Diesel") tags.push("Performance & power");
  if (car.rating >= 4.5) tags.push("Safety features");

  // Normalize Tags to match questionnaire exactly if needed, or just keep them logic-based
  // Questionnaire uses: "Mileage / Fuel efficiency", "Comfort & space", "Performance & power", "Safety features"

  return {
    id: car.id,
    name: `${car.brand} ${car.model}`,
    brand: car.brand,
    model: car.model,
    price: car.price,
    type: car.bodyType,
    fuel: car.fuel,
    transmission: "Automatic/Manual", // Data didn't have this, default generic
    mileage: car.mileage,
    seats: car.seating,
    safetyRating: `${car.rating} Star`,
    use: use,
    tags: tags,
    features: car.useCase, // Reuse useCase as features tags display
    image: car.image
  };
});

export default cars;