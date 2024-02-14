"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ChartOne from "@/components/Charts/ChartOne";
import ChartTwo from "@/components/Charts/ChartTwo";
import ChartThree from "@/components/Charts/ChartThree";
import React, { useEffect, useState } from "react";
import Loader from "../common/Loader";

const Chart: React.FC = () => {
  const [people, setpeople] = useState();
  const [other, setOther] = useState();

  async function getpeople() {
    const res = await fetch(`http://localhost:8000/data/people`)
    return res.json()
  }

  async function getother() {
    const res = await fetch(`http://localhost:8000/data/people`)
    return res.json()
  }

  const peopleData = getpeople()
  const otherData = getother()

  async function setter() {
    const [people, other] = await Promise.all([peopleData, otherData])
    setpeople(people)
    setOther(other)
  }

  useEffect(() => {
    setter()
  }, [])

  return (
    <>
      <Breadcrumb pageName="Chart" />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        {people ? (
          <ChartOne prop={people} />
        ) : (
          <Loader />
        )}
        {other ? (
          <ChartTwo prop={other} />
        ) : (
          <Loader />
        )}
        <ChartThree />
      </div>
    </>
  );
};

export default Chart;
