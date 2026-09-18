import React from 'react';
import { MdCastForEducation } from 'react-icons/md';
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { MdOutlineAttachMoney } from "react-icons/md";
import { MdOutlineSupportAgent } from "react-icons/md";
import { RiUserCommunityFill } from "react-icons/ri";

function Logos() {


    /* Important CSS . */
    /* <div className="w-full">
→ Parent ki available width ka 100%.
<div className="w-[100vw]">
→ Browser viewport ki width ka 100%. */
    /* min-h-[90px] ==============>>>>>>>>>>>>>>>>> min-height means element ki height at least 90px hogi. */
    return (
        <div className='w-[100vw] min-h-[90px] flex items-center justify-center flex-wrap gap-4 md:mb-[50px]'>
            <div className='flex items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer text-[#03394b]'>
                <MdCastForEducation className='w-[35px] h-[35px] fill-[#03394b]' />
                20k+ online Courses
            </div>

            <div className='flex items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer text-[#03394b]'>
              
                <MdOutlineAccessTimeFilled className='w-[35px] h-[35px] fill-[#03394b]' />    LifeTime Access
            </div>

            <div className='flex items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer text-[#03394b]'>
                
                <MdOutlineAttachMoney className='w-[35px] h-[35px] fill-[#03394b]' />    Value For Money
            </div>

            <div className='flex items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer text-[#03394b]'>
                
                <MdOutlineSupportAgent className='w-[35px] h-[35px] fill-[#03394b]' />  LifeTime Support
            </div>

            <div className='flex items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer text-[#03394b]'>
                
                <RiUserCommunityFill className='w-[35px] h-[35px] fill-[#03394b]' />    Community Support
            </div>
        </div>
    );
}

export default Logos;
