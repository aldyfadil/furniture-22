/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Leaf, 
  Wind, 
  Sun, 
  Moon, 
  Volume2, 
  VolumeX, 
  ArrowRight, 
  TreePine, 
  Layers, 
  Droplets,
  ChevronRight,
  Menu,
  X,
  Instagram,
  Facebook,
  Twitter
} from 'lucide-react';

// --- Constants & Data ---

const PRIMARY_FONTS = "font-serif";
const SANS_FONTS = "font-sans";

const PRODUCTS = [
  {
    id: 1,
    name: "Terra Lounge",
    description: "Dikerjakan dengan tangan dari kayu ek pilihan dan linen organik.",
    price: "Rp 18.500.000",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=800",
    texture: "https://images.unsplash.com/photo-1516147343209-787095689100?q=80&w=800",
    tag: "Unggulan"
  },
  {
    id: 2,
    name: "Konsol Driftwood",
    description: "Bersumber secara berkelanjutan dengan sentuhan alami live-edge.",
    price: "Rp 12.900.000",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=800",
    texture: "https://images.unsplash.com/photo-1505691938895-1758d7eaa511?q=80&w=800",
    tag: "Terlaris"
  },
  {
    id: 3,
    name: "Rak Bamboo Haven",
    description: "Penyimpanan vertikal modular untuk rumah modern ramah lingkungan.",
    price: "Rp 6.750.000",
    image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=800",
    texture: "https://images.unsplash.com/photo-1616489953149-8c7639199347?q=80&w=800",
    tag: "Terbaru"
  }
];

const MATERIALS = [
  { name: "Kayu Solid", icon: TreePine, desc: "Kayu berkelanjutan bersertifikat FSC." },
  { name: "Bambu", icon: Wind, desc: "Material cepat tumbuh dengan dampak karbon positif." },
  { name: "Kain Eco", icon: Layers, desc: "Serat daur ulang dan katun organik." }
];

