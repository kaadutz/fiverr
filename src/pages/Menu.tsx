import { useState, useEffect } from 'react';

// Tipe data props
interface MenuProps {
  products: any[];
  addToCart: (product: any) => void;
}

// DATA TAMBAHAN UNTUK UI (Icons, Details)
const productDetails: Record<string, any> = {
  'kelepon': {
    ingredients: [
      { name: 'Pandan', icon: 'grass' },
      { name: 'Gula Aren', icon: 'water_drop' },
      { name: 'Ketan', icon: 'grain' },
      { name: 'Kelapa', icon: 'circle' }
    ],
    calories: '180 kkal',
    prepTime: '5 Menit',
    badge: 'Best Seller',
    story: 'Kelepon kami dibuat fresh setiap pagi menggunakan tepung ketan lokal pilihan. Sensasi gula aren cair yang meledak di mulut adalah ciri khas yang kami pertahankan sejak resep pertama dibuat.'
  },
  'es-poteng': {
    ingredients: [
      { name: 'Singkong', icon: 'agriculture' },
      { name: 'Ragi', icon: 'biotech' },
      { name: 'Es Serut', icon: 'ac_unit' },
      { name: 'Sirup', icon: 'local_bar' }
    ],
    calories: '220 kkal',
    prepTime: 'Langsung',
    badge: 'Segar',
    story: 'Poteng (Tape) difermentasi selama tepat 3 hari 3 malam dalam wadah gerabah tertutup untuk menghasilkan rasa manis dan sedikit asam yang pas, tanpa tambahan pemanis buatan.'
  },
  'paket-hemat': {
    ingredients: [
      { name: 'Kelepon', icon: 'star' },
      { name: 'Es Poteng', icon: 'star' },
      { name: 'Air', icon: 'water_drop' }
    ],
    calories: '400 kkal',
    prepTime: 'Paket',
    badge: 'Hemat 20%',
    story: 'Pilihan terbaik untuk Anda yang ingin merasakan perpaduan panas dan dingin. Nikmati kenyalnya kelepon hangat ditemani segarnya es poteng.'
  }
};

