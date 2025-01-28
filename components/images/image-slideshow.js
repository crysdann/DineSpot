"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import restaurantheroImage1 from "@/assets/restaurantheroImage1.jpg";
import restaurantheroImage2 from "@/assets/restaurantheroImage2.jpg";
import restaurantheroImage3 from "@/assets/restaurantheroImage3.jpg";
import restaurantheroImage4 from "@/assets/restaurantheroImage4.jpg";
import restaurantheroImage5 from "@/assets/restaurantheroImage5.jpg";
import restaurantheroImage6 from "@/assets/restaurantheroImage6.jpg";
import restaurantheroImage7 from "@/assets/restaurantheroImage7.jpg";
import classes from "./image-slideshow.module.css";

const images = [
  { image: restaurantheroImage1, alt: "restaurantheroImage1" },
  { image: restaurantheroImage2, alt: "restaurantheroImage2" },
  { image: restaurantheroImage3, alt: "restaurantheroImage3" },
  { image: restaurantheroImage4, alt: "restaurantheroImage4" },
  { image: restaurantheroImage5, alt: "restaurantheroImage5" },
  { image: restaurantheroImage6, alt: "restaurantheroImage6" },
  { image: restaurantheroImage7, alt: "restaurantheroImage7" },
];

export default function ImageSlideshow() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < images.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={classes.slideshow}>
      {images.map((image, index) => (
        <Image
          key={index}
          src={image.image}
          className={index === currentImageIndex ? classes.active : ""}
          alt={image.alt}
        />
      ))}
    </div>
  );
}
