import Link from 'next/link';
import React from 'react';

const Page = () => {
  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview-Ready with AI-powered practice and feedback</h2>
          <p className="text-lg">
            Practice your interview skills with VoxInterview, an AI-powered platform that provides personalized feedback and guidance to help you succeed in your next interview.
          </p>
          <Link href="/interview" className="btn-primary max-sm:w-full">
            Start an Interview
          </Link>
        </div>
      </section>
    </>
  );
}

export default Page;