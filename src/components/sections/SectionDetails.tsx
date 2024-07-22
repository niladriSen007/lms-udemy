"use client"
import { Course, MuxData, Progress, Purchase, Resource, Section } from "@prisma/client";
import axios from "axios";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import SectionMenu from "../layouts/SectionMenu";
import { Button } from "../ui/button";
import { File, Loader2, Lock } from "lucide-react";
import ReadText from "../custom/ReadText";
import MuxPlayer from "@mux/mux-player-react";
import Link from "next/link";
import ProgressButton from "./ProgressButton";

interface SectionsDetailsProps {
  course: Course & { section: Section[] };
  section: Section;
  purchase: Purchase | null;
  muxData: MuxData | null;
  resources: Resource[] | [];
  progress: Progress | null;
}

const SectionDetails = ({
  course,
  section,
  purchase,
  muxData,
  resources,
  progress,
}: SectionsDetailsProps) => {

  const [isLoading, setIsLoading] = useState(false);
  const isLocked = !purchase && !section.isFree;

  const buyCourse = async () => {
    setIsLoading(true)
    try {
      const response = await axios.post(`/api/course/${course?.csId}/checkout`);
      window.location.assign(response.data.url);
    } catch (error) {
      console.log("Failed to chechout course", error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="px-6 py-4 flex flex-col gap-5">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <h1 className="text-2xl font-bold max-md:mb-4">{section.title}</h1>

        <div className="flex gap-4">
        {/*   <SectionMenu course={course} /> */}
          {!purchase ? (
            <Button onClick={buyCourse} className="bg-gradient-to-r from-yellow-400 to-green-500 shadow-lg font-bold">
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <p>Buy this course</p>
              )}
            </Button>
          ) : (
            <ProgressButton
              courseId={course.csId}
              sectionId={section.secId}
              isCompleted={!!progress?.isCompleted}
            /> // !! converts falsy values to boolean false 

          )}
        </div>
      </div>

      <ReadText value={section.description!} />

      {isLocked ? (
        <div className="px-10 flex flex-col gap-5 items-center bg-[#FFF8EB]">
          <Lock className="h-8 w-8" />
          <p className="text-sm font-bold">
            Video for this section is locked!. Please buy the course to access
          </p>
        </div>
      ) : muxData?.playbackId ? (
        <MuxPlayer
          playbackId={muxData?.playbackId || ""}
          className="md:max-w-[900px]"
        />
      ) : <>No videos for this section</>}

      <div>
        <h2 className="text-xl font-bold mb-5">Resources</h2>
        {resources?.length > 0 ? resources.map((resource) => (
          <Link
            key={resource.resourceId}
            href={resource.fileUrl}
            target="_blank"
            className="flex items-center bg-[#FFF8EB] rounded-lg text-sm font-medium p-3"
          >
            <File className="h-4 w-4 mr-4" />
            {resource.name}
          </Link>
        )) : <>No resources for this section</>}
      </div>
    </div>
  )
}
export default SectionDetails