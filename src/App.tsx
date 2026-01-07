import { useState, useEffect } from 'react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Efek untuk mendeteksi scroll agar navbar berubah transparan/solid
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fungsi untuk Smooth Scroll ke section tertentu
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false); // Tutup menu mobile jika diklik
    }
  };

  // =========================================
  // BAGIAN GAMBAR LOKAL
  // =========================================
  // Pastikan file gambar dengan nama persis seperti di bawah ini
  // sudah ada di dalam folder 'public' di proyek Anda.
  
  const heroImage = "/hero-bg.png";
  const keleponImage = "/kelepon.png";
  const esPotengImage = "/es-poteng.png";
  // =========================================


  return (
    <div className="bg-cream-parchment dark:bg-forest-deep font-body text-secondary dark:text-text-light antialiased min-h-screen selection:bg-primary selection:text-white">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        
        {/* --- HEADER / NAVBAR --- */}
        <header 
          className={`sticky top-0 z-50 flex items-center justify-between whitespace-nowrap px-6 py-4 lg:px-20 transition-all duration-300 ${
            scrolled 
              ? 'bg-cream-parchment/95 dark:bg-forest-deep/95 shadow-md backdrop-blur-sm py-3' 
              : 'bg-transparent py-5'
          }`}
        >
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-white shadow-lg">
              <span className="material-symbols-outlined text-2xl">restaurant_menu</span>
            </div>
            <h2 className="text-forest-deep dark:text-gold-aged text-lg font-display font-bold leading-tight">
              Beranda Kuliner <br/><span className="text-primary">NTB</span>
            </h2>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex flex-1 justify-end gap-8 items-center">
            <nav className="flex items-center gap-8">
              <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="text-forest-deep dark:text-text-light text-sm font-bold hover:text-primary transition-colors">Beranda</button>
              <button onClick={() => scrollToSection('menu')} className="text-forest-deep dark:text-text-light text-sm font-bold hover:text-primary transition-colors">Menu</button>
              <button onClick={() => scrollToSection('about')} className="text-forest-deep dark:text-text-light text-sm font-bold hover:text-primary transition-colors">Tentang Kami</button>
              <button onClick={() => scrollToSection('contact')} className="text-forest-deep dark:text-text-light text-sm font-bold hover:text-primary transition-colors">Kontak</button>
            </nav>
            <button 
              onClick={() => scrollToSection('menu')}
              className="flex h-10 cursor-pointer items-center justify-center rounded-full bg-primary px-6 text-white transition-transform hover:scale-105 hover:bg-gold-aged text-sm font-display font-bold shadow-lg shadow-primary/30"
            >
              Pesan Sekarang
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 text-forest-deep dark:text-text-light"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="material-symbols-outlined text-3xl">menu</span>
          </button>
        </header>

        {/* --- HERO SECTION --- */}
        <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: `url("${heroImage}")` }}
          >
            <div className="absolute inset-0 bg-black/50 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-transparent to-transparent"></div>
          </div>

          <div className="relative z-10 text-center max-w-4xl mx-auto p-6 animate-fade-in-up">
            <span className="rounded-full bg-white/10 backdrop-blur-md px-6 py-2 text-xs font-display font-bold uppercase tracking-[0.2em] text-gold-aged border border-gold-aged/50 mb-6 inline-block shadow-xl">
              Kualitas Rasa Bumi Gora
            </span>
            <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-display font-extrabold leading-tight tracking-tight drop-shadow-2xl mb-6">
              Cita Rasa Asli Nusantara <br/>
              <span className="text-primary italic">dari Nusa Tenggara Barat</span>
            </h1>
            <p className="text-gray-200 text-lg sm:text-xl font-body font-light leading-relaxed max-w-2xl mx-auto mb-10 delay-100 animate-fade-in-up opacity-0" style={{animationFillMode: 'forwards'}}>
              Nikmati kelezatan tradisional Kelepon Kecerit dan segarnya Es Poteng, persembahan istimewa dari kelompok PKKWU dengan sentuhan khas NTB yang otentik.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center delay-200 animate-fade-in-up opacity-0" style={{animationFillMode: 'forwards'}}>
              <button 
                onClick={() => scrollToSection('menu')}
                className="h-14 min-w-[180px] rounded-full bg-primary px-8 text-white text-lg font-display font-bold shadow-xl shadow-primary/40 transition-all hover:scale-105 hover:bg-gold-aged"
              >
                Jelajahi Rasa
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="h-14 min-w-[180px] rounded-full bg-transparent border-2 border-white/30 backdrop-blur-sm px-8 text-white text-lg font-display font-bold transition-all hover:bg-white/10 hover:border-white"
              >
                Tentang Kami
              </button>
            </div>
          </div>
        </section>

        {/* --- MENU SECTION (Kelepon & Es Poteng) --- */}
        <section className="px-4 lg:px-20 py-24 bg-cream-parchment dark:bg-forest-deep relative" id="menu">
          <div className="container mx-auto max-w-[1200px]">
            
            {/* Section Header */}
            <div className="text-center mb-20 animate-fade-in-up">
              <div className="flex items-center justify-center gap-4 text-primary font-display font-bold tracking-widest uppercase text-sm mb-4">
                <span className="w-12 h-[2px] bg-primary"></span>
                Menu Spesial
                <span className="w-12 h-[2px] bg-primary"></span>
              </div>
              <h2 className="text-forest-deep dark:text-gold-aged text-5xl font-display font-extrabold mb-4">
                Menu Andalan Kami
              </h2>
              <p className="text-secondary/80 dark:text-gray-400 max-w-lg mx-auto">
                Rasakan perpaduan sempurna antara resep leluhur dan bahan-bahan lokal pilihan dalam setiap gigitan.
              </p>
            </div>

            {/* ITEM 1: KELEPON KECERIT */}
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-32 group">
              {/* Text Side */}
              <div className="lg:w-1/2 order-2 lg:order-1">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-primary/20 text-primary p-2 rounded-full">
                    <span className="material-symbols-outlined text-lg">star</span>
                  </span>
                  <span className="text-primary font-bold text-sm uppercase tracking-wider">Warisan Terbaik</span>
                </div>
                <h3 className="text-4xl lg:text-5xl font-display font-bold text-forest-deep dark:text-text-light mb-6">
                  Kelepon Kecerit
                </h3>
                <p className="text-lg text-secondary dark:text-gray-300 leading-relaxed mb-6">
                  Sensasi manis gula aren cair yang meledak <span className="text-primary font-bold">(kecerit)</span> di mulut, berpadu dengan gurihnya kelapa parut. Camilan tradisional yang menghangatkan suasana dan membawa kenangan masa lalu.
                </p>
                <div className="text-3xl font-display font-bold text-primary mb-8">
                  Rp 15.000 <span className="text-base text-secondary/60 dark:text-gray-500 font-body font-normal">/ porsi</span>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[
                    {icon: 'water_drop', title: 'Gula Aren Asli', desc: 'Lumer sempurna di mulut'},
                    {icon: 'eco', title: 'Tanpa Pengawet', desc: 'Segar alami setiap hari'},
                    {icon: 'menu_book', title: 'Resep Warisan', desc: 'Cita rasa asli Sasak'}
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white dark:bg-emerald-dark/20 p-4 rounded-xl border border-gold-aged/20 shadow-sm hover:shadow-md transition-shadow">
                      <span className="material-symbols-outlined text-primary mb-2">{item.icon}</span>
                      <h4 className="font-bold text-forest-deep dark:text-gold-aged text-sm mb-1">{item.title}</h4>
                      <p className="text-xs text-secondary/70 dark:text-gray-400 leading-tight">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <button className="h-12 px-8 rounded-lg bg-primary text-white font-bold shadow-lg shadow-primary/30 hover:bg-gold-aged hover:translate-y-[-2px] transition-all">
                  Pesan Kelepon
                </button>
              </div>

              {/* Image Side */}
              <div className="lg:w-1/2 order-1 lg:order-2 relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                  <img src={keleponImage} alt="Kelepon Kecerit" className="w-full h-[500px] object-cover image-sensory-filter hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
              </div>
            </div>

            {/* ITEM 2: ES POTENG */}
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              {/* Image Side */}
              <div className="lg:w-1/2 relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl -rotate-2 hover:rotate-0 transition-transform duration-500">
                  <img src={esPotengImage} alt="Es Poteng" className="w-full h-[500px] object-cover image-sensory-filter hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
              </div>

              {/* Text Side */}
              <div className="lg:w-1/2">
                <h3 className="text-4xl lg:text-5xl font-display font-bold text-forest-deep dark:text-text-light mb-6">
                  Es Poteng
                </h3>
                <p className="text-lg text-secondary dark:text-gray-300 leading-relaxed mb-6">
                  Kesegaran tape singkong fermentasi yang manis dan lembut, disajikan dingin untuk melepas dahaga di tengah teriknya cuaca. Hidangan penutup legendaris yang memanjakan lidah.
                </p>
                <div className="text-3xl font-display font-bold text-primary mb-8">
                  Rp 12.000 <span className="text-base text-secondary/60 dark:text-gray-500 font-body font-normal">/ mangkuk</span>
                </div>

                {/* Features List */}
                <div className="space-y-4 mb-8">
                  {[
                    {icon: 'thumb_up', title: 'Tape Singkong Pilihan', desc: 'Singkong berkualitas tinggi yang difermentasi dengan sempurna', color: 'bg-blue-100 text-blue-600'},
                    {icon: 'ac_unit', title: 'Segar & Alami', desc: 'Tanpa pemanis buatan, manis murni dari fermentasi', color: 'bg-teal-100 text-teal-600'},
                    {icon: 'history_edu', title: 'Cita Rasa Khas', desc: 'Hidangan penutup legendaris khas masyarakat Sasak', color: 'bg-orange-100 text-orange-600'}
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-emerald-dark/10 border border-gold-aged/10 hover:border-primary/30 transition-colors">
                      <div className={`p-2 rounded-lg ${item.color} dark:bg-opacity-20`}>
                        <span className="material-symbols-outlined">{item.icon}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-forest-deep dark:text-text-light">{item.title}</h4>
                        <p className="text-sm text-secondary/70 dark:text-gray-400">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="h-12 px-8 rounded-lg border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all">
                  Pesan Es Poteng
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* --- ABOUT SECTION (PKKWU) --- */}
        <section className="px-4 lg:px-20 py-24 bg-gold-aged/10 dark:bg-forest-deep/80" id="about">
          <div className="container mx-auto max-w-[900px]">
            <div className="bg-cream-parchment dark:bg-forest-deep border border-gold-aged/20 rounded-[3rem] p-12 lg:p-16 text-center shadow-2xl relative overflow-hidden">
              {/* Background decorative blob */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="size-20 bg-gold-aged/20 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="material-symbols-outlined text-4xl">groups</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-display font-bold text-forest-deep dark:text-gold-aged mb-6 leading-tight">
                  Dibuat dengan Cinta oleh Kelompok PKKWU
                </h2>
                <p className="text-lg text-secondary dark:text-gray-300 leading-relaxed mb-12">
                  Kami adalah sekumpulan siswa yang berdedikasi untuk melestarikan kuliner tradisional Nusantara. Melalui <span className="font-bold text-primary">Beranda Kuliner NTB</span>, kami ingin memperkenalkan kekayaan rasa Bumi Gora kepada dunia, satu gigitan pada satu waktu.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-gold-aged/20 pt-8">
                  {[
                    { val: '100%', label: 'Bahan Lokal' },
                    { val: '50+', label: 'Pesanan Harian' },
                    { val: '4.9', label: 'Rating Rasa' },
                    { val: '24h', label: 'Layanan Pesan' },
                  ].map((stat, idx) => (
                    <div key={idx}>
                      <div className="text-3xl font-black text-forest-deep dark:text-gold-aged">{stat.val}</div>
                      <div className="text-xs font-bold text-secondary/60 dark:text-gray-500 uppercase tracking-widest mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="bg-forest-deep text-white py-16 px-6 lg:px-20 border-t-4 border-primary" id="contact">
          <div className="container mx-auto max-w-[1200px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              
              {/* Brand */}
              <div>
                <div className="flex items-center gap-2 text-gold-aged mb-6">
                  <span className="material-symbols-outlined text-3xl">restaurant</span>
                  <h3 className="text-xl font-display font-bold leading-tight">Beranda Kuliner <br/>NTB</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Melestarikan kekayaan rasa Nusantara, menghadirkan kehangatan tradisi Nusa Tenggara Barat ke meja makan Anda.
                </p>
              </div>

              {/* Menu Links */}
              <div>
                <h4 className="text-gold-aged font-bold mb-6">Menu</h4>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li><a href="#" className="hover:text-primary transition-colors">Kelepon Kecerit</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Es Poteng</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Paket Hemat</a></li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-gold-aged font-bold mb-6">Kontak</h4>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-xs">call</span> +62 812-3456-7890
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-xs">mail</span> info@kulinerntb.id
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-xs">location_on</span> Mataram, NTB
                  </li>
                </ul>
              </div>

              {/* Socials */}
              <div>
                <h4 className="text-gold-aged font-bold mb-6">Ikuti Kami</h4>
                <div className="flex gap-4">
                  {['IG', 'FB', 'WA'].map((soc) => (
                    <a key={soc} href="#" className="size-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-xs font-bold">
                      {soc}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
              <p>© 2025 Kelompok PKKWU. All rights reserved.</p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-white">Privacy Policy</a>
                <a href="#" className="hover:text-white">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </div>
  )
}

export default App
