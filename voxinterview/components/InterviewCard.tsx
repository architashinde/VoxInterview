/* eslint-disable react/jsx-no-undef */
import React from "react";
import { Feedback } from "@/types";
import dayjs from "dayjs";
import Image from "next/image";
import {interviewCovers} from "@/constants/index";
import { Button } from "./ui/button";
import Link from "next/dist/client/link";
import DisplayTechIcons from "./DisplayTechicons";


const getRandomInterviewCover = () => {
  const randomIndex = Math.floor(Math.random() * interviewCovers.length);
  return interviewCovers[randomIndex];
};
;interface InterviewCardProps {
    id: string;
    userId: string;
    role: string;
    type: string;
    techstack: string[];
    level: string;
    questions: string[];
    finalized: boolean;
    createdAt: string;
}

const InterviewCard = ({id, userId, role, type, techstack, level, questions, finalized, createdAt}:InterviewCardProps) => {
    const feedback =null as Feedback | null;
    const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
    // eslint-disable-next-line react-hooks/purity
    const formattedDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format("MMMM D, YYYY");
    return(
        <div className="card-border max-sm:w-full min-h-96" style={{ width: "360px" }} >
            <div className="card-interview">
                <div>
                    <div className ="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600">
                        <p className="badge-text">{normalizedType}</p>
                    </div>
                    <Image src={getRandomInterviewCover()} alt="cover" width={90} height={90} className="rounded-full object-cover size-22.5"/>
                    <h3 className="mt-5 capitalize">{role} Interview </h3>
                    <div className="flex flex-row gap-5 mt-3">
                        <div className="flex flex-row gap-2">
                            <Image
                              src="/calendar.png" 
                              alt="calendar" 
                              width="20"
                              height="20"
                            />
                            <p>{formattedDate}</p>
                        </div>
                        <div className="flex flex-row gap-2">
                            <Image 
                              src="/star.png"
                              alt="star"
                              width="22"
                              height="22"
                            />
                            <p>{feedback?.totalScore || "---"}/100</p>
                        </div>
                    </div>
                    <p className="line-clamp-2 mt-5">{feedback?.finalAssessment || "You haven't taken the interview yet. Take it now to improve your skills."}</p>
                </div>
                <div className="flex flex-row justify-between">
                    <DisplayTechIcons techStack={techstack} />
                    <Button className="btn-primary">
                        <Link href={feedback?`/interview/${id}/feedback`: `/interview/${id}`}>
                            {feedback? 'Check Feedback' : 'View Interview'}</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default InterviewCard;