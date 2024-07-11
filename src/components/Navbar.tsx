"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem } from "./ui/navbar-menu";
import { cn } from "@/utils/cn";
import Link from "next/link";



function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-5 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <Link href={"/"}>
        <MenuItem setActive={setActive} active={active} item="Refer">
        </MenuItem>
        </Link>
        <MenuItem setActive={setActive} active={active} item="Benifits">
    
        </MenuItem>
        
        <MenuItem setActive={setActive} active={active} item="FAQs">
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Support">
        </MenuItem>
       
      </Menu>
    </div>
  );
}

export default Navbar
