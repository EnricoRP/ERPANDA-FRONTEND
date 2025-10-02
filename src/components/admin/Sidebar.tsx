"use client";

import { adminSideBarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { ChevronLeft, ChevronRight, Menu } from "lucide-react"; // Ikon untuk membuka sidebar di mobile

// Komponen Sidebar Navigasi - Berisi logika untuk link dan tampilan
const SidebarNavLinks = ({ isCollapsed = false }) => {
  const pathname = usePathname();

  return (
    <div className="mt-6 flex flex-col max-md:gap-1">
      {adminSideBarLinks.map((link) => {
        const isSelected =
          (link.route !== "/admin" &&
            pathname.includes(link.route) &&
            link.route.length > 1) ||
          pathname === link.route;

        return (
          <Link href={link.route} key={link.route}>
            <div
              className={cn(
                "flex flex-row items-center w-full gap-2 rounded-lg py-3.5",
                isCollapsed ? "justify-center px-0" : "px-5", // Penyesuaian padding berdasarkan isCollapsed
                isSelected && "bg-primary shadow-sm"
              )}
            >
              {/* Ikon */}
              <div
                className={cn(
                  "relative size-5",
                  isCollapsed ? "mx-auto" : "ml-0"
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
            </div>
          </Link>
        );
      })}
    </div>
  );
};

const Sidebar = () => {
  // Status untuk mengelola apakah sidebar sedang dalam mode ciut (collapsed)
  // Default: false (terbuka)
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Fungsi untuk membalikkan status ciut
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    // Struktur utama Sidebar, lebarnya diatur berdasarkan state isCollapsed
    <>
      <aside
        className={cn(
          "sticky left-0 top-0 flex h-dvh flex-col justify-between bg-white pb-5 pt-10 transition-all duration-300",
          isCollapsed ? "w-[70px] px-2" : "w-[250px] px-5", // Ganti w-auto dengan lebar tetap
          "max-lg:hidden" // Sembunyikan sepenuhnya di layar kecil (mobile)
        )}
      >
        {/* Tombol Toggle Collapse (Hanya di desktop) */}
        <div>
          <div
            className={cn(
              "flex flex-row items-center gap-2 border-b border-dashed border-primary/40 pb-2",
              isCollapsed ? "justify-center" : "justify-start"
            )}
          >
            <Image
              src={
                isCollapsed
                  ? "/logo-sidebar-close.svg"
                  : "/logo-sidebar-open.svg"
              }
              alt="logo"
              height={isCollapsed ? 50 : 160}
              width={isCollapsed ? 50 : 160}
              className={cn(
                isCollapsed ? "max-w-12 h-auto" : "max-w-full h-auto"
              )}
            />
            {/* Tombol Toggle (hanya muncul kalau sidebar expanded) */}
            {!isCollapsed && (
              <button
                onClick={toggleCollapse}
                className="rounded-md p-2 hover:bg-primary/10"
                title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              >
                <ChevronLeft />
              </button>
            )}

            {/* Kalau sidebar collapsed → tampilkan tombol kecil di bawah logo */}
            {isCollapsed && (
              <button
                onClick={toggleCollapse}
                className="absolute top-11 right-[-10px] rounded-full bg-primary text-white p-1 shadow-md"
                title="Expand Sidebar"
              >
                <ChevronRight className="size-3.5" />
              </button>
            )}
          </div>

          {/* Navigation Links */}
          <SidebarNavLinks isCollapsed={isCollapsed} />
        </div>

        {/* User Info Section */}
        <div
          className={cn(
            "my-8 flex w-full flex-row gap-2 rounded-full border border-light-400 px-2 py-2 shadow-sm",
            isCollapsed ? "justify-center" : "px-6" // Penyesuaian padding
          )}
        >
          <Avatar>
            <AvatarFallback className="flex h-full w-full items-center justify-center rounded-full bg-amber-100">
              {"EN"}
            </AvatarFallback>
          </Avatar>

          {/* Detail Pengguna - Sembunyikan jika sidebar ciut */}
          {!isCollapsed && (
            <div className="flex flex-col">
              <p className="font-semibold text-dark-200">{"Enrico Riski"}</p>
              <p className="text-xs text-light-500">
                {"EnricoRiskiP@Gmail.Com"}
              </p>
            </div>
          )}
        </div>
      </aside>
      {/* --- Mobile Sidebar/Drawer --- */}
      {/* Gunakan Drawer sebagai pengganti */}
      {/* sidebar tetap di layar kecil */}
      <>
        <div className="fixed top-0 left-0 p-4 lg:hidden z-20">
          <Drawer direction="left">
            {/* Trigger Drawer (misalnya, Hamburger Menu) */}
            <DrawerTrigger asChild>
              <button className="p-2 border rounded-md bg-white">
                <Menu className="size-6" />
              </button>
            </DrawerTrigger>
            {/* Konten Drawer (Sidebar Terbuka) */}
            <DrawerContent className="w-[80vw] h-full rounded-r-none border-r-0 fixed top-0 left-0">
              {/* Menggunakan konten sidebar terbuka */}
              <div className="flex h-full flex-col justify-between bg-white px-5 pb-5 pt-10">
                <div>
                  {/* Logo Mobile */}
                  <div className="flex flex-row items-center gap-2 border-b border-dashed border-primary/40 pb-2">
                    <Image
                      src="/logo-sidebar-open.svg"
                      alt="logo"
                      height={160}
                      width={160}
                      className="max-w-full h-auto "
                    />
                  </div>
                  {/* Navigasi Mobile */}
                  <SidebarNavLinks isCollapsed={false} />
                </div>
                {/* User Info Mobile */}
                <div className="my-8 flex w-full flex-row gap-2 rounded-full border border-light-400 px-6 py-2 shadow-sm">
                  <Avatar>
                    <AvatarFallback className="flex h-full w-full items-center justify-center rounded-full bg-amber-100">
                      {"EN"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col">
                    <p className="font-semibold text-dark-200">
                      {"Enrico Riski"}
                    </p>
                    <p className="text-xs text-light-500">
                      {"EnricoRiskiP@Gmail.Com"}
                    </p>
                  </div>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </>
    </>
  );
};

export default Sidebar;
