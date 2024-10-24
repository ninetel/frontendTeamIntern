import React from "react";

const UrlSelection = ({ urlOptions, onSelect }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <div className=" max-w-4xl bg-white shadow-2xl p-8 rounded-lg  sm:w-full  ">
        <h1 className="text-3xl mb-1 font-bold text-gray-700 p-4 text-center">Select Chat Section:</h1>
        <div class="w-full h-0.5 bg-gradient-to-r from-blue-500 via-gray-300 to-pink-500"></div>


        <div className="grid grid-cols-2 gap-4 pt-4">
          {console.log(urlOptions)
          }        {urlOptions.map((url) => (
            <div
              key={url}
              className="bg-green-400 text-white p-4 rounded-lg cursor-pointer shadow-md hover:bg-emerald-300 transition font-semibold text-xl "
              onClick={() => onSelect(url)}
            >
              {url}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UrlSelection;
