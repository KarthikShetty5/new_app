'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";

// export const metadata: Metadata = {
//   title: "Next.js Tables | TailAdmin - Next.js Dashboard Template",
//   description:
//     "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
// };

const TablesPage = () => {
  const [tableone, settableone] = useState();

  async function gettableone() {
    const res = await fetch(`http://localhost:8000/data/table`)
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
      <Breadcrumb pageName="Tables" />
      <div className="flex flex-col gap-10">
        {tableone ? (
          <TableOne prop={tableone} />
        ) : (
          <Loader />
        )}
        <TableTwo />
        <TableThree />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
