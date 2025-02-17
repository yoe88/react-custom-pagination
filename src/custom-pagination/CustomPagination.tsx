import type { PaginationProps } from "./interface";
import React from "react";

const CustomPagination: React.FC<PaginationProps> = ({ className, total, pageSize = 20, onChange, current, displayButton = 10, itemRender }) => {
  const totalPages = Math.ceil(total / pageSize);

  // 페이지 번호 계산
  let startPage = Math.max(1, current - Math.floor(displayButton / 2));
  let endPage = startPage + displayButton - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - displayButton + 1);
  }

  const pageNumbers = [];

  pageNumbers.push({
    type: "prev",
    title: "이전 페이지",
    page: current - 1,
    disabled: current <= 1,
    ariaLabel: "prev page",
  });

  // 첫 번째 페이지 추가 (중복 방지)
  if (startPage > 1) {
    pageNumbers.push({ type: "page", title: 1, page: 1, ariaLabel: "page 1" });
  }

  if (startPage > 2) {
    pageNumbers.push({
      type: "jump-prev",
      title: `이전 ${displayButton} 페이지`,
      page: Math.max(1, current - displayButton),
      ariaLabel: `prev ${displayButton} page`,
    });
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push({
      type: "page",
      title: i,
      page: i,
      active: current === i,
      ariaLabel: `page ${i}`,
    });
  }

  if (endPage < totalPages - 1) {
    pageNumbers.push({
      type: "jump-next",
      title: `다음 ${displayButton} 페이지`,
      page: Math.min(totalPages, current + displayButton),
      ariaLabel: `next ${displayButton} page`,
    });
  }

  // 마지막 페이지 추가 (중복 방지)
  if (endPage < totalPages) {
    pageNumbers.push({
      type: "page",
      title: totalPages,
      page: totalPages,
      ariaLabel: `page ${totalPages}`,
    });
  }

  pageNumbers.push({
    type: "next",
    title: "다음 페이지",
    page: current + 1,
    disabled: current >= totalPages,
    ariaLabel: "next 페이지",
  });

  return (
    <ul className={className} aria-label="page navigation">
      {pageNumbers.map((p) => {
        let element;

        switch (p.type) {
          case "page":
            element = (
              <a rel="nofollow" aria-current={p.active ? "page" : undefined} aria-label={p.ariaLabel}>
                {p.page}
              </a>
            );
            break;

          case "jump-prev":
          case "jump-next":
            element = (
              <button type="button" aria-label={p.ariaLabel}>
                ...
              </button>
            );
            break;

          case "prev":
          case "next":
            element = (
              <button type="button" aria-label={p.ariaLabel} disabled={p.disabled}>
                {p.type === "prev" ? "이전" : "다음"}
              </button>
            );
            break;

          default:
            return null;
        }

        const customElement = itemRender ? itemRender(p.page, p.type, element) : element;

        return (
          <li
            key={p.type === "page" ? `page-${p.page}` : p.type}
            title={String(p.title)}
            tabIndex={p.disabled ? undefined : 0}
            aria-disabled={p.disabled}
            onClick={() => !p.disabled && !p.active && onChange(p.page)}
          >
            {customElement}
          </li>
        );
      })}
    </ul>
  );
};

export default CustomPagination;
