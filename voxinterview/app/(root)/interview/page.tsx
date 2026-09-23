import React from "react";
import { getCurrentUser } from "@/lib/actions/auth.action";
import Agent from "@/components/Agent";

const Page = async () => {
    const user = await getCurrentUser();
    return(
       <>
        <h3>
            Interview Generation
        </h3>
        <Agent userName={user?.displayName ?? ""} userId={user?.uid ?? ""} type="generate"/>
       </>
    )
}

export default Page;