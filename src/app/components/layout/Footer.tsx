"use client";


import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";



const quickLinks = [

{href:"/historique",label:"Notre histoire"},
{href:"/activites",label:"Nos activités"},
{href:"/evenements",label:"Événements"},
{href:"/actualites",label:"Actualités"},
{href:"/galerie",label:"Galerie"}

];



function FacebookIcon(props:React.SVGProps<SVGSVGElement>){

return(

<svg viewBox="0 0 24 24" fill="currentColor" {...props}>

<path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z"/>

</svg>

)

}





export function Footer(){


const footerRef=useRef(null);



useGSAP(()=>{


gsap.from(".footer-item",{

opacity:0,

y:40,

duration:.8,

stagger:.15,

ease:"power3.out"

});


gsap.to(".footer-glow",{

scale:1.2,

opacity:.5,

duration:4,

repeat:-1,

yoyo:true,

ease:"sine.inOut"

});


},

{
scope:footerRef
}

);



return(


<footer

ref={footerRef}

className="
relative
overflow-hidden
bg-[#07111f]
pt-20
pb-10
text-white
"


>



{/* Glow arrière */}

<div
className="
footer-glow
absolute
left-1/2
top-0
h-[400px]
w-[400px]
-translate-x-1/2
rounded-full
bg-yellow-400/20
blur-[120px]
"
/>





<div className="
relative
mx-auto
max-w-7xl
px-6
lg:px-8
">





<div className="
grid
grid-cols-1
gap-12
md:grid-cols-3
lg:grid-cols-4
">





{/* LOGO + MISSION */}

<div className="
footer-item
lg:col-span-2
">


<div className="
relative
inline-flex
rounded-3xl
border
border-white/10
bg-white/5
p-5
backdrop-blur-xl
overflow-hidden
">


<div
className="
absolute
inset-0
bg-gradient-to-r
from-yellow-400/20
transparent
opacity-50
"
/>


<Image

src="/images/logo-refeb.jpg"

alt="Logo REFEB"

width={160}

height={80}

className="
relative
z-10
object-contain
"

/>


</div>




<p className="
mt-6
max-w-md
text-sm
leading-relaxed
text-slate-300
">

Former des enseignants de type nouveau en Christ,
par Christ et pour Christ afin d'impacter l'école,
l'Église et la société.

</p>





<div className="
mt-6
flex
gap-3
text-xs
font-bold
">


<span className="
rounded-full
border
border-yellow-400/20
bg-yellow-400/10
px-4
py-2
text-yellow-300
">

Intégrité

</span>



<span className="
rounded-full
border
border-yellow-400/20
bg-yellow-400/10
px-4
py-2
text-yellow-300
">

Excellence

</span>


<span className="
rounded-full
border
border-yellow-400/20
bg-yellow-400/10
px-4
py-2
text-yellow-300
">

Solidarité

</span>


</div>



</div>








{/* LIENS */}

<div className="footer-item">


<h4 className="
font-display
text-sm
font-bold
uppercase
tracking-widest
text-yellow-300
">

Navigation

</h4>


<ul className="
mt-6
space-y-4
">

{

quickLinks.map(link=>(

<li key={link.href}>

<Link

href={link.href}

className="
group
flex
items-center
gap-2
text-sm
text-slate-300
hover:text-yellow-300
transition-colors
"

>

{link.label}


<ArrowUpRight

size={13}

className="
opacity-0
transition-all
group-hover:opacity-100
"

/>


</Link>

</li>

))

}

</ul>


</div>








{/* CONTACT */}

<div className="footer-item">


<h4 className="
font-display
text-sm
font-bold
uppercase
tracking-widest
text-yellow-300
">

Contact

</h4>



<ul className="
mt-6
space-y-5
text-sm
text-slate-300
">


<li className="flex gap-3">

<MapPin className="text-yellow-400 shrink-0"/>

Cotonou, Bénin

</li>


<li className="flex gap-3">

<Phone className="text-yellow-400 shrink-0"/>

+229 0195206304

</li>


<li className="flex gap-3">

<Mail className="text-yellow-400 shrink-0"/>

contact@refeb-benin.org

</li>


</ul>



</div>







</div>










{/* GRANDE SIGNATURE */}

<div className="
footer-item
relative
mt-20
rounded-[40px]
border
border-white/10
bg-white/5
py-10
text-center
overflow-hidden
">


<div className="
absolute
inset-0
bg-gradient-to-r
from-yellow-400/10
via-transparent
to-yellow-400/10
"
/>



<p className="
relative
text-sm
uppercase
tracking-[0.5em]
text-yellow-300
">

Réseau Évangélique des Frères Enseignants du Bénin

</p>



<h2 className="
relative
mt-4
font-display
text-[18vw]
font-black
leading-none
uppercase
text-white/10
sm:text-[10rem]
">

REFEB

</h2>



</div>










{/* BAS */}

<div className="
mt-10
border-t
border-white/10
pt-8
flex
flex-col
items-center
justify-between
gap-6
sm:flex-row
">


<p className="
text-xs
text-slate-400
">

© {new Date().getFullYear()} REFEB Bénin.
Tous droits réservés.

</p>



<div className="
flex
gap-3
">


<a
href="#"
className="
flex
h-10
w-10
items-center
justify-center
rounded-full
bg-white/10
transition-all
hover:bg-yellow-400
hover:text-primary
"
>

<FacebookIcon width={17}/>

</a>


</div>



</div>






</div>

</footer>


)

}