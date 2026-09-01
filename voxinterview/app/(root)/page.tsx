import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { dummyInterviews } from '@/constants';
import InterviewCard from "@/components/InterviewCard";
const Page = () => {
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
        <Image src="/robot.png" alt="AI Robot" width={400} height={400} />
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>
        <div className="interviews-section">
          {dummyInterviews.map((interview) => (
            <InterviewCard Id={''} {...interview} key={interview.id} />
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2>Take an Interview</h2>
        <div className="interviews-section">
          {dummyInterviews.map((interview) => (
            <InterviewCard Id={''} {...interview} key={interview.id}/>
          ))}
        </div>
      </section>
    </>
  );
}

export default Page;