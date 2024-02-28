'use client'
import ECommerce from "@/components/Dashboard/E-commerce";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { auth } from '../config/firebase'
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";


export default function Home() {
  // const router = useRouter()

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       console.log("user is there")
  //     } else {
  //       toast.error('Please login !', {
  //         position: "top-left",
  //         autoClose: 1500,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //       });
  //       router.push('/auth/signin');
  //     }
  //   });
  //   return () => unsubscribe();
  // }, []);

  return (
    <>
      {/* <ToastContainer
        position="top-left"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> */}
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    </>
  );
}
