import { useState } from "react";
import Questionnaire from "./pages/Questionnaire";
import Comparison from "./pages/Comparison";

function App() {
  const [compareCars, setCompareCars] = useState([]);

  return (
    <div className="app-container">
      {compareCars.length === 0 ? (
        <Questionnaire onCompare={setCompareCars} />
      ) : (
        <div style={{ padding: "20px" }}>
          <Comparison
            cars={compareCars}
            onBack={() => setCompareCars([])}
          />
        </div>
      )}
    </div>
  );
}

export default App;
