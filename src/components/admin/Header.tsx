"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { usePathname } from "next/navigation";
import { getBreadcrumbs } from "@/lib/breadcrumb";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import React, { useRef } from "react";
import Search, { SearchHandle } from "./SearchPopup";
import { Search as SearchIcon } from "lucide-react";

const Header = () => {
  const pathname = usePathname();
  // Catatan: Asumsi getBreadcrumbs(pathname) mengembalikan array of { href, text }
  const breadcrumbs = getBreadcrumbs(pathname);

  const searchRef = useRef<SearchHandle>(null);

  return (
    <header
      className={cn(
        "flex lg:items-end items-start justify-between lg:flex-row flex-col gap-5 sm:mb-10 mb-5",
        "w-full fixed top-0 left-0 max-md:border-b max-md:border-primary max-md:z-30 max-md:py-2 shadow-md lg:static lg:shadow-none"
      )}
    >
      {/* Hanya muncul di mobile */}
      <div className="flex items-center justify-between lg:hidden w-full px-3">
        {/* Logo */}
        <Image
          src="/logo-sidebar-open.svg"
          alt="logo"
          height={100}
          width={100}
          className="h-auto"
        />

        {/* Icon Search */}
        <button
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-md"
          onClick={() => searchRef.current?.openPopup()}
        >
          <SearchIcon className="w-3 h-3" />
        </button>
      </div>

      {/* Judul & deskripsi (hanya muncul di desktop) */}
      <div className="hidden lg:flex lg:justify-between lg:items-center w-full">
        {/* Kiri */}
        <div>
          <h2 className="text-2xl font-semibold text-dark-400">Enrico</h2>
          <p className="text-base text-slate-500">
            Monitor all of your users and books here
          </p>
          {/* Breadcrumbs */}
          <Breadcrumb className="flex-1 overflow-hidden">
            <BreadcrumbList className="flex flex-nowrap overflow-x-auto whitespace-nowrap">
              {breadcrumbs.map((b, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return (
                  <React.Fragment key={b.href}>
                    <BreadcrumbItem className="flex items-center">
                      {isLast ? (
                        <BreadcrumbPage className="text-primary text-sm font-semibold">
                          {b.text}
                        </BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink asChild>
                          <Link href={b.href} className="text-sm">
                            {b.text}
                          </Link>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {!isLast && <BreadcrumbSeparator />}
                  </React.Fragment>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Kanan */}
        <div className="relative w-1/3">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            <SearchIcon className="w-4 h-4" />
          </span>
          <Input
            type="text"
            placeholder="Search users, books by title, author, or genre."
            className="pl-10 w-full"
            onFocus={() => searchRef.current?.openPopup()} // buka popup saat fokus
          />

          {/* Komponen Search self-contained */}
          <Search ref={searchRef} />
        </div>
      </div>
    </header>
  );
};

export default Header;
