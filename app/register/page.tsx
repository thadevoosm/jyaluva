'use client'
import { createUserWithEmailAndPassword } from '@firebase/auth';
import React,{useState} from 'react'
import { app } from "../config";
import Image from 'next/image';
import { collection,addDoc } from 'firebase/firestore';
import * as bcrypt from 'bcryptjs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword, useSendVerificationCode } from 'react-firebase-hooks/auth';
import { getAuth } from '@firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
const auth = getAuth(app);
const db = getFirestore(app);



export default function RegisterAccount() {
    const [email, setEmail] = useState("");
    const [fname, setFname ] = useState("");
    const [lname, setLname ] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const router = useRouter();
    const user = auth.currentUser;
    const handleRegister = async (e) =>{
        e.preventDefault();
        try{
            const user = await createUserWithEmailAndPassword(auth, email, password);
            console.log(user);
            const docRef = await addDoc(collection(db, "users"), {
                fname: fname,
                lname: lname,
                email: email,
                password: password
            })
            
        }catch(error){
            console.log(error);
        }
        console.log("test-handleRegister");
    }
    const handlePassword = () => {
        console.log("test-handlePassword");
        if (password !== confirmPassword) {
            toast.error("Passwords do not match", {
                position: "top-center",
                toastId: "passwordError",
                autoClose: false
            });
            return false;
        }else{
            toast.warning("Passwords Macthed", {
                position: "top-center",
                toastId: "passwordError",
                autoClose: 2000,
            });
            
            if(user?.email == null){
                toast('getting verified', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setTimeout(() => {
                    router.push('/getVerified');  
                }, 3000);

                              
            }else{
                router.push('/dashboard');
            }
        }
    }
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);
  return (
    <>
    <ToastContainer />
    <div className='flex flex-col gap-3 center justify-center items-center w-screen h-screen m-5' >
        <Image 
            src="/assets/img/Black.png"
            width={100}
            height={100}
            alt="logo"
        />
        <div className="flex column center justify-center items-center p-8 border rounded-md shadow-xl">
            <form onSubmit={handleRegister}>
                <h3 className='text-center text-3xl font-bold mb-7'>Register yourself</h3>
                <div className='flex flex-col center justify-center items-start mb-3 mt-3 mr-2'>
                    <label className='mr-3'>First Name</label>
                    <input
                        type="text"
                        className="form-control border border-gray-300 p-2 rounded-md w-full"
                        placeholder="Enter first name"
                        name="fname"
                        value={fname}
                        onChange={(e)=>{setFname(e.target.value)}}
                    />
                </div>
                <div className='flex flex-col center justify-center items-start  mb-3 mt-3 mr-2'>
                    <label className='mr-3'>Last Name</label>
                    <input
                        type="text"
                        className="form-control border border-gray-300 p-2 rounded-md w-full"
                        placeholder="Enter Last name"
                        name="lname"
                        value={lname}
                        onChange={(e)=>{setLname(e.target.value)}}
                    />
                </div>
                <div className='flex flex-col center justify-center items-start  mb-3 mt-3 mr-2'>
                    <label className='mr-3'>Email Address</label>
                    <input
                        type="text"
                        className="form-control border border-gray-300 p-2 rounded-md w-full"
                        placeholder="Get your email address"
                        name="email"
                        value={email}
                        onChange={(e)=>{setEmail(e.target.value)}}
                    />
                </div>
                <div className='flex flex-col center justify-center items-start mb-3 mt-3 mr-2'>
                    <label className='mr-3'>Password Please ?</label>
                    <input
                        type="text"
                        className="form-control border border-gray-300 p-2 rounded-md w-full"
                        placeholder="Write your Password"
                        name="password"
                        value={password}
                        onChange={(e)=>{setPassword(e.target.value)}}
                    />
                </div>
                <div className='flex flex-col center justify-center items-start  mb-3 mt-3 mr-2'>
                    <label className='mr-3'>Care to Confirm ?</label>
                    <input
                        type="text"
                        className="form-control border border-gray-300 p-2 rounded-md w-full"
                        placeholder="Confirm your Password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e)=>{setConfirmPassword(e.target.value)}}
                    />
                </div>
                <button type="submit" className="btn btn-primary outline rounded-md w-60 hover:bg-blue-600 ml-[50%] transform -translate-x-[50%] mt-6 p-2 bg-blue-500 color-white" onClick={handlePassword}>
                Register</button>
        </form>
        </div>
    </div>
    </>
  )
} 
