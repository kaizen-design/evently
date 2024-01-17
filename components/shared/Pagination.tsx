"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

type PaginationProps = {
  page: number | string;
  totalPages: number;
  urlParamName?: string;
}

const Pagination = ({ page, totalPages, urlParamName }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  function onClick(btnType: string) {
    const pageValue = btnType === 'next' ? Number(page) + 1 : Number(page) - 1;
  }

  return (
    <div className="flex gap-2">
      <Button
        size="lg"
        variant="outline"
        className="w-[28px]"
        onClick={() => onClick('next')}
        disabled={Number(page) >= totalPages}
      >
        Next
      </Button>
    </div>
  )
};

export default Pagination;