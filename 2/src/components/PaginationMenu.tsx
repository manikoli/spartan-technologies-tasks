import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TablePagination from "@mui/material/TablePagination";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useDebounce from "../utils/debounce";
import Post from "./Post";

function PaginationMenu(props: any): React.ReactElement {
  const location = useLocation();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const debouncedPage = useDebounce(page, 500);
  const debouncedPerPage = useDebounce(perPage, 500);

  const [data, setData] = useState({ posts: [{ title: "init" }] });

  useEffect(() => {
    callApi();
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pageParam = searchParams.get("page");
    const perPageParam = searchParams.get("per_page");

    if (pageParam) {
      setPage(Number(pageParam));
    }
    if (perPageParam) {
      setPerPage(Number(perPageParam));
    }

    callApi();
  }, [location.search]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", debouncedPage.toString());
    searchParams.set("per_page", debouncedPerPage.toString());

    navigate({ search: searchParams.toString() });
  }, [debouncedPage, debouncedPerPage, navigate]);

  const callApi = () => {
    fetch(
      `https://dummyjson.com/posts?limit=${perPage}&skip=${page}&select=title,reactions,userId`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to fetch data (status code ${response.status})`
          );
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => {
    setPage(page);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", String(debouncedPage));
    searchParams.set("per_page", String(debouncedPerPage));
    navigate({ search: searchParams.toString() });
  };

  const handlePerPageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const perPage = event.target.value;
    setPerPage(Number(perPage));
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", String(debouncedPage));
    searchParams.set("per_page", String(debouncedPerPage));
    navigate({ search: searchParams.toString() });
  };

  return (
    <div>
      <TablePagination
        style={{
          position: "sticky",
          top: 0,
          zIndex: 9999,
          backgroundColor: "white",
        }}
        component="div"
        count={100}
        page={page}
        rowsPerPage={perPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handlePerPageChange}
      />

      <Grid container spacing={2} mt={"20px"}>
        {data.posts.map((post) => (
          <Grid item xs={3}>
            <Post post={post}></Post>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default PaginationMenu;
