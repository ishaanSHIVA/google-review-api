import Image from "next/image";

import debugImage from "../assets/debug.jpeg";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home(props) {
  const [reviews, setReviews] = useState();
  useEffect(() => {
    setReviews(props.reviews);
  }, [props]);

  return (
    <div>
      <div className="w-full h-full flex justify-center p-4">
        <Image src={debugImage} width={300} height={400} />
      </div>
      <div>
        <h1 className="mx-auto font-serif text-center text-sky-400 hover:text-sky-300">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.google.com/search?q=demo&stick=H4sIAAAAAAAAAONgU1I1qDC2NEgxtDQwT04ySEsySTG1MqgwMTQxtTQ1tkw1TDE1tkhMXMTKkpKamw8A1RfuOzAAAAA&hl=en&mat=CX1rQIhyBB60ElcBT5f1BupPNVF9XYK6W-okx23TSXzS9bC-eLl3JamK88sFlt9toPM2M-4-sKBAlS4in9tkHumJcsPQ9f50lSDGCaDNn2pB3fS3zmDAMfyxacGr0r0ALto&authuser=0"
          >
            DEMO GOOGLE BUSINESS PAGE
          </a>
        </h1>
        {/* Reviews!!! */}

        {/* [
  {
    author_name: 'Ishaan Shiva',
    author_url: 'https://www.google.com/maps/contrib/108261675470168399984/reviews',
    language: 'en',
    profile_photo_url: 'https://lh3.googleusercontent.com/a/AATXAJxAOYTzzRzxsU6QQ4K_kA2GaS4caDhWX86n1dpq=s128-c0x00000000-cc-rp-mo',
    rating: 5,
    relative_time_description: 'in the last week',
    text: 'Lovely experience!!!',
    time: 1656422716
  }
] */}

        {reviews &&
          reviews.map((review) => {
            console.log("State review ", review);
            return (
              <div
                key={review["text"]}
                className="border border-yellow-500 mx-auto max-w-xs"
              >
                <h2>{review["author_name"]}</h2>
                <a href={review["author_url"]}>{review["text"]}</a>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/place/details/json?placeid=${process.env.GOOGLE_MAPS_PLACE_ID}&key=${process.env.GOOGLE_MAPS_API_KEY}`
  );
  if (response.statusCode === 200) {
    console.log(response["data"]["result"]["reviews"]);
    return {
      props: {
        reviews: response["data"]["result"]["reviews"],
      },
    };
  }
  console.error("Error");
}
