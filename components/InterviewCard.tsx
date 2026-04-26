import React from 'react'
import dayjs from 'dayjs'
import Image from 'next/image'
import { getInterviewCoverById } from '@/lib/utils'
import { Button } from './ui/button'
import Link from 'next/link'
import DisplayTechIcons from './DisplayTechIcons'
import { dummyFeedbackByInterviewId } from '@/constants'
import { ChevronRight } from 'lucide-react'

const InterviewCard = ({ id, interviewId, role, type, techstack, createdAt, showFeedbackDetails = false }: InterviewCardProps) => {
    const resolvedInterviewId = interviewId || id || "";
    const feedback = resolvedInterviewId ? dummyFeedbackByInterviewId[resolvedInterviewId] ?? null : null;
    const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
    const formattedDate = dayjs(
        feedback?.createdAt || createdAt || Date.now()
    ).format("MMM D, YYYY");

    return (
        <div className='card-border w-full'>
            <div className='card-interview flex flex-col md:flex-row items-center gap-6 p-6'>
                {/* Badge */}
                <div className='absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600'>
                    <p className='badge-text'>{normalizedType}</p>
                </div>

                {/* Cover Image */}
                <Image
                  src={getInterviewCoverById(resolvedInterviewId, role)}
                  alt="cover-image"
                  width={70}
                  height={70}
                  className="rounded-full object-cover size-[70px] border border-white/5 shrink-0"
                />

                {/* Content Area */}
                <div className='flex-1 flex flex-col gap-3'>
                    <h3 className='capitalize text-xl font-bold text-foreground'>
                        {role} Interview
                    </h3>
                    
                    <div className='flex flex-row gap-5 items-center'>
                      <div className='flex flex-row gap-2'>
                        <Image src="/calendar.svg" alt="calendar-icon" width={18} height={18} />
                        <p className="text-sm text-light-100">{formattedDate}</p>
                      </div>
                      <div className='flex flex-row gap-2 items-center'>
                        <Image src='/star.svg' alt='star-icon' width={18} height={18} />
                        <p className="text-sm text-light-100">
                          {showFeedbackDetails ? `${feedback?.totalScore || "--"}/100` : "---/100"}
                        </p>
                      </div>
                    </div>

                    <p className='line-clamp-2 text-sm text-light-100'>
                        {feedback?.finalAssessment || "No feedback provided yet."}
                    </p>
                </div>

                {/* Footer Section (Icons and Button) - Horizontal Alignment */}
                <div className='flex flex-col md:flex-row items-center gap-6 md:ml-auto'>
                    <DisplayTechIcons techStack={techstack} />
                    <Button className='btn-primary whitespace-nowrap px-8'>
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