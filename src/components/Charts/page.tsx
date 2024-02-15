"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ChartOne from "@/components/Charts/ChartOne";
import ChartTwo from "@/components/Charts/ChartTwo";
// import ChartThree from "@/components/Charts/ChartThree";
import React, { useEffect, useState } from "react";
import Loader from "../common/Loader";
import ChartFour from "./ChartFour";
import ChartFive from "./ChartFive";

const Chart: React.FC = () => {
  const [people, setpeople] = useState();
  const [senti, setSenti] = useState();
  const [year, setYear] = useState();
  const [plat, setPlat] = useState();
  const [loading, setLoading] = useState(true);
  const [desig, setDesig] = useState()

  async function getpeople() {
    const res = await fetch(`http://localhost:8000/data/people`)
    return res.json()
  }

  async function getyear() {
    const res = await fetch(`http://localhost:8000/data/year`)
    return res.json()
  }

  async function getsenti() {
    const res = await fetch(`http://localhost:8000/data/senti`)
    return res.json()
  }
  async function getplat() {
    const res = await fetch(`http://localhost:8000/data/inter`)
    return res.json()
  }

  async function getdesig() {
    const res = await fetch(`http://localhost:8000/data/desig`)
    return res.json()
  }

  const peopleData = getpeople()
  const sentiData = getsenti()
  const yearData = getyear()
  const platData = getplat()
  const desigData = getdesig()

  async function setter() {
    const [people, senti, year, plat, desig] = await Promise.all([peopleData, sentiData, yearData, platData, desigData])
    setpeople(people)
    setSenti(senti)
    setYear(year)
    setPlat(plat)
    setDesig(desig)
    setLoading(false);
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
        {plat ? (
          <ChartFour prop={plat} />
        ) : (
          <Loader />
        )}
        {/* {year ? (
          <ChartThree prop={senti} />
        ) : (
          <Loader />
        )} */}
        {year ? (
          <ChartTwo prop={year} />
        ) : (
          <Loader />
        )}
        {desig ? (
          <ChartFive prop={desig} />
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default Chart;