const Menu = ({ products, addToCart }: MenuProps) => {
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    setAnimateCards(false);
    setTimeout(() => setAnimateCards(true), 100);
  }, [activeCategory]);

  const categories = ['Semua', ...Array.from(new Set(products.map(p => p.category)))];
  const filteredProducts = activeCategory === 'Semua' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const getDetail = (id: string) => productDetails[id] || { 
    ingredients: [], calories: '-', prepTime: '-', badge: '', story: '' 
  };

  return (
    <div className="min-h-screen relative bg-cream-parchment dark:bg-forest-deep transition-colors duration-500">
      
      {/* 1. HERO MENU */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("/bahan.png")` }}>
          {/* Overlay Tipis (Supaya gambar lebih terang) */}
          <div className="absolute inset-0 bg-black/30 mix-blend-multiply"></div>
          
          {/* FOG FIX: Gradasi dari Atas (Bening) ke Bawah (Warna Background) */}
          {/* via-transparent memastikan bagian tengah gambar tetap jelas */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cream-parchment dark:to-forest-deep"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 animate-fade-in-up pt-10">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-gold-aged/50 bg-gold-aged/10 text-gold-aged text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-md">
            <span className="material-symbols-outlined text-sm">restaurant_menu</span> Katalog Rasa
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-extrabold text-white mb-4 drop-shadow-lg">
            Jelajahi Menu Kami
          </h1>
          <p className="text-gray-200 max-w-lg mx-auto font-body text-lg drop-shadow-md">
            Setiap hidangan memiliki cerita. Temukan rasa otentik Bumi Gora di sini.
          </p>
        </div>
      </section>

      {/* 2. CONTENT */}
      <div className="container mx-auto max-w-[1200px] px-4 lg:px-20 relative z-20 -mt-10">
        
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in-up">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 shadow-lg ${
                activeCategory === cat
                  ? 'bg-primary text-white scale-105 ring-2 ring-white/20'
                  : 'bg-white dark:bg-black/40 text-forest-deep dark:text-gray-300 hover:bg-gray-100 backdrop-blur-md'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-24">
          {filteredProducts.map((product, idx) => {
            const details = getDetail(product.id);
            return (
              <div 
                key={product.id} 
                style={{ 
                  WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                  transform: 'translateZ(0)', 
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  ...(!animateCards ? { transitionDelay: `${idx * 100}ms` } : {})
                }}
                className={`group bg-white dark:bg-[#082f25] rounded-[2rem] shadow-xl border border-gold-aged/10 overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(product)}>
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                  
                  {details.badge && (
                    <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 dark:bg-black/60 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-wider text-forest-deep dark:text-gold-aged shadow-lg">
                      {details.badge}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="mb-4">
                    <span className="text-primary text-[10px] font-bold uppercase tracking-widest">{product.category}</span>
                    <h3 className="text-2xl font-display font-bold text-forest-deep dark:text-white mt-1 mb-2 group-hover:text-primary transition-colors cursor-pointer" onClick={() => setSelectedProduct(product)}>
                      {product.name}
                    </h3>
                    
                    {/* Ingredients Icons */}
                    <div className="flex gap-2 mt-3 opacity-70 group-hover:opacity-100 transition-opacity">
                      {details.ingredients.map((ing: any, i: number) => (
                        <div key={i} className="p-1.5 rounded-full bg-gray-100 dark:bg-white/10 text-primary" title={ing.name}>
                          <span className="material-symbols-outlined text-sm">{ing.icon}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto pt-4 border-t border-dashed border-gray-200 dark:border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase text-gray-400 font-bold">Harga</p>
                      <p className="text-xl font-bold text-forest-deep dark:text-gold-aged">Rp {product.price.toLocaleString('id-ID')}</p>
                    </div>
                    <button onClick={() => addToCart(product)} className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined">add</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* --- PREMIUM MODAL (POPUP) --- */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-forest-deep/80 backdrop-blur-md transition-opacity" onClick={() => setSelectedProduct(null)}></div>
          
          <div className="relative bg-cream-parchment dark:bg-[#0a2e25] rounded-[2.5rem] shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row animate-fade-in-up ring-1 ring-white/20">
            
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 z-50 p-2 bg-black/10 dark:bg-white/10 hover:bg-red-500 hover:text-white rounded-full transition-all backdrop-blur-md">
              <span className="material-symbols-outlined">close</span>
            </button>

            {/* Left: Image */}
            <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-gray-200">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:bg-gradient-to-r"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-4xl font-display font-bold leading-tight mb-2">{selectedProduct.name}</h3>
                <span className="px-3 py-1 border border-white/30 rounded-full text-xs font-bold uppercase backdrop-blur-sm">{selectedProduct.category}</span>
              </div>
            </div>

            {/* Right: Details */}
            <div className="w-full md:w-1/2 p-8 md:p-10 overflow-y-auto custom-scrollbar bg-cream-parchment dark:bg-[#0a2e25]">
              {/* Stats */}
              <div className="flex gap-4 mb-8 border-b border-gold-aged/20 pb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-full text-primary"><span className="material-symbols-outlined">local_fire_department</span></div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-gray-400">Kalori</span>
                    <span className="font-bold text-forest-deep dark:text-gray-200">{getDetail(selectedProduct.id).calories}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-full text-primary"><span className="material-symbols-outlined">schedule</span></div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-gray-400">Persiapan</span>
                    <span className="font-bold text-forest-deep dark:text-gray-200">{getDetail(selectedProduct.id).prepTime}</span>
                  </div>
                </div>
              </div>

              {/* Story */}
              <div className="mb-8">
                <h4 className="font-display font-bold text-lg text-forest-deep dark:text-gold-aged mb-2">Cerita Rasa</h4>
                <p className="text-secondary/80 dark:text-gray-300 text-sm leading-relaxed italic border-l-2 border-primary pl-4">
                  "{getDetail(selectedProduct.id).story}"
                </p>
              </div>

              {/* Ingredients */}
              <div className="mb-8">
                <h4 className="font-display font-bold text-lg text-forest-deep dark:text-white mb-3">Komposisi Utama</h4>
                <div className="grid grid-cols-2 gap-3">
                  {getDetail(selectedProduct.id).ingredients.map((ing: any, i: number) => (
                    <div key={i} className="flex items-center gap-2 p-2 rounded-xl bg-white/50 dark:bg-black/20 border border-gold-aged/10">
                      <span className="material-symbols-outlined text-primary text-sm">{ing.icon}</span>
                      <span className="text-xs font-bold text-secondary dark:text-gray-300">{ing.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Action */}
              <div className="mt-auto pt-6 border-t border-gold-aged/20 flex items-center justify-between gap-4">
                <div>
                  <span className="block text-xs font-bold text-gray-400 uppercase">Harga</span>
                  <span className="text-3xl font-display font-bold text-primary">Rp {selectedProduct.price.toLocaleString('id-ID')}</span>
                </div>
                <button 
                  onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                  className="px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-xl shadow-primary/30 hover:bg-gold-aged hover:-translate-y-1 transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined">add_shopping_cart</span>
                  Pesan
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Menu;
