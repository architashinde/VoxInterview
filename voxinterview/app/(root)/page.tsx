import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import InterviewCard from "@/components/InterviewCard";
import { getCurrentUser} from '@/lib/actions/auth.action';
import {  getInterviewByUserId, getLatestInterviews } from '@/lib/actions/general.action';
const Page = async () => {
  const user = await getCurrentUser();
  if (!user) {
   return null; // RootLayout's isAuthenticated() will redirect anyway
  }
  const [userInterviews, latestInterviews] = await Promise.all([
    await getInterviewByUserId(user?.id!),
    await getLatestInterviews({userId: user?.id!})
  ])

  const hasPastInterviews = (userInterviews?.length ?? 0) > 0;
  const hasUpcomingInterviews = (latestInterviews?.length ?? 0) > 0;
  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview-Ready with AI-powered practice and feedback</h2>
          <p className="text-lg">
            Practice your interview skills with VoxInterview, an AI-powered platform that provides personalized feedback and guidance to help you succeed in your next interview.
          </p>
          <Link href="/interview" className="btn-primary text-center max-sm:w-full">
            Start an Interview
          </Link>
        </div>
        <Image src="/robot.png" alt="AI Robot" width={400} height={400} loading="eager"/>
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>
        <div className="interviews-section">
          {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard userId={''} role={''} type={''} techstack={[]} level={''} questions={[]} finalized={false} createdAt={''} {...interview} key={interview.id} />
            ))
          ) : (
            <p>You haven&apos;t taken any interviews</p>
          )
          }
        </div>
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2>Take an Interview</h2>
        <div className="interviews-section">
          {hasUpcomingInterviews ? (
            latestInterviews?.map((interview) => (
              <InterviewCard userId={''} role={''} type={''} techstack={[]} level={''} questions={[]} finalized={false} createdAt={''} {...interview} key={interview.id} />
            ))
          ) : (
            <p>There are no new interviews available</p>
          )
          }
        </div>
      </section>
    </>
  );
}

export default Page;