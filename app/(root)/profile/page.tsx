import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { getEventsByUser } from "@/lib/actions/event.actions";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

export default async function Profile() {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const myEvents = await getEventsByUser({
    userId: userId,
    limit: 6,
    page: 1
  });

  return (
    <>
      {/* MY TICKETS */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h1 className="h3-bold text-center sm:text-left">My Tickets</h1>
          <Button asChild className="button hidden sm:flex" size="lg">
            <Link href="/#events">
              Explore More Events
            </Link>
          </Button>
        </div>
      </section>
      {/* <section className="wrapper my-8">
        <Collection 
          data={events?.data}
          emptyTitle="No event tickets purchased yet."
          emptyStateSubtext="No worries – plenty of exciting events to explore!"
          collectionType="My_Tickets"
          limit={3}
          page={1}
          urlParamName="ordersPage"
          totalPages={events?.totalPages}
        />
      </section> */}
      {/* MY EVENTS */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h1 className="h3-bold text-center sm:text-left">Events Organized</h1>
          <Button asChild className="button hidden sm:flex" size="lg">
            <Link href="/events/create">
              Create New Event
            </Link>
          </Button>
        </div>
      </section>
      <section className="wrapper my-8">
        <Collection 
          data={myEvents?.data}
          emptyTitle="No events have been created yet."
          emptyStateSubtext="Go create some now!"
          collectionType="Events_Organized"
          limit={6}
          page={1}
          totalPages={myEvents?.totalPages}
        />
      </section>
    </>
  )
}
