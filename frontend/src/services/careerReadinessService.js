import api from "./api";

export async function getCareerReadiness(careerTrack) {

    const response = await api.get(
        "/career-readiness",
        {
            params: {
                career_track: careerTrack
            }
        }
    );

    return response.data;
}