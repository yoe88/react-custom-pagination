import type React from "react";

export interface PaginationProps {
  className?: string; // ul className
  total: number; // 전체 아이템 개수
  pageSize?: number; // 페이지당 아이템 개수 (기본값: 20)
  onChange: (page: number) => void; // 페이지 변경 시 호출되는 함수
  current: number; // 현재 페이지 번호
  displayButton?: number; // 한 번에 표시할 페이지 버튼 개수 (기본값: 10)
  itemRender?: (page: number, type: "page" | "prev" | "next" | "jump-prev" | "jump-next", element: React.ReactNode) => React.ReactNode; // 사용자 정의 렌더링 함수
}
