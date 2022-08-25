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
    fetch('https://stark-harbor-97759.herokuapp.com/users')
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
      return element.name.toLowerCase() === e.target.value.toLowerCase();
    });
    // setDuplicateIndex(names.indexOf(e.target.value));

    console.log(duplicate);

    if (duplicate) {
      setDisable(true);
      setError("UserName is not unique");
    } else {
      setDisable(false);
      setError("UserName is unique");
      setDuplicateIndex(-1);
    }
  }
  console.log(duplicate)
  const submitHandler = (event) => {
    console.log();
    event.preventDefault();
    const name = event.target.name.value;

    const userName = { name: name };

    fetch("https://stark-harbor-97759.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(userName),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.acknowledged) {
          toast.success("UserName has been added successfully!");
          setReload(!reload);
          event.target.reset();
        }
      });
  };
  return (
    <div className="App ">
      {/* <p className="mt-5 mb-5 text-red-900">Enter User Name :</p> */}
      {/* <div className='flex justify-center mt-10'>
        <div class="form-control w-full max-w-xs  "> */}
      <div className="first-letter flex justify-center items-center">
        <div className="mt-5 bg-gray-800 h-[200px] lg:w-1/2 w-[90%] p-5 rounded-lg shadow-lg ">
          <p className=' text-2xl text-slate-300 font-extrabold'>Form</p>
          <div className=" flex justify-center ">
            <form className="relative w-5/6" onSubmit={submitHandler}>
              <label class="label">
                <span class="label-text font-bold text-white">Enter Unique UserName :</span>

              </label>
              <input
                type="text"
                placeholder="Username"
                name="name"
                onChange={onChanged}
                className="h-10 w-full rounded-full focus:outline-none px-5"
                // className="border border-slate-800 rounded-md  h-10 w-full px-5"
                required />

              <button disabled={disable} className={`${disable ? "bg-gray-500 text-gray-700 rounded-full px-5 h-10 absolute right-0 border border-white" : "bg-black text-white rounded-full px-5 h-10 absolute right-0 border border-white hover:bg-slate-800 transition-all duration-300 ease-in-out "}`} type="submit">add</button>
              <label class="label">
                <span class={`${disable ? "font-bold label-text-alt text-red-500 text-base" : "font-bold text-base text-lime-500 label-text-alt"}`}>{error}</span>

              </label>
              {/* <div className='flex justify-start'> */}
              {/* </div> */}
            </form>
          </div>
        </div>
      </div>
      <div className='flex justify-center items-center'>
        <div className='mt-5 lg:w-1/2 w-[90%] mb-10 bg-gray-800  p-5 rounded-lg shadow-lg'>
          <p className=' mb-4 text-center text-2xl text-slate-300 font-extrabold'>Database Usernames :</p>
          {loading && <p className='font-extrabold text-white'>Loading...</p>}
          {names.map((name, index) =>
            <>
              <p className={index == duplicateIndex ? "text-green-300 text-xl font-extrabold px-11 text-left" : "px-11 text-base font-semibold text-white text-left"}>{index + 1}. {name.name}</p>
              {console.log(duplicateIndex)}
            </>)}

        </div>
      </div>
      {/* <label className='label' htmlFor="">Enter Username :</label><br /> */}
      {/* <input type="button" className='' value="add" /> */}

      <ToastContainer />
    </div>
  );
}

export default App;
