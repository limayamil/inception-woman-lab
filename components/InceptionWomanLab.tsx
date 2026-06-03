"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Code,
  Landmark,
  Rocket,
  Layers,
  Mail,
  Phone,
  MapPin,
  Compass,
  TrendingUp,
  Building2,
  Network,
} from "lucide-react";

// --- COMPONENTES AUXILIARES ---

interface ImageWithFallbackProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

const ImageWithFallback = ({
  src,
  alt,
  className,
  ...props
}: ImageWithFallbackProps) => {
  const [error, setError] = useState(false);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={
        error
          ? "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1080&auto=format&fit=crop"
          : src
      }
      alt={alt}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  );
};

const Copete = ({ text }: { text: string }) => (
  <span className="text-[#ffd600] font-bold uppercase tracking-widest block mb-4 text-xs lg:text-sm">
    {text}
  </span>
);

// --- DATOS ESTÁTICOS ---

const TEAM_DATA = [
  {
    name: "Luciana Patiño",
    role: "Co-Founder · Legal, Capital & Exit Strategy",
    desc: "Especialista en legal tech, inversión y operaciones internacionales. Ex Head Legal de BT para Latinoamérica.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Cecilia Calonico",
    role: "Accesibilidad e Inclusión",
    desc: "Defensora de la accesibilidad y la inclusión. Facilitadora el acceso equitativo a la salud a través de soluciones digitales.",
    img: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Rodrigo González",
    role: "Co-Founder · Product & Commercial Strategy",
    desc: "Más de 15 años en desarrollo de negocio, producto tecnológico y expansión internacional.",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Laura Gleizer",
    role: "Co-Founder · Operations & Execution",
    desc: "Especialista en operaciones y execution de proyectos tecnológicos complejos. Lidera estructura operativa.",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Lara Moloney, FRSA",
    role: "Brand Ambassador · Venture Readiness",
    desc: "Experta en go-to-market y venture readiness. Más de 28 años en media y consultoría internacional.",
    img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Juan Mishima",
    role: "Software & Product Development",
    desc: "Especialista en escalado de productos y servicios tecnológicos, con experiencia liderando equipos remotos e internacionales.",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop",
  },
];

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

const ALIANZAS_LOGOS = [
  { name: "AWS Startups", style: "font-black tracking-tighter" },
  {
    name: "stripe",
    style: "font-black lowercase tracking-tighter text-[1.4em]",
  },
  { name: "HubSpot", style: "font-bold" },
  { name: "Google for Startups", style: "font-medium tracking-tight" },
  { name: "Microsoft for Startups", style: "font-semibold tracking-tight" },
];

const RED_MARCAS = [
  "FiGroup",
  "Eurecat",
  "Polo Digital",
  "She wins",
  "FFC",
  "CTA",
];

const CONFIG_NODOS = {
  amarillo: { r: 255, g: 214, b: 0, glow: "rgba(255, 214, 0, 0.6)" },
  rosa: { r: 255, g: 0, b: 122, glow: "rgba(255, 0, 122, 0.4)" },
};

// --- CLASE DE ANIMACIÓN DE NODOS ---

type NodoModo = "derecha" | "izquierda" | "esquinas";

interface Particle {
  color: { r: number; g: number; b: number };
  size: number;
  speed: number;
  offset: number;
  originX: number;
  originY: number;
  targetX: number;
  targetY: number;
  currentX: number;
  currentY: number;
}

class NodeAnimation {
  private container: HTMLElement | null;
  private canvas: HTMLCanvasElement | null;
  private ctx: CanvasRenderingContext2D | null = null;
  private modo: NodoModo;
  private particles: Particle[] = [];
  private scrollProgress = 0;
  private targetScrollProgress = 0;
  private animationFrame: number | null = null;
  private resizeListener: () => void = () => {};
  private scrollListener: () => void = () => {};

  constructor(containerId: string, canvasId: string, modo: NodoModo = "derecha") {
    this.container = document.getElementById(containerId);
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement | null;
    this.modo = modo;

    if (!this.container || !this.canvas) return;

    this.ctx = this.canvas.getContext("2d");
    this.resizeListener = () => this.resize();
    this.scrollListener = () => this.updateProgress();

    window.addEventListener("resize", this.resizeListener);
    window.addEventListener("scroll", this.scrollListener);
    this.resize();
    this.loop();
  }

  destroy() {
    window.removeEventListener("resize", this.resizeListener);
    window.removeEventListener("scroll", this.scrollListener);
    if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
  }

  private resize() {
    if (!this.container || !this.canvas || !this.ctx) return;
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = this.container.clientWidth * dpr;
    this.canvas.height = this.container.clientHeight * dpr;
    this.ctx.scale(dpr, dpr);
    this.canvas.style.width = this.container.clientWidth + "px";
    this.canvas.style.height = this.container.clientHeight + "px";
    this.createParticles();
  }

