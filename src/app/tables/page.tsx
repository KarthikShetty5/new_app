'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";

const TablesPage = () => {
  const [tableone, settableone] = useState();
  const [tabletwo, settabletwo] = useState();

  async function gettableone() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/data/table`)
    return res.json()
  }

  async function gettabletwo() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/data/table2`)
    return res.json()
  }

  const tableoneData = gettableone()
  const tabletwoData = gettabletwo()

  async function setter() {
    const [tableone, tabletwo] = await Promise.all([tableoneData, tabletwoData])
    settableone(tableone)
    settabletwo(tabletwo)
  }

  useEffect(() => {
    setter()
  }, [])


  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tables" />
      <div className="flex flex-col gap-10">
        {tableone ? (
          <TableOne prop={tableone} />
        ) : (
          <Loader />
        )}
        {tabletwo ? (
          <TableThree prop={tabletwo} />
        ) : (
          <Loader />
        )}
        {/* <TableTwo /> */}
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
