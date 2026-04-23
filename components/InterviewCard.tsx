import React from 'react'
import dayjs from 'dayjs'
import Image from 'next/image'
import { getInterviewCoverById } from '@/lib/utils'
import { Button } from './ui/button'
import Link from 'next/link'
import DisplayTechIcons from './DisplayTechIcons'
import { dummyFeedbackByInterviewId } from '@/constants'

const InterviewCard = ({ id, interviewId, role, type, techstack, createdAt, showFeedbackDetails = false }: InterviewCardProps) => {
    const resolvedInterviewId = interviewId || id || "";
    const feedback = resolvedInterviewId ? dummyFeedbackByInterviewId[resolvedInterviewId] ?? null : null;
    const normalizedType=/mix/gi.test(type) ? "Mixed" : type;
    const formattedDate=dayjs(
        feedback?.createdAt || createdAt || Date.now()
    ).format("MMM D, YYYY");
  return (
    <div className='card-border w-full min-h-96'>
        <div className='card-interview'>
          <div>
            <div className='absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600'>
                <p className='badge-text'>{normalizedType}</p>
            </div>

            <Image
            src={getInterviewCoverById(resolvedInterviewId)}
            alt="cover-image"
            width={90}
            height={90}
            className="rounded-full object-cover size-[90px]"
          />
          <h3 className='mt-5 capitalize'>
            {role} Interview
          </h3>
          <div className='flex flex-row gap-5 mt-3'>
            <div className='flex flex-row gap-2'>
             <Image
               src="/calendar.svg"
               alt="calendar-icon"
               width={22}
                height={22}
                />
                <p>{formattedDate}</p>
            </div>
            <div className='flex flex-row gap-2 items-center'>
              <Image src='/star.svg'
                alt='star-icon'
                width={22}
                height={22}
              />
              <p>{showFeedbackDetails ? `${feedback?.totalScore || "--"}/100` : "---/100"}</p>

            </div>
           </div>
           <p className='line-clamp-2 mt-5'>
            {feedback?.finalAssessment || "No feedback provided yet."}
           </p>
          </div>
          <div className='flex flex-row justify-between'>
            <DisplayTechIcons techStack={techstack} />
            <Button className='btn-primary'>
              <Link href={
                showFeedbackDetails && feedback
                  ? `/interviews/${resolvedInterviewId}/feedback`
                  : `/interviews/${resolvedInterviewId}`
              }>
                {showFeedbackDetails && feedback ? "Read Feedback" : "Start Interview"}
              </Link>
            </Button>
          </div>
        </div>
    </div>
  )
}

export default InterviewCard