  private createParticles() {
    if (!this.container) return;
    this.particles = [];
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    const count = 100;

    for (let i = 0; i < count; i++) {
      const isAmarillo = Math.random() > 0.5;
      const col = isAmarillo ? CONFIG_NODOS.amarillo : CONFIG_NODOS.rosa;

      const p: Particle = {
        color: col,
        size: 1.5 + Math.random() * 3,
        speed: 0.5 + Math.random() * 0.5,
        offset: Math.random() * Math.PI * 2,
        originX: 0,
        originY: 0,
        targetX: 0,
        targetY: 0,
        currentX: 0,
        currentY: 0,
      };

      if (this.modo === "derecha") {
        p.originX = w + 100;
        p.originY = Math.random() * h;
        p.targetX = w * 0.6 + Math.random() * (w * 0.35);
        p.targetY = h * 0.1 + Math.random() * (h * 0.8);
      } else if (this.modo === "izquierda") {
        p.originX = -100;
        p.originY = Math.random() * h;
        p.targetX = Math.random() * (w * 0.4);
        p.targetY = h * 0.1 + Math.random() * (h * 0.8);
      } else {
        const esTopLeft = i < count / 2;
        p.originX = esTopLeft ? 0 : w;
        p.originY = esTopLeft ? 0 : h;
        p.targetX = esTopLeft
          ? Math.random() * (w * 0.55)
          : w - Math.random() * (w * 0.55);
        p.targetY = esTopLeft
          ? Math.random() * (h * 0.55)
          : h - Math.random() * (h * 0.55);
      }
      this.particles.push(p);
    }
  }

  private updateProgress() {
    if (!this.container) return;
    const r = this.container.getBoundingClientRect();
    const vh = window.innerHeight;
    const p = (vh - r.top) / (vh * 0.8);
    this.targetScrollProgress = Math.max(0, Math.min(1, p));
  }

