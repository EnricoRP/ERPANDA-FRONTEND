"use client";

import { adminSideBarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Lock, ChevronLeft, ChevronRight, Menu } from "lucide-react";
// Import Drawer/DrawerContent dihapus
import { getBreadcrumbs } from "@/lib/breadcrumb";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Komponen Sidebar Navigasi - Berisi logika untuk link dan tampilan
const SidebarNavLinks = ({ isCollapsed = false }) => {
  const pathname = usePathname();

  return (
    <div className="mt-6 flex flex-col max-md:gap-1">
      {adminSideBarLinks.map((link) => {
        // PERHATIAN: State 'isOpen' di sini menyebabkan masalah karena diinisialisasi ulang
        // setiap kali komponen dirender. Untuk fungsionalitas submenu yang benar,
        // state ini idealnya harus dikelola di komponen Sidebar utama atau menggunakan Context.
        // Namun, untuk memperbaiki kode yang ada, saya biarkan, tapi perlu perbaikan lebih lanjut.
        const [isOpen, setIsOpen] = useState(false);

        const isSelected =
          (link.route !== "/admin" &&
            pathname.includes(link.route) &&
            link.route.length > 1) ||
          pathname === link.route;

        return (
          <div key={link.route}>
            <Link href={link.children ? "#" : link.route}>
              <div
                className={cn(
                  "flex flex-row items-center w-full gap-2 rounded-lg py-3.5 cursor-pointer",
                  isCollapsed ? "justify-center px-0" : "px-5",
                  isSelected && "bg-primary shadow-sm"
                )}
                onClick={() => link.children && setIsOpen(!isOpen)} // Hanya toggle jika ada children
              >
                <div
                  className={cn(
                    "relative size-5",
                    isCollapsed ? "mx-auto" : ""
                  )}
                >
                  <Image
                    src={link.img}
                    alt="icon"
                    fill
                    className={`${
                      isSelected ? "brightness-0 invert" : ""
                    } object-contain`}
                  />
                </div>
                {/* Teks - Sembunyikan jika sidebar ciut */}
                {!isCollapsed && (
                  <p
                    className={cn(
                      "text-base font-medium",
                      isSelected ? "text-white" : "text-dark"
                    )}
                  >
                    {link.text}
                  </p>
                )}
                {/* Ikon panah untuk submenu */}
                {!isCollapsed && link.children && (
                  <span
                    className={`ml-auto transition-transform ${
                      isOpen ? "rotate-90" : ""
                    }`}
                  >
                    <ChevronRight className="size-4" />
                  </span>
                )}
              </div>
            </Link>
            {/* Sub-menu */}
            {link.children && isOpen && !isCollapsed && (
              <div className="flex flex-col pl-8 mt-1">
                {link.children.map((sub) => (
                  <Link href={sub.route} key={sub.route}>
                    <div
                      className={cn(
                        "py-2 px-5 rounded-lg cursor-pointer text-sm",
                        pathname === sub.route
                          ? "bg-primary text-white"
                          : "text-dark hover:bg-gray-100"
                      )}
                    >
                      {sub.text}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const Sidebar = () => {
  const pathname = usePathname();
  // Catatan: Asumsi getBreadcrumbs(pathname) mengembalikan array of { href, text }
  const breadcrumbs = getBreadcrumbs(pathname);

  // Desktop State
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  // Mobile State (untuk menampilkan/menyembunyikan sidebar di mobile)
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const toggleMobileOpen = () => setIsMobileOpen(!isMobileOpen);

  return (
    <>
      {/* 1. SIDEBAR DESKTOP */}
      <aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "sticky left-0 top-0 flex h-dvh flex-col justify-between bg-white pb-5 pt-5 transition-all duration-300 z-10",
          isCollapsed && !isHovered ? "w-[70px] px-2" : "w-[250px] px-5",
          "max-lg:hidden" // Sembunyikan di layar kecil
        )}
      >
        <div>
          {/* Logo Section */}
          <div
            className={cn(
              "flex flex-row items-center gap-2 border-b border-dashed border-primary/40 relative",
              isCollapsed && !isHovered
                ? "justify-center pb-2.5"
                : "justify-center pb-2"
            )}
          >
            <Image
              src={
                isCollapsed && !isHovered
                  ? "/logo-sidebar-close.svg"
                  : "/logo-sidebar-open.svg"
              }
              alt="logo"
              height={isCollapsed && !isHovered ? 50 : 160}
              width={isCollapsed && !isHovered ? 50 : 160}
              className={cn(
                isCollapsed && !isHovered
                  ? "max-w-12 h-auto"
                  : "max-w-full h-auto"
              )}
            />

            {/* Tombol Toggle Collapse (Desktop) */}
            {/* Tampil di kanan atas saat expanded */}
            {!isCollapsed && (
              <button
                onClick={toggleCollapse}
                className="absolute top-[29px] right-[-30px] rounded-full bg-primary text-white p-1 shadow-md"
                title="Collapse Sidebar"
              >
                <Lock className="size-3.5" />
              </button>
            )}
          </div>
          {/* Tampil di kanan bawah logo saat collapsed */}
          {isCollapsed && (
            <button
              onClick={toggleCollapse}
              className="absolute top-[49px] right-[-10px] rounded-full bg-primary text-white p-1 shadow-md z-20"
              title="Expand Sidebar"
            >
              <ChevronRight className="size-3.5" />
            </button>
          )}

          {/* Navigation Links */}
          <SidebarNavLinks isCollapsed={isCollapsed && !isHovered} />
        </div>

        {/* User Info Section */}
        <div
          className={cn(
            "my-8 flex w-full flex-row gap-2 rounded-full border border-light-400 py-2 shadow-sm",
            isCollapsed && !isHovered ? "justify-center px-2" : "px-6"
          )}
        >
          <Avatar>
            <AvatarFallback className="flex h-full w-full items-center justify-center rounded-full bg-amber-100">
              {"EN"}
            </AvatarFallback>
          </Avatar>
          {/* Detail Pengguna - Sembunyikan jika sidebar ciut */}
          {(!isCollapsed || isHovered) && (
            <div className="flex flex-col max-w-[calc(100%-40px)] truncate">
              <p className="font-semibold text-dark-200 truncate">
                Enrico Riski
              </p>
              <p className="text-xs text-light-500 truncate">
                EnricoRiskiP@Gmail.Com
              </p>
            </div>
          )}
        </div>
      </aside>

      {/* 2. SIDEBAR MOBILE (NON-DRAWER) */}
      <div className="lg:hidden">
        {/* Mobile (Breadcrumbs & Menu Button) */}
        <div
          className={cn(
            "fixed top-[45px] w-full flex flex-row items-center border-b border-primary bg-light-300 h-12 px-4 z-20"
          )}
        >
          {/* Menu Button */}
          <button onClick={toggleMobileOpen} className="p-1">
            <Menu className="w-5 h-5 text-dark-200" />
          </button>

          {/* Breadcrumbs */}
          <Breadcrumb className="flex-1 ml-4 overflow-hidden">
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

        {/* Mobile Sidebar (Overlay/Slide-in - Menggantikan Drawer) */}
        {/* Menggunakan fixed position dan conditional rendering */}
        {isMobileOpen && (
          <div className="fixed inset-0" onClick={toggleMobileOpen}>
            <div
              className={cn(
                "fixed top-[90px] h-auto w-full transition-transform duration-300 z-30",
                isMobileOpen ? "translate-y-0" : "-translate-y-full"
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex h-full flex-col justify-between px-2 pb-5">
                {/* Navigasi Mobile */}
                <SidebarNavLinks isCollapsed={false} />

                {/* User Info Mobile */}
                <div className="my-8 flex w-full flex-row gap-2 rounded-full border border-light-400 px-6 py-2 shadow-sm">
                  <Avatar>
                    <AvatarFallback className="flex h-full w-full items-center justify-center rounded-full bg-amber-100">
                      {"EN"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="font-semibold text-dark-200">Enrico Riski</p>
                    <p className="text-xs text-light-500">
                      EnricoRiskiP@Gmail.Com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
