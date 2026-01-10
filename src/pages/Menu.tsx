import { useState, useEffect } from 'react';

// Tipe data props dari App.tsx
interface MenuProps {
  products: any[];
  addToCart: (product: any) => void;
}

// Data tambahan untuk detail tampilan (Hardcoded untuk UI Enhancement)
// Ini melengkapi data standar dari App.tsx
const productDetails: Record<string, any> = {
  'kelepon': {
    ingredients: ['Gula Aren', 'Tepung Ketan', 'Pandan', 'Kelapa Parut'],
    calories: '180 kkal',
    prepTime: 'Fresh Made',
    badge: 'Best Seller',
    story: 'Dibuat dengan teknik pijat khusus agar adonan kenyal namun lumer saat digigit. Menggunakan gula aren asli Lombok yang wanginya khas.'
  },
  'es-poteng': {
    ingredients: ['Tape Singkong', 'Es Serut', 'Sirup Alami', 'Susu Kental'],
    calories: '220 kkal',
    prepTime: 'Langsung Saji',
    badge: 'Recommended',
    story: 'Resep turun temurun menggunakan ragi tradisional. Difermentasi selama tepat 3 hari untuk mendapatkan tingkat kemanisan dan alkohol alami yang pas.'
  },
  'paket-hemat': {
    ingredients: ['Kelepon', 'Es Poteng', 'Air Mineral'],
    calories: '400 kkal',
    prepTime: 'Paket Lengkap',
    badge: 'Hemat 20%',
    story: 'Kombinasi sempurna untuk Anda yang ingin merasakan sensasi hangat dan dingin sekaligus. Cocok untuk dinikmati berdua atau saat lapar melanda.'
  }
};

