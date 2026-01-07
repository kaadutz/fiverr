import { useState, useEffect } from 'react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // Nomor WA Admin
  const waNumber = "6281807852840";

  const createWaLink = (message: string) => {
    return `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
  };

  // State Theme
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      setShowBackToTop(currentScrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- KOMPONEN DIVIDER (Garis Pemisah Antar Section Utama) ---
  const SectionDivider = () => (
    <div className="w-full flex justify-center items-center py-16">
      <div className="h-px bg-primary/40 w-full max-w-sm"></div>
    </div>
  );

  // --- Assets ---
  const heroImage = "/hero-bg.png";
  const keleponImage = "/kelepon.png";
  const esPotengImage = "/es-poteng.png";

  return (
    <div className="bg-cream-parchment dark:bg-forest-deep font-body text-secondary dark:text-text-light antialiased min-h-screen selection:bg-primary selection:text-white transition-colors duration-500 relative">
      
      {/* Global Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-0 dark:opacity-10 bg-heritage-pattern z-0 mix-blend-overlay"></div>
      
      <div className="relative z-10 flex min-h-screen w-full flex-col overflow-x-hidden">
        
        {/* --- HEADER --- */}
        <header 
          className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between whitespace-nowrap px-6 py-4 lg:px-20 transition-all duration-500 ${
            scrolled 
              ? 'bg-cream-parchment/95 dark:bg-[#052e21]/95 shadow-lg backdrop-blur-md py-3 border-b border-primary/10' 
              : 'bg-transparent py-5 border-b border-transparent'
          }`}
        >
          <div className="flex items-center gap-3 cursor-pointer group" onClick={scrollToTop}>
            <img 
              src="/logo-fiverr.png" 
              alt="Fiverr Culinary Logo" 
              className="h-10 lg:h-12 w-auto object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
            />
            <h2 className="hidden sm:block text-forest-deep dark:text-gold-aged text-lg font-display font-bold leading-tight">
              Kuliner <br/><span className="text-primary">Nusa Tenggara Barat</span>
            </h2>
          </div>
          
          <div className="hidden lg:flex flex-1 justify-end gap-6 items-center">
            <nav className="flex items-center gap-8">
              {['Beranda', 'Menu', 'Tentang Kami', 'Kontak'].map((item, idx) => {
                 const target = item === 'Beranda' ? 'root' : item === 'Tentang Kami' ? 'about' : item === 'Kontak' ? 'contact' : 'menu';
                 const action = item === 'Beranda' ? scrollToTop : () => scrollToSection(target);
                 return (
                   <button key={idx} onClick={action} className="text-forest-deep dark:text-gray-300 text-sm font-bold hover:text-primary dark:hover:text-gold-aged transition-colors tracking-wide">
                     {item}
                   </button>
                 )
              })}
            </nav>

            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full bg-black/5 dark:bg-white/5 text-forest-deep dark:text-gold-aged border border-transparent dark:border-gold-aged/30 hover:bg-primary hover:text-white transition-all"
            >
              <span className="material-symbols-outlined text-xl align-middle">
                {theme === 'dark' ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            <a 
              href={createWaLink("Halo, saya ingin memesan menu dari Fiver.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 items-center justify-center rounded-full bg-primary px-6 text-white transition-transform hover:scale-105 hover:bg-gold-aged text-sm font-display font-bold shadow-lg shadow-primary/30"
            >
              Pesan Sekarang
            </a>
          </div>

          <div className="lg:hidden flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 rounded-full bg-black/5 dark:bg-white/10 text-forest-deep dark:text-gold-aged">
              <span className="material-symbols-outlined text-xl align-middle">
                {theme === 'dark' ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
            <button className="p-2 text-forest-deep dark:text-text-light" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <span className="material-symbols-outlined text-3xl">{isMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </header>

        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-cream-parchment/98 dark:bg-[#052e21]/98 backdrop-blur-xl pt-24 px-6 animate-fade-in-up">
            <nav className="flex flex-col gap-6 text-center">
              <button onClick={() => {scrollToTop(); setIsMenuOpen(false)}} className="text-2xl font-display font-bold text-forest-deep dark:text-gold-aged">Beranda</button>
              <button onClick={() => {scrollToSection('menu'); setIsMenuOpen(false)}} className="text-2xl font-display font-bold text-forest-deep dark:text-gold-aged">Menu</button>
              <button onClick={() => {scrollToSection('about'); setIsMenuOpen(false)}} className="text-2xl font-display font-bold text-forest-deep dark:text-gold-aged">Tentang Kami</button>
              <button onClick={() => {scrollToSection('contact'); setIsMenuOpen(false)}} className="text-2xl font-display font-bold text-forest-deep dark:text-gold-aged">Kontak</button>
            </nav>
          </div>
        )}

        {/* --- HERO SECTION --- */}
        <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${heroImage}")` }}>
            <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
            {/* Gradient Fade yang lebih halus menyatu dengan background section bawah */}
            <div className="absolute inset-0 bg-gradient-to-t from-cream-parchment dark:from-forest-deep via-transparent to-transparent opacity-100 h-full"></div>
            {/* Extra Gradient di bawah banget biar seamless */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-cream-parchment dark:from-forest-deep to-transparent"></div>
          </div>

          <div className="relative z-10 text-center max-w-4xl mx-auto p-6 animate-fade-in-up">
            <span className="rounded-full bg-white/10 backdrop-blur-md px-6 py-2 text-xs font-display font-bold uppercase tracking-[0.2em] text-gold-aged border border-gold-aged/50 mb-6 inline-block shadow-xl">
              Kualitas Rasa Bumi Gora
            </span>
            <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-display font-extrabold leading-tight tracking-tight drop-shadow-2xl mb-6">
              Cita Rasa Asli Nusantara <br/>
              <span className="text-primary italic">dari Nusa Tenggara Barat</span>
            </h1>
            <p className="text-gray-100 text-lg sm:text-xl font-body font-light leading-relaxed max-w-2xl mx-auto mb-10 drop-shadow-md">
              Nikmati kelezatan tradisional Kelepon Kecerit dan segarnya Es Poteng, persembahan istimewa dari kelompok PKKWU dengan sentuhan khas NTB yang otentik.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <button onClick={() => scrollToSection('menu')} className="h-14 min-w-[180px] rounded-full bg-primary px-8 text-white text-lg font-display font-bold shadow-xl shadow-primary/40 transition-all hover:scale-105 hover:bg-gold-aged">
                Jelajahi Rasa
              </button>
              <button onClick={() => scrollToSection('about')} className="h-14 min-w-[180px] rounded-full bg-white/10 border-2 border-white/30 backdrop-blur-sm px-8 text-white text-lg font-display font-bold transition-all hover:bg-white/20 hover:border-white">
                Tentang Kami
              </button>
            </div>
          </div>
        </section>

        {/* --- MENU SECTION --- */}
        <section className="px-4 lg:px-20 py-16 relative transition-colors duration-500" id="menu">
          <div className="container mx-auto max-w-[1200px]">
            
            {/* Section Header dengan Divider Emas */}
            <div className="text-center mb-24 animate-fade-in-up pt-10">
               <div className="flex items-center justify-center gap-6">
                  <div className="h-[2px] w-12 sm:w-24 bg-primary"></div>
                  <h2 className="text-primary font-display font-bold tracking-[0.2em] uppercase text-sm sm:text-base">
                    Menu Spesial
                  </h2>
                  <div className="h-[2px] w-12 sm:w-24 bg-primary"></div>
               </div>
               <h2 className="text-forest-deep dark:text-white text-4xl sm:text-5xl font-display font-extrabold mt-4 mb-4">
                Menu Andalan Kami
              </h2>
              <p className="text-secondary/80 dark:text-gray-400 max-w-lg mx-auto font-body">
                Rasakan perpaduan sempurna antara resep leluhur dan bahan-bahan lokal pilihan.
              </p>
            </div>

            {/* ITEM 1: KELEPON KECERIT */}
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-32 group">
              <div className="lg:w-1/2 order-2 lg:order-1">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-primary/20 text-primary p-2 rounded-full">
                    <span className="material-symbols-outlined text-lg">star</span>
                  </span>
                  <span className="text-primary font-bold text-sm uppercase tracking-wider">Warisan Terbaik</span>
                </div>
                <h3 className="text-4xl lg:text-5xl font-display font-bold text-forest-deep dark:text-white mb-6">
                  Kelepon Kecerit
                </h3>
                <p className="text-lg text-secondary dark:text-gray-300 leading-relaxed mb-6 font-body">
                  Sensasi manis gula aren cair yang meledak <span className="text-primary font-bold italic">(kecerit)</span> di mulut, berpadu dengan gurihnya kelapa parut.
                </p>
                <div className="text-3xl font-display font-bold text-primary mb-8">
                  Rp 15.000 <span className="text-base text-secondary/60 dark:text-gray-500 font-body font-normal">/ porsi</span>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  {[
                    {icon: 'water_drop', title: 'Gula Aren Asli', desc: 'Lumer sempurna'},
                    {icon: 'eco', title: 'Tanpa Pengawet', desc: 'Segar alami'},
                    {icon: 'menu_book', title: 'Resep Warisan', desc: 'Asli Sasak'}
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white/50 dark:bg-emerald-900/30 p-4 rounded-xl border border-primary/10 shadow-sm hover:shadow-md transition-all">
                      <span className="material-symbols-outlined text-primary mb-2">{item.icon}</span>
                      <h4 className="font-bold text-forest-deep dark:text-white text-sm mb-1 font-display">{item.title}</h4>
                      <p className="text-xs text-secondary/70 dark:text-gray-400 font-body">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <a 
                  href={createWaLink("Halo, saya mau pesan Kelepon Kecerit.")}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="h-12 px-8 inline-flex items-center justify-center rounded-lg bg-primary text-white font-bold shadow-lg shadow-primary/30 hover:bg-gold-aged hover:translate-y-[-2px] transition-all"
                >
                  Pesan Kelepon
                </a>
              </div>

              <div className="lg:w-1/2 order-1 lg:order-2 relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 ring-1 ring-white/10">
                  <img src={keleponImage} alt="Kelepon Kecerit" className="w-full h-[400px] sm:h-[500px] object-cover image-sensory-filter hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
              </div>
            </div>

            <SectionDivider />

            {/* ITEM 2: ES POTENG */}
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mt-16">
              <div className="lg:w-1/2 relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl -rotate-2 hover:rotate-0 transition-transform duration-500 ring-1 ring-white/10">
                  <img src={esPotengImage} alt="Es Poteng" className="w-full h-[400px] sm:h-[500px] object-cover image-sensory-filter hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
              </div>

              <div className="lg:w-1/2">
                <h3 className="text-4xl lg:text-5xl font-display font-bold text-forest-deep dark:text-white mb-6">
                  Es Poteng
                </h3>
                <p className="text-lg text-secondary dark:text-gray-300 leading-relaxed mb-6 font-body">
                  Kesegaran tape singkong fermentasi yang manis dan lembut, disajikan dingin untuk melepas dahaga. Hidangan penutup legendaris yang memanjakan lidah.
                </p>
                <div className="text-3xl font-display font-bold text-primary mb-8">
                  Rp 12.000 <span className="text-base text-secondary/60 dark:text-gray-500 font-body font-normal">/ mangkuk</span>
                </div>

                {/* Features List (Kartu Hijau Transparan) */}
                <div className="space-y-4 mb-8">
                  {[
                    {icon: 'thumb_up', title: 'Tape Singkong Pilihan', desc: 'Singkong berkualitas tinggi yang difermentasi dengan sempurna', color: 'bg-blue-100 text-blue-600', darkColor: 'dark:text-blue-300 dark:bg-blue-900/40'},
                    {icon: 'ac_unit', title: 'Segar & Alami', desc: 'Tanpa pemanis buatan, manis murni dari fermentasi', color: 'bg-teal-100 text-teal-600', darkColor: 'dark:text-teal-300 dark:bg-teal-900/40'},
                    {icon: 'history_edu', title: 'Cita Rasa Khas', desc: 'Hidangan penutup legendaris khas masyarakat Sasak', color: 'bg-orange-100 text-orange-600', darkColor: 'dark:text-orange-300 dark:bg-orange-900/40'}
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-white/50 dark:bg-emerald-900/30 border border-primary/10 hover:border-primary/40 transition-colors">
                      <div className={`p-2 rounded-lg ${item.color} ${item.darkColor}`}>
                        <span className="material-symbols-outlined">{item.icon}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-forest-deep dark:text-white font-display">{item.title}</h4>
                        <p className="text-sm text-secondary/70 dark:text-gray-400 font-body">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <a 
                  href={createWaLink("Halo, saya mau pesan Es Poteng.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-12 px-8 inline-flex items-center justify-center rounded-lg border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all shadow-lg shadow-primary/10"
                >
                  Pesan Es Poteng
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* --- ABOUT SECTION (Updated Values) --- */}
        <section className="px-4 lg:px-20 py-24 bg-gold-aged/5 dark:bg-black/20 backdrop-blur-sm" id="about">
          <div className="container mx-auto max-w-[900px]">
            <div className="bg-cream-parchment dark:bg-[#052e21] border border-gold-aged/20 rounded-[3rem] p-12 lg:p-16 text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/20 rounded-full blur-3xl mix-blend-screen"></div>
              
              <div className="relative z-10">
                <div className="size-20 bg-gold-aged/20 text-primary rounded-full flex items-center justify-center mx-auto mb-6 ring-4 ring-white/10">
                  <span className="material-symbols-outlined text-4xl">groups</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-display font-bold text-forest-deep dark:text-gold-aged mb-6 leading-tight">
                  Dibuat dengan Cinta oleh Kelompok Fiver
                </h2>
                <p className="text-lg text-secondary dark:text-gray-300 leading-relaxed mb-12 font-body">
                  Kami berdedikasi untuk melestarikan kuliner tradisional Nusantara. Melalui <span className="font-bold text-primary">Produk kami</span>, hadir memperkenalkan kekayaan rasa Bumi Gora kepada dunia.
                </p>

                {/* Updated Values Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-t border-gold-aged/20 pt-10">
                  {[
                    { 
                      icon: 'agriculture', 
                      title: 'Bahan Baku 100%', 
                      desc: 'Organik dari petani lokal' 
                    },
                    { 
                      icon: 'recycling', 
                      title: 'Ramah Lingkungan', 
                      desc: 'Proses produksi minim limbah' 
                    },
                    { 
                      icon: 'package_2', 
                      title: 'Eco Packaging', 
                      desc: 'Kemasan aman & berkelanjutan' 
                    },
                    { 
                      icon: 'history_edu', 
                      title: 'Resep Warisan', 
                      desc: 'Melestarikan cita rasa leluhur' 
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-3 p-4 hover:bg-white/5 rounded-xl transition-colors">
                      <div className="p-3 rounded-full bg-primary/10 text-primary mb-2">
                        <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                      </div>
                      <h4 className="text-xl font-bold text-forest-deep dark:text-gold-aged font-display">{item.title}</h4>
                      <p className="text-sm text-secondary/70 dark:text-gray-400 font-body max-w-[200px] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="bg-forest-deep dark:bg-[#021812] text-white py-16 px-6 lg:px-20 border-t-4 border-primary" id="contact">
          <div className="container mx-auto max-w-[1200px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              <div>
                <div className="flex items-center gap-2 text-gold-aged mb-6">
                  <span className="material-symbols-outlined text-3xl">restaurant</span>
                  <h3 className="text-xl font-display font-bold leading-tight">Beranda Kuliner <br/>NTB</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed font-body">
                  Menghadirkan kehangatan tradisi Nusa Tenggara Barat ke meja makan Anda.
                </p>
              </div>

              <div>
                <h4 className="text-gold-aged font-bold mb-6 font-display">Menu</h4>
                <ul className="space-y-3 text-sm text-gray-300 font-body">
                  <li><button onClick={() => scrollToSection('menu')} className="hover:text-primary transition-colors">Kelepon Kecerit</button></li>
                  <li><button onClick={() => scrollToSection('menu')} className="hover:text-primary transition-colors">Es Poteng</button></li>
                </ul>
              </div>

              <div>
                <h4 className="text-gold-aged font-bold mb-6 font-display">Kontak</h4>
                <ul className="space-y-3 text-sm text-gray-300 font-body">
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-xs">call</span> 
                    <a href={`https://wa.me/${waNumber}`} className="hover:text-primary">+62 818-0785-2840</a>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-xs">location_on</span> Jakarta
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-gold-aged font-bold mb-6 font-display">Ikuti Kami</h4>
                <div className="flex gap-4">
                  {/* IG Logo */}
                  <a href="#" className="size-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                     <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                  {/* FB Logo */}
                  <a href="#" className="size-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                     <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  {/* WA Logo */}
                  <a href={`https://wa.me/${waNumber}`} className="size-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                     <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-body">
              <p>© 2025 Kelompok Fiver. All rights reserved.</p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-white">Privacy Policy</a>
                <a href="#" className="hover:text-white">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>

        {/* --- BACK TO TOP --- */}
        <button onClick={scrollToTop} className={`fixed bottom-6 right-6 z-50 p-3 rounded-full bg-primary text-white shadow-xl transition-all duration-300 transform hover:bg-gold-aged hover:scale-110 ${showBackToTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} title="Kembali ke Atas">
          <span className="material-symbols-outlined text-2xl">arrow_upward</span>
        </button>

      </div>
    </div>
  )
}

export default App
