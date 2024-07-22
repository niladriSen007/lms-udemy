import { getCourseDetails } from "@/actions/actions";
import SectionDetails from "@/components/sections/SectionDetails";
import { prismaDb } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Resource } from "@prisma/client";
import { redirect } from "next/navigation";

const page = async ({
  params,
}: {
  params: { courseId: string; sectionId: string };
}) => {


  const { courseId, sectionId } = params;
  const { userId } = auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const course = await prismaDb.course.findUnique({
    where: {
      csId: params.courseId
    },
    include: {
      section: {
        where: {
          isPublished: true
        },
        orderBy: {
          position: 'asc'
        }
      }
    },

  })

  if (!course) {
    return redirect("/");
  }

  const section = await prismaDb.section.findUnique({
    where: {
      secId: sectionId,
      courseId,
      isPublished: true,
    },
  });

  if (!section) {
    return redirect(`/courses/${courseId}/overview`);
  }

  const purchase = await prismaDb.purchase.findUnique({
    where: {
      customerId_courseId: {
        customerId: userId,
        courseId
      }
    }
  })

  let muxData = null;
  let resources: Resource[] = [];

  if (section?.isFree || purchase) {
    muxData = await prismaDb.muxData.findUnique({
      where: {
        sectionId
      }
    })

    resources = await prismaDb.resource.findMany({
      where: {
        sectionId
      }
    })
  }

  const progress = await prismaDb.progress.findUnique({
    where: {
      studentId_sectionId: {
        studentId: userId,
        sectionId
      }
    }
  })

  return (
    <div>
      <SectionDetails
        course={course}
        section={section}
        muxData={muxData}
        resources={resources}
        purchase={purchase}
        progress={progress} />
    </div>
  )
}
export default page