// import React from "react";
// import { RxCross2 } from "react-icons/rx";

// const SubCat = ({ isActiveService, setIsActiveService, item }) => {
//   // Uncomment this line to debug the structure of item
//   // console.log(item);

//   return (
//     <div className="absolute flex top-20 left-0 mt-20 p-4 bg-white shadow-lg rounded-lg space-y-4 h-[250px] w-full max-w-lg overflow-y-scroll z-10">
//       <div className="flex justify-between items-center">
//         <button
//           className="text-gray-500 hover:text-gray-800"
//           onClick={() => setIsActiveService(!isActiveService)}
//         >
//           <RxCross2 />
//         </button>
//       </div>
//       <div className="text-black">
//         {item.subcategories.length === 0 ? (
//           <p>No subcategories available.</p>
//         ) : (
//           item.subcategories.map((child) => {
//             return child.items.map((subChild) => {
//               return (
//                 <h1
//                   key={subChild._id}
//                   className="list-disc list-inside text-black mt-2"
//                 >
//                   {subChild.title}
//                   {console.log(subChild.title)}
//                 </h1>
//               );
//             });
//           })
//         )}
//       </div>
//     </div>
//   );
// };

// export default SubCat;
