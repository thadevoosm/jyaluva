"use client";
import React, {useState, useEffect} from "react";
import { getAuth, RecaptchaVerifier,signInWithPhoneNumber } from "@firebase/auth";
import { app } from "../config";
import { useRouter } from "next/navigation";
import { ToastContainer ,toast} from "react-toastify";
import { useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword, useSendVerificationCode } from 'react-firebase-hooks/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import 'react-toastify/dist/ReactToastify.css';


export default function LoginClientComponent() {
    const auth = getAuth(app);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [confirmationResult, setConfirmationResult] = useState(null);
    const [otpSent, setOtpSent] = useState(false);



    const router = useRouter();
     

    useEffect(()=>{
        
        window.recaptchaVerifier = new RecaptchaVerifier(auth,'sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
                console.log('Captcha Resolved')
                onSignInSubmit();
            },
            'expired-callback': () => {
                console.log('Captcha Expired')
            }
        });
    }, [auth]);

    const handlePhoneNumberChange = (e) =>{
        setPhoneNumber(e.target.value);
    };

    const handleOtpChange = (e) =>{
        setOtp(e.target.value);
    };

    const handleSendOtp = async() =>{
        try{
            const formatedPhoneNumber = `+91${phoneNumber.replace(/\D/g, '')}`;
            const confirmation = await signInWithPhoneNumber(auth, formatedPhoneNumber, window.recaptchaVerifier);
            setConfirmationResult(confirmation);
            setOtpSent(true);
            // alert("OTP sent successfully");
            toast.success("OTP sent successfully",{
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            
        }catch(error){
            console.log(error);
        }
    };
    const handleOtpSubmit = async() =>{
        try{
            await confirmationResult.confirm(otp);
            setOtp("");
            const user = auth.currentUser;
            console.log(user);
            console.log(otp)
            if(user?.email == null ){
                router.push('/register');
            }else{
                router.push('/dashboard');
            }
            
        } catch(error){
            console.log(error);
        }
    };
   

    return (
        <>
        
        <div className="max-w-lg m-auto mt-48">
        
            <div>
                <h1 className="font-bold text-3xl position absolute left-0 top-0 mt-2 ml-2">
                    Jesus Youth Aluva
                </h1>
            </div>
            <div>
                <h3 className="text-xl "> Login</h3>
            </div>
            
            {!otpSent ? (
                <div id="recaptcha-container"></div>
            ): null}
            <input 
                type="text"
                value={phoneNumber} 
                onChange={handlePhoneNumberChange} 
                placeholder="Enter your phone number" 
                className="border border-gray-300 p-2 rounded-md w-full"          
                style={{display: otpSent ? 'none' : 'block'}}
            />
            <input
                type="text"
                value={otp}
                onChange={handleOtpChange}
                placeholder="Enter OTP"
                className="border border-gray-300 p-2 rounded-md w-full"
                style={{display: otpSent ? 'block' : 'none'}}
            />
            <button
                id="sign-in-button"
                onClick={otpSent? handleOtpSubmit : handleSendOtp}
                className={`bg-${otpSent ? 'green' : 'blue'}-500 text-white p-2 rounded-md w-full`}
                style={{backgroundColor: otpSent? 'green' : 'blue'}}
            >
                {otpSent? 'Submit' : 'Send OTP'}
            </button>
        </div>
        <ToastContainer />
        </>
    )
}
function onSignInSubmit() {
    throw new Error("Function not implemented.");
}

