import React from 'react'
import { FaArrowCircleLeft } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useState  } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { serverUrl } from '../../App';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { setLectureData } from '../../redux/lectureSlice';
import { FaEdit } from "react-icons/fa";

function CreateLecture() {
    const navigate = useNavigate()
    const { courseId } = useParams()
    const [lectureTitle, setlectureTitle] = useState("")
    const [loading, setLoading] = useState(false)
    /* we will use Disptach bec hama setLectureData ma Value set krni ahi isliye ... */
    const dispatch = useDispatch()

    /* we want lecture data so to get lecture we will use Selector  */
    const { lectureData } = useSelector(state => state.lecture)


    /* CreateLecture name wala controller ko yeha fatch krna hai hama ...  */


    /* Phele Function banana hota hai ...  To Handel it ...   */
    const handleCreatelecture = async () => {
        /* Agr Koi Result nhi aaya tho SetLoading ko true kr denge ....  */

        setLoading(true)
        try {
            /* yeha api se phele mena / ye nhi lagaya tha .... */
            const result = await axios.post(serverUrl + `/api/course/createlecture/${courseId}`, { lectureTitle }, { withCredentials: true })
            console.log(result.data)
            /* Lecture Create krna pr result.data jo aa rha hai usee khi set krna hoga tho uske liye ... */

            /* lectureData kudh ek array hai and jo lecture create hua hai usse lectureData ma dalana hai ...  */

            dispatch(setLectureData([...lectureData, result.data.lecture]))
            setLoading(false)
            toast.success("Lecture Added")
            setlectureTitle("")
        } catch (error) {


            console.log(error)
            setLoading(false)
            toast.error(error.response.data.message)

        }
    }



    /* Hama getCourseLecture ko baar baar call krna hai isliye ham yeha ek use state banana wala hai jisse ham 
    ye kr sakha ...  */

    useState(() => {
        const getCourseLecture = async () => {
            try {

                const result = await axios.get(serverUrl + `/api/course/courselecture/${courseId}`, { withCredentials: true })
                console.log(result.data)    
                dispatch(setLectureData(result.data.lectures))

            } catch (error) {
                console.log(error)
            }
        }
        getCourseLecture()  /* Jase hi Page Load Hoga Wase hi ye getCourseLecture wala function call ho Jayega ...  */

    }, [])


    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white shadow-xl rounded-xl w-full max-w-2xl p-6">
                {/* header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-1">
                        Let’s Add a Lecture
                    </h1>
                    <p className="text-sm text-gray-500 ">Enter the Title and Your Video Lecture to enhance Your Course Content ...  </p>
                </div>

                {/* input Area */}
                <input onChange={(e) => setlectureTitle(e.target.value)} value={lectureTitle}
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black mb-4"
                    placeholder="e.g. Introduction to Mern Stack"
                />

                {/* Button */}
                <div className="flex gap-4 mb-6">
                    <button onClick={() => navigate(`/editcourse/${courseId}`)} className='cursor-pointer flex items-center gap-2 px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-sm font-medium'>
                        <FaArrowCircleLeft />Back to Course
                    </button>
                    {/* my mistke is ki mena yeha onclick ma ()=> callback bana diya tha ...  */}
                    <button disabled={loading} onClick={handleCreatelecture} className='cursor-pointer px-5 py-2 rounded-md bg-black text-white hover:bg-gray-600 transition-all text-sm font-medium shadow'>
                        {loading ? <ClipLoader size={35} color='white' /> : "Create Lecture"}
                    </button>

                </div>

                {/* yeha ham Lecture wala Area Banana Wala hai ...  */}
                {/* Lecture List ... */}
                {/* Yeha LectureData ko Map Krana Wala Hai ...  */}
                <div className='space-y-2' >
                    {/* Ham JAVA likh raha hai isliye ham { } laga raha hai ...  */}
                    {lectureData?.map((lecture, index) => (
                        /* div ma key={index} dalana se kya hoga ki jitna index honge utna div ban jayenga ... */
                        <div  key={index} className='bg-gray-100 rounded-md flex justify-between items-center p-3 text-sm font-medium text-gray-700'>

                              <span > Lecture - {index + 1 } : {lecture.lectureTitle}</span>
                               <FaEdit onClick={()=>navigate(`/editlecture/${courseId}/${lecture._id}`)}  className='text-gray-500 hover:text-gray-700 cursor-pointer'  />
                        </div> 

                    ))}
                </div>


            </div>
        </div>

    )
}

export default CreateLecture
