import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
<<<<<<< HEAD
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
=======
import DefaultLayout from "@/components/Layouts/DefaultLayout";
>>>>>>> 57fc94bad53a69e147593b6744a3dd083d375c46

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    </>
  );
}
