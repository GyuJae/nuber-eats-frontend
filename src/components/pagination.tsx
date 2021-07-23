interface IPagination {
  totalPages: number;
  page: number;
  prevClick: React.MouseEventHandler<HTMLButtonElement>;
  nextClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Pagination: React.FC<IPagination> = ({
  totalPages,
  prevClick,
  nextClick,
  page,
}) => {
  return (
    <div className=" grid grid-cols-3 text-center max-w-md items-center mx-auto my-10">
      {page > 1 ? (
        <button
          className="focus:outline-none font-medium text-2xl"
          onClick={prevClick}
        >
          &larr;
        </button>
      ) : (
        <div></div>
      )}
      <span>
        {page} of {totalPages}
      </span>
      {page !== totalPages ? (
        <button
          className="focus:outline-none font-medium text-2xl"
          onClick={nextClick}
        >
          &rarr;
        </button>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Pagination;
