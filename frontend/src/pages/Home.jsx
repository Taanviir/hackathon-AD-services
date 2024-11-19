import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import InfoBox from "../components/InfoBox";
import OpinionBox from "../components/OpinionBox";
import "./Home.css";
import Alert from "../components/Alert";

const Home = () => {
  const [opinionRequests, setOpinionRequests] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [dashboardInfo, setDashboardInfo] = useState({}); // New state for dashboard info

  const location = useLocation();

  useEffect(() => {
    const fetchDashboardInfo = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/dashboard_info/",
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
        setDashboardInfo(data); // Set the dashboard info
      } catch (error) {
        console.error("Error fetching dashboard info:", error);
      }
    };

    fetchDashboardInfo();
  }, []);

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
  }, [location.state]);

  return (
    <div className="mt-14 ms-10">
      <header className="text-4xl font-bold">
        <h1>Welcome back {dashboardInfo.user_name}</h1>
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
              value={opinionRequests.length}
            />
            <InfoBox
              text="resources saved"
              value={dashboardInfo.resources_saved || 0} // Populate with backend data
            />
            <InfoBox
              text="opinion requests submitted"
              value={dashboardInfo.tasks_submitted_count || 0} // Populate with backend data
            />
            <InfoBox
              text="tasks overdue"
              value={dashboardInfo.tasks_overdue_count || 0} // Populate with backend data
            />
          </div>
        </section>
        <div className="ms-[-60px] border-b border-gold-800"></div>
        <section className="mt-10">
          <h2 className="text-2xl font-bold ms-6">Pending Opinions</h2>
          <div className="overflow-x-auto w-[1400px]">
            <div className="flex flex-row gap-8">
              {opinionRequests.length > 0 ? (
                opinionRequests.map((request) => (
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
                ))
              ) : (
                <div className="bg-[rgba(255,255,255,0.56)] mt-5 ms-2 p-5 rounded-lg shadow-md flex align-center w-[1200px]">
                  <h3 className="text-lg font-semibold ms-2">
                    No opinion forms available!
                  </h3>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <div className="background-svg"></div>
    </div>
  );
};

export default Home;