const ROOMS = [
  { title: "Ruang Tamu Alami", image: "https://images.unsplash.com/photo-1617103996702-96ff29b1c467?q=80&w=1200", size: "tall" },
  { title: "Ruang Kerja Tenang", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000", size: "wide" },
  { title: "Kamar Tidur Nyaman", image: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=1200", size: "square" },
  { title: "Ruang Makan Organik", image: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?q=80&w=1000", size: "tall" }
];

// --- Components ---

const Navbar = ({ isDark, setIsDark, isSoundOn, setIsSoundOn }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-cream-light/95 dark:bg-dark-earth/95 backdrop-blur-md py-4 border-b border-olive/5 shadow-sm' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-full bg-olive flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500">
            <div className="w-4 h-4 border-2 border-white rounded-sm rotate-45"></div>
          </div>
          <span className={`text-xl font-serif font-semibold tracking-tight ${isScrolled ? 'text-olive' : 'text-dark-earth dark:text-cream-light'}`}>
            TerraForma <span className="font-light italic">Living</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10">
          {['Koleksi', 'Filosofi', 'Ruang', 'Toko'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-60 hover:opacity-100 hover:text-olive transition-all">
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <button onClick={() => setIsSoundOn(!isSoundOn)} className="p-2 hover:bg-olive/5 rounded-full text-olive transition-colors hidden sm:block">
            {isSoundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
          <button onClick={() => setIsDark(!isDark)} className="p-2 hover:bg-olive/5 rounded-full text-olive transition-colors">
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="btn-outline !px-6 !py-2 hidden md:block">
            Kontak
          </button>
          <button onClick={() => setMobileMenuOpen(true)} className="md:hidden p-2 text-olive">
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-cream dark:bg-dark-earth z-[60] flex flex-col p-8"
          >
            <div className="flex justify-end">
              <button onClick={() => setMobileMenuOpen(false)}><X size={32} /></button>
            </div>
            <div className="flex flex-col space-y-8 mt-12">
              {['Koleksi', 'Filosofi', 'Ruang', 'Toko'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className="text-4xl font-serif">
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section className="relative h-[85vh] md:h-screen flex items-center overflow-hidden mx-6 rounded-[2.5rem] mt-32 md:mt-24">
      <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 image-placeholder">
          <img 
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000" 
            alt="TerraForma Natural Living" 
            className="w-full h-full object-cover brightness-90"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark-earth/50 via-transparent to-transparent"></div>
      </motion.div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-10 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl text-white-warm"
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-[1px] bg-white/40"></div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-80">Hunian Berkelanjutan</span>
          </div>
          <h1 className="text-6xl md:text-8xl leading-[0.95] mb-8 font-serif">
            Bawa Alam <br />
            <span className="italic font-light">Ke Rumah Anda</span>
          </h1>
          <p className="text-sm md:text-base font-light opacity-90 mb-10 leading-relaxed max-w-sm">
            Memadukan estetika modern dengan material organik untuk menciptakan ruang yang menenangkan di setiap sudut.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="btn-primary bg-white-warm text-olive hover:bg-cream hover:text-olive shadow-2xl">
              Lihat Koleksi
            </button>
            <button className="px-8 py-3 rounded-full border border-white/30 backdrop-blur-md text-white-warm text-[10px] uppercase font-bold tracking-widest hover:bg-white/10 transition-all">
              Buku Gaya
            </button>
          </div>
        </motion.div>
      </div>

      <div className="absolute top-12 right-12 w-28 h-28 rounded-full border border-white/20 flex items-center justify-center text-white-warm text-[9px] uppercase tracking-[0.2em] text-center backdrop-blur-sm hidden md:flex leading-relaxed">
        Eco Living<br />Sejak 2024
      </div>
    </section>
  );
};

const Philosophy = () => (
  <section id="philosophy" className="py-32 md:py-48 px-6">
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-card !bg-white-warm dark:!bg-dark-moss p-12 md:p-20"
      >
        <span className="text-olive text-[10px] uppercase tracking-[0.3em] font-bold mb-6 block">Filosofi</span>
        <h2 className="text-4xl md:text-5xl leading-tight mb-8 font-serif text-olive">Keahlian Sadar untuk Hidup Seimbang</h2>
        <p className="text-sm md:text-base text-gray-500 dark:text-cream/60 mb-8 leading-relaxed">
          Kami percaya mebel harus menjadi perpanjangan dari alam. Setiap karya kami diselesaikan dengan tangan menggunakan kayu solid berkelanjutan dan minyak nabati non-toksik yang menghormati integritas material.
        </p>
        <div className="space-y-4 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-wood"></div>
            <span className="text-[11px] font-medium opacity-70">Kayu ek yang diselamatkan</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-olive"></div>
            <span className="text-[11px] font-medium opacity-70">Manufaktur tanpa limbah</span>
          </div>
        </div>
        <button className="btn-outline">Eksplorasi Misi</button>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-soft"
      >
        <img 
          src="https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=1000" 
          alt="Proses Pembuatan" 
          className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-1000"
          referrerPolicy="no-referrer"
        />
      </motion.div>
    </div>
  </section>
);

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="group relative bg-white-warm dark:bg-black/10 rounded-[2rem] p-6 shadow-soft border border-olive/5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-6">
        <AnimatePresence mode="wait">
          {!isHovered ? (
            <motion.img 
              key="image"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
          ) : (
            <motion.img 
              key="texture"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              src={product.texture} 
              alt="Detail tekstur" 
              className="w-full h-full object-cover scale-110"
              referrerPolicy="no-referrer"
            />
          )}
        </AnimatePresence>
        
        <div className="absolute top-4 left-4 bg-white/95 dark:bg-dark-earth/95 backdrop-blur px-3 py-1 rounded-full text-[9px] uppercase tracking-widest font-bold text-olive">
          {product.tag}
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-serif font-semibold text-olive">{product.name}</h3>
          <span className="text-sm font-medium opacity-80">{product.price}</span>
        </div>
        <p className="text-[11px] text-gray-500 dark:text-cream/40 leading-relaxed">{product.description}</p>
        <div className="flex justify-between items-center pt-4 mt-4 border-t border-olive/5">
          <button className="text-[10px] uppercase tracking-widest font-bold text-wood hover:text-olive transition-colors">Detail</button>
          <div className="w-7 h-7 rounded-full border border-olive/20 flex items-center justify-center text-olive group-hover:bg-olive group-hover:text-white transition-all cursor-pointer">
            <ArrowRight size={14} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProductShowcase = () => (
  <section id="koleksi" className="py-24 bg-white-warm dark:bg-dark-moss/20 px-6">
    <div className="max-w-7xl mx-auto text-center mb-16">
      <h2 className="text-5xl mb-4 font-serif">Koleksi Terpilih</h2>
      <p className="text-olive-dark/60 dark:text-cream/60 max-w-lg mx-auto italic">Setiap potong menceritakan kisah hutan dan tangan yang membentuknya.</p>
    </div>
    <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
      {PRODUCTS.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </section>
);

const MaterialHighlight = () => (
  <section className="py-32 px-6 bg-olive text-white-warm relative overflow-hidden">
    <div className="absolute -right-20 -top-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
      <div className="relative order-2 md:order-1">
        <div className="grid grid-cols-2 gap-6">
          <div className="image-placeholder aspect-square rounded-[2rem] shadow-2xl">
            <img src="https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?q=80&w=1200" className="w-full h-full object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-700" alt="Kayu Premium" referrerPolicy="no-referrer" />
          </div>
          <div className="image-placeholder aspect-[3/4] rounded-[2rem] shadow-2xl mt-12">
            <img src="https://images.unsplash.com/photo-1550537687-c91072c4792d?q=80&w=1200" className="w-full h-full object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-700" alt="Kain Organik" referrerPolicy="no-referrer" />
          </div>
        </div>
      </div>

      <div className="order-1 md:order-2">
        <span className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-60 mb-6 block">Material Kami</span>
        <h2 className="text-5xl md:text-6xl mb-10 font-serif leading-tight">Keberlanjutan dalam <br /><span className="italic font-light opacity-80">Setiap Serat</span></h2>
        <div className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="w-2.5 h-2.5 rounded-full bg-wood shadow-sm"></div>
            <span className="text-sm md:text-base font-light tracking-wide">Kayu Oak & Walnut Solid Bersertifikat</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="w-2.5 h-2.5 rounded-full bg-[#A8B49E] shadow-sm"></div>
            <span className="text-sm md:text-base font-light tracking-wide">Komposit Akar Bambu</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="w-2.5 h-2.5 rounded-full bg-white/40 shadow-sm"></div>
            <span className="text-sm md:text-base font-light tracking-wide">100% Kain Eco Daur Ulang</span>
          </div>
        </div>
        <p className="mt-12 text-sm opacity-70 leading-relaxed max-w-sm">
          Kami hanya mengambil material dari hutan di mana pertumbuhan melebihi panen, memastikan jejak kami menuju masa depan yang lebih hijau.
        </p>
      </div>
    </div>
  </section>
);

const RoomInspiration = () => (
  <section id="ruang" className="py-32 px-6 max-w-7xl mx-auto">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
      <div>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-[1px] bg-olive"></div>
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-olive">Inspirasi Ruangan</span>
        </div>
        <h2 className="text-5xl md:text-6xl max-w-lg font-serif">Didesain untuk <span className="italic font-light">Ketenangan</span></h2>
      </div>
      <button className="text-[10px] font-bold tracking-[0.2em] uppercase border-b border-olive pb-2 hover:opacity-60 transition-opacity">Lihat Galeri Santuari</button>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {ROOMS.map((room, i) => (
        <motion.div 
          key={room.title}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          className={`relative group rounded-[2.5rem] overflow-hidden shadow-soft ${
            room.size === 'tall' ? 'md:row-span-2 aspect-[3/5]' : 
            room.size === 'wide' ? 'md:col-span-2 aspect-[16/9]' : 'aspect-square'
          }`}
        >
          <img 
            src={room.image} 
            alt={room.title} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span className="text-white-warm text-xl font-serif italic">{room.title}</span>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

const Testimonials = () => (
  <section className="py-40 bg-cream-dark/30 dark:bg-dark-moss/10 px-6 text-center">
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-center space-x-1 text-olive mb-8">
        {[1,2,3,4,5].map(i => <Leaf key={i} size={16} fill="currentColor" />)}
      </div>
      <blockquote className="text-3xl md:text-5xl font-serif italic mb-12 leading-tight">
        "Masuk ke rumah saya sekarang terasa seperti melangkah ke dalam tempat perlindungan. Kualitas kayu eknya tidak tertandingi—Anda bisa merasakan jiwa dari kayu tersebut."
      </blockquote>
      <cite className="not-italic text-sm tracking-[0.2em] font-bold uppercase text-olive-dark/60 dark:text-cream/60">
        — Elena Vance, Desainer Arsitektur
      </cite>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-cream dark:bg-dark-earth py-20 px-6 border-t border-olive/5">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 justify-center md:justify-start">
          <div className="w-6 h-6 rounded-full bg-olive flex items-center justify-center">
            <div className="w-3 h-3 border-2 border-white rounded-sm rotate-45"></div>
          </div>
          <span className="serif text-xl font-semibold tracking-tight text-olive">TerraForma Living</span>
        </div>
        <p className="text-[10px] text-gray-400 font-light max-w-xs uppercase tracking-widest">© 2024 TerraForma Living — Hak Cipta Dilindungi</p>
      </div>

      <nav className="flex flex-wrap justify-center gap-10 text-[10px] uppercase tracking-[0.2em] font-bold opacity-60">
        <a href="#" className="hover:text-olive hover:opacity-100">Koleksi</a>
        <a href="#" className="hover:text-olive hover:opacity-100">Keberlanjutan</a>
        <a href="#" className="hover:text-olive hover:opacity-100">Ruang</a>
        <a href="#" className="hover:text-olive hover:opacity-100">Jurnal</a>
      </nav>

      <div className="flex gap-6 items-center">
        <span className="text-[10px] font-bold text-olive tracking-widest uppercase cursor-pointer hover:opacity-70">Instagram</span>
        <span className="text-[10px] font-bold text-olive tracking-widest uppercase cursor-pointer hover:opacity-70">Pinterest</span>
        <div className="h-4 w-[1px] bg-gray-300 mx-2"></div>
        <div className="text-[10px] text-gray-400 font-medium">Jakarta, Indonesia</div>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    if (isSoundOn) {
      if (!audioRef.current) {
        audioRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
        audioRef.current.loop = true;
        audioRef.current.volume = 0.05;
      }
      audioRef.current.play().catch(e => console.log("Audio block:", e));
    } else {
      audioRef.current?.pause();
    }
  }, [isSoundOn]);

  return (
    <div className={`min-h-screen selection:bg-olive selection:text-white-warm transition-colors duration-500`}>
      <Navbar 
        isDark={isDark} 
        setIsDark={setIsDark} 
        isSoundOn={isSoundOn} 
        setIsSoundOn={setIsSoundOn} 
      />
      
      <main>
        <Hero />
        <Philosophy />
        <ProductShowcase />
        <MaterialHighlight />
        <RoomInspiration />
        <Testimonials />
        
        {/* Kontribusi Akhir */}
        <section className="py-32 px-6">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-5xl mx-auto bg-olive rounded-[3rem] p-12 md:p-24 text-center text-white-warm overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <h2 className="text-4xl md:text-7xl mb-8 relative z-10 leading-tight font-serif">Mulai Ciptakan <br /> <span className="italic font-light">Ruang Tenang Anda</span></h2>
            <button className="bg-white text-olive px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform relative z-10">
              Mulai Mendesain
            </button>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
