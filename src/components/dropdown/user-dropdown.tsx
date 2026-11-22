"use client";

import { useTranslations } from "next-intl";
import {
  ChevronDown,
  LogOut,
  MapPinHouse,
  ScrollText,
  Settings,
  User,
} from "lucide-react";

import { Link } from "@/i18n/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const itemClass =
  "flex cursor-pointer items-center gap-3 rounded-none px-5 py-3 text-base text-foreground/80 [&_svg:not([class*='size-'])]:size-5";

type UserDropdownProps = {
  userName: string;
};

export function UserDropdown({ userName }: UserDropdownProps) {
  const t = useTranslations("UserMenu");
  const firstName = userName.split(" ")[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            className="group flex cursor-pointer items-center gap-2 bg-transparent outline-none"
          />
        }
      >
        <span className="flex flex-col items-start leading-tight">
          <span className="text-muted-foreground text-sm">{t("hello")}</span>
          <span className="text-primary text-lg font-medium">{firstName}</span>
        </span>
        <ChevronDown
          aria-hidden="true"
          className="text-muted-foreground size-5 transition-transform group-data-popup-open:rotate-180"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-64 min-w-64 rounded-2xl p-0 shadow-lg"
      >
       {/* Name */}
        <p className="text-primary truncate px-5 py-4 text-base font-semibold">
          {userName}
        </p>

        <DropdownMenuSeparator className="m-0" />

        
        <div>
          {/* Account*/}
          <DropdownMenuItem
            className={itemClass}
            render={<Link href="/account" />}
          >
            <User aria-hidden="true" />
            <span>{t("account")}</span>
          </DropdownMenuItem>

          {/* Addresses Static for now */}
          <DropdownMenuItem className={itemClass}>
            <MapPinHouse aria-hidden="true" />
            <span>{t("addresses")}</span>
          </DropdownMenuItem>

          {/* Orders Static for now */}
          <DropdownMenuItem className={itemClass}>
            <ScrollText aria-hidden="true" />
            <span>{t("orders")}</span>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator className="m-0" />

        {/* Dashboard Static for now */}
        <DropdownMenuItem className={itemClass}>
          <Settings aria-hidden="true" />
          <span>{t("dashboard")}</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="m-0" />

        {/* Logout Static for now  */}
        <DropdownMenuItem className={itemClass}>
          <LogOut aria-hidden="true" className="rtl:rotate-180" />
          <span>{t("logout")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
