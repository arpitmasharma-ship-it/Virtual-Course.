/* yeha ham course ko create krange ... */


import uploadOnCloudinary from "../config/cloudinary.js"
import Course from "../models/courseModel.js"
import Lecture from "../models/lectureModel.js"
import User from "../models/userModel.js"

export const createCourse = async (req, res) => {
    try {
        const { title, category } = req.body

        if (!title || !category) {
            return res.status(400).json({
                message: "Title Or Category is required... "
            })
        }


        const course = await Course.create({
            title,
            category,
            /* Important =>  isAuth se ma user ki id le luga and jo user vaha login hoga vo hi aapka creater hoga Simple ... */
            creator: req.userId
            /* jb ma create course ka route banau ga tb ma isAuth ko bich ma rekh du ga jise  mujhe  userId mil jayegi ... */


        })
        /* create hua hai isly 201  */
        /* yerha ham course ko response ma send kr raha hai ...  */

        return res.status(201).json(course)


    } catch (error) {
        return res.status(500).json({
            message: `CreateCourse  Error ${error}`
        })
    }
}



/* yeha hame ek Controller banana hai jisse ham ye dekh sakha ki hamra course Publish ha ki nhi ....... */

export const getPublished = async (req, res) => {
    try {

        /* yeha hama un courses ko find krna hai jinme isPubliahed : true hai ...  */
        const courses = await Course.find({ isPublished: true }).populate("lectures")
        /* populate() ka simple meaning hai:
Ek document ke andar jo ObjectId reference hai, us ID ki jagah us related document ka actual data lana. */
        if (!courses) {
            return res.status(400).json({
                message: "Courses is not Found ...  "
            })
        }
        /* ye likhana bhul gaya tha ... */
        return res.status(200).json(courses)
    } catch (error) {
        return res.status(500).json({
            message: `Courses Found isPublished   Error ${error}`
        })
    }
}



/* controller for the creatorCourses */

// export const getCreatorContents = async (req, res) => {
//     try {
//         /* yeha user id get krenga ... */
//         const userId = req.userId  /* isAuth se le raha hai ye ham ... */
//         /* Yeha ham course ko find krange userId ki help se ... */
//         const courses = await Course.find({ creator: userId })  /* creator ma curr user ki id hai vo wala ke courses niklana hai... */
//         if (!courses) {
//             return res.status(400).json({
//                 message: "Courses is not Found ...  "
//             })
//         }
//         return res.status(200).json(courses)
//     } catch (error) {
//         return res.status(500).json({
//             message: `Creator Courses Found Error ${error}`
//         })
//     }
// }


export const getCreatorContents = async (req, res) => {
    try {

        const userId = req.userId;

        console.log("GET CREATOR USER ID:", userId);

        const courses = await Course.find({
            creator: userId
        });

        console.log("GET CREATOR COURSES:", courses);

        return res.status(200).json(courses);

    } catch (error) {

        console.log("GET CREATOR ERROR:", error);

        return res.status(500).json({
            message: `Creator Courses Found Error: ${error.message}`
        });
    }
};



/* Now Mujhe Courses ko edit krana hai isliye mujhe ek controller banana hai ... */

// export const editCourse = async (req, res) => {
//     try {
//         /* JASA  hi ham course ko create krta hai tho ek id create ho jati hai and us id ko ham 
//         ab yeha lena wala hai ... */

//         /* course ko id hai params se lenga */
//         const { courseId } = req.params  /* use params ka use krke frontend ma ma course ki id get kr lu ga  ...  */
//         const { title, subTitle, description, category, level, isPublished, price } = req.body

//         /* ham thumbnail ko kasa lenga ... */

//         /* ERROR ==>>>
//         Tumhare controller me:
// thumbnail = await uploadOnCloudinary(req.file.path)
// uploadOnCloudinary() poora Cloudinary response object return kar raha hai.
// Matlab:
// thumbnail = {
//     asset_id: "...",
//     public_id: "...",
//     width: 2048,
//     height: 1335,
//     url: "...",
//     secure_url: "...",
//     ...
// }

// */
//         let thumbnail   /* iska mtlb  */
//         if (req.file) {   /* iska mtlb ye hai ki agar tumbnail hai tho bhi thik and nhi ahi tho bhi thik ...   */
//             /* cloudinary ma jb bhi ham kkuch upload krta hai tho hama ek ptah dena hota hai ... */
//             // thumbnail = await uploadOnCloudinary(req.file.path)  ==>>>> Error
//             const uploadResult = await uploadOnCloudinary(req.file.path)

//             thumbnail = uploadResult.secure_url


//             /* Yeha ham course ko find krange courseId sa ...  */

//         }
//         let course = await Course.findById(courseId)
//         if (!course) {
//             return res.status(400).json({
//                 message: "Course is not Found ...  "
//             })
//         }

