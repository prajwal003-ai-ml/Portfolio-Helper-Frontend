'use client'
import api from '@/app/axios'
import LoadingComponent from '@/app/components/Loading'
import { DialogData, useDialogBox } from '@/app/contexts/useDialogBox'
import { useProjectData } from '@/app/contexts/useProjectsData'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { IoMdExit } from 'react-icons/io'
import { IoTrashBin } from 'react-icons/io5'
import { toast } from 'react-toastify'

const Body = () => {
  const isFetched = useProjectData(s => s.isFetched)
  const setFetched = useProjectData(s => s.setFetched)
  const data = useProjectData(s => s.projects)
  const setData = useProjectData(s => s.setProjects)

  const ReomoveData = useProjectData(s=>s.removeProject)

  const [loading, setLoading] = useState(true)

  const [DeleteLoading, setDeleteLoading] = useState(false)

  useEffect(() => {
    if (!isFetched) {
      api.get("/get-projects")
        .then((res) => {
          const fetchedData = res.data.data
          setFetched()
          setData(fetchedData)
        })
        .catch(() => {
          toast.error("Failed Loading")
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [])


  const DeleteProject = async (id:number)=>{

    if(DeleteLoading){
      toast.error('Some Thing is Being Deleted Wait')
      return
    }
    try {
      setDeleteLoading(true)

      await api.delete(`/delete-project/${id}`)

      toast.success('Deleted The Project')
      ReomoveData(id)


      
    } catch (error:any) {
      toast.error(error.response.data.message || error.message || "failed Deleting")
    }
    finally{
      setDeleteLoading(false)
    }
  }

  const ShowDialog = useDialogBox(s=>s.Show)

  const HandleDeleteRequest = (id:number)=>{
      const data:DialogData = {
        Accept:()=>{DeleteProject(id)},
        Reject() {
            
        },
        Description:"The Selected Project Will Be Deleted",
        Title:"Want To Delete Project?"

      }
      ShowDialog(data)

  }

  if (loading) return <LoadingComponent />

  return (
    <div>
      <div className="my-3 bg-[#ffffff05] rounded-xl p-4">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#222] text-left">
                <th className="p-3 text-sm font-semibold">S.N</th>
                <th className="p-3 text-sm font-semibold">Name</th>
                <th className="p-3 text-sm font-semibold">Image</th>
                <th className="p-3 text-sm font-semibold">Description</th>
                <th className="p-3 text-sm font-semibold">Live</th>
                <th className="p-3 text-sm font-semibold">Github</th>
                <th className="p-3 text-sm font-semibold text-center min-w-[8rem]">Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.length > 0 ? (
                data.map((itm: any, idx: number) => (
                  <tr
                    key={idx}
                    className="border-b border-[#333] hover:bg-[#ffffff08] transition-colors"
                  >
                    <td className="p-3 text-sm min-w-10">{idx + 1}</td>
                    <td className="p-3 text-sm min-w-36">{itm.name}</td>
                    <td className="p-3 text-sm min-w-36">
                      {itm.image ? (
                        <img
                          src={itm.image}
                          alt={itm.name}
                          className="min-w-20 h-20 object-cover rounded"
                        />
                      ) : (
                        <span className="text-gray-400 italic">No image</span>
                      )}
                    </td>
                    <td className="p-3 text-sm min-w-[15rem]">
                      {itm.description
                        ? itm.description.length > 60
                          ? itm.description.slice(0, 60) + "..."
                          : itm.description
                        : ""}
                    </td>
                    <td className="p-3 text-sm text-blue-500 hover:underline min-w-16">
                      <Link target='_blank' href={itm.live || "#"}>
                        Visit
                      </Link>
                    </td>
                    <td className="p-3 text-sm text-blue-500 hover:underline min-w-32">
                     <Link target='_blank' href={itm.github || "#"}>
                        Go-Github
                      </Link>
                    </td>
                    <td className="p-3 flex items-center h-24 justify-center gap-2">
                      <Link href={`/project/${itm.id}`}
                        className="flex items-center justify-center gap-1 my-auto px-3 py-1 text-xs font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg text-white transition"
                      >
                        <span className="hidden md:inline">Edit</span>
                        <IoMdExit size="1.2rem" />
                      </Link>
                      <button
                        onClick={()=>{HandleDeleteRequest(itm?.id)}}
                        className="flex items-center gap-1 px-3 my-auto py-1 text-xs font-semibold bg-red-500 hover:bg-red-600 rounded-lg text-white transition"
                      >
                        <span className="hidden md:inline">Remove</span>
                        <IoTrashBin size="1.2rem" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className='w-full'>
                  <td colSpan={5} className="p-4 text-center  text-gray-400 w-full">
                    No projects added yet
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
