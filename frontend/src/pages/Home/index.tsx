import ThreadCard from "@/components/ThreadCard";
import ThreadFormComponent from "@/components/ThreadCard/ThreadFormComponent";
import { IThread } from "@/types/app";
import { Box, Typography } from "@mui/material";
import { useInfinityThreads } from "./useThreadsData";
import { useEffect } from "react";

const Home = () => {
  const { data: threads, refetch } = useInfinityThreads();
  useEffect(() => {
    refetch();
  }, []);

  return (
    <Box>
      <Typography fontSize={25} mt={2} ml={2} variant="h6">
        Home
      </Typography>
      <ThreadFormComponent />
      <Box>
        {threads &&
          threads.pages.map((group) => {
            return group.data.map((item: IThread) => (
              <ThreadCard key={item.Id} thread={item} />
            ));
          })}
      </Box>
    </Box>
  );
};

export default Home;
