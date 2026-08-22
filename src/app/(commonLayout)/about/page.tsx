"use client";

import { getBlogs } from "@/actions/blog.action";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const [data, setData] = useState();
  const [error, setError] = useState<{ message: string } | null>(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await getBlogs();

      setData(data);
      setError(error ?? null);
    })();
  }, []);

  return (
    <div>
      <h1>jkg jk df re iwut hdsd asl nmvx, iortyu tgbygv pqazml</h1>
    </div>
  )
}

//* For simulating load time
// await new Promise((resolve) => setTimeout(resolve, 3000));
//* For simulating error
// throw new Error("Something went wrong")
