import { useState, useEffect } from 'react';

// --- TIPE DATA ---
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string; // Deskripsi untuk popup detail
  category: string;
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
  const [currentPage, setCurrentPage] = useState<'home' | 'menu'>('home'); // State untuk pindah halaman
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // State Keranjang & Produk
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // Untuk Popup Detail Produk
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false); // Untuk Popup Form Checkout
  
  // State Form Customer
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    email: '',
    address: ''
  });

  // Data Produk Lengkap
  const products: Product[] = [
    {
      id: 'kelepon',
      name: 'Kelepon Kecerit',
      price: 15000,
      image: '/kelepon.png',
      category: 'Makanan',
      description: 'Kelepon Kecerit adalah camilan tradisional khas Lombok yang terbuat dari tepung ketan berisi gula aren cair. Sensasi "kecerit" (meletus) saat digigit memberikan pengalaman rasa manis yang unik, dipadukan dengan taburan kelapa parut gurih.'
    },
    {
      id: 'es-poteng',
      name: 'Es Poteng',
      price: 12000,
      image: '/es-poteng.png',
      category: 'Minuman',
      description: 'Es Poteng adalah hidangan penutup segar berupa tape singkong (poteng) yang difermentasi dengan ragi tradisional, disajikan dengan es serut dan sirup manis. Sangat cocok dinikmati saat cuaca panas untuk melepas dahaga.'
    },
    // Contoh produk tambahan agar halaman menu terlihat penuh
    {
      id: 'paket-hemat',
      name: 'Paket Beranda',
      price: 25000,
      image: '/hero-bg.png', // Placeholder image
      category: 'Paket',
      description: 'Paket hemat berisi 1 porsi Kelepon Kecerit dan 1 mangkuk Es Poteng. Cara terbaik untuk menikmati kedua hidangan legendaris kami dengan harga lebih terjangkau.'
    }
  ];

  // Email Admin Toko (Ganti dengan email Anda)
  const adminEmail = "admin@kulinerntb.id"; 

  // --- LOGIKA PROGRAM ---

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      setShowBackToTop(currentScrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Theme Logic
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

  // Navigasi
  const navigateTo = (page: 'home' | 'menu') => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  // Cart Functions
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
    setIsCartOpen(true);
    // Tutup popup detail jika sedang terbuka
    setSelectedProduct(null);
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

  // Proses Order ke Email
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
    
    // Reset state setelah order (Opsional)
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
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
              <button onClick={() => navigateTo('home')} className={`text-sm font-bold transition-colors tracking-wide ${currentPage === 'home' ? 'text-primary' : 'text-forest-deep dark:text-gray-300 hover:text-primary'}`}>
                Beranda
              </button>
              <button onClick={() => navigateTo('menu')} className={`text-sm font-bold transition-colors tracking-wide ${currentPage === 'menu' ? 'text-primary' : 'text-forest-deep dark:text-gray-300 hover:text-primary'}`}>
                Menu
              </button>
              {/* Tombol scroll section hanya aktif di home, jika di menu akan kembali ke home dulu */}
              <button onClick={() => currentPage === 'home' ? document.getElementById('about')?.scrollIntoView({behavior:'smooth'}) : navigateTo('home')} className="text-forest-deep dark:text-gray-300 text-sm font-bold hover:text-primary dark:hover:text-gold-aged transition-colors tracking-wide">
                Tentang Kami
              </button>
            </nav>

            <button onClick={toggleTheme} className="p-2 rounded-full bg-black/5 dark:bg-white/5 text-forest-deep dark:text-gold-aged hover:bg-primary hover:text-white transition-all">
              <span className="material-symbols-outlined text-xl align-middle">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
            </button>

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
              <button onClick={() => setIsMenuOpen(false)} className="text-2xl font-display font-bold text-forest-deep dark:text-gold-aged">Tutup</button>
            </nav>
          </div>
        )}

        {/* =========================================
            HALAMAN BERANDA (HOME CONTENT)
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
                    Lihat Menu
                  </button>
                </div>
              </div>
            </section>

            {/* FEATURED MENU PREVIEW */}
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
                  <button onClick={() => navigateTo('menu')} className="text-forest-deep dark:text-text-light underline font-bold hover:text-primary">Lihat Semua Menu &rarr;</button>
                </div>
              </div>
            </section>

            <SectionDivider />

            {/* ABOUT SECTION */}
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
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-gold-aged/20 pt-8">
                      {[
                        { icon: 'agriculture', label: 'Bahan Lokal' },
                        { icon: 'recycling', label: 'Ramah Lingkungan' },
                        { icon: 'package_2', label: 'Eco Packaging' },
                        { icon: 'history_edu', label: 'Resep Warisan' },
                      ].map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-2">
                          <span className="material-symbols-outlined text-3xl text-primary">{item.icon}</span>
                          <div className="text-xs font-bold text-forest-deep dark:text-gray-300 uppercase tracking-widest mt-1">{item.label}</div>
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
                <p className="text-secondary/80 dark:text-gray-400">Pilih hidangan favoritmu dan rasakan kenikmatannya.</p>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                  <div key={product.id} className="bg-white dark:bg-[#0a2e25] rounded-2xl shadow-lg overflow-hidden border border-gold-aged/10 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                    {/* Image Container with Overlay on Hover */}
                    <div className="relative h-64 overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(product)}>
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white font-bold border border-white px-4 py-2 rounded-full backdrop-blur-sm">Lihat Detail</span>
                      </div>
                    </div>
                    
                    {/* Card Content */}
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-display font-bold text-forest-deep dark:text-text-light">{product.name}</h3>
                        <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded">{product.category}</span>
                      </div>
                      <p className="text-sm text-secondary/70 dark:text-gray-400 mb-4 line-clamp-2">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-primary">Rp {product.price.toLocaleString('id-ID')}</span>
                        <button 
                          onClick={() => addToCart(product)}
                          className="bg-primary text-white p-2 rounded-full hover:bg-gold-aged transition-colors shadow-md"
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

        {/* --- FOOTER (Global) --- */}
        <footer className="bg-forest-deep dark:bg-[#021812] text-white py-16 px-6 lg:px-20 border-t-4 border-primary">
          <div className="container mx-auto max-w-[1200px] text-center md:text-left">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div>
                <h3 className="text-xl font-display font-bold text-gold-aged mb-4">Beranda Kuliner NTB</h3>
                <p className="text-gray-400 text-sm">Menghadirkan kehangatan tradisi Nusa Tenggara Barat ke meja makan Anda.</p>
              </div>
              <div>
                <h4 className="text-gold-aged font-bold mb-4">Navigasi</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><button onClick={() => navigateTo('home')} className="hover:text-primary">Beranda</button></li>
                  <li><button onClick={() => navigateTo('menu')} className="hover:text-primary">Menu</button></li>
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

        {/* 1. PRODUCT DETAIL POPUP */}
        {selectedProduct && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setSelectedProduct(null)}></div>
            <div className="relative bg-cream-parchment dark:bg-forest-deep rounded-3xl overflow-hidden shadow-2xl max-w-4xl w-full flex flex-col md:flex-row animate-fade-in-up max-h-[90vh]">
              <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 z-10 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
              {/* Image Side */}
              <div className="w-full md:w-1/2 h-64 md:h-auto bg-gray-200">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
              </div>
              {/* Content Side */}
              <div className="w-full md:w-1/2 p-8 flex flex-col overflow-y-auto">
                <span className="text-primary font-bold tracking-widest text-xs uppercase mb-2">{selectedProduct.category}</span>
                <h3 className="text-3xl font-display font-bold text-forest-deep dark:text-gold-aged mb-4">{selectedProduct.name}</h3>
                <p className="text-secondary dark:text-gray-300 leading-relaxed mb-6 flex-1">
                  {selectedProduct.description}
                </p>
                <div className="border-t border-gold-aged/20 pt-6 mt-auto">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">Harga</span>
                    <span className="text-3xl font-bold text-primary">Rp {selectedProduct.price.toLocaleString('id-ID')}</span>
                  </div>
                  <button 
                    onClick={() => addToCart(selectedProduct)}
                    className="w-full py-4 rounded-xl bg-primary text-white font-bold text-lg shadow-xl hover:bg-gold-aged transition-all flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined">add_shopping_cart</span>
                    Tambah ke Keranjang
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. CART DRAWER (KERANJANG) */}
        {isCartOpen && (
          <>
            <div className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)}></div>
            <div className="fixed top-0 right-0 h-full w-[320px] sm:w-[400px] bg-cream-parchment dark:bg-forest-deep shadow-2xl z-[70] p-6 flex flex-col transition-transform animate-fade-in-up border-l border-gold-aged/20">
              <div className="flex justify-between items-center mb-6 border-b border-gold-aged/20 pb-4">
                <h3 className="text-2xl font-display font-bold text-forest-deep dark:text-gold-aged">Keranjang</h3>
                <button onClick={() => setIsCartOpen(false)} className="text-secondary hover:text-red-500"><span className="material-symbols-outlined text-2xl">close</span></button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center text-gray-400 mt-10">Keranjang kosong.</div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center bg-white/50 dark:bg-black/20 p-3 rounded-lg">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                      <div className="flex-1">
                        <h4 className="font-bold text-forest-deep dark:text-text-light text-sm">{item.name}</h4>
                        <p className="text-primary text-sm font-bold">Rp {item.price.toLocaleString('id-ID')}</p>
                      </div>
                      <div className="flex items-center gap-2 bg-white dark:bg-forest-deep rounded-full px-2 py-1 border border-gold-aged/30">
                        <button onClick={() => removeFromCart(item.id)} className="w-5 hover:text-red-500">-</button>
                        <span className="text-xs font-bold">{item.quantity}</span>
                        <button onClick={() => addToCart(item)} className="w-5 hover:text-primary">+</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {cart.length > 0 && (
                <div className="border-t border-gold-aged/20 pt-4 mt-4">
                  <div className="flex justify-between items-center mb-4 text-forest-deep dark:text-gold-aged font-bold text-lg">
                    <span>Total:</span>
                    <span>Rp {totalPrice.toLocaleString('id-ID')}</span>
                  </div>
                  <button 
                    onClick={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}
                    className="w-full py-3 rounded-lg bg-primary text-white font-bold shadow-lg hover:bg-gold-aged transition-all"
                  >
                    Checkout Sekarang
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {/* 3. CHECKOUT FORM POPUP (Baru) */}
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsCheckoutOpen(false)}></div>
            <div className="relative bg-cream-parchment dark:bg-[#0a2e25] p-8 rounded-3xl shadow-2xl max-w-md w-full animate-fade-in-up border border-gold-aged/20">
              <h3 className="text-2xl font-display font-bold text-forest-deep dark:text-gold-aged mb-6 text-center">Data Pemesan</h3>
              
              <form onSubmit={handleSubmitOrder} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-forest-deep dark:text-gray-300 mb-1">Nama Lengkap</label>
                  <input 
                    required 
                    type="text" 
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black/30 border border-gold-aged/30 focus:border-primary focus:ring-1 focus:ring-primary outline-none dark:text-white"
                    placeholder="Contoh: Budi Santoso"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-forest-deep dark:text-gray-300 mb-1">Email</label>
                  <input 
                    required 
                    type="email" 
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black/30 border border-gold-aged/30 focus:border-primary focus:ring-1 focus:ring-primary outline-none dark:text-white"
                    placeholder="email@anda.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-forest-deep dark:text-gray-300 mb-1">Alamat Lengkap</label>
                  <textarea 
                    required 
                    rows={3}
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black/30 border border-gold-aged/30 focus:border-primary focus:ring-1 focus:ring-primary outline-none dark:text-white resize-none"
                    placeholder="Jl. Raya Mataram No. 123..."
                  ></textarea>
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    type="button" 
                    onClick={() => setIsCheckoutOpen(false)}
                    className="flex-1 py-3 rounded-xl border border-gold-aged/50 text-forest-deep dark:text-gold-aged font-bold hover:bg-black/5 transition-colors"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 py-3 rounded-xl bg-primary text-white font-bold shadow-lg hover:bg-gold-aged transition-all flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">send</span>
                    Kirim Order
                  </button>
                </div>
                <p className="text-center text-xs text-gray-500 mt-4">
                  *Order akan dikirim ke email admin untuk diproses.
                </p>
              </form>
            </div>
          </div>
        )}

        {/* --- BACK TO TOP BUTTON --- */}
        <button onClick={scrollToTop} className={`fixed bottom-6 right-6 z-50 p-3 rounded-full bg-primary text-white shadow-xl transition-all duration-300 transform hover:bg-gold-aged hover:scale-110 ${showBackToTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} title="Kembali ke Atas">
          <span className="material-symbols-outlined text-2xl">arrow_upward</span>
        </button>

      </div>
    </div>
  )
}

export default App
