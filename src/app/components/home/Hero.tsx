"use client";



import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "../ui/Button";


const BACKGROUND_IMAGES = [
  "/images/image.jpeg",
  "/images/image1.jpeg",
  "/images/image2.jpeg"
];











const CORE_AXES = [
  "Intégrité",
  "Excellence",
  "Solidarité",
  "Formation continue",
  "Mission éducative"
];


export function Hero() {


const containerRef = useRef<HTMLDivElement>(null);

const [currentSlide,setCurrentSlide] = useState(0);



useEffect(()=>{

const timer=setInterval(()=>{

setCurrentSlide(prev =>
(prev + 1) % BACKGROUND_IMAGES.length
)

},7000);


return ()=>clearInterval(timer);


},[]);



useGSAP(
() => {

const slides = gsap.utils.toArray<HTMLElement>(".bg-slide");


slides.forEach((slide,index)=>{

gsap.set(slide,{
opacity:index === currentSlide ? 0.35 : 0,
scale:index === currentSlide ? 1.12 : 1
});


});


const activeSlide = slides[currentSlide];


gsap.to(activeSlide,{
opacity:0.35,
scale:1.12,
duration:8,
ease:"none"
});


slides.forEach((slide,index)=>{

if(index !== currentSlide){

gsap.to(slide,{
opacity:0,
duration:1.5
});

}

else{

gsap.to(slide,{
opacity:0.35,
duration:1.5
});

}

});


},
{
scope:containerRef,
dependencies:[currentSlide]
}
);
return (

<section
ref={containerRef}
className="
relative 
min-h-screen
overflow-hidden
flex
pt-18
items-center
bg-[#07111f]
"
>


{/* BACKGROUND IMAGES */}

<div className="absolute inset-0">


{
BACKGROUND_IMAGES.map((image,index)=>(

<div
key={image}
className="
bg-slide
absolute
inset-0
bg-cover
bg-center
opacity-0
will-change-transform
"
style={{
backgroundImage:`url(${image})`
}}
/>

))
}



{/* Overlay premium */}

<div
className="
absolute
inset-0
bg-gradient-to-r
from-[#07111f]/95
via-[#07111f]/80
to-[#07111f]/40
"
/>


<div
className="
absolute
inset-0
bg-gradient-to-t
from-[#07111f]
via-transparent
to-transparent
"
/>


</div>





{/* Lumière décorative */}

<div
className="
hero-light
absolute
left-[-150px]
top-1/4
h-[500px]
w-[500px]
rounded-full
bg-yellow-400/20
blur-[120px]
"
/>





{/* Petits éléments flottants */}

<div
className="
floating-item
absolute
right-[15%]
top-[20%]
h-16
w-16
rounded-full
border
border-yellow-400/20
bg-yellow-400/10
backdrop-blur-xl
"
/>


<div
className="
floating-item
absolute
right-[8%]
bottom-[25%]
h-24
w-24
rounded-full
border
border-white/10
bg-white/5
backdrop-blur-xl
"
/>







{/* CONTENU */}

<div
className="
relative
z-10
mx-auto
w-full
max-w-7xl
px-6
py-24
lg:px-8
"
>



<div
className="
max-w-4xl
text-white
"
>




{/* Eyebrow */}

<div
className="
hero-eyebrow
mb-8
flex
items-center
gap-3
"
>

<span
className="
h-3
w-3
rounded-full
bg-yellow-400
shadow-lg
shadow-yellow-400/50
"
/>


<p
className="
text-xs
font-bold
uppercase
tracking-[0.35em]
text-yellow-300
sm:text-sm
"
>

REFEB
•
Une décennie d’impact éducatif depuis 2016

</p>


</div>








{/* TITRE */}

<h1
className="
hero-title
font-display
text-5xl
font-black
leading-[1.1]
tracking-tight
sm:text-6xl
lg:text-8xl
"
>


<span className="block">

Une vision née

</span>


<span
className="
block
bg-gradient-to-r
from-yellow-300
via-yellow-400
to-yellow-200
bg-clip-text
text-transparent
"
>

dans une salle de classe

</span>


<span className="block">

pour transformer

</span>


<span
className="
block
bg-gradient-to-r
from-yellow-300
to-yellow-100
bg-clip-text
text-transparent
"
>

les générations.

</span>


</h1>









{/* DESCRIPTION */}

<p
className="
hero-subtitle
mt-8
max-w-3xl
text-lg
leading-relaxed
text-slate-300
sm:text-xl
"
>


Le Réseau Évangélique des Frères Enseignants du Bénin accompagne
les éducateurs chrétiens afin de faire de l’école un espace
d’excellence, d’intégrité et de transformation spirituelle.


</p>








{/* CTA */}

<div
className="
hero-cta-group
mt-10
flex
flex-wrap
gap-5
"
>



<Button

href="/historique"

className="
rounded-full
bg-yellow-400
px-8
py-4
font-bold
text-[#07111f]
shadow-xl
shadow-yellow-400/20
transition-all
hover:bg-yellow-300
"

>

Découvrir notre histoire

<span className="ml-2 text-xl">
→
</span>

</Button>






<Button

href="/adhesion"

className="
rounded-full
border
border-white/20
bg-white/5
px-8
py-4
font-bold
text-white
backdrop-blur-md
transition-all
hover:bg-white/10
"

>

Rejoindre la mission

</Button>




</div>









{/* DEVISE */}

<div
className="
mt-14
flex
flex-wrap
gap-3
"
>


{
CORE_AXES.map(axis=>(


<div

key={axis}

className="
hero-badge
flex
items-center
gap-2
rounded-full
border
border-white/10
bg-white/5
px-5
py-3
backdrop-blur-md
"

>


<div
className="
flex
h-6
w-6
items-center
justify-center
rounded-full
bg-yellow-400/20
text-yellow-300
"
>

✓

</div>



<span
className="
text-sm
font-semibold
text-slate-200
"
>

{axis}

</span>



</div>


))
}


</div>








{/* TIMELINE HISTORIQUE */}

<div
className="
mt-16
max-w-xl
rounded-2xl
border
border-white/10
bg-white/5
p-5
backdrop-blur-md
"
>


<div
className="
flex
items-center
justify-between
text-sm
font-bold
text-yellow-300
"
>

<span>
2016
</span>


<div
className="
mx-4
h-[2px]
flex-1
bg-yellow-400/40
"
/>


<span>
Aujourd’hui
</span>


</div>



<p
className="
mt-3
text-sm
text-slate-300
"
>

D’une rencontre de cinquante enseignants à un réseau
structuré engagé dans la transformation éducative.

</p>



</div>





</div>

</div>






{/* INDICATEURS */}

<div
className="
absolute
bottom-8
left-1/2
z-20
flex
-translate-x-1/2
gap-3
"
>


{
BACKGROUND_IMAGES.map((_,index)=>(


<button

key={index}

onClick={()=>setCurrentSlide(index)}

className={`
h-2
rounded-full
transition-all
duration-500

${
index===currentSlide

?
"w-10 bg-yellow-400"

:
"w-3 bg-white/40"

}

`}

/>


))
}



</div>





</section>

);


}