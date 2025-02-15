import CustomPagination from "./CustomPagination";
import { useState } from "react";

function App() {
  const [state, setState] = useState(1);

  return (
    <div className="p-30">
      <div>{state}</div>
      <CustomPagination className="flex" pageSize={10} total={163} current={state} onChange={setState} />
    </div>
  );
}

export default App;
