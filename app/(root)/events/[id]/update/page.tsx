import EventForm from "@/components/shared/EventForm";
import { getEventById } from "@/lib/actions/event.actions";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";

export default async function UpdateEvent({ params: { id: eventId } }: SearchParamProps) {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const event = await getEventById(eventId);  
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h1 className="wrapper h3-bold text-center sm:text-left">Update Event</h1>
      </section>
      <div className="wrapper my-10">
        <EventForm userId={userId} type="Update" event={event} />
      </div>
    </>  
  )
}