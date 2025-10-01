"use client";

import { adminSideBarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="sticky left-0 top-0 flex h-dvh flex-col justify-between bg-white px-5 pb-5 pt-10">
      <div>
        <div className="flex flex-row items-center gap-2 border-b border-dashed border-primary/40 pb-2 max-md:justify-center">
          <Image
            src="/logo.svg"
            alt="logo"
            height={100}
            width={100}
            className="max-w-full h-auto max-md:max-w-16"
          />
        </div>

        <div className="mt-6 flex flex-col gap-5">
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
                    "flex flex-row items-center w-full gap-2 rounded-lg px-5 py-3.5 max-md:justify-center",
                    isSelected && "bg-primary shadow-sm"
                  )}
                >
                  <div className="relative size-5">
                    <Image
                      src={link.img}
                      alt="icon"
                      fill
                      className={`${
                        isSelected ? "brightness-0 invert" : ""
                      }  object-contain`}
                    />
                  </div>

                  <p
                    className={`text-base font-medium max-md:hidden ${cn(
                      isSelected ? "text-white" : "text-dark"
                    )}`}
                  >
                    {link.text}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="my-8 flex w-full flex-row gap-2 rounded-full border border-light-400 px-6 py-2 shadow-sm max-md:px-2">
        <Avatar>
          <AvatarFallback className="flex h-full w-full items-center justify-center rounded-full bg-amber-100">
            {"EN"}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col max-md:hidden">
          <p className="font-semibold text-dark-200">{"Enrico Riski"}</p>
          <p className="text-xs text-light-500">{"EnricoRiskiP@Gmail.Com"}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
