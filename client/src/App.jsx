import { useRef, useState } from "react";

import UserForm from "./components/UserForm";
import Welcome from "./components/Welcome";
import UserSelection from "./components/UserSelection";
import Karaoke from "./components/Karaoke";

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
    <UserSelection previousPage={backPage} />,
  ];

  return (
    <>
      {start === false && <Welcome start={() => setStart(true)} />}

      {start === true && <div>{pageOrder[step]}</div>}
    </>
  );
}

export default App;
