// src/components/Breadcrumbs.tsx
import React from "react";
import { Link } from "react-router-dom";

export interface BreadcrumbItem {
    label: string;
    to?: string;   // у последнего пункта (текущая страница) ссылки нет
}

interface Props {
    items: BreadcrumbItem[];
    className?: string;
}

export const Breadcrumbs: React.FC<Props> = ({ items, className = "" }) => (
    <nav aria-label="Хлебные крошки" className={`mb-6 text-sm text-gray-500 ${className}`}>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
            {items.map((item, i) => {
                const isLast = i === items.length - 1;

                return (
                    <li key={`${item.label}-${i}`} className="flex items-center gap-2 min-w-0">
                        {item.to && !isLast ? (
                            <Link to={item.to} className="hover:text-gray-700 transition-colors">
                                {item.label}
                            </Link>
                        ) : (
                            <span
                                aria-current={isLast ? "page" : undefined}
                                className="text-black truncate"
                            >
                                {item.label}
                            </span>
                        )}
                        {!isLast && <span aria-hidden="true">/</span>}
                    </li>
                );
            })}
        </ol>
    </nav>
);