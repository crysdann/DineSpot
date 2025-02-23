import Link from "next/link";
import { events } from "@/initdb.js";
function page() {
  return (
    <>
      <h1>Events and festivals page</h1>
      <ul className="events-list">
        {events.map((news) => (
          <li key={news.id}>
            <Link href={`/eventsandfestivals/${news.slug}`}>
              <img src={`/images/events/${news.image}`} alt={news.title}></img>
              <span>{news.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default page;
