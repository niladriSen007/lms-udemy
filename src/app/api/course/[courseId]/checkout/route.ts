import { prismaDb } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST (req : NextRequest, { params }: { params: { courseId: string } }){
  try {
    const user = await currentUser();

    if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const course = await prismaDb.course.findUnique({
      where: { csId: params.courseId, isPublished: true },
    });

    if (!course) {
      return new NextResponse("Course Not Found", { status: 404 });
    }

    

    const purchase = await prismaDb.purchase.findUnique({
      where:{
        customerId_courseId:{
          customerId: user?.id,
          courseId: course?.csId
        }
      }
    })

    /* console.log("Inside checkout",purchase) */

    if(purchase){
      return NextResponse.json({message : "Course already purchased"}, { status: 404 });
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: "cad",
          product_data: {
            name: course.title,
          },
          unit_amount: Math.round(course.price! * 100),
        },
      }
    ]

    let stripeCustomer = await prismaDb.stripeCustomer.findUnique({
      where: { customerId: user.id },
      select: { stripeCustomerId: true },
    });

    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
        email: user.emailAddresses[0].emailAddress,
      });

      stripeCustomer = await prismaDb.stripeCustomer.create({
        data: {
          customerId: user.id,
          stripeCustomerId: customer.id,
        },
      });
    }

    
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomer.stripeCustomerId,
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/courses/${course.csId}/overview?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/courses/${course.csId}/overview?canceled=true`,
      metadata: {
        courseId: course.csId,
        customerId: user.id,
      }
    });

    return NextResponse.json({ url: session.url })

  } catch (error:any) {
    return NextResponse.json({error : error.message}, {status: 500})
  }
}