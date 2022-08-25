import logo from './logo.svg';
import './App.css';
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from 'react';

function App() {
  const [names, setNames] = useState([]);
  const [disable, setDisable] = useState(false);
  const [error, setError] = useState("");
  const [duplicateIndex, setDuplicateIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => {
        setNames(data);
        setLoading(false);
      });
  }, [reload]);

  let duplicate;
  const onChanged = e => {
    e.preventDefault();
    duplicate = names.find((element, index) => {
      setDuplicateIndex(index);
      return element.name === e.target.value;
    });
    // setDuplicateIndex(names.indexOf(e.target.value));

    console.log(duplicate);

    if (duplicate) {
      setDisable(true);
      setError("Username is not unique");
    } else {
      setDisable(false);
      setError("Username is unique");
      setDuplicateIndex(-1);
    }
  }
  console.log(duplicate)
  const submitHandler = (event) => {
    console.log();
    event.preventDefault();
    const name = event.target.name.value;

    const userName = { name: name };

    fetch("http://localhost:5000/users", {
      method: "POST",
      body: JSON.stringify(userName),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.acknowledged) {
          toast("Username has been added correctly!");
          setReload(!reload);
          event.target.reset();
        }
      });
  };
  return (
    <div className="App">
      {/* <p className="mt-5 mb-5 text-red-900">Enter User Name :</p> */}
      <div className='flex justify-center mt-10'>
        <div class="form-control w-full max-w-xs  ">
          <p className='mt-4 mb-4 text-2xl text-lime-900 font-extrabold'>Form</p>
          <form onSubmit={submitHandler}>
            <label class="label">
              <span class="label-text font-bold">Enter User Name :</span>

            </label>
            <input
              type="text"
              placeholder="Username"
              name="name"
              onChange={onChanged}
              className="border border-slate-800 rounded-md  h-10 w-full px-5" />
            {/* <input
              className='border border-slate-800 rounded-md h-10 w-1/3'
              type="text"
            /> */}
            <label class="label">
              <span class={`${disable ? "font-bold label-text-alt text-red-900 text-base" : "font-bold text-base text-lime-900 label-text-alt"}`}>{error}</span>

            </label>
            <div className='flex justify-start'>
              <button disabled={disable} className={`${disable ? "inline bg-zinc-800 text-white bg-opacity-50 uppercase px-5 py-2 rounded-md w-1/3" : "inline w-1/3 bg-zinc-800 text-white uppercase px-5 py-2 rounded-md"}`} type="submit">add</button>
            </div>
            <p className='mt-10 mb-4 text-left text-2xl text-lime-900 font-extrabold'>Database Usernames :</p>
          </form>
          <div className='mt-0 mb-10'>
            {loading && <p>Loading...</p>}
            {names.map((name, index) =>
              <>
                <p className={index == duplicateIndex ? "text-green-800 text-xl font-extrabold text-left" : "text-base font-semibold text-slate-700 text-left"}>{index + 1}. {name.name}</p>
                {console.log(duplicateIndex)}
              </>)}
          </div>
        </div>
      </div>
      {/* <label className='label' htmlFor="">Enter Username :</label><br /> */}
      {/* <input type="button" className='' value="add" /> */}

      <ToastContainer />
    </div>
  );
}

export default App;
