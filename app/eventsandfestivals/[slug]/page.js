import { events } from "@/initdb";

async function eventsDetailpage({ params }) {
  const eventsParams = await params;
  const eventsSlug = eventsParams.slug;
  const eventsItem = events.find(
    (eventsItem) => eventsItem.slug === eventsSlug
  );
  return (
    <article className="events-article">
      <header>
        <img
          src={`/images/events/${eventsItem.image}`}
          alt={eventsItem.title}></img>
        <h1>{eventsItem.title}</h1>
        <time dateTime={eventsItem.date}>{eventsItem.date}</time>
      </header>
      <p> {eventsItem.content}</p>
    </article>
  );
}

export default eventsDetailpage;
