import api from "./api";

export async function getATSScore(jobDescription) {

    const response = await api.post(

        "/ats-score",

        null,

        {

            params: {

                job_description: jobDescription

            }

        }

    );

    return response.data;

}


