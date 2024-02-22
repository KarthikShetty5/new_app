'use client'
import Calendar from "@/components/Calender";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";


const CalendarPage = () => {
  const [tableone, settableone] = useState();

  async function gettableone() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/data/scrap`)
    return res.json()
  }
  const tableoneData = gettableone()

  async function setter() {
    const [tableone] = await Promise.all([tableoneData])
    settableone(tableone)
  }

  useEffect(() => {
    setter()
  }, [])

  return (
    <DefaultLayout>
      {tableone ? (
        <Calendar prop={tableone} />
      ) : (
        <Loader />
      )}
    </DefaultLayout>
  );
};

export default CalendarPage;
