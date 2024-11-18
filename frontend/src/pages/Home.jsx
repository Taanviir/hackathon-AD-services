import React, { useEffect, useState } from "react";
import InfoBox from "../components/InfoBox";
import OpinionBox from "../components/OpinionBox";
import "./Home.css";

const Home = () => {
  const [opinionRequests, setOpinionRequests] = useState([]);

  useEffect(() => {
    const fetchOpinionRequests = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/opinion_request/");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setOpinionRequests(data);
      } catch (error) {
        console.error("Error fetching opinion requests:", error);
      }
    };
    fetchOpinionRequests();
  }, []);

  return (
    <div className="mt-14 ms-10">
      <header className="text-4xl font-bold">
        <h1>Welcome back Haben Tesfamariam Abdoul Jaleelulloh Gaim</h1>
      </header>
      <main className="mt-8 ms-4">
        <section className="pb-8">
          <h2 className="text-2xl font-bold mb-4 ms-6">Overview</h2>
          <div className="grid grid-cols-2 gap-2 max-w-[1210px]">
            <InfoBox
              text="opinion requests waiting for your review"
              value={opinionRequests.filter(req => req.status === "pending").length}
            />
            <InfoBox text="resources saved" value="0" />
            <InfoBox text="opinion requests submitted" value="0" />
            <InfoBox text="tasks overdue" value="0" />
          </div>
        </section>
        <div className="ms-[-60px] border-b border-gold-800"></div>
        <section className="mt-10">
          <h2 className="text-2xl font-bold ms-6">Pending Opinions</h2>
          <div className="flex flex-row gap-8">
            {opinionRequests.map((request) => (
              <OpinionBox
                key={request.id}
                description={request.description}
                dueDate={request.dueDate}
                priorityLevel={request.priorityLevel}
              />
            ))}
          </div>
        </section>
      </main>
      <div className="background-svg"></div>
    </div>
  );
};

export default Home;





// import React from "react";
// import InfoBox from "../components/InfoBox";
// import OpinionBox from "../components/OpinionBox";
// import "./Home.css";

// const Home = () => {
//   return (
//     <div className="mt-14 ms-10">
//       <header className="text-4xl font-bold">
//         <h1>Welcome back Haben Tesfamariam Abdoul Jaleelulloh Gaim</h1>
//       </header>
//       <main className="mt-8 ms-4">
//         <section className="pb-8">
//           <h2 className="text-2xl font-bold mb-4 ms-6">Overview</h2>
//           <div className="grid grid-cols-2 gap-2 max-w-[1210px]">
//             <InfoBox
//               text="opinion requests waiting for your review"
//               value="2"
//             />
//             <InfoBox text="resources saved" value="0" />
//             <InfoBox text="opinion requests submitted" value="0" />
//             <InfoBox text="tasks overdue" value="0" />
//           </div>
//         </section>
//         <div className="ms-[-60px] border-b border-gold-800"></div>
//         <section className="mt-10">
//           <h2 className="text-2xl font-bold ms-6">Pending Opinions</h2>
//           <div className="flex flex-row gap-8">
//             <OpinionBox
//               description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
//               dueDate="Augustus 69, 2069"
//               priorityLevel="High"
//             />
//             <OpinionBox
//               description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
//               dueDate="Augustus 69, 2069"
//               priorityLevel="High"
//             />
//           </div>
//         </section>
//       </main>
//       <div className="background-svg"></div>
//     </div>
//   );
// };

// export default Home;
