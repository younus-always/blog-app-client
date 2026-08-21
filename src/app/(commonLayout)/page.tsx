import BlogCard from "@/components/modules/homepage/BlogCard";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";

export default async function Home() {
  const { data } = await blogService.getBlogService({
    isFeatured: false
  },
    {
      cache: "no-store"
    }
  );

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-3 gap-5 px-4">
      {data?.data?.map((post: BlogPost) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  )
}