import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import InfoBox from "../components/InfoBox";
import OpinionBox from "../components/OpinionBox";
import "./Home.css";
import Alert from "../components/Alert";

const Home = () => {
  const [opinionRequests, setOpinionRequests] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const location = useLocation(); // Get the current location

  useEffect(() => {
    const fetchOpinionRequests = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/opinion_request/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Opinion requests data:", data);
        setOpinionRequests(data);
      } catch (error) {
        console.error("Error fetching opinion requests:", error);
      }
    };
    fetchOpinionRequests();
  }, []);

  useEffect(() => {
    if (location.state && location.state.alertMessage) {
      setAlertMessage(location.state.alertMessage);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }
  }, [location.state]); // Add location.state as a dependency

  return (
    <div className="mt-14 ms-10">
      <header className="text-4xl font-bold">
        <h1>Welcome back Haben Tesfamariam Abdoul Jaleelulloh Gaim</h1>
      </header>
      <main className="mt-8 ms-4">
        {showAlert && (
          <Alert message={alertMessage} onClose={() => setShowAlert(false)} />
        )}
        <section className="pb-8">
          <h2 className="text-2xl font-bold mb-4 ms-6">Overview</h2>
          <div className="grid grid-cols-2 gap-2 max-w-[1210px]">
            <InfoBox
              text="opinion requests waiting for your review"
              value={
                opinionRequests.filter((req) => req.status === "pending").length
              }
            />
            <InfoBox text="resources saved" value="0" />
            <InfoBox text="opinion requests submitted" value="0" />
            <InfoBox text="tasks overdue" value="0" />
          </div>
        </section>
        <div className="ms-[-60px] border-b border-gold-800"></div>
        <section className="mt-10">
          <h2 className="text-2xl font-bold ms-6">Pending Opinions</h2>
          <div className="overflow-x-auto w-[1400px]">
            {" "}
            <div className="flex flex-row gap-8">
              {opinionRequests.map((request) => (
                <OpinionBox
                  key={request.id}
                  id={request.id}
                  title={
                    request.title.length > 40
                      ? `${request.title.slice(0, 40)}...`
                      : request.title
                  }
                  dueDate={request.deadline}
                  priorityLevel={request.priority}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <div className="background-svg"></div>
    </div>
  );
};

export default Home;

// export default Home;
// import React, { useEffect, useState } from "react";
// import InfoBox from "../components/InfoBox";
// import OpinionBox from "../components/OpinionBox";
// import "./Home.css";

// const Home = () => {
//   const [opinionRequests, setOpinionRequests] = useState([]);

//   useEffect(() => {
//     const fetchOpinionRequests = async () => {
//       try {
//         const response = await fetch("http://localhost:8000/api/opinion_request/",{
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           credentials: "include",
//         });
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         setOpinionRequests(data);
//       } catch (error) {
//         console.error("Error fetching opinion requests:", error);
//       }
//     };
//     fetchOpinionRequests();
//   }, []);

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
//               value={opinionRequests.filter(req => req.status === "pending").length}
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
//             {opinionRequests.map((request) => (
//               <OpinionBox
//                 key={request.id}
//                 id={request.id}
//                 title={request.title.length > 40 ? `${request.title.slice(0, 40)}...` : request.title}
//                 dueDate={request.deadline}
//                 priorityLevel={request.priority}
//               />
//             ))}
//           </div>
//         </section>
//       </main>
//       <div className="background-svg"></div>
//     </div>
//   );
// };

// export default Home;
