import PaginationMenu from "./PaginationMenu";

function PaginationApp() {
  //   const handleChangePage = (
  //     event: React.MouseEvent<HTMLButtonElement> | null,
  //     newPage: number
  //   ) => {
  //     setPage(newPage);
  //   };

  //   const handleChangeRowsPerPage = (
  //     event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  //   ) => {
  //     setPage(parseInt(event.target.value, 10));
  //     setPerPage(parseInt(event.target.value, 10));
  //   };

  return <PaginationMenu />;
}

export default PaginationApp;
