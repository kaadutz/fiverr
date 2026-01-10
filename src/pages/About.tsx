import { useNavigate } from 'react-router-dom';

const teamMembers = [
  { name: 'Raka Anugrah Satya', role: 'Anggota Kelompok', quote: 'Melestarikan rasa lewat kode dan karsa.' },
  { name: 'Royyan Arga', role: 'Anggota Kelompok', quote: 'Kualitas rasa adalah prioritas utama kami.' },
  { name: 'Raihan Adilio', role: 'Anggota Kelompok', quote: 'Mengenalkan tradisi lewat teknologi.' },
  { name: 'Raditya Nugroho', role: 'Anggota Kelompok', quote: 'Menjaga keaslian resep warisan.' },
  { name: 'Romulus Pandapotan', role: 'Anggota Kelompok', quote: 'Inovasi modern untuk rasa tradisional.' },
];

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-cream-parchment dark:bg-forest-deep transition-colors duration-500">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("/hero-bg.png")` }}>
          <div className="absolute inset-0 bg-black/60 mix-blend-multiply"></div>
          {/* Foggy Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-cream-parchment dark:from-forest-deep to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto animate-fade-in-up pt-10">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-gold-aged/50 bg-gold-aged/10 text-gold-aged text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
            <span className="material-symbols-outlined text-sm">school</span> Project Sekolah
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-extrabold text-white mb-6 drop-shadow-lg leading-tight">
            Sinergi Rasa & <br/> <span className="text-primary italic">Teknologi</span>
          </h1>
        </div>
      </section>

      {/* 2. STORY SECTION (Updated Content SMKN 71) */}
      <section className="py-16 px-6 lg:px-20 relative z-20 -mt-24">
        <div className="container mx-auto max-w-[900px]">
          <div className="bg-white dark:bg-[#082f25] p-10 md:p-14 rounded-[2.5rem] shadow-2xl border border-gold-aged/20 text-center relative overflow-hidden">
            
            <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block">Latar Belakang</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-forest-deep dark:text-white mb-8">
              Anak RPL Masak? <br/> Kenapa Tidak.
            </h2>
            
            <div className="text-secondary/80 dark:text-gray-300 font-body leading-loose space-y-6 text-lg text-justify md:text-center">
              <p>
                Kami adalah siswa kelas 12 dari <strong>SMKN 71 Jakarta</strong>, jurusan <strong>Rekayasa Perangkat Lunak (RPL)</strong>. 
                Website ini bukan sekadar portofolio coding, melainkan bagian dari tugas <strong>Ujian Praktek PKKWU (Produk Kreatif dan Kewirausahaan)</strong>.
              </p>
              <p>
                Tugas kami unik: Kami ditantang untuk menciptakan produk kuliner nyata, sekaligus membangun sistem pemasaran digitalnya sendiri. 
                Sebagai anak IT, kami melihat ini sebagai peluang untuk membuktikan bahwa kami tidak hanya jago di depan layar monitor, 
                tapi juga bisa melestarikan kuliner tradisional seperti <em>Kelepon Kecerit</em> dan <em>Es Poteng</em> agar tetap relevan di era digital.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. TEAM SECTION (Semua Anggota Rata) */}
      <section className="py-20 px-6 lg:px-20">
        <div className="container mx-auto max-w-[1100px]">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-forest-deep dark:text-gold-aged mb-2">Tim Kami</h2>
            <p className="text-secondary/70 dark:text-gray-400 text-sm">Satu rasa, satu tujuan, lulus bersama.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-center">
            {teamMembers.map((member, idx) => (
              <div 
                key={idx} 
                className="bg-white dark:bg-[#0a2e25] rounded-3xl p-6 text-center shadow-lg border border-gold-aged/10 hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="w-20 h-20 mx-auto bg-gray-200 dark:bg-white/5 rounded-full mb-4 overflow-hidden border border-gold-aged/30">
                  <img 
                    src={`https://ui-avatars.com/api/?name=${member.name}&background=b8860b&color=fff&size=128`} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-sm font-bold text-forest-deep dark:text-white mb-1 leading-tight">{member.name}</h3>
                <span className="text-[10px] font-bold text-primary uppercase tracking-wider block mb-3">{member.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CTA SECTION (Simple & Solid) */}
      {/* Bagian ini diperbaiki jadi solid color (hijau tua) biar tidak aneh */}
      <section className="py-16 bg-forest-deep dark:bg-[#051f1a] text-center px-6">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-gold-aged mb-6">
            Dukung Ujian Praktek Kami dengan Mencicipi Rasa
          </h2>
          <button 
            onClick={() => navigate('/menu')}
            className="px-8 py-3 bg-white text-forest-deep rounded-xl font-bold shadow-xl hover:bg-gold-aged hover:text-white hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
          >
            <span className="material-symbols-outlined text-sm">restaurant_menu</span>
            Lihat Menu
          </button>
        </div>
      </section>

    </div>
  );
};

export default About;
