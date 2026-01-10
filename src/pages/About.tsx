import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { adminEmail } from '../constants';

const teamMembers = [
  { name: 'Raka Anugrah Satya', role: 'Anggota Kelompok', quote: 'Melestarikan rasa lewat kode dan karsa.' },
  { name: 'Royyan Arga', role: 'Anggota Kelompok', quote: 'Kualitas rasa adalah prioritas utama kami.' },
  { name: 'Raihan Adilio', role: 'Anggota Kelompok', quote: 'Mengenalkan tradisi lewat teknologi.' },
  { name: 'Raditya Nugroho', role: 'Anggota Kelompok', quote: 'Menjaga keaslian resep warisan.' },
  { name: 'Romulus Pandapotan', role: 'Anggota Kelompok', quote: 'Inovasi modern untuk rasa tradisional.' },
];

const faqs = [
  {
    question: "Apakah produk halal?",
    answer: "Ya, 100% Halal. Semua bahan yang kami gunakan (gula aren, tepung ketan, singkong, ragi) adalah bahan alami dan diolah secara higienis tanpa alkohol (kecuali fermentasi alami tape yang halal menurut fatwa MUI)."
  },
  {
    question: "Berapa lama produk tahan?",
    answer: "Kelepon Kecerit sebaiknya dikonsumsi pada hari yang sama (tahan 24 jam suhu ruang). Es Poteng tahan hingga 5 hari jika disimpan di dalam kulkas (chiller)."
  },
  {
    question: "Apakah bisa dikirim ke luar kota?",
    answer: "Untuk saat ini, kami hanya melayani pengiriman area Jakarta Timur dan sekitarnya (Same Day Delivery) demi menjaga kualitas dan kesegaran produk."
  },
  {
    question: "Bagaimana cara penyajian terbaik?",
    answer: "Kelepon paling nikmat disantap hangat. Jika sudah dingin, bisa dikukus sebentar (2-3 menit). Es Poteng paling segar disajikan dingin dengan es serut tambahan."
  }
];

