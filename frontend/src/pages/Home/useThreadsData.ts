import { API } from "@/lib/api";
import { ThreadPostType } from "@/types/app";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

const token = localStorage.getItem("token");

//  FETCH INFINITY THREADS
const fecthInfinityThreads = async () => {
  const response = await API.get(`threads/cache`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const useInfinityThreads = () => {
  return useInfiniteQuery({
    queryKey: ["threads-infinity"],
    queryFn: fecthInfinityThreads,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.data.length) {
        return pages.length + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    enabled: true,
  });
};

//  POST THREADS
const postThread = async (thread: ThreadPostType) => {
  return await API.post("threads", thread, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const usePostThread = (reset: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postThread,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["threads-infinity"],
      });
      reset();
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
