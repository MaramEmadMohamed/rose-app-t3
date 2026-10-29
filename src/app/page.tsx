"use client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationFirst,
  PaginationLast,
  PaginationEllipsis,
} from "@/components/ui/pagination";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
export default function Home() {
  return (
    <>
      {/* tabs  */}
      <div className="mx-auto my-5  max-w-141.5">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Active</TabsTrigger>
            <TabsTrigger value="analytics">Inactive</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      {/* pagination */}
      <div className="p-6 bg-amber-300">
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationFirst href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink href="#">10</PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLast href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      {/* toast  */}
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        {/* 1. زر الرسالة المعلوماتية */}
        <Button
          onClick={() => toast.info("Informative message")}
          variant="outline"
          className="rounded-xl"
        >
          عرض رسالة معلوماتية (Info)
        </Button>

        {/* 2. زر رسالة النجاح */}
        <Button
          onClick={() => toast.success("Successful operation")}
          variant="outline"
          className="rounded-xl border-emerald-300 text-emerald-700 hover:bg-emerald-50"
        >
          عرض رسالة نجاح (Success)
        </Button>

        {/* 3. زر رسالة الفشل */}
        <Button
          onClick={() => toast.error("Unsuccessful operation")}
          variant="outline"
          className="rounded-xl border-rose-300 text-rose-700 hover:bg-rose-50"
        >
          عرض رسالة فشل (Error)
        </Button>
      </div>
    </>
  );
}
