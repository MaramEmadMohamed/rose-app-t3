"use client";
import { useState } from "react";
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination";

const totalPages = 10;

export function CustomPagination() {
  const [currentPage, setCurrentPage] = useState(1);

  const buttonClass =
    "h-12 min-w-12 rounded-xl border border-gray-200 bg-white px-3 text-lg font-medium text-gray-800 shadow-sm transition-colors hover:bg-gray-100 dark:border-zinc-700 dark:bg-zinc-700 dark:text-white dark:hover:bg-zinc-600";

  const activeClass =
    "border-[#58191f] bg-[#58191f] text-white hover:bg-[#58191f]/90 dark:border-[#ff9fba] dark:bg-[#ff9fba] dark:text-[#27272a] dark:hover:bg-[#ff9fba]/90";

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(totalPages, page)));
  };

  const visiblePages =
    currentPage <= 2
      ? [1, 2, 3]
      : currentPage >= totalPages - 1
        ? [totalPages - 2, totalPages - 1, totalPages]
        : [currentPage - 1, currentPage, currentPage + 1];

  return (
    <Pagination>
      <PaginationContent className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
        {/* First page */}
        <PaginationItem>
          <PaginationLink
            href="#"
            aria-label="First page"
            aria-disabled={currentPage === 1}
            onClick={(e) => {
              e.preventDefault();
              goToPage(1);
            }}
            className={`${buttonClass} ${
              currentPage === 1 ? "opacity-50" : ""
            }`}
          >
            <ChevronsLeft className="size-5" />
          </PaginationLink>
        </PaginationItem>

        {/* Previous page */}
        <PaginationItem>
          <PaginationLink
            href="#"
            aria-label="Previous page"
            onClick={(e) => {
              e.preventDefault();
              goToPage(currentPage - 1);
            }}
            className={buttonClass}
          >
            <ChevronLeft className="size-5" />
          </PaginationLink>
        </PaginationItem>

        {/* Page numbers */}
        {visiblePages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              isActive={currentPage === page}
              aria-label={`Page ${page}`}
              onClick={(e) => {
                e.preventDefault();
                goToPage(page);
              }}
              className={`${buttonClass} ${
                currentPage === page ? activeClass : ""
              }`}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Ellipsis */}
        {currentPage < totalPages - 2 && (
          <>
            <PaginationItem>
              <PaginationEllipsis className="size-10" />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink
                href="#"
                isActive={currentPage === totalPages}
                onClick={(e) => {
                  e.preventDefault();
                  goToPage(totalPages);
                }}
                className={`${buttonClass} ${
                  currentPage === totalPages ? activeClass : ""
                }`}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        {/* Next page */}
        <PaginationItem>
          <PaginationLink
            href="#"
            aria-label="Next page"
            onClick={(e) => {
              e.preventDefault();
              goToPage(currentPage + 1);
            }}
            className={buttonClass}
          >
            <ChevronRight className="size-5" />
          </PaginationLink>
        </PaginationItem>

        {/* Last page */}
        <PaginationItem>
          <PaginationLink
            href="#"
            aria-label="Last page"
            onClick={(e) => {
              e.preventDefault();
              goToPage(totalPages);
            }}
            className={buttonClass}
          >
            <ChevronsRight className="size-5" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
