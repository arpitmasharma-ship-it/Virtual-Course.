import React from 'react'
import { FaArrowCircleLeft } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { serverUrl } from '../../App';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { updateLecture } from "../../redux/lectureSlice";

function EditLecture() {
    const navigate = useNavigate()
    const { courseId, lectureId } = useParams();

    /* Yeha ham LetureData leke aana wala hai ...  */
    const { lectureData } = useSelector(state => state.lecture)
    /* Yeha ham selectedLecture ko find krange from the lectureData ...  */
    /* lectureData ek array hai tho usme se vo lecture niklana hai jiski id LectureId ke equal ho ...  */
    const selectedLecture = lectureData.find(lecture => lecture._id === lectureId)

    const [lectureTitle, setLectureTitle] = useState(selectedLecture.lectureTitle)
    const [videoUrl, setVideoUrl] = useState("")
    const [isPreviewFree, setIsPreviewFree] = useState(
        selectedLecture?.isPreviewFree || false
    )

    const [loading, setLoading] = useState(false)
    const [loading1, setLoading1] = useState(false)
    const dispatch = useDispatch()





    /* Hame Yeha Edit Wala Function ko fetch krna hai .................. */

    const handleEditLecture = async () => {
        setLoading(true);

        try {
            const formdata = new FormData();
            formdata.append("lectureTitle", lectureTitle);
            formdata.append("isPreviewFree", String(isPreviewFree));

            if (videoUrl) {
                formdata.append("videoUrl", videoUrl);
            }

            const result = await axios.post(
                `${serverUrl}/api/course/editlecture/${lectureId}`,
                formdata,
                { withCredentials: true }
            );

            dispatch(updateLecture(result.data));

            toast.success("Lecture Updated");
            navigate(`/createlecture/${courseId}`);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update lecture");
        } finally {
            setLoading(false);
        }
    };


    const removeLecture = async () => {
        setLoading1(true);

        try {
            const result = await axios.delete(
                serverUrl + `/api/course/removelecture/${lectureId}`,
                {
                    withCredentials: true
                }
            )
            console.log(result.data);

            toast.success("Lecture Removed Successfully");

            navigate(`/createlecture/${courseId}`);

        } catch (error) {
            setLoading1(false);

            console.log("STATUS:", error.response?.status);
            console.log("DATA:", error.response?.data);
            console.log("FULL ERROR:", error);

            toast.error(
                error.response?.data?.message || "Failed to remove lecture"
            );
        }
    };



    return (
        <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
            <div className='w-full max-w-xl bg-white rounded-xl shadow-lg p-6 space-y-6'>
                {/* header */}
                <div className='flex items-center gap-2 mb-2'>
                    <FaArrowCircleLeft onClick={() => navigate(`/createlecture/${courseId}`)} className='text-gray-600 cursor-pointer' />
                    <h2 className='text-xl font-semibold text-gray-800'  >Update Course Lecture </h2>
                </div>

                <button onClick={removeLecture} disabled={loading1} className='mt-2 px-4 py-2  bg-red-600 text-white rounded-md hover:bg-red-700 transition-all text-sm cursor-pointer'  >{loading1 ? <ClipLoader size={30} color='white' /> : "Remove Lecture"}</button>

                <div className='space-y-4'>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor=''>
                            LectureTitle
                        </label>
                        <input
                            type='text'
                            className='w-full p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[black] focus:outline-none '
                            required onChange={(e) => setLectureTitle(e.target.value)} value={lectureTitle} />
                    </div>


                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor=''>
                            Video
                        </label>
                        <input
                            type="file"
                            className=' cursor-pointer w-full border border-gray-300 rounded-md p-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-gray-700 file:text-[white] hover:file:bg-gray-500'
                            required onChange={(e) => setVideoUrl(e.target.files[0])}
                        />

                    </div>


                    <div className='flex items-center gap-3 '  >
                        <input
                            type="checkbox"
                            id="isFree"
                            checked={isPreviewFree}
                            onChange={(e) => setIsPreviewFree(e.target.checked)}
                        />

                        <label htmlFor="isFree" className="text-sm text-gray-700">
                            Is This Video Free
                        </label>
                    </div>


                </div>

                <div className="pt-4">
                    <button className=" cursor-pointer  w-full bg-black text-white py-3 rounded-md text-sm font-medium hover:bg-gray-700 transition" onClick={handleEditLecture} disabled={loading} >
                        {loading ? <ClipLoader size={30} color='white' /> : "UpDate Lecture"}
                    </button>
                </div>



            </div>
        </div>
    )
}

export default EditLecture

