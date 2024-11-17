import React from "react";
import { Link } from "react-router-dom";
import InfoBox from "../components/InfoBox";
import OpinionBox from "../components/OpinionBox";
import './Home.css';

const Home = () => {
  return (
    <div className="mt-14 ms-10">
      <header className="text-4xl font-bold">
        <h1>Welcome back Haben Tesfamariam Abdoul Jaleelulloh Gaim</h1>
      </header>
      <main className="mt-8 ms-4">
        <section>
          <h2 className="text-2xl font-bold mb-4 ms-6">Overview</h2>
          <InfoBox text="opinion requests waiting for your review" value="2" />
          <InfoBox text="tasks overdue" value="0" />
          <InfoBox text="just here for the looks" value="8" />
        </section>
        <section className="mt-14">
          <h2 className="text-2xl font-bold ms-6">Pending Opinions</h2>
          <div className="flex flex-row gap-8">
            <OpinionBox
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              dueDate="Augustus 69, 2069"
              priorityLevel="High"
            />
            <OpinionBox
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              dueDate="Augustus 69, 2069"
              priorityLevel="High"
            />
          </div>
        </section>
      </main>
      <div className="background-svg"></div>
    </div>
  );
};

export default Home;