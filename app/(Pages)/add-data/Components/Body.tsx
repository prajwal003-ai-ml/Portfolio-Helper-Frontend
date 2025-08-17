'use client'

import api from '@/app/axios'
import LoadingComponent from '@/app/components/Loading'
import { useInformationStore } from '@/app/contexts/UseUserInfo'
import React, { useEffect, useRef, useState } from 'react'
import { IoAdd, IoDocument, IoImage, IoTrash } from 'react-icons/io5'
import { MdClear } from 'react-icons/md'
import { toast } from 'react-toastify'

import imageCompression from "browser-image-compression";

// Interface for form data
export interface Data {
    id?: number
    Name: string
    Title: string
    HomeImage: File | null
    AboutImage: File | null
    About: string
    Skills: string[]
    Contact: string
    Whatsapp: string
    Facebook: string
    Instagram: string
    Github: string
    Twitter: string
    LinkedIn: string
    Email: string
    Resume: File | null
}

const Body = () => {
    // Main form data state

    const [LoadingPage, setLoadingPage] = useState(true)

    const myData = useInformationStore(s => s.information)
    const [Data, setData] = useState<Data>({
        Name: myData?.name || "",
        Title: myData?.title || "",
        HomeImage: null,
        AboutImage: null,
        About: myData?.about || "",
        Skills: myData?.skills || [],
        Contact: myData?.contact || "",
        Whatsapp: myData?.whatsapp || "",
        Facebook: myData?.facebook || "",
        Instagram: myData?.instagram || "",
        Twitter: myData?.twitter || "",
        LinkedIn: myData?.linkedin || "",
        Email: myData?.email || "",
        Resume: null,
        Github: myData?.github || "",
    })

    // Preview images for Home & About
    const [Images, setImages] = useState({
        HomeImage: '',
        AboutImage: ''
    })

    // Temporary skill input
    const [Skill, setSkill] = useState('')
    const [Loading, setLoading] = useState(false)

    // Refs for file inputs
    const imgref = useRef<HTMLInputElement>(null) // For About
    const imgrefAbout = useRef<HTMLInputElement>(null) // For Home

    const ResumeRef = useRef<HTMLInputElement>(null) //for Resume

    // Handle text/number/email/textarea changes
    const HandleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setData(prev => ({ ...prev, [name]: value }))
    }

    const options = {
        maxSizeMB: 1,           // target max size in MB
        maxWidthOrHeight: 1080, // resize if larger than 1080px
        useWebWorker: true,     // for performance
    };

    // Handle adding image and generating preview
    const HandleAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null
        const { name } = e.target

        let link = ''
        if (file) link = URL.createObjectURL(file)

        if (!file) {
            return
        }

        const compressedFile = await imageCompression(file, options);


        setData(prev => ({ ...prev, [name]: compressedFile }))
        setImages(prev => ({ ...prev, [name]: link }))
    }

    // Remove selected image and reset input
    const HandleRemoveImage = (type: 'Home' | 'About') => {
        if (type === 'Home') {
            setData(prev => ({ ...prev, HomeImage: null }))
            setImages(prev => ({ ...prev, HomeImage: '' }))
            if (imgrefAbout.current) imgrefAbout.current.value = ''
        } else {
            setData(prev => ({ ...prev, AboutImage: null }))
            setImages(prev => ({ ...prev, AboutImage: '' }))
            if (imgref.current) imgref.current.value = ''
        }
    }

    // Add a skill
    const HandleAdd = (SkillName: string) => {
        if (!SkillName.trim()) return
        setData(prev => ({ ...prev, Skills: [...prev.Skills, SkillName] }))
        setSkill('')
    }

    // Remove a skill by index
    const RemoveSkill = (idx: number) => {
        setData(prev => ({
            ...prev,
            Skills: prev.Skills.filter((_, id) => id !== idx)
        }))
    }

    const ResumeAdder = (e: React.ChangeEvent<HTMLInputElement>) => {
        let file = null
        if (e.target.files) {
            file = e.target.files?.[0]
        }

        if (!file) {
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            toast.info('file should be less than 2mb')
            return;
        }
        setData(prev => ({
            ...prev,
            Resume: file

        }))
    }

    const ResumeRemover = () => {
        setData(prev => ({
            ...prev,
            Resume: null

        }))
        if (ResumeRef.current) {
            ResumeRef.current.value = ''
        }
    }

    //manage store of data 

    const isFetched = useInformationStore(s => s.isFetched)
    const SetFetched = useInformationStore(s => s.setIsFetched)
    const setDataInStore = useInformationStore(s => s.setInformation)

    const SubmitForm = async () => {
        if (Loading) return
        setLoading(true)

        try {
            const formData = new FormData()

            // Append non-file fields (lowercase keys)
            formData.append("name", Data.Name)
            formData.append("title", Data.Title)
            formData.append("about", Data.About)
            formData.append("contact", Data.Contact)
            formData.append("whatsapp", Data.Whatsapp)
            formData.append("facebook", Data.Facebook)
            formData.append("instagram", Data.Instagram)
            formData.append("github", Data.Github)
            formData.append("twitter", Data.Twitter)
            formData.append("linkedin", Data.LinkedIn)
            formData.append("email", Data.Email)

            // Append skills as JSON or array string
            formData.append("skills", JSON.stringify(Data.Skills))

            // Append files only if selected
            if (Data.HomeImage) formData.append("homeimage", Data.HomeImage)
            if (Data.AboutImage) formData.append("aboutimage", Data.AboutImage)
            if (Data.Resume) formData.append("resume", Data.Resume)

            const res = await api.post('/manage-my-data', formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })

            const dataNew = res.data.data

            setDataInStore(dataNew)

            toast.success("Yeahhh Added Succesfully There")

            setData({
                Name: myData?.name || "",
                Title: myData?.title || "",
                HomeImage: null,
                AboutImage: null,
                About: myData?.about || "",
                Skills: myData?.skills || [],
                Contact: myData?.contact || "",
                Whatsapp: myData?.whatsapp || "",
                Facebook: myData?.facebook || "",
                Instagram: myData?.instagram || "",
                Twitter: myData?.twitter || "",
                LinkedIn: myData?.linkedin || "",
                Email: myData?.email || "",
                Resume: null,
                Github: myData?.github || "",
            })

            setImages({ AboutImage: "", HomeImage: "" })

        } catch (err: any) {
            toast.error(err.response.data.message || err.message || 'Failed To Load')
        } finally {
            setLoading(false)
        }
    }



    useEffect(() => {
        if (isFetched) {
            setLoadingPage(false)
        } else {
            api.get('/get-my-data')
                .then(res => {
                    const dataOfAll = res.data.data

                    setDataInStore(dataOfAll)
                    SetFetched()
                    setData({
                        Name: dataOfAll?.name || "",
                        Title: dataOfAll?.title || "",
                        HomeImage: null,
                        AboutImage: null,
                        About: dataOfAll?.about || "",
                        Skills: dataOfAll?.skills || [],
                        Contact: dataOfAll?.contact || "",
                        Whatsapp: dataOfAll?.whatsapp || "",
                        Facebook: dataOfAll?.facebook || "",
                        Instagram: dataOfAll?.instagram || "",
                        Twitter: dataOfAll?.twitter || "",
                        LinkedIn: dataOfAll?.linkedin || "",
                        Email: dataOfAll?.email || "",
                        Resume: null,
                        Github: dataOfAll?.github || "",
                    })

                }).catch((err) => {
                    toast.info("Data Not Added Yet")
                })
                .finally(() => {
                    setLoadingPage(false)
                })
        }
    }, [])



    if (LoadingPage) return <LoadingComponent />


    return (
        <div className="p-2">
            {/* Name & Title */}
            <div className="flex flex-wrap gap-2">
                <div className="input flex-1">
                    <label htmlFor="Name">Your Name:</label>
                    <input
                        value={Data.Name}
                        onChange={HandleChange}
                        type="text"
                        id="Name"
                        name="Name"
                        placeholder="Enter Your Name"
                    />
                </div>
                <div className="input flex-1">
                    <label htmlFor="Title">Your Title:</label>
                    <input
                        value={Data.Title}
                        onChange={HandleChange}
                        type="text"
                        id="Title"
                        name="Title"
                        placeholder="Enter Your Title eg: Web Developer"
                    />
                </div>
            </div>

            {/* Home & About Images */}
            <div className="flex flex-wrap gap-3 py-2 items-center justify-between">
                {/* Home Image */}
                {Images.HomeImage ? (
                    <img
                        onClick={() => HandleRemoveImage('Home')}
                        src={Images.HomeImage}
                        alt="Home"
                        className="h-40 cursor-pointer flex-1 min-w-[19rem] rounded object-center object-cover"
                    />
                ) : (
                    <div className="input">
                        <label
                            htmlFor="Image"
                            className="border h-32 flex-1 min-w-[19rem] p-3 border-solid border-gray-800 rounded-xl gap-1 flex-col-reverse cursor-pointer flex justify-center items-center"
                        >
                            Select Home Image <IoImage size="2rem" />
                        </label>
                        <input
                            onChange={HandleAddImage}
                            ref={imgrefAbout}
                            className="hidden"
                            type="file"
                            id="Image"
                            name="HomeImage"
                            accept=".jpg, .png, .jpeg"
                        />
                    </div>
                )}

                {/* About Image */}
                {Images.AboutImage ? (
                    <img
                        onClick={() => HandleRemoveImage('About')}
                        src={Images.AboutImage}
                        alt="About"
                        className="h-40 cursor-pointer flex-1 min-w-[19rem] rounded object-center object-cover"
                    />
                ) : (
                    <div className="input">
                        <label
                            htmlFor="ImageAbout"
                            className="border h-32 flex-1 min-w-[19rem] p-3 border-solid border-gray-800 rounded-xl gap-1 flex-col-reverse cursor-pointer flex justify-center items-center"
                        >
                            Select About Image <IoImage size="2rem" />
                        </label>
                        <input
                            onChange={HandleAddImage}
                            ref={imgref}
                            className="hidden"
                            type="file"
                            id="ImageAbout"
                            name="AboutImage"
                            accept=".jpg, .png, .jpeg"
                        />
                    </div>
                )}
            </div>

            {/* About Section */}
            <div className="input">
                <label htmlFor="About">About Yourself:</label>
                <textarea
                    id="About"
                    name="About"
                    onChange={HandleChange}
                    placeholder="Enter About Yourself"
                    value={Data.About}
                />
            </div>

            {/* Skills Section */}
            <h2 className="mt-2 font-semibold text-lg text-gray-300">Skills:</h2>
            <div className="border rounded border-solid border-gray-700 p-2 mb-3">
                {/* Display Skills */}
                <div className="flex gap-3 py-2 flex-wrap">
                    {Data.Skills.map((itm, idx) => (
                        <div
                            key={idx}
                            className="flex gap-2 w-fit bg-[#ffffff11] py-1 px-3 rounded-lg"
                        >
                            <span>{itm}</span>
                            <MdClear
                                onClick={() => RemoveSkill(idx)}
                                size="1.3rem"
                                className="cursor-pointer"
                            />
                        </div>
                    ))}
                </div>

                {/* Add Skill */}
                <div className="border-t outline-none w-full p-2 border-solid border-gray-500 flex gap-2 justify-center items-center">
                    <input
                        onKeyDown={(e) => e.key === 'Enter' && HandleAdd(Skill)}
                        onChange={(e) => setSkill(e.target.value)}
                        type="text"
                        value={Skill}
                        className="outline-none flex-1"
                        placeholder="Add Skills and press Enter"
                    />
                    <IoAdd
                        onClick={() => HandleAdd(Skill)}
                        size="1.6rem"
                        className="cursor-pointer"
                    />
                </div>
            </div>

            {/* Add Resume  */}
            <div className='input'>
                {
                    Data.Resume ? <div onClick={ResumeRemover} className='flex justify-center items-center py-4 cursor-pointer flex-col gap-3 border-solid border border-gray-700 rounded '>
                        <IoTrash size={'3rem'} />
                        Remove {Data.Resume?.name}
                    </div> : <label htmlFor="Resume" className='flex justify-center items-center py-4 cursor-pointer flex-col gap-3 border-solid border border-gray-700 rounded '>
                        <IoDocument size={'3rem'} />
                        Add Resume(docx doc pdf)
                    </label>
                }
                <input ref={ResumeRef} type="file" className='hidden' id='Resume' onChange={ResumeAdder} accept='.docx ,.doc ,.pdf ' />
            </div>

            {/* Contact Info Fields */}
            <div className="input flex-1 my-2">
                <label htmlFor="Contact">Your Contact:</label>
                <input
                    value={Data.Contact}
                    onChange={HandleChange}
                    type="number"
                    id="Contact"
                    name="Contact"
                    placeholder="Enter Your Contact eg:98000000"
                />
            </div>
            <div className="input flex-1 my-2">
                <label htmlFor="Whatsapp">Your Whatsapp:</label>
                <input
                    value={Data.Whatsapp}
                    onChange={HandleChange}
                    type="number"
                    id="Whatsapp"
                    name="Whatsapp"
                    placeholder="Enter Your Whatsapp eg:980000000"
                />
            </div>
            <div className="input flex-1 my-2">
                <label htmlFor="Facebook">Your Facebook:</label>
                <input
                    value={Data.Facebook}
                    onChange={HandleChange}
                    type="text"
                    id="Facebook"
                    name="Facebook"
                    placeholder="Enter Your Facebook URL"
                />
            </div>
            <div className="input flex-1 my-2">
                <label htmlFor="Instagram">Your Instagram:</label>
                <input
                    value={Data.Instagram}
                    onChange={HandleChange}
                    type="text"
                    id="Instagram"
                    name="Instagram"
                    placeholder="Enter Your Instagram URL"
                />
            </div>
            <div className="input flex-1 my-2">
                <label htmlFor="Github">Your Github:</label>
                <input
                    value={Data.Github}
                    onChange={HandleChange}
                    type="text"
                    id="Github"
                    name="Github"
                    placeholder="Enter Your Github URL"
                />
            </div>
            <div className="input flex-1 my-2">
                <label htmlFor="LinkedIn">Your LinkedIn:</label>
                <input
                    value={Data.LinkedIn}
                    onChange={HandleChange}
                    type="text"
                    id="LinkedIn"
                    name="LinkedIn"
                    placeholder="Enter Your LinkedIn URL"
                />
            </div>
            <div className="input flex-1 my-2">
                <label htmlFor="Twitter">Your Twitter:</label>
                <input
                    value={Data.Twitter}
                    onChange={HandleChange}
                    type="text"
                    id="Twitter"
                    name="Twitter"
                    placeholder="Enter Your Twitter URL"
                />
            </div>
            <div className="input flex-1 my-2">
                <label htmlFor="Email">Your Email:</label>
                <input
                    value={Data.Email}
                    onChange={HandleChange}
                    type="email"
                    id="Email"
                    name="Email"
                    placeholder="Enter Your Email Address"
                />
            </div>

            <button onClick={SubmitForm} className='w-full py-2 rounded font-semibold text-sm cursor-pointer bg-[#ffffff18] border border-solid border-gray-800'>
                {Loading ? "Submiting..." : "Submit"}
            </button>
        </div>
    )
}

export default Body
