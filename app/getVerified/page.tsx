import React from 'react'
import Image from 'next/image'

export default function GetVerified() {
  return (
    <>
    <div>
        <h1 className="text-3xl font-bold text-center">Get Verified</h1>
        <p className="text-3xl font-bold text-center">We will confirm you soon</p>
        <Image 
        src="/assets/img/jesus-getVerified.png"
        width={400}
        height={400}
        alt="logo"
        />
        <p className='text-center text-md font-light'>Hasn't verified yet? Contact Subzone Coordinator</p>
    </div>
    </>
  )
}

