import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ProductList from "./ProductList";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

// 속한 팀 작품 목록 데이터
const teamProductInfoData = Array.from({ length: 220 }, (_, index) => ({
  productId: index + 1,
  productImg: `https://picsum.photos/${((index % 15) + 1) * 100}/300`,
  productName: `팀 싸피 생활 ${index + 1}`,
  // category: {
  //   categoryId: "1",
  //   categoryName: "웹툰",
  // },
  // genreList: [
  //   {
  //     genreId: "1",
  //     genreName: "SF",
  //   },
  //   {
  //     genreId: "2",
  //     genreName: "액션",
  //   },
  //   {
  //     genreId: "3",
  //     genreName: "드라마",
  //   },
  // ],
}));

// TODO : itemsPerPage 개수 screenWidth에 따라 동적으로 변경되도록 수정
function ProductListCard() {
  const itemsPerPage = 9;

  const totalItems = teamProductInfoData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevGroup = () => {
    if (currentPage > 10) {
      setCurrentPage(currentPage - 10);
    } else {
      setCurrentPage(1);
    }
  };

  const handleNextGroup = () => {
    if (currentPage + 10 <= totalPages) {
      setCurrentPage(currentPage + 10);
    } else {
      setCurrentPage(totalPages);
    }
  };

  const renderPagination = () => {
    const paginationButtons = [];
    const currentPageGroup = Math.ceil(currentPage / 10); // 현재 페이지가 속한 그룹
    const startPage = (currentPageGroup - 1) * 10 + 1; // 그룹의 첫 번째 페이지
    const endPage = Math.min(currentPageGroup * 10, totalPages); // 그룹의 마지막 페이지

    for (let i = startPage; i <= endPage; i++) {
      paginationButtons.push(
        <PaginationItem key={i}>
          <PaginationLink onClick={() => handlePageChange(i)} isActive={i === currentPage}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return paginationButtons;
  };

  useEffect(() => {
    console.log("render card");
  });

  return (
    // don't set width,height here(effect on teamworkspace)
    <div className="flex flex-col items-center justify-between h-full min-h-full mx-2 ">
      <Card className="flex flex-col justify-between w-full h-full border rounded shadow-md">
        {/* CardHeader  */}
        <CardHeader>
          <div className="flex items-center justify-between ">
            {/* // TODO: 워크스페이스 이름(팀/개인) */}
            <div className="text-2xl font-bold">{}</div>
            {/* // SearchBar */}
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search color="gray" />
              </div>
              <Input
                type="search"
                placeholder="작품을 검색해보세요"
                className="block w-full rounded-md border-0 py-1.5 pl-11 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col h-full">
          <div className="flex flex-col items-center justify-between h-full ">
            {/* 데이터 렌더링 */}
            <ProductList
              products={teamProductInfoData.slice(
                (currentPage - 1) * itemsPerPage,
                Math.min(currentPage * itemsPerPage, totalItems)
              )}
            />

            <div className="">
              {/* 페이지네이션 버튼들 */}
              <Pagination className="">
                <PaginationContent>
                  <PaginationItem className={Math.ceil(currentPage / 10) <= 1 ? "hidden" : ""}>
                    <PaginationPrevious
                      onClick={handlePrevGroup}
                      className="border-none shadow-none"
                    />
                  </PaginationItem>
                  {renderPagination()}
                  <PaginationItem
                    className={
                      Math.ceil(currentPage / 10) < Math.ceil(totalPages / 10) ? "" : "hidden"
                    }
                  >
                    <PaginationNext onClick={handleNextGroup} className="border-none shadow-none" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
              {/* <p className="m-2">
                Displaying items {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
              </p> */}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductListCard;