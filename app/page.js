import Link from "next/link";
import classes from "./page.module.css";
import ImageSlideshow from "@/components/images/image-slideshow";
export default function Home() {
  return (
    <>
      <header className={classes.header}>
        <div className={classes.slideshow}>
          <ImageSlideshow></ImageSlideshow>
        </div>
        <div className={classes.slideshowoverlay}>
          <div className={classes.hero}>
            <h1>Discover delicious bites around the corner</h1>
            <p>Let&apos;s find you a table nearby</p>
          </div>
          <div className={classes.cta}>
            <Link href="/community">Join the community</Link>
            <Link href="/restaurants">Explore restaurants</Link>
          </div>
        </div>
      </header>
      <main className={classes.mainsection}>
        <section className={classes.section}>
          <h2>How it works</h2>
          <p>
            NextLevel Food is a platform for foodies to share their favorite
            recipes with the world. It&apos;s a place to discover new dishes,
            and to connect with other food lovers.
          </p>
          <p>
            NextLevel Food is a place to discover new dishes, and to connect
            with other food lovers.
          </p>
        </section>

        <section className={classes.section}>
          <h2>Why NextLevel Food?</h2>
          <p>
            NextLevel Food is a platform for foodies to share their favorite
            recipes with the world. It&apos;s a place to discover new dishes,
            and to connect with other food lovers.
          </p>
          <p>
            NextLevel Food is a place to discover new dishes, and to connect
            with other food lovers.
          </p>
        </section>
      </main>
    </>
  );
}
