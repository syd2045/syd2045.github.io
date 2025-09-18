const weddingData = {
  bride: {
    name: "Siti Aisyah",
    photo: "images/cewe.png", // Ganti dengan path foto pengantin wanita
    parents: "Bapak Ahmad & Ibu Fatimah"
  },
  groom: {
    name: "Muhammad Rizki", 
    photo: "images/cowo.png", // Ganti dengan path foto pengantin pria
    parents: "Bapak Sulaiman & Ibu Khadijah"
  },
  couple: {
    photo: "images/couple.png" // Ganti dengan path foto couple
  },
  wedding: {
    date: "2025-12-25T10:00:00", // Format: YYYY-MM-DDTHH:mm:ss
    dateFormatted: "25 Desember 2025",
    akad: {
      date: "25 Desember 2025",
      time: "08:00 - 10:00 WIB"
    },
    resepsi: {
      date: "25 Desember 2025", 
      time: "11:00 - Selesai"
    },
    venue: {
      address: "Masjid Al-Hidayah, Jl. Merdeka No. 123, Jakarta Selatan",
      mapLink: "https://goo.gl/maps/your-google-maps-link" // Ganti dengan link Google Maps yang sebenarnya
    }
  },
  hadith: {
    arabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
    translation: "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang.",
    source: "QS. Ar-Rum: 21"
  },
  gallery: {
    enabled: true, // Set ke false untuk menonaktifkan gallery
    photos: [
      "images/1.png",
      "images/2.png", 
      "images/3.png",
      "images/4.png",
      "images/5.png",
      
      // Tambahkan lebih banyak foto sesuai kebutuhan
    ]
  }
};

// Export untuk penggunaan dalam React/HTML
if (typeof module !== 'undefined' && module.exports) {
  module.exports = weddingData;
} else if (typeof window !== 'undefined') {
  window.weddingData = weddingData;
}