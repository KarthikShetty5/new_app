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
  const [year, setYear] = useState();

  async function getpeople() {
    const res = await fetch(`http://localhost:8000/data/people`)
    return res.json()
  }

  async function getyear() {
    const res = await fetch(`http://localhost:8000/data/year`)
    return res.json()
  }

  async function getother() {
    const res = await fetch(`http://localhost:8000/data/people`)
    return res.json()
  }

  const peopleData = getpeople()
  const otherData = getother()
  const yearData = getyear()

  async function setter() {
    const [people, other, year] = await Promise.all([peopleData, otherData, yearData])
    setpeople(people)
    setOther(other)
    setYear(year)
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
          <ChartTwo prop={year} />
        ) : (
          <Loader />
        )}

        {year ? (
          <ChartThree prop={year} />
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default Chart;
