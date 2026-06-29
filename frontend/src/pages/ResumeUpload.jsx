import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { uploadResume } from "../services/resumeService";

function ResumeUpload() {

    const navigate = useNavigate();

    const [file, setFile] = useState(null);

    const [loading, setLoading] = useState(false);

    const handleUpload = async () => {

        if (!file) {

            alert("Please select a PDF.");

            return;

        }

        setLoading(true);

        try {

            await uploadResume(file);

            alert("Resume uploaded successfully!");

            navigate("/dashboard");

        }

        catch (error) {

            console.log(error);

            alert("Upload failed.");

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen bg-slate-900 flex justify-center items-center">

            <div className="bg-slate-800 rounded-3xl p-10 w-[550px]">

                <h1 className="text-4xl font-bold text-white">

                    Upload Resume

                </h1>

                <p className="text-gray-400 mt-3">

                    Upload your latest resume in PDF format.

                </p>

                <input

                    type="file"

                    accept=".pdf"

                    onChange={(e) => setFile(e.target.files[0])}

                    className="mt-10 text-white"

                />

                <button

                    onClick={handleUpload}

                    className="mt-8 w-full bg-purple-600 py-4 rounded-xl text-white font-semibold hover:bg-purple-700"

                >

                    {

                        loading

                        ?

                        "Uploading..."

                        :

                        "Upload Resume"

                    }

                </button>

            </div>

        </div>

    );

}

export default ResumeUpload;