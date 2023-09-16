import React from 'react'
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
  } from "@/components/ui/menubar"
  


export default function Navbar() {
    return (
        <div>
            <Menubar  className='w-90'>
  <MenubarMenu >
    <MenubarTrigger>Home</MenubarTrigger>
    
    <MenubarTrigger>About Us</MenubarTrigger>
    <MenubarTrigger>Contact Us</MenubarTrigger>
   
  </MenubarMenu>
</Menubar>


        </div>
    )
}
