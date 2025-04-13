import { useState } from "react";

import UserForm from "./components/UserForm";
import Welcome from "./components/Welcome";
import UserSelection from "./components/UserSelection";
import Thanks from "./components/Thanks";

function App() {
  const [step, setStep] = useState(0);
  const [start, setStart] = useState(false);

  const nextPage = () => {
    setStep(step + 1);
  };

  const backPage = () => {
    setStep(step - 1);
  };

  const pageOrder = [
    <UserForm nextPage={nextPage} />,
    <UserSelection previousPage={backPage} nextPage={nextPage} />,
    <Thanks />,
  ];

  return (
    <div className="relative">
      {start === false && <Welcome start={() => setStart(true)} />}

      {start === true && (
        <div className="welcome-grid gap-4 p-6">{pageOrder[step]}</div>
      )}
    </div>
  );
}

export default App;
