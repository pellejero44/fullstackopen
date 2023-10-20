import { useState, useEffect } from "react";
import { RepositoryListData } from "../data/repositories";

const useRepositories = () => {
  const [repositories, setRepositories] = useState(null);

  useEffect(() => {
    fetchRepositories();
  }, []);

  const fetchRepositories = () => {
    setRepositories(RepositoryListData);
  };

  return { repositories };
};

export default useRepositories;
