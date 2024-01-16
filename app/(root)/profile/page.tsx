import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { getEventsByUser } from "@/lib/actions/event.actions";
import { getOrdersByUser } from "@/lib/actions/order.actions";
import { IOrder } from "@/lib/database/models/order.model";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default async function Profile({ searchParams }: SearchParamProps) {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const ordersPage = Number(searchParams?.orders) || 1;
  const eventsPage = Number(searchParams?.events) || 1;

  const orders = await getOrdersByUser({
    userId: userId,
    page: ordersPage
  });

  const orderedEvents = orders?.data.map((order: IOrder) => order.event || [])

  const eventsOrganized = await getEventsByUser({
    userId: userId,
    page: eventsPage
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
      <section className="wrapper my-8">
        {searchParams?.success && (
          <Alert className="mb-6">
            <AlertTitle>Great job!</AlertTitle>
            <AlertDescription>
              You have succesfully bought a new ticket.
            </AlertDescription>
          </Alert>
        )}
        <Collection 
          data={orderedEvents}
          emptyTitle="No event tickets purchased yet."
          emptyStateSubtext="No worries – plenty of exciting events to explore!"
          collectionType="My_Tickets"
          limit={3}
          page={ordersPage}
          totalPages={orders?.totalPages}
        />
      </section>
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
          data={eventsOrganized?.data}
          emptyTitle="No events have been created yet."
          emptyStateSubtext="Go create some now!"
          collectionType="Events_Organized"
          limit={3}
          page={eventsPage}
          totalPages={eventsOrganized?.totalPages}
        />
      </section>
    </>
  )
}
