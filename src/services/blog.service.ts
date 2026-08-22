import { env } from "@/env";

const API_URL = env.API_URL;

//* No Dynamic and No { catch: "no-store" } : SSG --> Static Page
//* { catch: "no-store" } : SSR --> Dynamic Page
//* next: { revalidate: 10 } : ISR --> Mix between static and dynamic

interface GetBlogsParams {
      isFeatured?: boolean;
      search?: string;
};
interface ServiceOptions {
      cache?: RequestCache;
      revalidate?: number;
};

export const blogService = {
      getBlogPosts: async (
            params?: GetBlogsParams,
            options?: ServiceOptions,
      ) => {
            try {
                  const url = new URL(`${API_URL}/posts`);

                  if (params) {
                        Object.entries(params).forEach(([key, value]) => {
                              if (value !== "" && value !== "undefined" && value !== null) {
                                    url.searchParams.append(key, value)
                              };
                        });
                  };

                  const config: RequestInit = {};

                  if (options?.cache) {
                        config.cache = options.cache;
                  };
                  if (options?.revalidate) {
                        config.next = { revalidate: options.revalidate }
                  };

                  const res = await fetch(url.toString(), config);
                  const data = await res.json();

                  if (data.success) {
                        return { data };
                  };

                  return { error: null };
            } catch (err) {
                  return { data: null, error: { message: "Something went wrong!" } }
            }
      },

      getBlogById: async (id: string) => {
            try {
                  const res = await fetch(`${API_URL}/posts/${id}`);
                  const data = await res.json();

                  return { data, error: null };
            } catch (err) {
                  return { data: null, error: { message: "Something went wrong!" } }
            }
      }
};