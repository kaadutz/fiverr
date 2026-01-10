import { useNavigate } from 'react-router-dom';

const teamMembers = [
  { name: 'Raka Anugrah Satya', role: 'Ketua Kelompok & Manajemen', quote: 'Memimpin dengan visi melestarikan rasa.' },
  { name: 'Royyan Arga', role: 'Produksi & Kualitas', quote: 'Memastikan setiap gigitan terasa otentik.' },
  { name: 'Raihan Adilio', role: 'Pemasaran & Kreatif', quote: 'Mengenalkan warisan leluhur ke dunia digital.' },
  { name: 'Raditya Nugroho', role: 'Keuangan & Operasional', quote: 'Menjaga keseimbangan rasa dan harga.' },
  { name: 'Romulus Pandapotan', role: 'Riset & Pengembangan', quote: 'Berinovasi tanpa menghilangkan tradisi.' },
];

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-cream-parchment dark:bg-forest-deep transition-colors duration-500">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("/hero-bg.png")` }}>
          <div className="absolute inset-0 bg-black/60 mix-blend-multiply"></div>
          {/* Foggy Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-cream-parchment dark:from-forest-deep to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto animate-fade-in-up pt-10">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-gold-aged/50 bg-gold-aged/10 text-gold-aged text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
            <span className="material-symbols-outlined text-sm">groups</span> Dibalik Layar
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-extrabold text-white mb-6 drop-shadow-lg leading-tight">
            Wajah Dibalik <br/> <span className="text-primary italic">Warisan Rasa</span>
          </h1>
          <p className="text-gray-200 text-lg md:text-xl font-body leading-relaxed">
            Kami adalah sekumpulan siswa yang percaya bahwa kuliner tradisional bukan sekadar makanan, 
            melainkan identitas yang harus dijaga denyut nadinya.
          </p>
        </div>
      </section>

      {/* 2. STORY SECTION */}
      <section className="py-20 px-6 lg:px-20 relative z-20 -mt-20">
        <div className="container mx-auto max-w-[1000px]">
          <div className="bg-white dark:bg-[#082f25] p-10 md:p-16 rounded-[3rem] shadow-2xl border border-gold-aged/20 text-center relative overflow-hidden">
            {/* Background Pattern Decoration */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-br-full"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gold-aged/10 rounded-tl-full"></div>

            <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block">Awal Mula</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-forest-deep dark:text-white mb-8">
              Dari Tugas Sekolah Menjadi <br/> Misi Budaya
            </h2>
            <div className="text-secondary/80 dark:text-gray-300 font-body leading-loose space-y-6 text-lg">
              <p>
                Berawal dari tugas mata pelajaran <strong>PKKWU (Prakarya dan Kewirausahaan)</strong>, kami melihat tantangan besar: 
                generasi muda semakin asing dengan jajanan pasar seperti <em>Kelepon</em> dan minuman tradisional seperti <em>Es Poteng</em>.
              </p>
              <p>
                Kelompok kami memutuskan untuk tidak sekadar "membuat makanan", tapi "membangun pengalaman". 
                Kami meriset resep otentik dari tetua di Lombok, memadukannya dengan teknik pengemasan modern yang higienis, 
                dan menyajikannya kembali dengan estetika yang bisa diterima oleh lidah dan mata generasi masa kini.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TEAM SECTION */}
      <section className="py-24 px-6 lg:px-20">
        <div className="container mx-auto max-w-[1200px]">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-forest-deep dark:text-gold-aged mb-4">Tim Kami</h2>
            <p className="text-secondary/70 dark:text-gray-400">Lima pilar yang menopang berdirinya Beranda Kuliner NTB.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {teamMembers.map((member, idx) => (
              <div 
                key={idx} 
                className="group bg-white dark:bg-[#0a2e25] rounded-[2rem] p-8 text-center shadow-lg hover:shadow-2xl border border-gold-aged/10 hover:-translate-y-2 transition-all duration-500"
              >
                <div className="w-24 h-24 mx-auto bg-gray-200 dark:bg-white/10 rounded-full mb-6 overflow-hidden border-2 border-primary group-hover:scale-110 transition-transform">
                  {/* Placeholder Avatar - Bisa diganti foto asli nanti */}
                  <img 
                    src={`https://ui-avatars.com/api/?name=${member.name}&background=b8860b&color=fff`} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-display font-bold text-forest-deep dark:text-white mb-1">{member.name}</h3>
                <span className="text-xs font-bold text-primary uppercase tracking-wider mb-4 block">{member.role}</span>
                <p className="text-sm text-secondary/70 dark:text-gray-400 italic font-body">
                  "{member.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CTA SECTION */}
      <section className="py-20 bg-primary dark:bg-black/40 relative overflow-hidden">
        <div className="container mx-auto text-center px-6 relative z-10">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-8">
            Ingin Mencicipi Hasil Karya Kami?
          </h2>
          <button 
            onClick={() => navigate('/menu')}
            className="px-10 py-4 bg-white text-primary rounded-full font-bold shadow-xl hover:bg-gold-aged hover:text-white hover:scale-105 transition-all duration-300"
          >
            Lihat Menu Sekarang
          </button>
        </div>
        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('/heritage-pattern.png')]"></div>
      </section>

    </div>
  );
};

export default About;
