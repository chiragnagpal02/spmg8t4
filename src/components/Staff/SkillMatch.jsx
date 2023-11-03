// import React from "react";
// import { Doughnut } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// ChartJS.register(ArcElement, Tooltip, Legend);

// const SkillMatch = ({ chartData, matchPercentage }) => {
//     return (
//         <div className="border rounded p-3 mt-5">
//         <h2 className="mb-5 font-bold">Skills Required</h2>

//         <div className="flex items-center">
//           <div style={{ width: '50%', height: '50%' }}>
//             {chartData && (
//               <div>
//                 <Doughnut data={chartData}></Doughnut>
//               </div>
//             )}
//           </div>

//           <div className="ml-5 text-center">
//               <p>
//                 Match Percentage: <strong className="text">{matchPercentage}%</strong>
//               </p>
            
//           </div>
//         </div>
//       </div>
//     );
//   };

// export default SkillMatch;