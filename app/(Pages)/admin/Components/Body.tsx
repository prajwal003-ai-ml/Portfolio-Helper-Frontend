'use client'
import api from '@/app/axios'
import LoadingComponent from '@/app/components/Loading'
import { useApiUserData, UserData } from '@/app/contexts/UseAPIUSER'
import { useDialogBox } from '@/app/contexts/useDialogBox'
import { useUserdata } from '@/app/contexts/userdata'
import React, { useEffect, useState } from 'react'
import { IoTrashBin } from 'react-icons/io5'
import { toast } from 'react-toastify'

interface Data {
    username: string
    password: string
}
interface Data2 {
    username: string
    password: string
    id: number
}

const Body = () => {
    const [user, setUser] = useState<Data>({
        username: '',
        password: ''
    })



    const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUser(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const [Loading, setLoading] = useState(false)

    const [FetchLoading, setFetchLoading] = useState(true)

    const data = useApiUserData(s => s.data)
    const AddData = useApiUserData(s => s.addData)
    const InsertData = useApiUserData(s => s.InsertData)
    const removeData = useApiUserData(s => s.removeData)
    const fetched = useApiUserData(s => s.isFetched)
    const CheckFetched = useApiUserData(s => s.Fetched)

    const dataWeNeed = useUserdata(s=>s.user)

    useEffect(() => {
        if (!fetched) {
            api.get('/api-user/get-all')
                .then((res) => {
                    const data = res.data.data
                    CheckFetched()
                    InsertData(data)

                }).catch(err => {
                    console.log(err)
                }).finally(() => {
                    setFetchLoading(false)
                })
        } else {
            setFetchLoading(false)
        }
    }, [])

    const AddUser = async () => {

        if (Loading) {
            return
        }
        try {

            setLoading(true)

            if (!user.username || user.username.length < 4 || !user.password || user.password.length < 8) {
                toast.error("username should minimum be 4 & password is required minimum(8) ")
            }




            const data = await api.post('/api-user/create', {
                username: user.username.toLowerCase().trim().split(" ").join(''),
                password: user.password
            })

            setUser({ password: '', username: '' })

            const newuser: UserData = data.data.data



            AddData(newuser)


            toast.success('Added succesfully')
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error?.message || 'Failed adding')
        }
        finally {
            setLoading(false)
        }
    }

    const handleRemoveUser = async (id: Data2) => {
        try {
            await api.delete(`/api-user/destroy/${id.id}`)

            toast.success('Yes! Delted User')
            removeData(id.id)

        } catch (error) {
            toast.error('no! failed Delteting User')
        }
    }

    const showDialog = useDialogBox((s) => s.Show)

    const RemoveNotification = (itm: Data2) => {
        showDialog({ Accept: () => handleRemoveUser(itm), Description: `You are About to Remove  this ${itm.username} user are you sure`, Title: `Do you Want to delete ${itm.username}?`, Reject: () => { } })

    }

    if (FetchLoading) {
        return <LoadingComponent />
    }

    return (
        <div className='px-3'>
            <div className='bg-[#ffffff07] rounded-xl p-3 mt-3'>
                <div className='input'>
                    <label htmlFor="UserName">UserName:</label>
                    <input
                        value={user.username}
                        onChange={HandleChange}
                        name='username'
                        type="text"
                        id='UserName'
                        placeholder='Username Here'
                    />
                </div>
                <div className='input'>
                    <label htmlFor="Password">Password:</label>
                    <input
                        value={user.password}
                        onChange={HandleChange}
                        name='password'
                        type="password"
                        id='Password'
                        placeholder='Password Here'
                    />
                </div>

                <button
                    onClick={AddUser}
                    className='font-semibold text-sm p-3 rounded cursor-pointer w-full bg-[#000000b6] my-2'
                >
                    {Loading ? "Adding...." : "Add User"}
                </button>
            </div>
            <div className="my-3 bg-[#ffffff05] rounded-xl p-4">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-[#222] text-left">
                                <th className="p-3 text-sm font-semibold">S.N</th>
                                <th className="p-3 text-sm font-semibold">UserName</th>
                                <th className="p-3 text-sm font-semibold">Password</th>
                                <th className="p-3 text-sm font-semibold text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.length > 0 ? (
                                data?.map((itm, idx) => (
                                    <tr
                                        key={idx}
                                        className="border-b border-[#333] hover:bg-[#ffffff08] transition-colors"
                                    >
                                        <td className="p-3 text-sm">{idx + 1}</td>
                                        <td className="p-3 text-sm">{itm.username}</td>
                                        <td className="p-3 text-sm">{itm.password}</td>
                                        <td className="p-3 flex justify-center">
                                            <button
                                                onClick={() => {
                                                    RemoveNotification(itm)
                                                }}
                                                className="flex items-center gap-1 px-3 py-1 text-xs font-semibold bg-red-500 hover:bg-red-600 rounded-lg text-white transition"
                                            >
                                                <span className="hidden md:inline">Remove</span>
                                                <IoTrashBin size="1.2rem" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="p-4 text-center text-gray-400">
                                        No users added yet
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-[#ffffff0c] rounded-xl p-3 my-5 min-h-[12rem] text-white">
                <h2 className="text-lg font-semibold mb-3">How to call the API</h2>

                <p className="mb-2">🔹 Using <b>Fetch</b>:</p>
                <pre className="bg-black/40 p-2 rounded-md text-sm overflow-x-auto mb-4">
                    {`fetch("https://portfolio-helper.vercel.app/api/getmydata/<token>", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    username: "your_username",
    password: "your_password"
  })
})
  .then(res => res.json())
  .then(data => console.log(data));`}
                </pre>

                <p className="mb-2">🔹 Using <b>Axios</b>:</p>
                <pre className="bg-black/40 p-2 rounded-md text-sm overflow-x-auto">
                    {`import axios from "axios";

axios.post("https://portfolio-helper.vercel.app/api/getmydata/<token>", {
  username: "your_username",
  password: "your_password"
})
.then(res => {
  console.log(res.data);
});`}
                </pre>
                <div className='text-sm font-semibold text-orange-700'>
                    Token:
                </div>
                <div className='flex justify-between items-center flex-wrap'>
                        <span className='font-semibold text-xs'>
                        {dataWeNeed.Token}
                        </span>
                        <button onClick={()=>{
                            navigator.clipboard.writeText(dataWeNeed.Token)
                            .then(()=>{
                                toast('Copied In Clipboard')
                            }).catch(()=>{
                                toast.error(`sorry! Can you select and Copy Please`)
                            })
                        }} className='text-xs font-semibol text-orange-600 p-2 cursor-pointer bg-gray-900 rounded'>
                            Copy
                        </button>
                </div>
            </div>

        </div>
    )
}

export default Body
