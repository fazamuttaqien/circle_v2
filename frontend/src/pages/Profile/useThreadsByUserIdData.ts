import { API } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const token = localStorage.getItem("token");

const fetchDetailThreadByUserId = async () => {
  const response = await API.get(`threads/byUserId`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const useDetailThreadByUserId = () => {
  return useQuery({
    queryKey: ["detail-thread"],
    queryFn: () => fetchDetailThreadByUserId(),
    refetchOnWindowFocus: false,
    enabled: false,
  });
};
