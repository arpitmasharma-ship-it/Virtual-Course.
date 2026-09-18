/* Hama yeha published Courses ko show krwana hai  ... */
import React from 'react'
import { CiStar } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';

const Card = ({ thumbnail, title, category, price, id }) => {
    const navigate = useNavigate()
    return (
        <div onClick={()=>navigate(`/viewcourse/${id}`)} className='max-w-sm w-full bg-white rounded-2xl overflow-hidden shadow-md 
 hover:shadow-lg transition-all duration-300 border border-gray-300 cursor-pointer'>
            <img src={thumbnail} alt="" className='w-full h-48 object-cover' />

            <div className='p-5 space-y-2'>
                <h2 className='text-lg font-semibold text-gray-900'>
                    {title}
                </h2>

                <span className='px-2 py-0.5 bg-gray-100 rounded-full text-gray-700 capitalize'>
                    {category}
                </span>

                <div className='flex  justify-between text-sm text-gray-600 mt-3 px-[10px]'>
                    <span>{price}</span>
                    <div className='flex gap-1 bg-green-200 rounded-md p-2 '>
                        <span>5</span>
                        <CiStar size={20} className='text-yellow-500 font-semibold text-xl ' />
                    </div>

                </div>
            </div>



        </div>

    )
}

export default Card