const Menu = ({ products, addToCart }: MenuProps) => {
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [animateCards, setAnimateCards] = useState(false);

  // Trigger animasi saat kategori berubah
  useEffect(() => {
    setAnimateCards(false);
    setTimeout(() => setAnimateCards(true), 100);
  }, [activeCategory]);

  // Ambil daftar kategori unik
  const categories = ['Semua', ...Array.from(new Set(products.map(p => p.category)))];

  // Filter produk
  const filteredProducts = activeCategory === 'Semua' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  // Helper untuk mendapatkan detail tambahan
  const getDetail = (id: string) => productDetails[id] || { 
    ingredients: [], calories: '-', prepTime: '-', badge: '', story: '' 
  };

  return (
    <section className="min-h-screen relative bg-cream-parchment dark:bg-forest-deep transition-colors duration-500">
      
      {/* 1. HEADER BACKGROUND (Agar Navbar Konsisten) */}
      <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-primary/10 via-cream-parchment to-cream-parchment dark:from-black/40 dark:via-forest-deep dark:to-forest-deep z-0"></div>

      <div className="container mx-auto max-w-[1200px] px-4 lg:px-20 relative z-10 pt-32 pb-24">
        
        {/* Header Content */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center justify-center gap-2 mb-4 px-4 py-1 rounded-full bg-gold-aged/10 border border-gold-aged/30 text-gold-aged text-xs font-bold uppercase tracking-widest">
            <span className="material-symbols-outlined text-sm">restaurant_menu</span>
            Katalog Rasa
          </div>
          <h2 className="text-forest-deep dark:text-white text-4xl sm:text-5xl font-display font-extrabold mb-6">
            Jelajahi Menu Kami
          </h2>
          <p className="text-secondary/80 dark:text-gray-300 max-w-xl mx-auto font-body text-lg leading-relaxed">
            Setiap hidangan memiliki cerita. Temukan perpaduan rasa otentik Bumi Gora yang diolah dengan standar kualitas modern.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 border shadow-sm ${
                activeCategory === cat
                  ? 'bg-primary border-primary text-white shadow-primary/30 shadow-lg scale-105'
                  : 'bg-white/80 dark:bg-black/20 border-gold-aged/20 text-forest-deep dark:text-gray-300 hover:border-primary hover:text-primary backdrop-blur-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, idx) => {
            const details = getDetail(product.id);
            return (
              <div 
                key={product.id} 
                className={`group bg-white dark:bg-[#082f25] rounded-[2.5rem] shadow-xl hover:shadow-2xl border border-gold-aged/10 overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-2 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                {/* Image Area */}
                <div className="relative h-72 overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(product)}>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                  
                  {/* Badge */}
                  {details.badge && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 dark:bg-black/60 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-wider text-forest-deep dark:text-gold-aged border border-gold-aged/20 shadow-lg">
                        {details.badge}
                      </span>
                    </div>
                  )}

                  {/* Icon Info Overlay (Muncul saat hover) */}
                  <div className="absolute bottom-4 left-4 right-4 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex justify-center gap-3">
                     <div className="bg-white/90 dark:bg-black/80 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-forest-deep dark:text-gold-aged flex items-center gap-1 shadow-lg">
                        <span className="material-symbols-outlined text-sm">local_fire_department</span> {details.calories}
                     </div>
                     <div className="bg-white/90 dark:bg-black/80 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-forest-deep dark:text-gold-aged flex items-center gap-1 shadow-lg">
                        <span className="material-symbols-outlined text-sm">schedule</span> {details.prepTime}
                     </div>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-8 flex flex-col flex-1">
                  <div className="mb-4">
                    <div className="text-primary text-[10px] font-bold uppercase tracking-widest mb-2">{product.category}</div>
                    <h3 className="text-2xl font-display font-bold text-forest-deep dark:text-white mb-3 group-hover:text-primary transition-colors cursor-pointer" onClick={() => setSelectedProduct(product)}>
                      {product.name}
                    </h3>
                    <p className="text-sm text-secondary/70 dark:text-gray-400 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Ingredients Preview Icons */}
                  <div className="flex gap-2 mb-6 opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                    {['eco', 'water_drop', 'grain'].map((icon, i) => (
                      <span key={i} className="material-symbols-outlined text-lg text-primary">{icon}</span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-dashed border-gray-200 dark:border-white/10">
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500">Harga</span>
                      <span className="text-xl font-bold text-forest-deep dark:text-gold-aged">Rp {product.price.toLocaleString('id-ID')}</span>
                    </div>
                    <button 
                      onClick={() => addToCart(product)}
                      className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-110 hover:bg-gold-aged transition-all duration-300"
                      title="Tambah ke Keranjang"
                    >
                      <span className="material-symbols-outlined">add_shopping_cart</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 animate-fade-in-up">
            <div className="inline-block p-6 rounded-full bg-gray-100 dark:bg-white/5 mb-4">
              <span className="material-symbols-outlined text-4xl text-gray-400">no_meals</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400">Menu untuk kategori ini belum tersedia.</p>
          </div>
        )}
      </div>

      {/* --- PREMIUM DETAIL POPUP (MODAL) --- */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-forest-deep/80 backdrop-blur-md transition-opacity" onClick={() => setSelectedProduct(null)}></div>
          
          <div className="relative bg-cream-parchment dark:bg-[#0a2e25] rounded-[3rem] shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row animate-fade-in-up ring-1 ring-white/20">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedProduct(null)} 
              className="absolute top-6 right-6 z-50 p-2 bg-black/10 dark:bg-white/10 hover:bg-red-500 hover:text-white rounded-full transition-all backdrop-blur-md"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>

            {/* Left Side: Image */}
            <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-gray-200">
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.name} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:bg-gradient-to-r"></div>
              
              <div className="absolute bottom-8 left-8 text-white">
                <span className="inline-block px-3 py-1 mb-2 border border-white/30 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm">
                  {selectedProduct.category}
                </span>
                <h3 className="text-4xl font-display font-bold leading-tight">{selectedProduct.name}</h3>
              </div>
            </div>

            {/* Right Side: Details */}
            <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto custom-scrollbar bg-cream-parchment dark:bg-[#0a2e25]">
              {/* Info Bar */}
              <div className="flex gap-6 mb-8 border-b border-gold-aged/20 pb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-full text-primary"><span className="material-symbols-outlined text-lg">local_fire_department</span></div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-gray-400">Kalori</span>
                    <span className="font-bold text-forest-deep dark:text-gray-200">{getDetail(selectedProduct.id).calories}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-full text-primary"><span className="material-symbols-outlined text-lg">schedule</span></div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-gray-400">Persiapan</span>
                    <span className="font-bold text-forest-deep dark:text-gray-200">{getDetail(selectedProduct.id).prepTime}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h4 className="font-display font-bold text-xl text-forest-deep dark:text-gold-aged mb-3">Tentang Menu Ini</h4>
                <p className="text-secondary/80 dark:text-gray-300 leading-loose text-sm font-body">
                  {selectedProduct.description}
                </p>
              </div>

              {/* Story */}
              <div className="mb-8 p-6 bg-white/50 dark:bg-black/20 rounded-2xl border border-gold-aged/10">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-3xl">format_quote</span>
                  <p className="text-sm italic text-secondary dark:text-gray-400 leading-relaxed">
                    {getDetail(selectedProduct.id).story}
                  </p>
                </div>
              </div>

              {/* Ingredients */}
              <div className="mb-10">
                <h4 className="font-display font-bold text-lg text-forest-deep dark:text-white mb-4">Bahan Utama</h4>
                <div className="flex flex-wrap gap-3">
                  {getDetail(selectedProduct.id).ingredients.map((ing: string, i: number) => (
                    <span key={i} className="px-4 py-2 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl text-xs font-bold text-secondary dark:text-gray-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="flex items-center justify-between gap-6 pt-6 border-t border-gold-aged/20">
                <div>
                  <span className="block text-xs font-bold text-gray-400 uppercase">Harga Satuan</span>
                  <span className="text-3xl font-display font-bold text-primary">Rp {selectedProduct.price.toLocaleString('id-ID')}</span>
                </div>
                <button 
                  onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                  className="px-8 py-4 bg-primary text-white rounded-xl font-bold shadow-xl shadow-primary/30 hover:bg-gold-aged hover:-translate-y-1 transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined">add_shopping_cart</span>
                  Pesan Sekarang
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Menu;
