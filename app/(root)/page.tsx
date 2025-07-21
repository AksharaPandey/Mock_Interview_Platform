import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <>
     <section className='card-cta'>
       <div className='flex flex-col gap-6 max-w-lg '>
        <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
        <p className='text-lg'>
          Practice coding questions, receive personalized feedback, and improve your interview skills.
        </p>
        <Button asChild className="btn-primary w-full">
            <Link href="/interview">Start an Interview</Link>
        </Button>
       </div>
       <Image
           src="/robot.png"
           alt="robo-dude"
           width={400}
           height={400}
           className="hidden max-md:hidden md:block"
         />
     </section>
     <section className='flex flex-col gap-6 mt-8'>
      <h2>Your Interviews</h2>
      <div className='interviews-section'>
      <p>You haven't taken any interviews yet.</p>
      </div>
     </section>
     <section className='flex flex-col gap-6 mt-8'>
      <h2>Take an Interview</h2>
      <div className='interviews-section'>
      <p>There are no interviews available.</p>
      </div>
     </section>
    </>
  )
}

export default Page