  private draw() {
    if (!this.canvas || !this.ctx) return;
    this.scrollProgress +=
      (this.targetScrollProgress - this.scrollProgress) * 0.05;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const time = Date.now() * 0.001;

    this.particles.forEach((p) => {
      const x = p.originX + (p.targetX - p.originX) * this.scrollProgress;
      const y = p.originY + (p.targetY - p.originY) * this.scrollProgress;
      const fx = x + Math.sin(time * p.speed + p.offset) * 20;
      const fy = y + Math.cos(time * p.speed + p.offset) * 20;

      this.ctx!.beginPath();
      this.ctx!.arc(fx, fy, p.size, 0, Math.PI * 2);
      this.ctx!.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${0.4 + this.scrollProgress * 0.6})`;
      this.ctx!.fill();
      p.currentX = fx;
      p.currentY = fy;
    });

    this.particles.forEach((p1, i) => {
      this.particles.slice(i + 1).forEach((p2) => {
        const d = Math.hypot(
          p1.currentX - p2.currentX,
          p1.currentY - p2.currentY
        );
        if (d < 150) {
          this.ctx!.beginPath();
          this.ctx!.moveTo(p1.currentX, p1.currentY);
          this.ctx!.lineTo(p2.currentX, p2.currentY);
          const alpha = ((1 - d / 150) * 0.4 * this.scrollProgress);
          const grad = this.ctx!.createLinearGradient(
            p1.currentX,
            p1.currentY,
            p2.currentX,
            p2.currentY
          );
          grad.addColorStop(
            0,
            `rgba(${p1.color.r}, ${p1.color.g}, ${p1.color.b}, ${alpha})`
          );
          grad.addColorStop(
            1,
            `rgba(${p2.color.r}, ${p2.color.g}, ${p2.color.b}, ${alpha})`
          );
          this.ctx!.strokeStyle = grad;
          this.ctx!.stroke();
        }
      });
    });
  }

  private loop() {
    this.draw();
    this.animationFrame = requestAnimationFrame(() => this.loop());
  }
}

// --- SECCIONES ---

const Hero = () => (
  <section className="relative min-h-[90vh] flex flex-col overflow-hidden bg-black selection:bg-[#FF007A] selection:text-white">
    <div className="absolute inset-0 w-full h-full z-0 bg-black/40">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          src="https://res.cloudinary.com/dpoglnvkh/video/upload/q_auto/f_auto/v1779380891/video_header_WIL_2_rpu7cp.mp4"
          type="video/mp4"
        />
      </video>
    </div>
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-12 py-4 flex justify-between items-center backdrop-blur-md bg-black/80 border-b border-zinc-800/50 shadow-sm">
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="w-11 h-11 sm:w-[3.25rem] sm:h-[3.25rem] bg-zinc-800 rounded-[0.85rem] flex items-center justify-center shrink-0 border border-zinc-700">
          <svg
            viewBox="0 0 100 100"
            className="w-6 h-6 sm:w-8 sm:h-8"
            fill="none"
            stroke="white"
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M 20 30 L 35 70 L 62 30" />
            <path d="M 38 30 L 65 70 L 80 30" />
          </svg>
        </div>
        <span className="font-zalando font-black text-[1.35rem] sm:text-[1.6rem] lg:text-[1.85rem] tracking-tighter uppercase text-white hidden sm:block mt-1">
          INCEPTION WOMAN LAB
        </span>
        <span className="font-zalando font-black text-sm tracking-tighter uppercase text-white sm:hidden mt-1">
          INCEPTION WOMAN LAB
        </span>
      </div>
      <a href="https://docs.google.com/forms/d/e/1FAIpQLSfU2pAgtSXaryQAGW5GUzGOYOIajQzm8DTBrh9oSWHOthYvDA/viewform?usp=send_form" target="_blank" rel="noopener noreferrer" className="bg-[#FF007A] text-white px-5 sm:px-8 py-2.5 font-bold uppercase tracking-widest text-xs sm:text-sm hover:bg-[#ffd600] hover:text-black transition-colors rounded-full shadow-md">
        Aplica a la convocatoria
      </a>
    </header>
    <div className="flex-1 flex flex-col justify-center mt-[73px] z-10 w-full">
      <div className="w-full md:w-[95%] lg:w-[85%] xl:w-[75%] h-full flex flex-col justify-center px-6 sm:px-10 lg:px-20 py-16 sm:py-24 bg-black/90 sm:bg-transparent sm:bg-gradient-to-r sm:from-black sm:via-black/90 sm:to-transparent backdrop-blur-xl min-h-[calc(90vh-73px)] sm:[mask-image:linear-gradient(to_right,black_55%,transparent_100%)]">
        <Copete text="Venture Studio Boutique - Andalucía" />
        <motion.h1
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="font-zalando text-[clamp(2.2rem,5vw,4.5rem)] font-bold leading-[0.95] tracking-tighter text-white uppercase mb-8 max-w-4xl text-left"
        >
          No somos una incubadora más
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-roboto text-base md:text-lg lg:text-xl text-gray-300 font-medium max-w-xl mb-6 leading-relaxed text-left relative z-10"
        >
          Construimos compañías tech lideradas por mujeres. Con ingeniería real
          y estructura de capital.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10 text-xs sm:text-sm text-gray-400 font-bold uppercase tracking-widest relative z-10"
        >
          <span>Hasta 5 Proyectos por cohorte</span>
          <span className="text-[#FF007A]">•</span>
          <span>15+ Años en ingeniería</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 relative z-10"
        >
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSfU2pAgtSXaryQAGW5GUzGOYOIajQzm8DTBrh9oSWHOthYvDA/viewform?usp=send_form" target="_blank" rel="noopener noreferrer" className="group bg-[#FF007A] text-white px-8 py-4 md:px-10 md:py-5 text-sm md:text-base font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center justify-center gap-4 w-full sm:w-max rounded-full shadow-lg shadow-[#FF007A]/20">
            Aplica a la convocatoria
            <ArrowRight className="group-hover:translate-x-2 transition-transform w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </div>
  </section>
);

const Ticker = () => (
  <div className="bg-black py-3 border-y border-zinc-900 overflow-hidden flex w-full relative">
    <div className="flex whitespace-nowrap animate-marquee-slow w-fit">
      {[...Array(16)].map((_, i) => (
        <div key={i} className="flex items-center">
          <span className="font-zalando font-bold text-xs sm:text-sm md:text-base uppercase tracking-widest mx-4 sm:mx-6 text-[#FF007A]">
            Apertura: 15 de abril 2026
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF007A] mx-2"></span>
          <span className="font-zalando font-bold text-xs sm:text-sm md:text-base uppercase tracking-widest mx-4 sm:mx-6 text-white">
            Cierre de convocatoria: 15 de junio 2026
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF007A] mx-2"></span>
        </div>
      ))}
    </div>
  </div>
);

const TeamSection = () => (
  <section className="py-12 md:py-20 px-6 lg:px-20 bg-zinc-950">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col items-center text-center mb-12">
        <Copete text="Quienes somos" />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-zalando text-4xl md:text-5xl font-bold uppercase tracking-tighter text-white mb-4"
        >
          Fundadores, operadores y acompañamiento práctico
        </motion.h2>
        <motion.p className="font-roboto text-xl md:text-2xl text-gray-300 font-medium max-w-4xl leading-relaxed">
          Construimos desde la experiencia real en tecnología y escalamiento.
          Trabajamos junto a cada startup en producto, tecnología, financiación
          y expansión para reducir riesgo, acelerar ejecución y preparar
          compañías listas para competir por capital.
        </motion.p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-12 max-w-5xl mx-auto">
        {TEAM_DATA.map((member, idx) => {
          const isYellowGlow = idx % 2 === 0;
          return (
            <motion.div
              key={idx}
              whileHover={{
                scale: 1.03,
                boxShadow: `0 20px 40px ${isYellowGlow ? "rgba(255, 214, 0, 0.15)" : "rgba(255, 0, 122, 0.15)"}`,
              }}
              className={`bg-zinc-900 p-6 rounded-[2rem] border border-zinc-800 shadow-sm transition-all duration-500 group flex flex-col items-center text-center ${isYellowGlow ? "hover:border-[#ffd600]" : "hover:border-[#FF007A]"}`}
            >
              <div
                aria-label={member.name}
                className={`w-24 h-24 md:w-28 md:h-28 rounded-[1.5rem] mb-5 grid place-items-center transition-all duration-700 ring-2 ring-zinc-800 group-hover:ring-offset-2 group-hover:ring-offset-zinc-900 ${
                  isYellowGlow
                    ? "bg-[#ffd600]/10 text-[#ffd600] group-hover:ring-[#ffd600]"
                    : "bg-[#FF007A]/10 text-[#FF007A] group-hover:ring-[#FF007A]"
                }`}
              >
                <span className="font-zalando text-2xl md:text-3xl font-bold tracking-tight">
                  {getInitials(member.name)}
                </span>
              </div>
              <h3 className="font-zalando text-lg md:text-xl font-bold text-white uppercase tracking-tight mb-1">
                {member.name}
              </h3>
              <p className="font-roboto text-[#FF007A] font-bold text-[10px] md:text-xs mb-3 uppercase tracking-wider leading-tight h-8 flex items-center justify-center">
                {member.role}
              </p>
              <div
                className={`h-px w-8 mx-auto mb-4 transition-all duration-500 group-hover:w-full ${isYellowGlow ? "bg-[#ffd600]/30" : "bg-[#FF007A]/30"}`}
              />
              <p className="font-roboto text-gray-400 text-xs md:text-sm leading-relaxed max-w-[240px]">
                {member.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center border-t border-zinc-800 pt-8"
      >
        <p className="font-roboto text-lg md:text-xl text-gray-300 font-medium leading-relaxed">
          <span className="font-bold text-white uppercase tracking-tight">
            Trabajamos desde experiencia real construyendo y escalando compañías
            tecnológicas.
          </span>
        </p>
      </motion.div>
    </div>
  </section>
);

const Incubadoras = () => {
  const items = [
    {
      title: "Producto & Tech",
      text: "Ingeniería Niage directa",
      icon: <Code className="w-10 h-10 text-[#FF007A]" />,
      theme: "bg-zinc-900 text-white border-zinc-800",
      shadow: "shadow-[0_20px_40px_rgba(0,0,0,0.6)]",
    },
    {
      title: "Riesgo de ejecución",
      text: "Procesos reales, no workshops",
      icon: <Layers className="w-10 h-10 text-[#ffd600]" />,
      theme: "bg-black text-white border-zinc-800",
      shadow: "shadow-[0_20px_40px_rgba(0,0,0,0.6)]",
    },
    {
      title: "Financiación",
      text: "Pública, privada o híbrida",
      icon: <Landmark className="w-10 h-10 text-white" />,
      theme: "bg-[#FF007A] text-white border-transparent",
      shadow: "shadow-[0_20px_40px_rgba(255,0,122,0.2)]",
    },
    {
      title: "VC & Expansión",
      text: "Pitch · Family offices · Go-to-market",
      icon: <Rocket className="w-10 h-10 text-[#FF007A]" />,
      theme: "bg-zinc-900 text-white border-zinc-800",
      shadow: "shadow-[0_20px_40px_rgba(0,0,0,0.6)]",
    },
  ];

  return (
    <section className="relative py-12 md:py-20 px-6 lg:px-20 border-t border-zinc-900 overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1920&q=80"
          alt="Mujeres empresarias reunidas"
          className="w-full h-full object-cover object-center grayscale opacity-50 blur-[2px]"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center mb-6 md:mb-8">
          <Copete text="Que hacemos" />
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-zalando text-[clamp(2.2rem,5vw,4.5rem)] font-bold uppercase tracking-tighter text-center text-white leading-[0.95]"
          >
            Proyecto tech → compañía invertible
          </motion.h2>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-10"
        >
          <p className="font-roboto text-xl md:text-2xl text-gray-300 font-medium leading-relaxed">
            Somos una incubadora de alta exigencia para mujeres que quieren construir compañías tecnológicas con intención de crecer.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 max-w-7xl mx-auto mb-12">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ scale: 1.04, translateY: -8 }}
              className={`relative p-8 transition-all duration-500 rounded-[3rem] border flex flex-col gap-5 justify-center min-h-[280px] md:min-h-[300px] ${item.theme} ${item.shadow} cursor-pointer group`}
            >
              <div className="mb-1 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                {item.icon}
              </div>
              <div className="space-y-2">
                <h4 className="font-zalando text-xl md:text-2xl font-black uppercase tracking-tight text-white">
                  {item.title}
                </h4>
                <p className="font-roboto text-base md:text-lg font-medium leading-tight opacity-90 text-gray-300">
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto text-center"
        >
          <p className="font-roboto text-lg md:text-xl lg:text-2xl text-gray-400 font-normal leading-relaxed">
            Somos una incubadora de alta exigencia para mujeres que quieren
            construir compañías tecnológicas con intención de crecer.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const Statement = () => {
  const stats = [
    {
      label: "Capital de Riesgo",
      value: "1,2%",
      description: "del VC europeo llegó a equipos femeninos",
    },
    {
      label: "Distribución Deep Tech",
      value: "90%",
      description:
        "del capital disponible lo obtienen empresas de deep tech fundadas por equipos masculinos",
    },
    {
      label: "CEO & Fundadoras",
      value: "8%",
      description:
        "de las startups con financiación significativa tienen una mujer como CEO o fundadora principal.",
    },
    {
      label: "Brecha Financiera",
      value: "23%",
      description:
        "menos es la media que reciben fundadoras comparado a sus homólogos masculinos con proyectos equivalentes",
    },
  ];

  return (
    <section className="py-10 md:py-16 px-6 lg:px-20 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 lg:mb-12 text-left">
          <Copete text="Por qué existimos" />
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-zalando text-[clamp(1.8rem,4vw,4rem)] font-bold leading-[0.95] tracking-tighter uppercase text-white"
          >
            El futuro de la innovación depende de quién consigue financiación.
          </motion.h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 mb-10">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 35px rgba(255, 0, 122, 0.35)",
                borderColor: "rgba(255, 0, 122, 0.3)",
              }}
              className={`p-6 lg:p-7 flex flex-col justify-between transition-all duration-300 min-h-[240px] rounded-[1.8rem] border overflow-hidden relative group ${i === 3 ? "bg-black text-white border-zinc-800" : "bg-zinc-900 border-transparent text-white"}`}
            >
              <span className="text-[#ffd600] font-bold uppercase tracking-widest mb-4 text-[10px] lg:text-xs">
                {stat.label}
              </span>
              <h3 className="font-zalando text-4xl sm:text-5xl font-bold transition-all leading-none group-hover:text-[#FF007A] text-white">
                {stat.value}
              </h3>
              <p className="font-roboto mt-4 text-sm lg:text-base leading-relaxed text-gray-400">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
        <div className="flex flex-col items-center gap-4">
          <span className="font-roboto text-xs md:text-sm font-bold text-[#FF007A] uppercase tracking-widest text-center">
            El futuro de la innovación depende de quién consigue financiación.
          </span>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSfU2pAgtSXaryQAGW5GUzGOYOIajQzm8DTBrh9oSWHOthYvDA/viewform?usp=send_form" target="_blank" rel="noopener noreferrer" className="bg-transparent border-[2.5px] border-white text-white px-7 py-3 sm:px-10 sm:py-4 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all rounded-full">
            Aplica a la convocatoria
          </a>
        </div>
      </div>
    </section>
  );
};

const SectionConstruimosCompanias = () => {
  useEffect(() => {
    let anim: NodeAnimation | null = null;
    const initAnim = () => {
      anim = new NodeAnimation(
        "Seccion2",
        "Canvas_Derecha_Personalizado",
        "derecha"
      );
    };
    if (document.readyState === "complete") {
      initAnim();
    } else {
      window.addEventListener("load", initAnim);
    }
    return () => {
      window.removeEventListener("load", initAnim);
      anim?.destroy();
    };
  }, []);

  const items = [
    {
      title: "Mentoría estratégica",
      text: "Con founders y operadores con experiencia real construyendo y escalando compañías.",
      icon: <Compass className="w-7 h-7" />,
    },
    {
      title: "Producto y go-to-market",
      text: "Apoyo en producto, estrategia y entrada al mercado para acelerar la tracción.",
      icon: <Rocket className="w-7 h-7" />,
    },
    {
      title: "Preparación para fundraising",
      text: "Estructuramos la compañía y abrimos acceso directo a nuestra red de inversores.",
      icon: <TrendingUp className="w-7 h-7" />,
    },
    {
      title: "Financiación pública y privada",
      text: "Acceso a ENISA, CDTI y programas europeos. Posible coinversión en compañías del programa.",
      icon: <Landmark className="w-7 h-7" />,
    },
    {
      title: "Espacio de trabajo",
      text: "Sede física en Niage Garage, Málaga, para trabajar codo a codo con el equipo y el ecosistema.",
      icon: <Building2 className="w-7 h-7" />,
    },
    {
      title: "Red de ecosistema",
      text: "Comunidad de mentores, emprendedores e inversores que crece con cada compañía.",
      icon: <Network className="w-7 h-7" />,
    },
  ];

  return (
    <div
      id="Seccion2"
      className="mt-8 md:mt-12 mb-16 py-12 md:py-16 border border-zinc-800 relative overflow-hidden rounded-[3rem] bg-zinc-950 mx-6 lg:mx-20 shadow-sm"
    >
      <canvas
        id="Canvas_Derecha_Personalizado"
        className="absolute inset-0 z-0 w-full h-full"
        style={{
          maskImage: "radial-gradient(circle, black 50%, transparent 95%)",
          WebkitMaskImage:
            "radial-gradient(circle, black 50%, transparent 95%)",
        }}
      />
      <div className="relative z-10 px-6 max-w-7xl mx-auto flex flex-col items-center">
        <div className="text-center mb-12 max-w-3xl">
          <Copete text="Qué ofrecemos" />
          <p className="font-roboto text-xl md:text-2xl text-gray-300 font-medium text-center mt-4 leading-relaxed">
            Acompañamiento real, no genérico: experiencia operativa, capital y
            red puestos al servicio de tu compañía.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-7xl mx-auto px-2 sm:px-6">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 20px 50px rgba(255, 0, 122, 0.25)",
                borderColor: "#FF007A",
              }}
              className="h-full bg-zinc-900/90 backdrop-blur-sm border border-zinc-800 shadow-2xl rounded-[2rem] flex flex-col items-start text-left p-6 md:p-8 group transition-all duration-500 cursor-pointer"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 bg-[#FF007A]/10 flex items-center justify-center rounded-full text-[#FF007A] group-hover:bg-[#FF007A] group-hover:text-white transition-all duration-500 mb-4 shrink-0">
                {item.icon}
              </div>
              <h4 className="font-zalando text-lg md:text-xl font-bold text-white uppercase tracking-tight leading-tight mb-3">
                {item.title}
              </h4>
              <p className="font-roboto text-sm md:text-base font-medium text-gray-400 leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SectionTargetProfile = () => (
  <div className="max-w-6xl mx-auto px-6 pb-16">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{
        scale: 1.01,
        boxShadow: "0 20px 50px rgba(255, 214, 0, 0.15)",
      }}
      className="border-[3px] border-zinc-800 hover:border-[#ffd600] transition-all duration-500 flex flex-col rounded-[3rem] overflow-hidden bg-zinc-900 shadow-sm group"
    >
      <div className="flex flex-col lg:flex-row w-full">
        <div className="lg:w-2/5 h-64 lg:h-auto overflow-hidden relative">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1573165231977-3f0e27806045?auto=format&fit=crop&w=1000&q=80"
            alt="Perfil que buscamos"
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500"></div>
          <div className="absolute top-6 left-6 bg-black border border-zinc-700 px-4 py-1.5 text-[10px] md:text-xs font-bold uppercase tracking-widest shadow-sm rounded-full text-white">
            Target Profile
          </div>
        </div>
        <div className="lg:w-3/5 p-6 md:p-10 lg:p-12 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-zinc-800">
          <h3 className="font-zalando text-3xl md:text-5xl font-bold uppercase tracking-tighter text-white mb-6 leading-[0.95]">
            Fundadoras que <br className="hidden md:block" />{" "}
            <span className="text-[#FF007A]">construyen en serio</span>
          </h3>
          <div className="space-y-4 md:space-y-6">
            {[
              "Liderazgo femenino ≥ 51%",
              "MVP o producto en fase avanzada",
              "Ambición de escala internacional",
              "Equipo full-time comprometido",
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 group/item"
              >
                <div className="mt-1 bg-zinc-800 group-hover/item:bg-[#ffd600]/20 p-2 rounded-xl shrink-0 transition-colors duration-300">
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover/item:text-[#FF007A] transition-colors duration-300" />
                </div>
                <p className="font-roboto text-base md:text-lg text-gray-400 font-medium leading-relaxed pt-0.5 group-hover/item:text-white transition-colors duration-300">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full bg-zinc-950 p-6 md:p-10 flex flex-col gap-8">
        <div>
          <h4 className="font-zalando text-xl md:text-2xl font-bold text-white uppercase tracking-widest mb-6">
            Sectores prioritarios
          </h4>
          <div className="flex flex-wrap gap-3">
            {[
              "HealthTech",
              "AgriTech",
              "RetailTech",
              "EdTech",
              "Defensa / Dual-Use",
              "IA & Data",
              "Cultural tech",
            ].map((sector, i) => (
              <div
                key={i}
                className="bg-zinc-800 border border-zinc-700 text-gray-300 px-4 py-2 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider hover:bg-[#FF007A] hover:text-white hover:border-[#FF007A] transition-colors"
              >
                {sector}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-8 border-t border-zinc-800 relative">
          <div className="absolute top-14 left-0 w-full h-1 bg-zinc-800 rounded-full hidden md:block"></div>
          <div className="flex flex-col md:flex-row justify-between relative z-10 gap-6 md:gap-0">
            {[
              { date: "15 Abr 2026", label: "Apertura", color: "text-[#ffd600]" },
              { date: "15 Jun 2026", label: "Cierre", color: "text-[#FF007A]" },
              { date: "Sep 2026", label: "Inicio", color: "text-white" },
            ].map(({ date, label, color }) => (
              <div
                key={label}
                className="flex flex-col items-start md:items-center text-left md:text-center group/time"
              >
                <div className="w-4 h-4 rounded-full bg-zinc-700 mb-3 md:mb-4 border-2 border-zinc-950 group-hover/time:scale-125 transition-all"></div>
                <span
                  className={`font-zalando font-bold text-sm md:text-base uppercase tracking-widest ${color}`}
                >
                  {date}
                </span>
                <span className="font-roboto text-gray-400 text-xs md:text-sm font-medium uppercase tracking-widest mt-1">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  </div>
);

const SectionCredencialesNiage = () => (
  <section
    id="Seccion3"
    className="relative py-16 md:py-24 px-6 overflow-hidden rounded-[3rem] mb-16 border border-zinc-800 bg-zinc-950 mx-6 lg:mx-20"
  >
    <div className="absolute inset-0 z-0 opacity-[0.4]">
      <svg width="100%" height="100%">
        <defs>
          <pattern
            id="tech-pattern"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.5" fill="#FF007A" />
            <path
              d="M 100 0 L 0 0 0 100"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1"
            />
            <path
              d="M 20 20 L 40 20 L 40 40"
              fill="none"
              stroke="#FF007A"
              strokeWidth="1.5"
            />
            <path
              d="M 80 80 L 80 60 L 60 60"
              fill="none"
              stroke="#FF007A"
              strokeWidth="1.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#tech-pattern)" />
      </svg>
    </div>
    <div className="absolute inset-0 z-0 bg-gradient-to-b from-zinc-950 via-transparent to-zinc-950"></div>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="max-w-5xl mx-auto text-center relative z-10 space-y-6"
    >
      <div className="flex flex-col items-center">
        <Copete text="Credenciales Niage" />
        <h3 className="font-zalando text-3xl md:text-4xl lg:text-6xl font-bold text-white uppercase tracking-tighter leading-[0.95] mb-4">
          +15 años ejecutando para empresas líderes del mercado
        </h3>
      </div>
      <p className="font-roboto text-lg md:text-xl lg:text-2xl text-gray-400 font-medium max-w-3xl mx-auto leading-relaxed">
        Inception Woman Lab está respaldada por{" "}
        <a
          href="https://niage.es"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#FF007A] hover:underline"
        >
          Niage Technology
        </a>
        , compañía tecnológica con más de 15 años desarrollando soluciones para
        organizaciones como:
      </p>
      <div className="pt-8 overflow-hidden flex w-full relative opacity-50">
        <div className="flex whitespace-nowrap animate-marquee-slow w-fit">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center">
              {["Repsol", "Claro", "FCC", "Allgeier"].map((brand) => (
                <React.Fragment key={brand}>
                  <span className="font-zalando font-bold text-2xl md:text-4xl uppercase tracking-widest mx-8 text-white">
                    {brand}
                  </span>
                  <span className="text-[#FF007A] text-2xl md:text-4xl font-bold mx-2">
                    ·
                  </span>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  </section>
);

const SectionLasStartupsNoEscalanSolas = () => {
  useEffect(() => {
    let anim: NodeAnimation | null = null;
    const initAnim = () => {
      anim = new NodeAnimation("Seccion1", "Canvas1", "esquinas");
    };
    if (document.readyState === "complete") {
      initAnim();
    } else {
      window.addEventListener("load", initAnim);
    }
    return () => {
      window.removeEventListener("load", initAnim);
      anim?.destroy();
    };
  }, []);

  return (
    <div
      id="Seccion1"
      className="relative overflow-hidden rounded-[3rem] py-12 md:py-16 mb-16 mx-6 lg:mx-20 bg-zinc-950 border border-zinc-800 shadow-sm"
    >
      <canvas
        id="Canvas1"
        className="absolute inset-0 z-0 w-full h-full"
        style={{
          maskImage: "radial-gradient(circle, black 65%, transparent 95%)",
          WebkitMaskImage:
            "radial-gradient(circle, black 65%, transparent 95%)",
        }}
      />
      <div className="relative z-10 px-6 lg:px-12 max-w-7xl mx-auto text-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12 text-left">
          <div className="lg:col-span-6">
            <Copete text="Red y alianzas" />
            <motion.h2 className="font-zalando text-[clamp(2.5rem,6vw,5.5rem)] font-bold uppercase tracking-tighter mb-6 leading-[0.95] text-white">
              Las startups no <br /> escalan solas
            </motion.h2>
            <div className="flex items-start gap-4 md:gap-6 mb-8">
              <div className="h-10 md:h-14 w-1 bg-[#FF007A] shrink-0" />
              <p className="font-roboto text-xl md:text-2xl font-medium text-gray-300 leading-tight max-w-md">
                Por eso Inception Woman Lab opera conectada a una red
                institucional y privada que aporta acceso a financiación,
                conocimiento e innovación.
              </p>
            </div>
          </div>
          <div className="lg:col-span-6 flex flex-col items-center justify-center pt-4 md:pt-8 w-full">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 w-full">
              {RED_MARCAS.map((marca, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className={`bg-zinc-900 border border-zinc-800 py-4 px-2 rounded-xl flex items-center justify-center shadow-md ${idx === 6 ? "col-span-2 sm:col-span-1" : ""}`}
                >
                  <span className="font-zalando font-bold uppercase tracking-widest text-center text-xs text-gray-300">
                    {marca}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-10">
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSfU2pAgtSXaryQAGW5GUzGOYOIajQzm8DTBrh9oSWHOthYvDA/viewform?usp=send_form" target="_blank" rel="noopener noreferrer" className="bg-transparent border-[2.5px] border-white text-white px-7 py-3 sm:px-10 sm:py-4 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all rounded-full">
            Aplica a la convocatoria
          </a>
        </div>
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-black text-white pt-16 md:pt-24 pb-8 md:pb-12 px-6 lg:px-20 border-t-[8px] md:border-t-[12px] border-[#FF007A]">
    <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
      <motion.h2 className="font-zalando text-[clamp(2.5rem,8vw,7rem)] font-bold uppercase tracking-tighter mb-8 md:mb-10 leading-[0.9]">
        ¿Te reconoces? <br className="hidden md:block" />
        <span className="text-gray-600">Entonces hablemos.</span>
      </motion.h2>
      <motion.a href="https://docs.google.com/forms/d/e/1FAIpQLSfU2pAgtSXaryQAGW5GUzGOYOIajQzm8DTBrh9oSWHOthYvDA/viewform?usp=send_form" target="_blank" rel="noopener noreferrer" className="bg-[#FF007A] text-white px-10 py-5 md:px-16 md:py-6 text-lg md:text-3xl font-black uppercase tracking-widest hover:bg-[#ffd600] hover:text-black transition-all rounded-full mb-12 md:mb-20">
        Aplica a la convocatoria
</motion.a>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 text-left border-t border-zinc-800 pt-8 md:pt-12 relative z-10">
        <div>
          <span className="text-[#ffd600] flex items-center gap-2 font-bold uppercase text-[10px] md:text-xs tracking-widest block mb-3 md:mb-4">
            <MapPin className="w-3 h-3" /> Dónde estamos
          </span>
          <p className="font-roboto text-base md:text-lg font-normal text-gray-300 leading-relaxed">
            Niage Garage · Ancha del Carmen 32, Málaga.
          </p>
        </div>
        <div>
          <span className="text-[#ffd600] flex items-center gap-2 font-bold uppercase text-[10px] md:text-xs tracking-widest block mb-3 md:mb-4">
            <Mail className="w-3 h-3" /> Email
          </span>
          <a
            href="mailto:info@inceptionwlab.es"
            className="font-roboto text-base md:text-lg font-normal text-gray-300 hover:text-white hover:underline decoration-[#FF007A] transition-all"
          >
            info@inceptionwlab.es
          </a>
        </div>
        <div>
          <span className="text-[#ffd600] flex items-center gap-2 font-bold uppercase text-[10px] md:text-xs tracking-widest block mb-3 md:mb-4">
            <Phone className="w-3 h-3" /> Teléfono
          </span>
          <a
            href="tel:+34951838292"
            className="font-roboto text-base md:text-lg font-normal text-gray-300 hover:text-white hover:underline decoration-[#FF007A] transition-all"
          >
            34 951 838 292
          </a>
        </div>
      </div>
      <div className="w-full mt-12 md:mt-16 pt-6 md:pt-8 border-t border-zinc-900 flex flex-col-reverse md:flex-row justify-between items-center gap-6 text-gray-600 text-xs md:text-sm font-bold uppercase tracking-wider relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
          <span>© 2026 Inception Woman Lab. Todos los derechos reservados.</span>
          <span className="text-[#FF007A]">Powered by Niage</span>
        </div>
        <div className="w-8 h-8 md:w-10 md:h-10 bg-zinc-900 text-gray-500 flex items-center justify-center font-black rounded-lg">
          W
        </div>
      </div>
    </div>
  </footer>
);

// --- EXPORT PRINCIPAL ---

export default function InceptionWomanLab() {
  return (
    <div className="relative min-h-screen bg-black font-roboto selection:bg-[#FF007A] selection:text-white antialiased overflow-x-hidden">
      <div className="fixed inset-0 z-[9999] pointer-events-none bg-noise mix-blend-screen opacity-20 invert"></div>
      <Hero />
      <Ticker />
      <TeamSection />
      <Incubadoras />
      <Statement />
      <SectionConstruimosCompanias />
      <SectionTargetProfile />
      <SectionCredencialesNiage />
      <SectionLasStartupsNoEscalanSolas />
      <Footer />
    </div>
  );
}
