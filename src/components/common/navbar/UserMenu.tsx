import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Session } from "next-auth";
import AuthButton from "@/app/AuthButton.server";

interface UserMenuProps {
  session: Session;
}

export const UserMenu = ({ session }: UserMenuProps) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            {" "}
            {session.user.lastname ? session.user.lastname : session.user.name}
          </NavigationMenuTrigger>
          <NavigationMenuContent className="w-full p-6 flex flex-col justify-center items-center gap-3">
            <NavigationMenuLink
              className="hover:bg-gray-100 px-4 py-2 rounded-xl transition-all"
              href="/account"
            >
              Mon Compte
            </NavigationMenuLink>

            <NavigationMenuLink>
              {" "}
              <AuthButton />
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
