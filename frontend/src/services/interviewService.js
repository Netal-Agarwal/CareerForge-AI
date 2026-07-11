import api from "./api";

export async function getInterviewQuestions() {

    const response = await api.get(
        "/interview-questions"
    );

    return response.data;

}