'use client'

import api from "@/app/axios";
import LoadingComponent from "@/app/components/Loading";
import { useProjectData } from "@/app/contexts/useProjectsData";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { IoAdd, IoImage } from "react-icons/io5";
import { MdClear } from "react-icons/md";
import { toast } from "react-toastify";

interface ProjectData {
    Name: string;
    Image: File | null;
    Description: string;
    Reason: string;
    TechStack: string[];
    Github: string;
    Live: string;
    ShowAtHome: boolean;
}

export default function UpdateProject() {
    const [data, setData] = useState<ProjectData>({
        Name: "",
        Image: null,
        Description: "",
        Reason: "",
        TechStack: [],
        Github: "",
        Live: "",
        ShowAtHome: false
    });

    const [ImageLink, setImageLink] = useState('');
    const [TechName, setTechName] = useState('');
    const [Loading, setLoading] = useState(false);

    const imgref = useRef<HTMLInputElement>(null);

    const dataParam = useParams()

    const projectId = dataParam.id



    // fetch project details initially
    useEffect(() => {
        if (!projectId) return;
        api.get(`/get-project/${projectId}`)
            .then(res => {
                const project = res.data.data;
                console.log(project)
                setData({
                    Name: project.name,
                    Image: null,
                    Description: project.description,
                    Reason: project.reason,
                    TechStack: project.techStack || [],
                    Github: project.github,
                    Live: project.live,
                    ShowAtHome: project.isspecial??false
                });
                setImageLink(project.image); // image url
            })
            .catch(() => toast.error("Failed fetching project"));
    }, [projectId]);

    // handle text/textarea
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    // handle file
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            const temp = URL.createObjectURL(file);
            setImageLink(temp);
        }
        setData(prev => ({
            ...prev,
            Image: file,
        }));
    };

    const HandleRemoveImage = () => {
        setData(prev => ({ ...prev, Image: null }));
        setImageLink('');
        if (imgref.current) imgref.current.value = "";
    };

    const HandleAdd = (tech: string) => {
        setData(prev => ({
            ...prev,
            TechStack: [...prev.TechStack, tech]
        }));
        setTechName('');
    };

    const RemoveTech = (idx: number) => {
        setData(prev => ({
            ...prev,
            TechStack: prev.TechStack.filter((_, i) => i !== idx)
        }));
    };

    const FetchAgain = useProjectData(s=>s.FetchAgain)

    const HandleSubmit = async () => {
        if (Loading) return;
        try {
            setLoading(true);

            if (!data.Name || !data.Description) {
                throw new Error('Please fill required fields');
            }

            const formData = new FormData();
            formData.append("name", data.Name);
            formData.append("description", data.Description);
            formData.append("reason", data.Reason);
            formData.append("github", data.Github);
            formData.append("live", data.Live);
            formData.append("isspecial", String(data.ShowAtHome));
            formData.append("techstacks", JSON.stringify(data.TechStack));

            if (data.Image) {
                formData.append("image", data.Image);
            }

            const newData = await api.put(`/update-project/${projectId}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            FetchAgain()

            toast.success("Updated Successfully");
        } catch (error: any) {
            toast.error(error.message || error?.response?.data?.message || 'Failed updating');
        } finally {
            setLoading(false);
        }
    };

    if(Loading) return <LoadingComponent/>

    return (
        <div className="py-3 px-2">
            <div className="flex flex-wrap justify-between gap-3 md:pr-10">
                <div className="input flex-col items-start flex-1">
                    <label htmlFor="Name">Name:</label>
                    <input value={data?.Name??""} type="text" id="Name" name="Name" onChange={handleChange} placeholder="Enter Project Name" />
                </div>

                {ImageLink ? (
                    <img onClick={HandleRemoveImage} src={ImageLink} alt="error" className="h-28 cursor-pointer w-[14rem] rounded object-center object-cover" />
                ) : (
                    <div className="input">
                        <label htmlFor="Image" className="border p-3 border-solid border-gray-800 rounded-xl gap-1 flex-col-reverse cursor-pointer flex justify-center items-center">
                            Select Project Image <IoImage size={'2rem'} />
                        </label>
                        <input ref={imgref} className="hidden" type="file" id="Image" name="Image" accept=".jpg, .png ,.jpeg" onChange={handleFileChange} />
                    </div>
                )}
            </div>

            <div className="flex justify-between gap-3 flex-wrap">
                <div className="input mt-2 flex-1">
                    <label htmlFor="Github">Github:</label>
                    <input value={data?.Github?? ""} type="text" id="Github" name="Github" onChange={handleChange} placeholder="Enter Github Link" />
                </div>
                <div className="input mt-2 flex-1">
                    <label htmlFor="Live">Live:</label>
                    <input value={data?.Live??""} type="text" id="Live" name="Live" onChange={handleChange} placeholder="Enter Live Link" />
                </div>
            </div>

            <h2 className="mt-2 font-semibold text-lg text-gray-300">Techstack:</h2>
            <div className="border rounded border-solid border-gray-700 p-2 mb-3">
                <div className="flex gap-3 py-2 flex-wrap">
                    {data.TechStack?.map((itm, idx) => (
                        <div key={idx} className="flex gap-2 w-fit bg-[#ffffff11] py-1 px-3 rounded-lg ">
                            <span>{itm}</span>
                            <MdClear onClick={() => RemoveTech(idx)} size={'1.3rem'} className="cursor-pointer" />
                        </div>
                    ))}
                </div>
                <div className="border-t outline-none w-full p-2 border-solid border-gray-500 flex gap-2 justify-center items-center">
                    <input
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && TechName) HandleAdd(TechName);
                        }}
                        value={TechName}
                        onChange={(e) => setTechName(e.target.value)}
                        type="text"
                        className="outline-none flex-1"
                        placeholder="Add TechStack and Enter"
                    />
                    <IoAdd onClick={() => TechName && HandleAdd(TechName)} size={'1.6rem'} className="cursor-pointer" />
                </div>
            </div>

            <div className="input">
                <label htmlFor="Description">Description:</label>
                <textarea value={data?.Description??""} id="Description" name="Description" onChange={handleChange} placeholder="Enter Project Description" />
            </div>
            <div className="input">
                <label htmlFor="Reason">Reason:</label>
                <textarea value={data?.Reason??""} id="Reason" name="Reason" onChange={handleChange} placeholder="Reason Of Project" />
            </div>

            <div className="mt-2">
                <input type="checkbox" id="CheckBox" checked={data.ShowAtHome??false} onChange={() => {
                    setData(p => ({ ...p, ShowAtHome: !data.ShowAtHome }))
                }} /> 
                <label htmlFor="CheckBox"> Mark as Special</label>
            </div>

            <button onClick={HandleSubmit} className="p-3 my-4 w-full bg-[#ffffff10] cursor-pointer rounded-xl font-semibold text-sm">
                {Loading ? "Updating..." : 'Update Project'}
            </button>
        </div>
    );
}
