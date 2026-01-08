import { useState, useEffect } from 'react';

// --- TIPE DATA (INTERFACES) ---
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string; // Deskripsi lengkap untuk popup
}

interface CartItem extends Product {
  quantity: number;
}

interface CustomerInfo {
  name: string;
  email: string;
  address: string;
}

function App() {
  // --- STATE MANAGEMENT ---
  const [currentPage, setCurrentPage] = useState<'home' | 'menu'>('home'); // Untuk pindah halaman
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // State Keranjang & Produk
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // State untuk Popup Detail Produk
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false); // State untuk Popup Form Checkout
  
  // State Data Pembeli
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    email: '',
    address: ''
  });

  // --- DATA PRODUK ---
  const products: Product[] = [
    {
      id: 'kelepon',
      name: 'Kelepon Kecerit',
      price: 15000,
      image: '/kelepon.png',
      category: 'Makanan Ringan',
      description: 'Kelepon Kecerit adalah camilan tradisional khas Lombok yang terbuat dari tepung ketan berisi gula aren cair asli. Sensasi "kecerit" (meletus) saat digigit memberikan pengalaman rasa manis yang unik, dipadukan dengan taburan kelapa parut gurih yang segar.'
    },
    {
      id: 'es-poteng',
      name: 'Es Poteng',
      price: 12000,
      image: '/es-poteng.png',
      category: 'Minuman & Dessert',
      description: 'Es Poteng adalah hidangan penutup segar berupa tape singkong (poteng) pilihan yang difermentasi dengan ragi tradisional. Disajikan dingin dengan es serut dan sirup manis alami. Sangat cocok dinikmati saat cuaca panas untuk melepas dahaga seketika.'
    },
    // Contoh produk tambahan untuk meramaikan halaman menu
    {
      id: 'paket-hemat',
      name: 'Paket Beranda',
      price: 25000,
      image: '/hero-bg.png', // Menggunakan gambar hero sebagai placeholder
      category: 'Paket Hemat',
      description: 'Paket hemat spesial berisi 1 porsi Kelepon Kecerit dan 1 mangkuk Es Poteng. Cara terbaik untuk menikmati kedua hidangan legendaris kami dengan harga yang lebih terjangkau.'
    }
  ];

  // Email Admin Tujuan (Ganti dengan email Anda)
  const adminEmail = "admin@kulinerntb.id"; 

  // --- LOGIKA PROGRAM ---

  // Handle Scroll (Navbar transparan/solid & Back to Top)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      setShowBackToTop(currentScrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Theme Logic (Dark/Light Mode)
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

  // Navigasi Halaman
  const navigateTo = (page: 'home' | 'menu') => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  // Scroll ke Section (khusus halaman Home)
  const scrollToSection = (id: string) => {
    if (currentPage !== 'home') {
      navigateTo('home');
      // Tunggu sebentar agar halaman render dulu baru scroll (simple timeout)
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- CART FUNCTIONS ---
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    setIsCartOpen(true); // Buka keranjang otomatis
    setSelectedProduct(null); // Tutup popup detail jika ada
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => 
      prevCart.reduce((acc, item) => {
        if (item.id === id) {
          if (item.quantity > 1) {
            acc.push({ ...item, quantity: item.quantity - 1 });
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, [] as CartItem[])
    );
  };

  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  // --- CHECKOUT PROCESS (EMAIL) ---
  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const subject = `Pesanan Baru dari ${customerInfo.name}`;
    let body = `Halo Admin Beranda Kuliner NTB,\n\n`;
    body += `Saya ingin memesan produk berikut:\n\n`;
    
    cart.forEach((item, index) => {
      body += `${index + 1}. ${item.name} (${item.quantity}x) - Rp ${(item.price * item.quantity).toLocaleString('id-ID')}\n`;
    });
    
    body += `\n-----------------------------------\n`;
    body += `TOTAL HARGA: Rp ${totalPrice.toLocaleString('id-ID')}\n`;
    body += `-----------------------------------\n\n`;
    body += `Data Pemesan:\n`;
    body += `Nama: ${customerInfo.name}\n`;
    body += `Email: ${customerInfo.email}\n`;
    body += `Alamat Pengiriman: ${customerInfo.address}\n\n`;
    body += `Mohon segera diproses. Terima kasih!`;

    // Membuka email client pengguna
    window.location.href = `mailto:${adminEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Reset state setelah order
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    // Opsional: Reset keranjang
    // setCart([]); 
  };

  // --- KOMPONEN UI ---
  const SectionDivider = () => (
    <div className="w-full flex justify-center items-center py-16">
      <div className="h-px bg-primary/40 w-full max-w-sm"></div>
    </div>
  );

  return (
    <div className="bg-cream-parchment dark:bg-forest-deep font-body text-secondary dark:text-text-light antialiased min-h-screen selection:bg-primary selection:text-white transition-colors duration-500 relative">
      
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none opacity-0 dark:opacity-10 bg-heritage-pattern z-0 mix-blend-overlay"></div>
      <div className="fixed inset-0 pointer-events-none opacity-0 dark:opacity-100 bg-gradient-to-b from-transparent via-black/20 to-black/60 z-0"></div>

      <div className="relative z-10 flex min-h-screen w-full flex-col overflow-x-hidden">
        
        {/* --- HEADER / NAVBAR --- */}
        <header 
          className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between whitespace-nowrap px-6 py-4 lg:px-20 transition-all duration-500 ${
            scrolled 
              ? 'bg-cream-parchment/95 dark:bg-[#052e21]/95 shadow-lg backdrop-blur-md py-3 border-b border-primary/10' 
              : 'bg-transparent py-5 border-b border-transparent'
          }`}
        >
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigateTo('home')}>
            <img 
              src="/logo-fiverr.png" 
              alt="Logo" 
              className="h-10 lg:h-12 w-auto object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
            />
            <h2 className="hidden sm:block text-forest-deep dark:text-gold-aged text-lg font-display font-bold leading-tight">
              Beranda Kuliner <br/><span className="text-primary">NTB</span>
            </h2>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex flex-1 justify-end gap-6 items-center">
            <nav className="flex items-center gap-8">
              <button 
                onClick={() => navigateTo('home')} 
                className={`text-sm font-bold transition-colors tracking-wide ${currentPage === 'home' ? 'text-primary' : 'text-forest-deep dark:text-gray-300 hover:text-primary'}`}
              >
                Beranda
              </button>
              <button 
                onClick={() => navigateTo('menu')} 
                className={`text-sm font-bold transition-colors tracking-wide ${currentPage === 'menu' ? 'text-primary' : 'text-forest-deep dark:text-gray-300 hover:text-primary'}`}
              >
                Menu
              </button>
              <button 
                onClick={() => scrollToSection('about')} 
                className="text-forest-deep dark:text-gray-300 text-sm font-bold hover:text-primary dark:hover:text-gold-aged transition-colors tracking-wide"
              >
                Tentang Kami
              </button>
            </nav>

            <button onClick={toggleTheme} className="p-2 rounded-full bg-black/5 dark:bg-white/5 text-forest-deep dark:text-gold-aged hover:bg-primary hover:text-white transition-all">
              <span className="material-symbols-outlined text-xl align-middle">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
            </button>

            {/* Tombol Keranjang */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-full bg-primary text-white hover:bg-gold-aged transition-colors shadow-lg shadow-primary/30"
            >
              <span className="material-symbols-outlined text-xl align-middle">shopping_cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-cream-parchment dark:border-forest-deep">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4">
            <button onClick={() => setIsCartOpen(true)} className="relative p-2 text-forest-deep dark:text-gold-aged">
               <span className="material-symbols-outlined text-2xl">shopping_cart</span>
               {totalItems > 0 && <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">{totalItems}</span>}
            </button>
            <button className="p-2 text-forest-deep dark:text-text-light" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <span className="material-symbols-outlined text-3xl">{isMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </header>

        {/* --- MOBILE NAV DROPDOWN --- */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-cream-parchment/98 dark:bg-[#052e21]/98 backdrop-blur-xl pt-24 px-6 animate-fade-in-up">
            <nav className="flex flex-col gap-6 text-center">
              <button onClick={() => navigateTo('home')} className="text-2xl font-display font-bold text-forest-deep dark:text-gold-aged">Beranda</button>
              <button onClick={() => navigateTo('menu')} className="text-2xl font-display font-bold text-forest-deep dark:text-gold-aged">Menu</button>
              <button onClick={() => {scrollToSection('about'); setIsMenuOpen(false)}} className="text-2xl font-display font-bold text-forest-deep dark:text-gold-aged">Tentang Kami</button>
              <button onClick={() => setIsMenuOpen(false)} className="mt-8 text-lg font-bold text-red-500">Tutup Menu</button>
            </nav>
          </div>
        )}

        {/* =========================================
            HALAMAN BERANDA (HOME)
           ========================================= */}
        {currentPage === 'home' && (
          <>
            {/* HERO SECTION */}
            <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("/hero-bg.png")` }}>
                <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-cream-parchment dark:from-forest-deep via-transparent to-transparent opacity-100 h-full"></div>
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
                  Nikmati kelezatan tradisional Kelepon Kecerit dan segarnya Es Poteng, persembahan istimewa dari kelompok PKKWU.
                </p>
                <div className="flex flex-col sm:flex-row gap-5 justify-center">
                  <button onClick={() => navigateTo('menu')} className="h-14 min-w-[180px] rounded-full bg-primary px-8 text-white text-lg font-display font-bold shadow-xl shadow-primary/40 transition-all hover:scale-105 hover:bg-gold-aged">
                    Jelajahi Menu
                  </button>
                </div>
              </div>
            </section>

            {/* FEATURED PREVIEW (Hanya 2 Produk) */}
            <section className="px-4 lg:px-20 py-20 relative">
              <div className="container mx-auto max-w-[1200px] text-center">
                <h2 className="text-forest-deep dark:text-gold-aged text-4xl font-display font-bold mb-10">Menu Favorit</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {products.slice(0, 2).map((product) => (
                    <div key={product.id} onClick={() => setSelectedProduct(product)} className="group cursor-pointer relative overflow-hidden rounded-2xl shadow-xl aspect-video md:aspect-[4/3] lg:aspect-[16/9]">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 text-left">
                        <h3 className="text-white text-2xl font-display font-bold">{product.name}</h3>
                        <p className="text-primary font-bold">Rp {product.price.toLocaleString('id-ID')}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-12">
                  <button onClick={() => navigateTo('menu')} className="text-forest-deep dark:text-text-light underline font-bold hover:text-primary transition-colors">
                    Lihat Semua Menu &rarr;
                  </button>
                </div>
              </div>
            </section>

            <SectionDivider />

            {/* ABOUT SECTION (Values) */}
            <section className="px-4 lg:px-20 py-24 bg-gold-aged/5 dark:bg-black/20 backdrop-blur-sm" id="about">
              <div className="container mx-auto max-w-[900px]">
                <div className="bg-cream-parchment dark:bg-[#052e21] border border-gold-aged/20 rounded-[3rem] p-12 lg:p-16 text-center shadow-2xl relative overflow-hidden">
                  <div className="relative z-10">
                    <h2 className="text-3xl sm:text-5xl font-display font-bold text-forest-deep dark:text-gold-aged mb-6 leading-tight">
                      Tentang Kami
                    </h2>
                    <p className="text-lg text-secondary dark:text-gray-300 leading-relaxed mb-12 font-body">
                      Kami berdedikasi untuk melestarikan kuliner tradisional Nusantara. Melalui <span className="font-bold text-primary">Beranda Kuliner NTB</span>, kami memperkenalkan kekayaan rasa Bumi Gora kepada dunia.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-t border-gold-aged/20 pt-10">
                      {[
                        { icon: 'agriculture', title: 'Bahan Baku', desc: '100% Organik Lokal' },
                        { icon: 'recycling', title: 'Ramah Lingkungan', desc: 'Minim Limbah' },
                        { icon: 'package_2', title: 'Eco Packaging', desc: 'Kemasan Aman' },
                        { icon: 'history_edu', title: 'Resep Warisan', desc: 'Cita Rasa Asli' },
                      ].map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-3 p-4 hover:bg-white/5 rounded-xl transition-colors">
                          <div className="p-3 rounded-full bg-primary/10 text-primary mb-2">
                            <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                          </div>
                          <h4 className="text-xl font-bold text-forest-deep dark:text-gold-aged font-display">{item.title}</h4>
                          <p className="text-sm text-secondary/70 dark:text-gray-400 font-body">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* =========================================
            HALAMAN MENU (MENU PAGE)
           ========================================= */}
        {currentPage === 'menu' && (
          <section className="px-4 lg:px-20 py-24 min-h-screen relative pt-32">
            <div className="container mx-auto max-w-[1200px]">
              <div className="text-center mb-16 animate-fade-in-up">
                <h2 className="text-forest-deep dark:text-gold-aged text-5xl font-display font-extrabold mb-4">Daftar Menu</h2>
                <p className="text-secondary/80 dark:text-gray-400 max-w-xl mx-auto">
                  Pilih hidangan favoritmu dari koleksi kuliner terbaik kami. Klik pada gambar untuk melihat detail produk.
                </p>
              </div>

              {/* GRID PRODUK */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                  <div key={product.id} className="bg-white dark:bg-[#0a2e25] rounded-2xl shadow-lg overflow-hidden border border-gold-aged/10 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group flex flex-col h-full">
                    {/* Image Container with Overlay */}
                    <div className="relative h-64 overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(product)}>
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white font-bold border border-white px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white hover:text-black transition-colors">
                          Lihat Detail
                        </span>
                      </div>
                    </div>
                    
                    {/* Card Content */}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-display font-bold text-forest-deep dark:text-text-light cursor-pointer hover:text-primary" onClick={() => setSelectedProduct(product)}>{product.name}</h3>
                      </div>
                      <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded w-fit mb-3">{product.category}</span>
                      <p className="text-sm text-secondary/70 dark:text-gray-400 mb-6 line-clamp-2 flex-1">{product.description}</p>
                      
                      <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-white/10 mt-auto">
                        <span className="text-lg font-bold text-primary">Rp {product.price.toLocaleString('id-ID')}</span>
                        <button 
                          onClick={() => addToCart(product)}
                          className="bg-primary text-white p-2 rounded-full hover:bg-gold-aged transition-colors shadow-md active:scale-95"
                          title="Tambah ke Keranjang"
                        >
                          <span className="material-symbols-outlined text-xl">add_shopping_cart</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* --- FOOTER --- */}
        <footer className="bg-forest-deep dark:bg-[#021812] text-white py-16 px-6 lg:px-20 border-t-4 border-primary mt-auto">
          <div className="container mx-auto max-w-[1200px] text-center md:text-left">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div>
                <h3 className="text-xl font-display font-bold text-gold-aged mb-4">Beranda Kuliner NTB</h3>
                <p className="text-gray-400 text-sm">Menghadirkan kehangatan tradisi Nusa Tenggara Barat ke meja makan Anda.</p>
              </div>
              <div>
                <h4 className="text-gold-aged font-bold mb-4">Navigasi</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><button onClick={() => navigateTo('home')} className="hover:text-primary transition-colors">Beranda</button></li>
                  <li><button onClick={() => navigateTo('menu')} className="hover:text-primary transition-colors">Menu</button></li>
                </ul>
              </div>
              <div>
                <h4 className="text-gold-aged font-bold mb-4">Kontak</h4>
                <p className="text-sm text-gray-300 mb-2">Email: {adminEmail}</p>
                <p className="text-sm text-gray-300">Telp: +62 818-0785-2840</p>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-white/10 text-xs text-gray-500 text-center">
              © 2025 Kelompok PKKWU. All rights reserved.
            </div>
          </div>
        </footer>

        {/* =========================================
            MODALS & POPUPS
           ========================================= */}

        {/* 1. POPUP DETAIL PRODUK */}
        {selectedProduct && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" onClick={() => setSelectedProduct(null)}></div>
            <div className="relative bg-cream-parchment dark:bg-forest-deep rounded-3xl overflow-hidden shadow-2xl max-w-4xl w-full flex flex-col md:flex-row animate-fade-in-up max-h-[90vh]">
              <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 z-10 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
              
              {/* Gambar Produk */}
              <div className="w-full md:w-1/2 h-64 md:h-auto bg-gray-200 relative">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
              </div>
              
              {/* Informasi Produk */}
              <div className="w-full md:w-1/2 p-8 flex flex-col overflow-y-auto">
                <span className="text-primary font-bold tracking-widest text-xs uppercase mb-2">{selectedProduct.category}</span>
                <h3 className="text-3xl font-display font-bold text-forest-deep dark:text-gold-aged mb-4">{selectedProduct.name}</h3>
                <p className="text-secondary dark:text-gray-300 leading-relaxed mb-6 flex-1 font-body text-sm md:text-base">
                  {selectedProduct.description}
                </p>
                <div className="border-t border-gold-aged/20 pt-6 mt-auto">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">Harga Satuan</span>
                    <span className="text-3xl font-bold text-primary">Rp {selectedProduct.price.toLocaleString('id-ID')}</span>
                  </div>
                  <button 
                    onClick={() => addToCart(selectedProduct)}
                    className="w-full py-4 rounded-xl bg-primary text-white font-bold text-lg shadow-xl hover:bg-gold-aged transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                  >
                    <span className="material-
