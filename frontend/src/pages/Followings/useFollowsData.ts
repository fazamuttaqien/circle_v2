import { API } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const token = localStorage.getItem("token");

//  FETCH INFINITY USERS
const fetchDetailUsersByUserId = async () => {
  const response = await API.get(`usersById`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const useDetailUsersByUserId = () => {
  return useQuery({
    queryKey: ["details-users"],
    queryFn: fetchDetailUsersByUserId,
    refetchOnWindowFocus: false,
  });
};
