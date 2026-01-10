import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import { adminWaNumber, adminEmail } from './constants';

// --- TIPE DATA ---
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

function App() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // State Keranjang & Tema
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // DATA PRODUK MASTER
  const products: Product[] = [
    {
      id: 'kelepon',
      name: 'Kelepon Kecerit',
      price: 15000,
      image: '/kelepon.png',
      category: 'Makanan Ringan',
      description: 'Kelepon Kecerit adalah camilan tradisional khas Lombok yang terbuat dari tepung ketan berisi gula aren cair asli. Sensasi "kecerit" (meletus) saat digigit.'
    },
    {
      id: 'es-poteng',
      name: 'Es Poteng',
      price: 12000,
      image: '/es-poteng.png',
      category: 'Minuman & Dessert',
      description: 'Es Poteng adalah hidangan penutup segar berupa tape singkong (poteng) pilihan yang difermentasi dengan ragi tradisional. Disajikan dingin dengan es serut.'
    },
    {
      id: 'paket-hemat',
      name: 'Paket Beranda',
      price: 25000,
      image: '/hero-bg.png', 
      category: 'Paket Hemat',
      description: 'Paket hemat spesial berisi 1 porsi Kelepon Kecerit dan 1 mangkuk Es Poteng. Cara terbaik untuk menikmati kedua hidangan legendaris.'
    }
  ];

  // --- LOGIKA PROGRAM ---

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Navbar Logic
  const isTransparentNav = (
    location.pathname === '/' || 
    location.pathname === '/menu' || 
    location.pathname === '/about'
  ) && !scrolled;

  const navbarBgClass = isTransparentNav 
    ? 'bg-transparent py-6 border-b border-transparent' 
    : 'bg-cream-parchment/95 dark:bg-[#052e21]/95 shadow-lg backdrop-blur-md py-3 border-b border-primary/10';

  const logoTextClass = isTransparentNav
    ? "hidden sm:block text-white text-lg font-display font-bold leading-tight drop-shadow-md"
    : "hidden sm:block text-forest-deep dark:text-white text-lg font-display font-bold leading-tight";

  const getLinkClass = (path: string) => {
    const isActive = location.pathname === path;
    const base = "text-sm font-bold transition-colors tracking-wide";
    if (isActive) return `${base} text-primary`;
    return isTransparentNav 
      ? `${base} text-white hover:text-primary drop-shadow-sm` 
      : `${base} text-forest-deep dark:text-gray-300 hover:text-primary`;
  };

  const iconBtnClass = isTransparentNav
    ? "p-2 rounded-full bg-white/10 text-white hover:bg-primary transition-all border border-white/20 backdrop-blur-sm"
    : "p-2 rounded-full bg-black/5 dark:bg-white/10 text-forest-deep dark:text-gold-aged hover:bg-primary hover:text-white transition-all border border-transparent dark:border-white/10";


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

  // --- LOGIKA ORDER LANGSUNG KE WHATSAPP ---
  const handleDirectWhatsAppOrder = () => {
    if (cart.length === 0) return;

    let message = `Halo Admin Beranda Kuliner NTB, saya mau pesan:\n\n`;
    
    // List Produk
    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.name}* (${item.quantity}x) - Rp ${(item.price * item.quantity).toLocaleString('id-ID')}\n`;
    });
    
    message += `\n--------------------------------\n*Total: Rp ${totalPrice.toLocaleString('id-ID')}*\n--------------------------------\n\n`;
    
    // Placeholder Biodata untuk diisi di WA
    message += `Mohon info pembayarannya ya kak.\n\n*Biodata Saya:*\nNama: ...\nAlamat: ...`;

    // Buka WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const waLink = `https://wa.me/${adminWaNumber}?text=${encodedMessage}`;
    window.open(waLink, '_blank');

    // Tutup keranjang
    setIsCartOpen(false);
  };

  return (
    <div className="bg-cream-parchment dark:bg-forest-deep font-body text-secondary dark:text-text-light antialiased min-h-screen selection:bg-primary selection:text-white transition-colors duration-500 relative flex flex-col">
      
      {/* Global Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-0 dark:opacity-5 bg-heritage-pattern z-0 mix-blend-overlay"></div>

      {/* --- HEADER --- */}
      <header className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between whitespace-nowrap px-6 py-4 lg:px-20 transition-all duration-500 ${navbarBgClass}`}>
        <Link to="/" className="flex items-center gap-3 cursor-pointer group" onClick={scrollToTop}>
          <img src="/logo-fiverr.png" alt="Logo" className="h-10 lg:h-12 w-auto object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300" />
          <h2 className={logoTextClass}>
            Beranda Kuliner <br/><span className="text-primary">NTB</span>
          </h2>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden lg:flex flex-1 justify-end gap-6 items-center">
          <nav className="flex items-center gap-8">
            <Link to="/" className={getLinkClass('/')}>Beranda</Link>
            <Link to="/menu" className={getLinkClass('/menu')}>Menu</Link>
            <Link to="/about" className={getLinkClass('/about')}>Tentang Kami</Link>
          </nav>

          <button onClick={toggleTheme} className={iconBtnClass}>
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

        {/* Mobile Menu & Actions */}
        <div className="lg:hidden flex items-center gap-3">
          <button onClick={toggleTheme} className={iconBtnClass}>
            <span className="material-symbols-outlined text-xl align-middle">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
          </button>

          <button onClick={() => setIsCartOpen(true)} className={`relative p-2 ${isTransparentNav ? 'text-white' : 'text-forest-deep dark:text-gold-aged'}`}>
             <span className="material-symbols-outlined text-2xl">shopping_cart</span>
             {totalItems > 0 && <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">{totalItems}</span>}
          </button>
          
          <button className={`p-2 ${isTransparentNav ? 'text-white' : 'text-forest-deep dark:text-text-light'}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
            <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-2xl font-display font-bold text-forest-deep dark:text-gold-aged">Tentang Kami</Link>
            <button onClick={() => setIsMenuOpen(false)} className="mt-8 text-lg font-bold text-red-500">Tutup Menu</button>
          </nav>
        </div>
      )}

      {/* --- CONTENT AREA --- */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu products={products} addToCart={addToCart} />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>

      {/* --- CART DRAWER --- */}
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
                
                {/* TOMBOL CHECKOUT LANGSUNG KE WA (Tanpa Modal) */}
                <button 
                  onClick={handleDirectWhatsAppOrder} 
                  className="w-full py-4 rounded-xl bg-[#25D366] text-white font-bold shadow-lg hover:bg-[#128C7E] transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-xl">chat</span>
                  Pesan via WhatsApp
                </button>
              </div>
            )}
          </div>
        </>
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
                <li><Link to="/" className="hover:text-primary">Beranda</Link></li>
                <li><Link to="/menu" className="hover:text-primary">Menu</Link></li>
                <li><Link to="/about" className="hover:text-primary">Tentang Kami</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-gold-aged font-bold mb-4">Kontak</h4>
              {/* Email Aman Disini */}
              <p className="text-sm text-gray-300 mb-2">Email: {adminEmail}</p>
              <p className="text-sm text-gray-300">WA Admin: +{adminWaNumber}</p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-xs text-gray-500 text-center">© 2025 Kelompok PKKWU. All rights reserved.</div>
        </div>
      </footer>

      <button onClick={scrollToTop} className={`fixed bottom-6 right-6 z-50 p-3 rounded-full bg-primary text-white shadow-xl transition-all duration-300 transform hover:bg-gold-aged hover:scale-110 ${showBackToTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
        <span className="material-symbols-outlined text-2xl">arrow_upward</span>
      </button>
    </div>
  );
}

export default App;
