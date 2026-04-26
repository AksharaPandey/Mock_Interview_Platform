"use client";

import { Button } from '@/components/ui/button'
import { generateRandomInterviews, dummyInterviews } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import InterviewCard from '@/components/InterviewCard'

const DashboardPage = () => {
  const [interviews, setInterviews] = useState<any[]>([]);

  // Generate random interviews only on CLIENT to avoid hydration mismatch
  useEffect(() => {
    setInterviews(generateRandomInterviews(6));
  }, []);

  // Pre-render logic: Initially empty or with stable dummy data
  const mainInterviews = interviews.length > 0 ? interviews.slice(0, 3) : dummyInterviews.slice(0, 3);
  const secondaryInterviews = interviews.length > 0 ? interviews.slice(3, 6) : dummyInterviews.slice(3, 6);

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
        <div className="grid grid-cols-1 gap-6 w-full">
          {mainInterviews.map((interview, index) => (
            <InterviewCard {...interview} key={interview.id || index} showFeedbackDetails={index === 0}/>
          ))}
        </div>
      </section>

      <section className='flex flex-col gap-6 mt-8'>
        <h2>Take an Interview</h2>
        <div className='grid grid-cols-1 gap-6 w-full'>
          {secondaryInterviews.map((interview, index) => (
            <InterviewCard {...interview} key={interview.id || index}/>
          ))}
        </div>
      </section>
    </>
  )
}

export default DashboardPage;