//         /* agar hama course mil jata hai tho hama ye krna hai ... */
//         /* es updata data variable ma ham vo sare cheeaza le lenag jinhe hama update krana hai ... */

//        const updateData = {
//     title,
//     subTitle,
//     description,
//     category,
//     isPublished,
//     price
// }

// if (level !== undefined && level !== "") {
//     updateData.level = level
// }

// if (thumbnail) {
//     updateData.thumbnail = thumbnail
// }

//         /* and jb ham data ko upadte krwange waha ham esa likh lega ... */

//         /* Ab ham yaha course ko updat kranna hai ...  */

//         course = await Course.findByIdAndUpdate(courseId, updateData, { new: true })

//         /* ye course jo update hua hai usse bhi ham response ma lelega  */
//         return res.status(200).json(course)

//     } catch (error) {
//         return res.status(500).json({
//             message: ` Failed to Edit Course ... ${error} `
//         })
//     }
// }


export const editCourse = async (req, res) => {
    try {

        /* 
            Course ki ID params se lenge
        */
        const { courseId } = req.params;

        /*
            Frontend se aane wala data
        */
        const {
            title,
            subTitle,
            description,
            category,
            level,
            isPublished,
            price
        } = req.body;


        console.log("LEVEL FROM FRONTEND:", JSON.stringify(level));
        console.log("BODY:", req.body);

        /*
            Thumbnail ko handle karenge

            Agar new thumbnail upload hua hai
            to Cloudinary par upload hoga
        */
        let thumbnail;

        if (req.file) {

            /*
                Cloudinary par image upload
            */
            const uploadResult = await uploadOnCloudinary(req.file.path);

            /*
                Sirf secure_url database mein save karenge
            */
            thumbnail = uploadResult.secure_url;
        }


        /*
            Course ko courseId se find karenge
        */
        let course = await Course.findById(courseId);

        if (!course) {
            return res.status(400).json({
                message: "Course is not Found ..."
            });
        }


        /*
            Jo data update karna hai
        */
        const updateData = {
            title,
            subTitle,
            description,
            category,
            isPublished,
            price
        };


        /*
            IMPORTANT:

            Agar level empty nahi hai
            tabhi level update karenge.

            Agar level = ""
            hai to purana level database mein same rahega.
        */
        if (level !== undefined && level !== "") {
            updateData.level = level;
        }


        /*
            IMPORTANT:

            Agar new thumbnail upload hua hai
            tabhi thumbnail update karenge.

            Agar new image nahi hai
            to purani thumbnail same rahegi.
        */
        if (thumbnail) {
            updateData.thumbnail = thumbnail;
        }


        /*
            Course ko update karenge

            { new: true }
            => updated course return karega
        */
        course = await Course.findByIdAndUpdate(
            courseId,
            updateData,
            {
                new: true
            }
        );


        /*
            Updated course frontend ko bhejenge
        */
        return res.status(200).json(course);

    } catch (error) {

        console.log("EDIT COURSE ERROR:", error);

        return res.status(500).json({
            message: `Failed to Edit Course ... ${error.message}`
        });
    }
};


/* Course ko id se lena ka liye ...  */


export const getCourseById = async (req, res) => {
    try {
        const { courseId } = req.params

        let course = await Course.findById(courseId)
        if (!course) {
            return res.status(400).json({
                message: "Course is not Found ...  "
            })
        }

        return res.status(200).json(course)

    } catch (error) {
        return res.status(500).json({
            message: ` Failed to Get Course  By Id... ${error} `
        })
    }
}


/* Course ko remove krna ka liye ...  */


export const removeCourse = async (req, res) => {
    try {
        const { courseId } = req.params

        /* sabse phele hama course ko find krna hai ...  */

        let course = await Course.findById(courseId)
        if (!course) {
            return res.status(400).json({
                message: "Course is not Found ...  "
            })
        }

        /* yeha course ko ham delete krtna hai  */

        course = await Course.findByIdAndDelete(courseId, { new: true })

        /* ye course jo update hua hai usse bhi ham response ma lelega  */
        return res.status(200).json({
            message: "Course Removed Successfully ..."
        })


    } catch (error) {
        return res.status(500).json({
            message: ` Failed to Remove Course ... ${error} `
        })
    }
}




/* Lecture Controllers ... */

// export const createLecture = async (req , res) => {
//     try {
//     const {lectureTitle}  = req.body 
//     const {courseId} = req.params
//        if(!lectureTitle ||!courseId ){
//         return res.status(400).json({
//             message:"Lecture Title is Required ... "
//         })

//              /* courseId se COurse ko find krange  */
//          const course  = await Course.findById(courseId)

//           // Course nahi mila
//         if (!course) {
//             return res.status(404).json({
//                 message: "Course is not found ..."
//             })
//         }

//         /* agr exist krta hai tho create kra dega ... */
//         /* LectureTitle ke help se lecture create krwaya hai ... */
//          const lecture  = await Lecture.create({lectureTitle})


