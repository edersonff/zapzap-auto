import { useKeyPath } from "@/hooks/useKeyPath";
import Link from "next/link";
import React from "react";
import { FaHome, FaTicketAlt, FaUser } from "react-icons/fa";

export default function Sidebar() {
  const key = useKeyPath();
  return (
    <div className="bg-gray-200 font-sans small:hidden">
      <div className="flex flex-col sm:flex-row sm:justify-around">
        <div className="w-64 h-screen bg-gray-800">
          <div className="flex items-center justify-center mt-10">
            <img className="h-6" src="/merlin/logo-white.svg" />
          </div>

          <nav className="mt-10">
            <SidebarItem
              title="Dashboard"
              icon={<FaHome />}
              subItems={[
                {
                  title: "Início",
                  href: key,
                },
              ]}
            />

            <SidebarItem
              title="Prompt"
              icon={<FaUser />}
              subItems={[
                {
                  title: "Gerenciar Memes",
                  href: key + "/memes",
                },
                {
                  title: "Gerenciar Sons",
                  href: key + "/sons",
                },
              ]}
            />

            <SidebarItem
              title="Configurações"
              icon={<FaTicketAlt />}
              subItems={[
                {
                  title: "Integração com APIs",
                  href: key + "/socials",
                },
              ]}
            />
          </nav>

          <div className="absolute bottom-0 my-8">
            <a
              className="flex items-center pt-2 px-8 text-gray-100 hover:text-gray-200"
              href="#"
            >
              <img
                className="h-6 w-6 rounded-full mr-3 object-cover"
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt="avatar"
              />
              <span>
                <span className="block -mb-1">John Doe</span>
                <span className="text-sm">Admin</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SidebarItem({
  title,
  icon,
  subItems,
}: {
  title: string;
  icon: React.ReactNode;
  subItems: { title: string; href: string }[];
}) {
  return (
    <div x-data="{ open: false }">
      <button className="w-full flex justify-between items-center py-3 px-6 text-gray-100 cursor-pointer hover:bg-gray-700 hover:text-gray-100 focus:outline-none">
        <span className="flex items-center">
          {icon}
          <span className="mx-4 font-medium">{title}</span>
        </span>

        <span>
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              x-show="! open"
              d="M9 5L16 12L9 19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ display: "none" }}
            ></path>
            <path
              x-show="open"
              d="M19 9L12 16L5 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </span>
      </button>

      <div x-show="open" className="bg-gray-700">
        {subItems.map((subItem) => (
          <Link
            key={subItem.title}
            className="py-2 px-16 block text-sm text-gray-100 hover:bg-primary hover:text-white"
            href={subItem.href}
          >
            {subItem.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
