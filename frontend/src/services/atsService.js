import api from "./api";

export async function getATSScore(jobDescription) {

    console.log("TOKEN:", localStorage.getItem("token"));

    const response = await api.post(
        "/ats-score",
        null,
        {
            params: {
                job_description: jobDescription
            }
        }
    );

    console.log("ATS RESPONSE:", response.data);

    return response.data;
}