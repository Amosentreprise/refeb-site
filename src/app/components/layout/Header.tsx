"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  ArrowUpRight,
  History,
  Layers,
  Calendar,
  Newspaper,
  Image as ImageIcon,
  Mail,
  Home,
} from "lucide-react";
import { cn } from "../../../lib/utils";

const navLinks = [
  { href: "/", label: "Accueil", icon: Home },
  { href: "/historique", label: "Historique", icon: History },
  { href: "/activites", label: "Activités", icon: Layers },
  { href: "/evenements", label: "Événements", icon: Calendar },
  { href: "/actualites", label: "Actualités", icon: Newspaper },
  { href: "/galerie", label: "Galerie", icon: ImageIcon },
  { href: "/contact", label: "Contact", icon: Mail },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-12 pointer-events-none">

      <header
        className={cn(
          "animate-header-float relative mx-auto max-w-7xl w-full rounded-full border border-primary/10 bg-white/80 backdrop-blur-xl transition-all duration-300 pointer-events-auto",
          scrolled
            ? "shadow-xl shadow-accent/10 bg-white/95"
            : "shadow-lg"
        )}
      >

        {/* Glow */}
        <div
          className="
          absolute
          inset-[-2px]
          rounded-full
          bg-gradient-to-r
          from-transparent
          via-accent/50
          to-transparent
          opacity-60
          animate-header-glow
          pointer-events-none
          "
        />


        <div className="relative z-10">

          <div className="flex items-center justify-between p-2 pl-5 sm:pl-8">


            {/* LOGO */}
            <Link
              href="/"
              className="group relative flex items-center"
            >

              <span
                className="
                absolute
                inset-0
                rounded-full
                bg-accent/30
                blur-xl
                opacity-0
                transition-opacity
                duration-500
                group-hover:opacity-100
                "
              />

              <Image
                src="/images/logo-refeb.png"
                alt="Logo REFEB"
                width={110}
                height={35}
                priority
                className="
                relative
                z-10
                h-auto
                w-[90px]
                object-contain
                transition-transform
                duration-500
                group-hover:scale-105
                "
              />

            </Link>



            {/* MENU DESKTOP */}
            <nav className="hidden items-center gap-1.5 rounded-full bg-bg-alt/60 p-1 border border-primary/5 lg:flex">

              {navLinks.map((link) => {

                const LinkIcon = link.icon;
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold tracking-wide transition-all duration-300",
                      isActive
                        ? "bg-white text-primary shadow-sm border border-primary/5"
                        : "text-muted hover:text-primary hover:bg-white/80"
                    )}
                  >

                    <LinkIcon
                      size={14}
                      className={cn(
                        "transition-transform",
                        isActive && "scale-110 text-accent-dark"
                      )}
                    />

                    {link.label}

                  </Link>
                );
              })}

            </nav>



            {/* BOUTON */}
            <div className="hidden lg:block">

              <Link
                href="/evenements"
                className="
                group
                inline-flex
                items-center
                gap-3
                rounded-full
                bg-accent
                p-1.5
                pl-5
                pr-2.5
                text-xs
                font-bold
                text-primary
                shadow-sm
                transition-all
                hover:bg-accent/90
                "
              >

                S'inscrire à un événement

                <span
                  className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-full
                  bg-primary
                  text-white
                  transition-all
                  group-hover:rotate-45
                  "
                >
                  <ArrowUpRight size={14}/>
                </span>

              </Link>

            </div>



            {/* MENU MOBILE */}
            <button
              className="
              p-3
              mr-1
              lg:hidden
              rounded-full
              hover:bg-bg-alt
              transition-colors
              text-primary
              "
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >

              {mobileOpen
                ? <X size={20}/>
                : <Menu size={20}/>
              }

            </button>


          </div>



          {/* MENU MOBILE DROPDOWN */}

          <div
            className={cn(
              "absolute left-0 right-0 top-full mt-3 lg:hidden transition-all duration-300",
              mobileOpen
                ? "opacity-100 translate-y-0 visible"
                : "opacity-0 -translate-y-3 invisible pointer-events-none"
            )}
          >

            <nav
              className="
              mx-2
              rounded-2xl
              bg-white
              p-3
              border
              border-primary/10
              shadow-xl
              flex
              flex-col
              gap-1.5
              "
            >

              {navLinks.map((link)=>{

                const LinkIcon = link.icon;
                const isActive = pathname === link.href;


                return (

                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={()=>setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all",
                      isActive
                        ? "bg-primary text-white"
                        : "text-muted hover:bg-bg-alt hover:text-primary"
                    )}
                  >

                    <LinkIcon
                      size={16}
                      className={
                        isActive
                        ? "text-accent"
                        : "text-muted/60"
                      }
                    />

                    {link.label}

                  </Link>

                );

              })}



              <Link
                href="/evenements"
                onClick={()=>setMobileOpen(false)}
                className="
                mt-3
                flex
                w-full
                items-center
                justify-between
                rounded-xl
                bg-accent
                px-5
                py-3.5
                text-sm
                font-bold
                text-primary
                shadow-sm
                hover:bg-accent/90
                "
              >

                S'inscrire à un événement

                <ArrowUpRight size={16}/>

              </Link>


            </nav>

          </div>


        </div>


      </header>

    </div>
  );
}