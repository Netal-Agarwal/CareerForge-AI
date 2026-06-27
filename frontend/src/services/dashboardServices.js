import api from "./api";

export async function getCareerReport(track) {
    const response = await api.get(
        `/career-report?career_track=${track}`
    );

    return response.data;
}

export async function getCareerReadiness(track) {

    const response = await api.get(
        `/career-readiness?career_track=${track}`
    );

    return response.data;
}





