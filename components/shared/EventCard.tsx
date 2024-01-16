import { IEvent } from "@/lib/database/models/event.model";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { DeleteConfirmation } from "./DeleteConfirmation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type EventCardProps = {
  event: IEvent;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
}

const EventCard = ({
  event,
  hasOrderLink,
  hidePrice
}: EventCardProps) => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  const idEventCreator = userId === event.organizer._id.toString();
  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Link 
        href={`/events/${event._id}`}
        style={{ backgroundImage: `url(${event.imageUrl})` }}
        className="flex-center flex-grow bg-grey-50 bg-cover bg-center text-grey-500"
      />
      {idEventCreator && !hidePrice && (
        <div className="absolute right-2 top-2 flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm transition-all">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Link href={`/events/${event._id}/update`}>
                  <Image 
                    src="/assets/icons/edit.svg"
                    width={20}
                    height={20}
                    alt="Edit"
                  />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <DeleteConfirmation eventId={event._id} />
        </div>
      )}
      {/* IS EVENT CREATOR... */} 
      <Link 
        href={`/events/${event._id}`}
        className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4"
      >
        {!hidePrice && (
          <div className="flex gap-2 ">
            <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-60">
              {event.isFree ? 'FREE' : `$${event.price}`}
            </span>
            <p className="p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1">
              {event.category.name}
            </p>
          </div>
        )}
        <p className="p-medium-16 md:p-medium-18 text-grey-500">
          {formatDateTime(event.startDateTime).dateTime}
        </p>
        <h3 className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">{event.title}</h3>
        <div className="flex-between w-full ">
          <p className="p-medium-14 md:p-medium-16 text-grey-600">
            {event.organizer.firstName} {event.organizer.lastName}
          </p>
          {hasOrderLink && (
            <Link href={`/orders?eventId=${event._id}`} className="flex gap-2">
              <p className="text-primary-500">Order Details</p>
              <Image 
                src="/assets/icons/arrow.svg"
                width={10}
                height={10}
                alt="Arrow"
              />
            </Link>
          )}
        </div>
      </Link>
    </div>
  )
};

export default EventCard;