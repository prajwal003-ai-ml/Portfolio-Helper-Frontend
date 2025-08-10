'use client'
import React, { useState } from 'react'
import { IoTrashBin } from 'react-icons/io5'

interface Data {
    UserName: string
    Password: string
}

const Body = () => {
    const [user, setUser] = useState<Data>({
        UserName: '',
        Password: ''
    })
    const [usersAll, setUsersAll] = useState<Data[]>([])

    const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUser(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const AddUser = () => {
        setUsersAll(prev => [...prev, user])
        setUser({ UserName: '', Password: '' }) // reset fields
    }

    function handleRemoveUser(idx: number) {
        const arr = usersAll.filter((itm, id) => idx !== id)

        setUsersAll(arr)
    }

    return (
        <div className='px-3'>
            <div className='bg-[#ffffff07] rounded-xl p-3 mt-3'>
                <div className='input'>
                    <label htmlFor="UserName">UserName:</label>
                    <input
                        value={user.UserName}
                        onChange={HandleChange}
                        name='UserName'
                        type="text"
                        id='UserName'
                        placeholder='Username Here'
                    />
                </div>
                <div className='input'>
                    <label htmlFor="Password">Password:</label>
                    <input
                        value={user.Password}
                        onChange={HandleChange}
                        name='Password'
                        type="password"
                        id='Password'
                        placeholder='Password Here'
                    />
                </div>

                <button
                    onClick={AddUser}
                    className='font-semibold text-sm p-3 rounded cursor-pointer w-full bg-[#000000b6] my-2'
                >
                    Add User
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
                            {usersAll?.length > 0 ? (
                                usersAll.map((itm, idx) => (
                                    <tr
                                        key={idx}
                                        className="border-b border-[#333] hover:bg-[#ffffff08] transition-colors"
                                    >
                                        <td className="p-3 text-sm">{idx + 1}</td>
                                        <td className="p-3 text-sm">{itm.UserName}</td>
                                        <td className="p-3 text-sm">{itm.Password}</td>
                                        <td className="p-3 flex justify-center">
                                            <button
                                                onClick={() => handleRemoveUser(idx)}
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

        </div>
    )
}

export default Body
