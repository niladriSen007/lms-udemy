"use client"

import { ourFileRouter } from "@/app/api/uploadthing/core"
import {  UploadDropzone } from "@/lib/uploadthing"
import Image from "next/image"
import toast from "react-hot-toast"

interface ImageorFileUploadProps {
  endpoint: keyof typeof ourFileRouter
  onChange: (url?: string) => void
  value: string
  page: string
}

const ImageorFileUpload = ({
  endpoint,
  onChange,
  value,
  page,
}: ImageorFileUploadProps) => {
  return (
    <div className="flex  gap-2 flex-col">
       {page === "Edit Course" && value !== "" && (
        <Image
          src={value}
          alt="image"
          width={2500}
          height={2500}
          className="w-[500px] object-cover rounded-xl shadow-md"
        />
      )}

      {page === "Edit Section" && value !== "" && (
        <p className="text-sm font-medium">{value}</p>
      )}

      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url)
        }}
        onUploadError={(error: Error) => {
          toast.error(error.message)
        }}
        className="w-[340px]h-[200px] shadow-sm"
      />
    </div>
  )
}
export default ImageorFileUpload
