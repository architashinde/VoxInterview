import { getInterviewById } from '@/lib/actions/general.action';
import React from 'react';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import {getRandomInterviewCover} from "@/app/api/vapi/generate/route";
import DisplayTechicons from '@/components/DisplayTechicons';
import Agent from '@/components/Agent';
import { getCurrentUser } from '@/lib/actions/auth.action';

const Page = async ({params}: { params: Promise<{ id: string }> }) => {

    const {id} = await params;
    const user = await getCurrentUser();
    const interview =await getInterviewById(id);

    if(!interview) redirect ('/')

    const techStack = Array.isArray(interview.techstack)
      ? interview.techstack.filter((tech): tech is string => typeof tech === 'string')
      : [];

    return(
        <>
          <div className='flex flex-row gap-4 justify-between'>
              <div className='flex flex-row gap-4 items-center max-sm:flex-col'>
                <div className='flex flex-row gap-4 items-center'>
                    <Image src={getRandomInterviewCover()} alt="cover-image" width={40} height={40} className='rounded-full object-cover size-10' />
                    <h3 className='capitalize'>{String(interview.role)}Interview</h3>
                    <DisplayTechicons techStack={techStack}/>
                    <p className='bg-dark-200 px-4 py-2 rounded-lg h-fit capitalize'>{String(interview.type)}</p>
                </div>
                <Agent
                  userName={user?.email || ''}
                  type="interview"
                  userId={String(interview.userId ?? '')}
                  questions={Array.isArray(interview.questions)
                    ? interview.questions.filter((question): question is string => typeof question === 'string')
                    : []}
                />
              </div>
          </div>
        </>
    )
}

export default Page;