//           /* Agr mujhe course mil gaya tho mujhe course ke andr push krna hai lecture ko ... */
//             course.lectures.push(lecture._id)



//          /* course ke ander ham populate kra lenge hamera Lectures ko ...  */
//          /* usse ye hoga ki course ke andr leacture ki sare details aa jeyegi ... for ex paid or unpaid hai vo sb bhi ...  */

//        await  course.save()
//          await course.populate("lectures")

//         return res.status(201).json({
//             lecture , course
//         })


//        }
//     } catch (error) {
//          return res.status(500).json({
//             message: ` Failed to Create Lecture ... ${error} `
//         })
//     }
// }




/* new CreateLecture  */
export const createLecture = async (req, res) => {
    try {
        const { lectureTitle } = req.body
        const { courseId } = req.params



        if (!lectureTitle || !courseId) {
            return res.status(400).json({
                message: "Lecture Title is Required ..."
            })
        }

        const course = await Course.findById(courseId)

        if (!course) {
            return res.status(404).json({
                message: "Course is not found ..."
            })
        }

        const lecture = await Lecture.create({
            lectureTitle
        })


        /* This is important because   upper wala code ma jb ham Ye kr raha the na ki 
          await  course.save()   tho vo only lectur ko nhi sb kuch save kr raha tha hama bs 
          lecture ko save krna hai ...  */
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    lectures: lecture._id
                }
            },
            { new: true }
        )

        await updatedCourse.populate("lectures")

        return res.status(201).json({
            lecture,
            course: updatedCourse
        })

    } catch (error) {
        console.log("🔥 CREATE LECTURE ERROR:", error)

        return res.status(500).json({
            message: `Failed to Create Lecture ... ${error.message}`
        })
    }
}

/*  */

/*   Agr hama course ko get krna hai lecture ke through uske liye we are doing this ...   */
/* Ek course ke sare lectures ko get kr raha hai ...  */
/* Ek course ke sare lectures ko get kr raha hai ... */
export const getCourseLecture = async (req, res) => {
    try {
        const { courseId } = req.params;

        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                message: "Course is not found ..."
            });
        }

        /* Agar course mil jata hai to lectures ko populate karenge */
        await course.populate("lectures");

        return res.status(200).json(course);

    } catch (error) {
        console.log("GET COURSE LECTURE ERROR:", error);

        return res.status(500).json({
            message: `Failed to getCourseLecture Lecture ... ${error.message}`
        });
    }
};


/* yeha ham course Lecture ko edit krna wala hai ... */
export const editLecture = async (req, res) => {
    try {
        const { lectureId } = req.params;
        const { isPreviewFree, lectureTitle } = req.body;

        console.log("BODY:", req.body);
        console.log("isPreviewFree from frontend:", isPreviewFree);
        console.log("TYPE:", typeof isPreviewFree);

        const lecture = await Lecture.findById(lectureId);

        if (!lecture) {
            return res.status(404).json({
                message: "Lecture is not Found ..."
            });
        }

        if (req.file) {
            const uploadResult = await uploadOnCloudinary(req.file.path);
            lecture.videoUrl = uploadResult.secure_url;
        }

        if (lectureTitle) {
            lecture.lectureTitle = lectureTitle;
        }

        lecture.isPreviewFree = isPreviewFree === "true";

        console.log(
            "Before save:",
            lecture.isPreviewFree,
            typeof lecture.isPreviewFree
        );

        await lecture.save();

        console.log("After save:", lecture.isPreviewFree);

        return res.status(200).json(lecture);

    } catch (error) {
        console.log("🔥 EDIT LECTURE ERROR:", error);

        return res.status(500).json({
            message: `Failed to editLecture ... ${error.message}`
        });
    }
};










export const removeLecture = async (req, res) => {

    console.log("🔥🔥 NEW removeLecture CONTROLLER HIT 🔥🔥");
    console.log("lectureId:", req.params.lectureId);

    try {

        const { lectureId } = req.params;

        const lecture = await Lecture.findById(lectureId);

        console.log("LECTURE:", lecture);

        if (!lecture) {
            return res.status(404).json({
                message: "Lecture is not Found"
            });
        }

        const course = await Course.findOne({
            lectures: lectureId
        });

        console.log("COURSE:", course);

        if (!course) {
            return res.status(400).json({
                message: "Course is not Found"
            });
        }

        course.lectures.pull(lectureId);

        await course.save();

        await Lecture.findByIdAndDelete(lectureId);

        return res.status(200).json({
            message: "Lecture Removed Successfully"
        });

    } catch (error) {

        console.log("🔥 REMOVE LECTURE ERROR:", error);

        return res.status(500).json({
            message: error.message
        });
    }
};



/* Yeha Ham Creater ko Get Krna ka liya Controller banana Wala Hai ................. */



export const getCratorById = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User is not Found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `Failed to get Creator ${error}` });
  }
};
