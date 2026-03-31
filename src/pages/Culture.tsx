import { useScrollAnimation } from '../hooks/useScrollAnimation';

const articles = [
  {
    title: "Emas Hitam dari Lombok",
    summary: "Mengenal Gula Aren asli yang menjadi nyawa dari setiap gigitan Kelepon Kecerit.",
    content: "Gula aren bukan sekadar pemanis, tapi warisan. Diolah secara tradisional oleh petani lokal di pelosok Lombok, nira aren dimasak berjam-jam di atas tungku kayu bakar hingga mengental menjadi 'emas hitam'. Proses panjang inilah yang menghasilkan aroma smokey yang khas dan rasa manis yang tidak menyengat. Inilah rahasia mengapa Kelepon Kecerit kami memiliki sensasi rasa yang begitu dalam dan otentik.",
    image: "/gula-aren.jpg", // Placeholder path
    tag: "Bahan Baku"
  },
  {
    title: "Tradisi Poteng di Hari Raya",
    summary: "Mengapa Tape Singkong (Poteng) selalu hadir di meja tamu masyarakat Sasak saat Lebaran?",
    content: "Bagi masyarakat Sasak, Lebaran tanpa Poteng ibarat sayur tanpa garam. Poteng Jaje Tujak (Tape Ketan dan Jajan Uli) adalah simbol perekat silaturahmi. Namun, varian Poteng Singkong (Es Poteng) kini menjadi primadona baru karena kesegarannya. Tradisi fermentasi ini mengajarkan kita tentang kesabaran—menunggu ragi bekerja dalam gelap selama 3 hari demi hasil yang manis sempurna.",
    image: "/tradisi-poteng.jpg", // Placeholder path
    tag: "Sejarah"
  },
  {
    title: "Filosofi Kebersamaan dalam Begibung",
    summary: "Makan bersama dalam satu nampan besar, simbol persaudaraan yang tak lekang oleh waktu.",
    content: "Begibung adalah tradisi makan bersama dalam satu nampan besar (dulang) yang masih lestari di Lombok. Tidak ada perbedaan kasta di sini; semua duduk melingkar, berbagi lauk yang sama. Semangat kebersamaan inilah yang kami bawa ke dalam Kelompok PKKWU. Kami tidak hanya menjual makanan, tapi juga ingin menyebarkan nilai persaudaraan bahwa makanan terasa lebih nikmat jika dibagi bersama.",
    image: "/begibung.jpg", // Placeholder path
    tag: "Budaya"
  }
];

const CultureCard = ({ article, index }: { article: any, index: number }) => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`bg-white dark:bg-[#082f25] rounded-[2rem] overflow-hidden shadow-xl border border-gold-aged/10 transform transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="h-48 overflow-hidden relative group">
        {/* Fallback image if actual image fails or for placeholder */}
        <div className="w-full h-full bg-forest-deep/20 flex items-center justify-center text-forest-deep/30">
           <span className="material-symbols-outlined text-6xl">image</span>
        </div>
        <img
          src={article.image}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-0"
          onLoad={(e) => (e.target as HTMLImageElement).classList.remove('opacity-0')}
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 dark:bg-black/60 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-wider text-forest-deep dark:text-gold-aged shadow-lg">
            {article.tag}
          </span>
        </div>
      </div>
      <div className="p-8">
        <h3 className="text-2xl font-display font-bold text-forest-deep dark:text-white mb-4 leading-tight">
          {article.title}
        </h3>
        <p className="text-secondary/80 dark:text-gray-300 font-body text-sm leading-relaxed mb-6 line-clamp-3">
          {article.content}
        </p>
        <button className="text-primary font-bold text-sm uppercase tracking-widest hover:text-gold-aged transition-colors group flex items-center gap-2">
          Baca Selengkapnya
          <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

const Culture = () => {
  const { ref: heroRef, isVisible: isHeroVisible } = useScrollAnimation();

  return (
    <div className="min-h-screen bg-cream-parchment dark:bg-forest-deep transition-colors duration-500">

      {/* HERO SECTION */}
      <section className="relative py-24 px-6 lg:px-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 rounded-l-[5rem] -z-10"></div>

        <div
          ref={heroRef}
          className={`container mx-auto max-w-[1200px] text-center transition-all duration-1000 ${
             isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-gold-aged bg-gold-aged/10 text-gold-aged text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
            <span className="material-symbols-outlined text-sm">temple_buddhist</span> Warisan Bumi Gora
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-extrabold text-forest-deep dark:text-white mb-6">
            Jelajah Budaya <span className="text-primary italic">Sasak</span>
          </h1>
          <p className="text-secondary dark:text-gray-300 max-w-2xl mx-auto font-body text-lg leading-relaxed">
            Lebih dari sekadar rasa, ini adalah tentang cerita. Menyelami makna di balik setiap hidangan dan tradisi yang membentuk identitas kuliner Nusa Tenggara Barat.
          </p>
        </div>
      </section>

      {/* ARTICLES GRID */}
      <section className="pb-24 px-6 lg:px-20">
        <div className="container mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <CultureCard key={index} article={article} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE SECTION */}
      <section className="py-20 bg-forest-deep dark:bg-[#051f1a] text-center px-6 relative overflow-hidden">
        <div className="container mx-auto max-w-3xl relative z-10">
          <span className="material-symbols-outlined text-6xl text-gold-aged mb-6 opacity-50">format_quote</span>
          <h2 className="text-2xl md:text-4xl font-display font-bold text-white leading-normal italic">
            "Budaya tidak diwariskan melalui gen, tetapi melalui cerita, kebiasaan, dan... <span className="text-primary">makanan</span>."
          </h2>
          <div className="mt-8 text-gold-aged font-bold uppercase tracking-widest text-sm">— Pepatah Kuliner</div>
        </div>
      </section>

    </div>
  );
};

export default Culture;
