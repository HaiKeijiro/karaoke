import { useRef, useState } from "react";
import { addUser } from "./api/API";

import UserForm from "./components/UserForm";
import Welcome from "./components/Welcome";
import UserSelection from "./components/UserSelection";
import Karaoke from "./components/Karaoke";

function App() {
  const [step, setStep] = useState(0);
  const [start, setStart] = useState(false);

  const nameInput = useRef(null);
  const phoneInput = useRef(null);

  const nextPage = () => {
    setStep(step + 1);
  };

  const backPage = () => {
    setStep(step - 1);
  };

  const addUserData = async (e) => {
    e.preventDefault();

    const name = nameInput.current.value;
    const phone = phoneInput.current.value;

    console.info("Render ulang");

    if (!name || !phone) {
      alert("Please fill both inputs first");
      return;
    }

    await addUser({ name, phone });

    setStep(step + 1);
  };

  const [category, setCategory] = useState("");
  const [genre, setGenre] = useState("");
  const [song, setSong] = useState("");

  const pageOrder = [
    <UserForm
      saveUserData={addUserData}
      nameRef={nameInput}
      phoneRef={phoneInput}
    />,
    <UserSelection
      setCategory={setCategory}
      setGenre={setGenre}
      setSong={setSong}
    />,
    <Karaoke category={category} genre={genre} song={song} />,
  ];

  return (
    <>
      {start === false && <Welcome start={() => setStart(true)} />}

      {start === true && (
        <div>
          {pageOrder[step]}

          <div>
            {step > 0 && (
              <>
                <button onClick={backPage}>Back</button>
                <button onClick={nextPage}>Next</button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
