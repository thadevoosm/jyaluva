'use client'
import React from 'react'
import { getAuth,signOut } from '@firebase/auth';
import { app } from '../config';
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Dashboard() {

    const router = useRouter();
    const auth = getAuth(app);

    const handleLogout = async () => {
        try{
            await signOut(auth);
            router.push('/login')
        }catch(error){
            console.log(error)
        }
    };

    const handleToast = () => {
      console.log(auth.currentUser?.providerData[0].displayName);
        toast.success("OTP sent successfully",{
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
  return (
    <>
        <button onClick={handleLogout}>Logout</button>
        <button onClick={handleToast}>Send OTP</button>
        <ToastContainer />
    </>
  )
}