const About = () => {
  const navigate = useNavigate();
  const { ref: storyRef, isVisible: isStoryVisible } = useScrollAnimation();
  const { ref: faqRef, isVisible: isFaqVisible } = useScrollAnimation();
  const { ref: contactRef, isVisible: isContactVisible } = useScrollAnimation();

  // FAQ State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // Contact Form State
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    message: ''
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[Website Inquiry] ${formData.subject}`);
    const body = encodeURIComponent(`Halo, nama saya ${formData.name}.\n\n${formData.message}`);
    window.location.href = `mailto:${adminEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-cream-parchment dark:bg-forest-deep transition-colors duration-500 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        
        {/* BACKGROUND LAYER */}
        <div className="absolute inset-0">
            {/* Gambar Background */}
            <div 
                className="absolute inset-0 bg-cover bg-center" 
                style={{ backgroundImage: `url("/sekolahbg.jpg")` }}
            ></div>

            {/* A. Dark Overlay (Supaya teks putih terbaca jelas & tidak silau) */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* B. The "Fog" Gradient (FIXED)
               - Using gradient-to-t (bottom to top)
               - From solid color to transparent
            */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-cream-parchment dark:from-forest-deep to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto animate-fade-in-up pt-10">
          
          {/* Badge Project Sekolah - Warna Emas */}
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-gold-aged bg-gold-aged/10 text-gold-aged text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md shadow-lg shadow-gold-aged/5">
            <span className="material-symbols-outlined text-sm">school</span> Project Sekolah
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-extrabold text-white mb-6 drop-shadow-lg leading-tight">
            Kelompok <br/> <span className="text-primary italic">Five'R</span>
          </h1>
        </div>
      </section>

      {/* 2. STORY SECTION */}
      <section ref={storyRef} className={`py-16 px-6 lg:px-20 relative z-20 -mt-24 transition-all duration-1000 ${isStoryVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto max-w-[900px]">
          <div className="bg-white dark:bg-[#082f25] p-10 md:p-14 rounded-[2.5rem] shadow-2xl border border-gold-aged/20 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-br-[5rem]"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gold-aged/5 rounded-tl-[5rem]"></div>

            <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block">Latar Belakang</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-forest-deep dark:text-white mb-8">
              Anak RPL Masak? <br/> Kenapa Tidak.
            </h2>
            <div className="text-secondary/80 dark:text-gray-300 font-body leading-loose space-y-6 text-lg text-justify md:text-center relative z-10">
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

      {/* 3. TEAM CARDS SECTION */}
      <section className="py-20 px-6 lg:px-20">
        <div className="container mx-auto max-w-[1100px]">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-forest-deep dark:text-gold-aged mb-2">Tim Kami</h2>
            <p className="text-secondary/70 dark:text-gray-400 text-sm">Satu rasa, satu tujuan, lulus bersama.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-center">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="bg-white dark:bg-[#0a2e25] rounded-3xl p-6 text-center shadow-lg border border-gold-aged/10 hover:-translate-y-2 transition-transform duration-300 group relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-primary/5 rounded-full group-hover:bg-primary/10 transition-colors"></div>
                <div className="w-20 h-20 mx-auto bg-gray-200 dark:bg-white/5 rounded-full mb-4 overflow-hidden border border-gold-aged/30 relative z-10">
                  <img src={`https://ui-avatars.com/api/?name=${member.name}&background=b8860b&color=fff&size=128`} alt={member.name} className="w-full h-full object-cover"/>
                </div>
                <h3 className="text-sm font-bold text-forest-deep dark:text-white mb-1 leading-tight relative z-10">{member.name}</h3>
                <span className="text-[10px] font-bold text-primary uppercase tracking-wider block mb-3 relative z-10">{member.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FOTO TIM (4:3) */}
      <section className="pb-20 px-6 lg:px-20">
        <div className="container mx-auto max-w-[800px]">
          {/* Frame Foto Estetik */}
          <div className="relative p-3 bg-white dark:bg-[#0a2e25] rounded-[2rem] shadow-2xl border border-gold-aged/20 transform hover:scale-[1.01] transition-transform duration-500">
             {/* Aspect Ratio 4:3 Wrapper */}
             <div className="aspect-[4/3] w-full relative rounded-[1.5rem] overflow-hidden">
                <img 
                  src="/tim.jpg" 
                  alt="Foto Bersama Tim PKKWU SMKN 71" 
                  className="w-full h-full object-cover"
                />
                
                {/* Caption Overlay Halus */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
                <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 text-white text-left">
                  <span className="px-3 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-full mb-2 inline-block shadow-lg">
                    Class of 2025
                  </span>
                  <h3 className="text-2xl md:text-3xl font-display font-bold leading-tight">
                    Kebersamaan Kami
                  </h3>
                  <p className="text-gray-300 text-sm mt-1">
                    SMKN 71 Jakarta
                  </p>
                </div>
             </div>

             {/* Dekorasi Pin / Tape */}
             <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-primary/20 backdrop-blur-md rounded-full border border-white/20 shadow-lg flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-gold-aged animate-pulse"></div>
             </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ Section (NEW) */}
      <section ref={faqRef} className={`py-20 px-6 lg:px-20 bg-white/50 dark:bg-black/20 transition-all duration-1000 ${isFaqVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto max-w-[800px]">
          <div className="text-center mb-12">
            <span className="text-primary font-bold tracking-widest text-xs uppercase mb-2 block">Informasi</span>
            <h2 className="text-3xl font-display font-bold text-forest-deep dark:text-gold-aged">Tanya Jawab (FAQ)</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white dark:bg-[#0a2e25] rounded-2xl overflow-hidden border border-gold-aged/10 shadow-sm">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="font-bold text-forest-deep dark:text-white">{faq.question}</span>
                  <span className={`material-symbols-outlined transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180 text-primary' : 'text-gray-400'}`}>expand_more</span>
                </button>
                <div className={`px-6 text-secondary/80 dark:text-gray-300 font-body text-sm leading-relaxed transition-all duration-300 ease-in-out overflow-hidden ${openFaqIndex === index ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CONTACT FORM (NEW) */}
      <section ref={contactRef} className={`py-20 px-6 lg:px-20 transition-all duration-1000 ${isContactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto max-w-[800px]">
          <div className="bg-white dark:bg-[#082f25] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gold-aged/20">

            {/* Left/Top: Info */}
            <div className="p-10 bg-forest-deep text-white md:w-2/5 flex flex-col justify-between relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-[5rem]"></div>
               <div>
                 <h3 className="text-2xl font-display font-bold text-gold-aged mb-4">Hubungi Kami</h3>
                 <p className="text-sm text-gray-300 leading-relaxed mb-8">
                   Punya saran, kritik, atau ingin memesan dalam jumlah besar? Jangan ragu untuk mengirim pesan kepada kami.
                 </p>
               </div>
               <div className="space-y-4 text-sm">
                 <div className="flex items-center gap-3">
                   <span className="material-symbols-outlined text-gold-aged">email</span>
                   <span>{adminEmail}</span>
                 </div>
                 <div className="flex items-center gap-3">
                   <span className="material-symbols-outlined text-gold-aged">location_on</span>
                   <span>SMKN 71 Jakarta</span>
                 </div>
               </div>
            </div>

            {/* Right/Bottom: Form */}
            <div className="p-10 md:w-3/5">
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Nama</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-gray-50 dark:bg-black/20 border-b-2 border-gray-200 dark:border-white/10 p-3 outline-none focus:border-primary transition-colors text-forest-deep dark:text-white placeholder-gray-400"
                    placeholder="Nama Lengkap"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Subjek</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-gray-50 dark:bg-black/20 border-b-2 border-gray-200 dark:border-white/10 p-3 outline-none focus:border-primary transition-colors text-forest-deep dark:text-white placeholder-gray-400"
                    placeholder="Topik Pesan"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Pesan</label>
                  <textarea
                    required
                    rows={4}
                    className="w-full bg-gray-50 dark:bg-black/20 border-b-2 border-gray-200 dark:border-white/10 p-3 outline-none focus:border-primary transition-colors text-forest-deep dark:text-white placeholder-gray-400 resize-none"
                    placeholder="Tulis pesan Anda di sini..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>
                <button type="submit" className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-gold-aged transition-colors flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-lg">send</span>
                  Kirim Pesan
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* 7. CTA SECTION */}
      <section className="py-20 bg-forest-deep dark:bg-[#051f1a] text-center px-6 relative overflow-hidden">
        <div className="container mx-auto max-w-2xl relative z-10">
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
