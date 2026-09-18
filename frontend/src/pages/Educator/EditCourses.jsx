import React, { useEffect, useRef } from 'react'
import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import img from "../../assets/empty.jpg"
import { FaEdit } from "react-icons/fa";
import axios from 'axios';
import { serverUrl } from "../../App"
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux';
import { setcourseData } from '../../redux/courseSlice';

const EditCourses = () => {


  const navigate = useNavigate()
  const thumb = useRef()
  const [isPublished, setIsPublished] = useState(true)

  const [selectedCourse, setSelectedCourse] = useState(null)

  const [title, setTitle] = useState("")
  const [subTitle, setSubTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [level, setLevel] = useState("")
  const [price, setPrice] = useState("")
  const [frontendImage, setFrontendImage] = useState(img)
  const [backendImage, setBackendImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const { courseData } = useSelector(state => state.course)



  /* Yeha ham course id ko get krange okay  */
  const { courseId } = useParams()  /* params se id lana ke liya ham useParams ka use krta hai ... */

  const getCourseById = async () => {
    try {
      const result = await axios.get(serverUrl + `/api/course/getcourse/${courseId}`, { withCredentials: true })

      setSelectedCourse(result.data)
      console.log(result.data)
    } catch (error) {
      console.log(error)
    }
  }



  useEffect(() => {
    getCourseById()
  }, [])




  /* Ham yeha ek handleThumbnail banana wala hai jisse ki jb ham koi thumbnail image select kra tho uska path backend
  ma chala jaye and uska Url Frontend ma set ho  jaye ... */
  const handleThumbnail = ((e) => {
    /* ye file veha se aayegi jo bhi ham input ma file select krange ... */
    const file = e.target.files[0]
    setBackendImage(file)
    /* yeha ham es file ka url create krna hai ... */
    setFrontendImage(URL.createObjectURL(file))
  })

  /* YE HAM KYU KR RAHA HAI THIS IS VERY IMPORTANT ... */
  /* MTLB JO HAMERA SelectedCourse hai usme data already hai tho jo uske ander already  hai usse set kkrwa do and ager nhi 
  hai tho empty rekho fir manualy type kr ke set krwa denge ... */
  useEffect(() => {
    if (selectedCourse) {
      setTitle(selectedCourse.title || "")
      setSubTitle(selectedCourse.subTitle || "")
      setDescription(selectedCourse.description || "")
      setCategory(selectedCourse.category || "")
      setLevel(selectedCourse.level || "")
      setPrice(selectedCourse.price || "")
      setFrontendImage(selectedCourse.thumbnail || img)
      setIsPublished(selectedCourse?.isPublished)

    }

  }, [selectedCourse])

  /* Now Ab ham edit wala ko fetch krange jisske ki ham edit kr sakha ... */
  const handleEditCourse = async () => {

    /* Ager data nhi aaya tho serLoading ko true krna hoga ... */
    setLoading(true)

    /* Image ko ham ek form ma push kr saktha hai ... */
    const formData = new FormData()
    formData.append("title", title)
    formData.append("subTitle", subTitle)
    formData.append("description", description)
    formData.append("category", category)
   if (level !== "") {
    formData.append("level", level)
}
    formData.append("price", price)
    formData.append("thumbnail", backendImage)
    formData.append("isPublished", isPublished)

    try {
      const result = await axios.post(serverUrl + `/api/course/editcourse/${courseId}`, formData, { withCredentials: true })
      /* withCredentials eske spelling mistake kr di thi mena ... */
      console.log(result.data)
  /* YE NICHE WALA PART MUJHE SAMAJ NHI AAYA (START) */  /* part one 11.15 Minutes se start ahi ye ....  */
  /* esse hoga kya ki hama baar baar refresh nhi krna padega  ... */ 
  
  const updateData = result.data;
if (updateData.isPublished) {
  const updateCourses = courseData.map(c => c._id === courseId ? updateData : c);

  if (!courseData.some(c => c._id === courseId)) {
    updateCourses.push(updateData);
  }
  dispatch(setcourseData(updateCourses))
}
else{
const filterCourses = courseData.filter(c => c._id !== courseId)
dispatch(setcourseData(filterCourses))

}



/* (END) */


      setLoading(false)
      navigate("courses")
      toast.success("Course Updated Successfully ... ")
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error(error.response.data.message)
    }
  }

  const handleRemoveCourse = async () => {
    setLoading(true)
    try {
      const result = await axios.delete(serverUrl + `/api/course/remove/${courseId}`, { withCredentials: true })
      console.log(result.data)
      /* hama yeha Course data ko filter krwana wala hai ... */
      /* Hama un courses ko filter krana hai jinki id samr na ho un courses ke jo ki selected ma hai ... */
      /* courseData ma bht sare course ka array hai ... */
      const filterCourse = courseData.filter(c=>c._id!==courseId)
      dispatch(setcourseData(filterCourse))


      toast.success("Course Removed Successfully")
      navigate("/courses")
      setLoading(false)

    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
      setLoading(false)
    }
  }




  /* Now We will Create a UseEffect  ... */
  /* USeEffect ===== > use ==>>> 
  Example 1: Component load hote hi kaam
  Example 2: API call 
    useEffect(() => {
    fetchJobs();
}, []);

*/

  /* Dependency array ka main concept
  agar dependency array empty hai tho hr baar render hoga and ager dependency array hai tho jb vo array change hoga bs tb hi render hoga ... */




  return (

    <div className='max-w-5xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-lg'>
      {/* top bar */}
      <div className="flex items-center justify-center gap-[20px] md:justify-between flex-col md:flex-row mb-6  relative ">
        <FaArrowCircleLeft onClick={() => navigate("/courses")}
          className='top-[-20%] md:top-[20%] absolute left-[0] md:left-[2%] w-[22px] h-[22px] cursor-pointer'
        />

        <h2 className='text-2xl font-semibold md:pl-[60px]' > Add Details Regarding to the Course ... </h2>
        <div className='space-x-2 space-y-2'  >
          <button onClick={()=>navigate(`/createlecture/${selectedCourse?._id}`)} className='bg-black text-white px-4 py-2 rounded-md cursor-pointer   '  >
            Go to the Lecture Page
          </button>
        </div>

      </div>


      {/* form details */}
      <div className='bg-gray-50 p-6 rounded-md' >
        <h2 className='text-lg font-medium mb-4'  >  Basic Course Information ...  </h2>
        <div className='flex  gap-2'  >
          {isPublished ? <button onClick={() => setIsPublished(prev => !prev)} className='space-x-2 space-y-2 bg-green-600 text-white border border-amber-100 rounded px-2 py-3 cursor-pointer ' > Click To Publish </button> :
            <button onClick={() => setIsPublished(prev => !prev)} className='space-x-2 space-y-2 bg-red-600 text-white border border-amber-100 rounded px-2 py-3 cursor-pointer ' > Click To UnPublish </button>}
          <button onClick={handleRemoveCourse} className='bg-red-600 text-white px-4 py-2 rounded-md cursor-pointer  ' > Remove Course </button>
        </div>

        <form action="" onSubmit={(e) => e.preventDefault()} >
          <div>
            <label htmlFor="title" className='block text-sm font-medium text-gray-700 mb-1'  >Title
              <input onChange={(e) => setTitle(e.target.value)} value={title} id='title' type="text" className='w-full  border px-4 py-2  rounded-md' placeholder='Enter the Title ' />
            </label>
          </div>

          <div>
            <label htmlFor="subtitle" className='block text-sm font-medium text-gray-700 mb-1'  >SubTitle
              <input onChange={(e) => setSubTitle(e.target.value)} value={subTitle} id='subtitle' type="text" className='w-full  border px-4 py-2  rounded-md' placeholder='Enter the SubTitle ' />
            </label>
          </div>

          <div>
            <label htmlFor="desc" className='block text-sm font-medium text-gray-700 mb-1'  >Description
              {/* resize-none => esse text Area jo user upate nhi kr saktha ... */}
              <textarea onChange={(e) => setDescription(e.target.value)} value={description} id='desc' type="text" className='w-full  border px-4 py-2 h-24 resize-none  rounded-md' placeholder='Enter the Description ' />
            </label>
          </div>

          <div className='flex flex-col sm:flex-row sm:space-x-4 sapce-y-4 sm:space-y-0'  >
            {/* Category  */}
            <div className='flex-1'  >
              <label htmlFor="category" className='block text-sm font-medium text-gray-700 mb-1 '  >Course Category</label>
              <select onChange={(e) => setCategory(e.target.value)} value={category} className='w-fill border px-4 py-2 rounded-md bg-white ' name="" id="category">
                <option value="">Select Category</option>
                <option value="App Development">App Development </option>
                <option value="Ai/Ml">Ai/Ml</option>
                <option value="Ai Tools ">Ai Tools </option>
                <option value="Data Science">Data Science </option>
                <option value=" Data Analytics"> Data Analytics </option>
                <option value="UI/UX Design">UI/UX Design  </option>
                <option value="Web Development"> Web Development </option>
                <option value="Others"> Others  </option>
              </select>
            </div>
            {/* Level  */}
            {/* Level */}
<div className='flex-1'>
    <label
        htmlFor="level"
        className='block text-sm font-medium text-gray-700 mb-1'
    >
        Course Level
    </label>

    <select
        onChange={(e) => setLevel(e.target.value)}
        value={level}
        className='w-fill border px-4 py-2 rounded-md bg-white'
        id="level"
    >
        <option value="">Select Level</option>

        <option value="Beginner">Beginner</option>

        <option value="Intermediate">Intermediate</option>

        <option value="Advance">Advance</option>
    </select>
</div>




          </div>

          {/* image Label  */}
          <div>
            <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1 ' >Course Thumbnail</label>
            {/* Yeha ma reference ka use krna wala hu ... */}
            {/* accept='image/*   this is important ki ham yeha bs images ko hi lenge ... */}
            <input onChange={handleThumbnail} type="file" hidden ref={thumb} accept='image/*' />

          </div>

          {/* image Thumbnail */}

          <div className='relative w-[300px] h-[170px]' >
            {/*   onClick={() =>thumb.current.click()   ======================>>>>>>>>>>>>>>>> 
            esse kya hoga ki jb bhi ma image pe click kruga tho tho onclick ki help se vo ref wala pe click ho jayega Automatically... */}

            <img src={frontendImage} alt="" onClick={() => thumb.current.click()} className='border-1 w-[100%] h-[100%] cursor-pointer  border-black  rounded-[5px] ' />
            <FaEdit className='absolute top-1 left-70 cursor-pointer  ' onClick={() => thumb.current.click()} />
          </div>


          <div className='flex  items-center justify-start gap-[15px]' >
            <button onClick={() => navigate("/courses")} className='bg-white text-balck border-2 border-gray-600 p-2  mt-2 rounded-lg font-semibold hover:border-red-900 hover:text-white hover:bg-red-600 cursor-pointer   ' >Cancel</button>
            <button onClick={handleEditCourse} className='bg-white text-balck border-2 border-gray-600 p-2  mt-2 rounded-lg font-semibold hover:border-green-900 hover:text-white hover:bg-green-600 cursor-pointer   ' >{loading ? <ClipLoader size={30} color='white' /> : "Save"}</button>
          </div>

        </form>


      </div>
    </div>

  )
}

export default EditCourses