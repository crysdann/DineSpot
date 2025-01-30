import Link from "next/link";
import Image from "next/image";

import classes from "./restaurant-item.module.css";

export default function RestaurantItem({
  name,
  slug,
  image,
  description,
  address,
}) {
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <Image
            src={image}
            alt={name || "Restaurant Image"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
        <div className={classes.headerText}>
          <p>{slug}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{description}</p>
        <p className={`${classes.summary} ${classes.address}`}>📍 {address}</p>
        <div className={classes.actions}>
          <Link href={`/restaurants/${slug}`}>Explore</Link>
        </div>
      </div>
    </article>
  );
}
