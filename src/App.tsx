import React, { useState, useEffect } from 'react'; // Tambahkan React di sini
import { Routes, Route, Link, useLocation } from 'react-router-dom'; // Import Router
import Home from './pages/Home'; // Import Halaman Home
import Menu from './pages/Menu'; // Import Halaman Menu

// Tipe Data
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
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
  const location = useLocation(); // Untuk mengecek kita sedang di halaman mana
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // State Keranjang & Produk
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '', email: '', address: ''
  });

  // DATA PRODUK
  const products: Product[] = [
    {
      id: 'kelepon',
      name: 'Kelepon Kecerit',
      price: 15000,
      image: '/kelepon.png',
      category: 'Makanan Ringan',
      description: 'Kelepon Kecerit adalah camilan tradisional khas Lombok yang terbuat dari tepung ketan berisi gula aren cair asli. Sensasi "kecerit" (meletus) saat digigit memberikan pengalaman rasa manis yang unik.'
    },
    {
      id: 'es-poteng',
      name: 'Es Poteng',
      price: 12000,
      image: '/es-poteng.png',
      category: 'Minuman & Dessert',
      description: 'Es Poteng adalah hidangan penutup segar berupa tape singkong (poteng) pilihan yang difermentasi dengan ragi tradisional. Disajikan dingin dengan es serut dan sirup manis alami.'
    },
    {
      id: 'paket-hemat',
      name: 'Paket Beranda',
      price: 25000,
      image: '/hero-bg.png', 
      category: 'Paket Hemat',
      description: 'Paket hemat spesial berisi 1 porsi Kelepon Kecerit dan 1 mangkuk Es Poteng. Cara terbaik untuk menikmati kedua hidangan legendaris kami dengan harga yang lebih terjangkau.'
    }
  ];

  const adminEmail = "admin@kulinerntb.id"; 

  // --- LOGIKA PROGRAM ---

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 300);
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
    setIsCartOpen(true);
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
    let body = `Halo Admin Beranda Kuliner NTB,\n\nSaya ingin memesan produk berikut:\n\n`;
    cart.forEach((item, index) => {
      body += `${index + 1}. ${item.name} (${item.quantity}x) - Rp ${(item.price * item.quantity).toLocaleString('id-ID')}\n`;
    });
    body += `\n-----------------------------------\nTOTAL HARGA: Rp ${totalPrice.toLocaleString('id-ID')}\n-----------------------------------\n\n`;
    body += `Data Pemesan:\nNama: ${customerInfo.name}\nEmail: ${customerInfo.email}\nAlamat Pengiriman: ${customerInfo.address}\n\nMohon segera diproses. Terima kasih!`;

    window.location.href = `mailto:${adminEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
  };

  return (
    <div className="bg-cream-parchment dark:bg-forest-deep font-body text-secondary dark:text-text-light antialiased min-h-screen selection:bg-primary selection:text-white transition-colors duration-500 relative flex flex-col">
      
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none opacity-0 dark:opacity-10 bg-heritage-pattern z-0 mix-blend-overlay"></div>
      <div className="fixed inset-0 pointer-events-none opacity-0 dark:opacity-100 bg-gradient-to-b from-transparent via-black/20 to-black/60 z-0"></div>

      {/* --- HEADER / NAVBAR --- */}
      <header 
        className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between whitespace-nowrap px-6 py-4 lg:px-20 transition-all duration-500 ${
          scrolled 
            ? 'bg-cream-parchment/95 dark:bg-[#052e21]/95 shadow-lg backdrop-blur-md py-3 border-b border-primary/10' 
            : 'bg-transparent py-5 border-b border-transparent'
        }`}
      >
        <Link to="/" className="flex items-center gap-3 cursor-pointer group" onClick={scrollToTop}>
          <img src="/logo-fiverr.png" alt="Logo" className="h-10 lg:h-12 w-auto object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300" />
          <h2 className="hidden sm:block text-forest-deep dark:text-gold-aged text-lg font-display font-bold leading-tight">
            Beranda Kuliner <br/><span className="text-primary">NTB</span>
          </h2>
        </Link>
        
        <div className="hidden lg:flex flex-1 justify-end gap-6 items-center">
          <nav className="flex items-center gap-8">
            {/* Navigasi Menggunakan Link dari Router */}
            <Link to="/" className={`text-sm font-bold transition-colors tracking-wide ${location.pathname === '/' ? 'text-primary' : 'text-forest-deep dark:text-gray-300 hover:text-primary'}`}>
              Beranda
            </Link>
            <Link to="/menu" className={`text-sm font-bold transition-colors tracking-wide ${location.pathname === '/menu' ? 'text-primary' : 'text-forest-deep dark:text-gray-300 hover:text-primary'}`}>
              Menu
            </Link>
            <a href="/#about" className="text-forest-deep dark:text-gray-300 text-sm font-bold hover:text-primary dark:hover:text-gold-aged transition-colors tracking-wide">
              Tentang Kami
            </a>
          </nav>

          <button onClick={toggleTheme} className="p-2 rounded-full bg-black/5 dark:bg-white/5 text-forest-deep dark:text-gold-aged hover:bg-primary hover:text-white transition-all">
            <span className="material-symbols-outlined text-xl align-middle">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
          </button>

          <button onClick={() => setIsCartOpen(true)} className="relative p-2 rounded-full bg-primary text-white hover:bg-gold-aged transition-colors shadow-lg shadow-primary/30">
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

      {/* --- MOBILE MENU DROPDOWN --- */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-cream-parchment/98 dark:bg-[#052e21]/98 backdrop-blur-xl pt-24 px-6 animate-fade-in-up">
          <nav className="flex flex-col gap-6 text-center">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-2xl font-display font-bold text-forest-deep dark:text-gold-aged">Beranda</Link>
            <Link to="/menu" onClick={() => setIsMenuOpen(false)} className="text-2xl font-display font-bold text-forest-deep dark:text-gold-aged">Menu</Link>
            <button onClick={() => setIsMenuOpen(false)} className="mt-8 text-lg font-bold text-red-500">Tutup Menu</button>
          </nav>
        </div>
      )}

      {/* --- CONTENT AREA (ROUTES) --- */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/menu" 
            element={<Menu products={products} addToCart={addToCart} />} 
          />
        </Routes>
      </div>

      {/* --- GLOBAL COMPONENTS (Footer, Cart, Modals) --- */}
      
      {/* 1. CART DRAWER */}
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

      {/* 2. CHECKOUT FORM POPUP */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsCheckoutOpen(false)}></div>
          <div className="relative bg-cream-parchment dark:bg-[#0a2e25] p-8 rounded-3xl shadow-2xl max-w-md w-full animate-fade-in-up border border-gold-aged/20">
            <h3 className="text-2xl font-display font-bold text-forest-deep dark:text-gold-aged mb-6 text-center">Data Pemesan</h3>
            
            <form onSubmit={handleSubmitOrder} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-forest-deep dark:text-gray-300 mb-1">Nama Lengkap</label>
                <input required type="text" value={customerInfo.name} onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black/30 border border-gold-aged/30 outline-none dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-bold text-forest-deep dark:text-gray-300 mb-1">Email</label>
                <input required type="email" value={customerInfo.email} onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black/30 border border-gold-aged/30 outline-none dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-bold text-forest-deep dark:text-gray-300 mb-1">Alamat Lengkap</label>
                <textarea required rows={3} value={customerInfo.address} onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black/30 border border-gold-aged/30 outline-none dark:text-white resize-none"></textarea>
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsCheckoutOpen(false)} className="flex-1 py-3 rounded-xl border border-gold-aged/50 text-forest-deep dark:text-gold-aged font-bold hover:bg-black/5">Batal</button>
                <button type="submit" className="flex-1 py-3 rounded-xl bg-primary text-white font-bold shadow-lg hover:bg-gold-aged transition-all">Kirim Order</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. FOOTER */}
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
                <li><Link to="/" className="hover:text-primary">Beranda</Link></li>
                <li><Link to="/menu" className="hover:text-primary">Menu</Link></li>
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

      {/* 4. BACK TO TOP */}
      <button onClick={scrollToTop} className={`fixed bottom-6 right-6 z-50 p-3 rounded-full bg-primary text-white shadow-xl transition-all duration-300 transform hover:bg-gold-aged hover:scale-110 ${showBackToTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
        <span className="material-symbols-outlined text-2xl">arrow_upward</span>
      </button>

    </div>
  );
}

export default App;
