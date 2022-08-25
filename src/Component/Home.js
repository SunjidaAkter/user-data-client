// import React, { useEffect, useState } from "react";

// const Home = () => {
//   const [allNames, setAllName] = useState([]);
//   const [inputName, setInputName] = useState("");
//   let disabled;
//   useEffect(() => {
//     fetch("http://localhost:4000/name")
//       .then((res) => res.json())
//       .then((data) => setAllName(data));
//   }, []);
//   const getName = (event) => {
//     event.preventDefault();
//     // post name in database
//     if (inputName.length >= 3) {
//       fetch("http://localhost:4000/name", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ name: inputName }),
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           if (data.acknowledged) {
//             event.target.reset();
//           }
//         });
//     }
//   };
//   const currentName = allNames.find(
//     👎 => n.name.toLowerCase() == inputName.toLowerCase()
//   );

//   if (currentName?.name?.includes(inputName)) {
//     disabled = true;
//   } else {
//     disabled = false;
//   }
//   return (
//     <div className="h-screen bg-slate-900 ">
    //   <div className="bg-slate-900 container first-letter h-full flex justify-center items-center">
    //     <div className="bg-gray-800 h-[200px] w-1/2 p-5 rounded-lg shadow-lg ">
//           <div className="mt-5 flex justify-center ">
//             <form onSubmit={getName} className="relative w-5/6">
//               <input
//                 type="text"
//                 className="h-10 w-full rounded-full focus:outline-none px-5"
//                 placeholder="Add your name"
//                 onChange={(e) => setInputName(e.target.value)}
//                 required
//               />
//               <button
//                 type="submit"
//                 className={`${
//                   disabled
//                     ? "bg-gray-500 text-gray-700 rounded-full px-5 h-10 absolute right-0 border border-white"
//                     : " bg-black text-white rounded-full px-5 h-10 absolute right-0 border border-white hover:bg-slate-800 transition-all duration-300 ease-in-out "
//                 }`}
//                 disabled={disabled}
//               >
//                 Add
//               </button>
//             </form>
//           </div>
//           <div className=" text-center mt-10">
//             {disabled && (
//               <p className="text-white">
//                 {" "}
//                 This
//                 <span className="text-red-600 inline-block mx-3 font-semibold font-mono">
//                   {" "}
//                   {inputName}{" "}
//                 </span>
//                 : name is not available!{" "}
//               </p>
//             )}
//             {disabled === false ? (
//               <p className="text-white">
//                 {inputName && (
//                   <p>
//                     This
//                     <span className="text-green-600 inline-block mx-3 font-semibold font-mono">
//                       {" "}
//                       {inputName}{" "}
//                     </span>
//                     : name is available!{" "}
//                   </p>
//                 )}
//               </p>
//             ) : (
//               ""
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;