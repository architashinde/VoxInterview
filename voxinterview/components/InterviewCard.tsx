import React from "react";
import { Feedback } from "@/components/FeedbackForm";
import dayjs from "dayjs";
import Image from "next/image";
const getRandomInterviewCover = () => "/covers/cover-1.png";
;interface InterviewCardProps {
    Id: string;
    userId: string;
    role: string;
    type: string;
    techstack: string[];
    level: string;
    questions: string[];
    finalized: boolean;
    createdAt: string;
}

const InterviewCard = ({Id, userId, role, type, techstack, level, questions, finalized, createdAt}:InterviewCardProps) => {
    const feedback =null as Feedback | null;
    const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
    // eslint-disable-next-line react-hooks/purity
    const formattedDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format("MMMM D, YYYY");
    return(
        <div className="card-border max-sm:w-full min-h-96" style={{ width: "360px" }} >
            Interview Card
            <div className="card-interview">
                <div>
                    <div className ="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600">
                        <p className="badge-text">{normalizedType}</p>
                    </div>
                    <Image src={getRandomInterviewCover()} alt="cover" width={90} height={90} className="rounded-full object-fit size-22.5"/>
                </div>
            </div>
        </div>
    )
}

export default InterviewCard;