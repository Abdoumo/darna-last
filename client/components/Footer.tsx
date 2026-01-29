import { Link } from "react-router-dom";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Facebook } from "lucide-react";

type Language = "en" | "ar" | "fr";

interface FooterProps {
  language: Language;
}

// Sample images mapping for categories (Product Gallery)
const categoryImages: Record<string, string[]> = {
  "غرف نوم": [
    "/assets/WhatsApp Image 2026-01-18 at 8.14.05 PM.jpeg",
    "/assets/WhatsApp Image 2026-01-18 at 8.14.06 PM.jpeg",
    "/assets/WhatsApp Image 2026-01-19 at 1.37.20 PM.jpeg",
  ],
  "غرف أطفال": [
    "/assets/WhatsApp Image 2026-01-19 at 1.37.20 PM (1).jpeg",
    "/assets/WhatsApp Image 2026-01-19 at 1.37.20 PM (2).jpeg",
    "/assets/WhatsApp Image 2026-01-19 at 1.37.20 PM (3).jpeg",
  ],
  "صالونات": [
    "/assets/WhatsApp Image 2026-01-19 at 1.49.41 PM.jpeg",
    "/assets/WhatsApp Image 2026-01-19 at 1.49.42 PM.jpeg",
    "/assets/WhatsApp Image 2026-01-19 at 1.49.42 PM (2).jpeg",
  ],
  "Salle à manger": [
    "/assets/WhatsApp Image 2026-01-19 at 1.49.42 PM (3).jpeg",
    "/assets/WhatsApp Image 2026-01-19 at 1.49.42 PM (4).jpeg",
    "/assets/WhatsApp Image 2026-01-19 at 1.49.42 PM (5).jpeg",
  ],
  "Tables de cuisine": [
    "/assets/WhatsApp Image 2026-01-19 at 1.49.43 PM.jpeg",
    "/assets/WhatsApp Image 2026-01-19 at 1.49.43 PM (1).jpeg",
    "/assets/WhatsApp Image 2026-01-19 at 1.49.43 PM (2).jpeg",
  ],
  "Déco": [
    "/assets/WhatsApp Image 2026-01-19 at 1.49.44 PM.jpeg",
    "/assets/WhatsApp Image 2026-01-19 at 1.49.44 PM (1).jpeg",
    "/assets/deco-hero.jpeg",
  ],
};

// Mission card images from the internet
const missionCardImages: Record<number, string[]> = {
  1: [
    "https://images.pexels.com/photos/15124841/pexels-photo-15124841.jpeg",
    "https://images.pexels.com/photos/20285350/pexels-photo-20285350.jpeg",
    "https://images.pexels.com/photos/6438756/pexels-photo-6438756.jpeg",
  ],
  2: [
    "https://images.pexels.com/photos/7986988/pexels-photo-7986988.jpeg",
    "https://images.pexels.com/photos/5872174/pexels-photo-5872174.jpeg",
    "https://images.pexels.com/photos/5486112/pexels-photo-5486112.jpeg",
  ],
  3: [
    "https://images.pexels.com/photos/15379824/pexels-photo-15379824.jpeg",
    "https://images.pexels.com/photos/6169132/pexels-photo-6169132.jpeg",
    "https://images.pexels.com/photos/4440788/pexels-photo-4440788.jpeg",
  ],
  4: [
    "https://images.pexels.com/photos/5095283/pexels-photo-5095283.jpeg",
    "https://images.pexels.com/photos/18947372/pexels-photo-18947372.jpeg",
    "https://images.pexels.com/photos/12407407/pexels-photo-12407407.jpeg",
  ],
  5: [
    "https://images.pexels.com/photos/32786109/pexels-photo-32786109.jpeg",
    "https://images.pexels.com/photos/13684407/pexels-photo-13684407.jpeg",
    "https://images.pexels.com/photos/9818821/pexels-photo-9818821.jpeg",
  ],
  6: [
    "https://images.pexels.com/photos/6646875/pexels-photo-6646875.jpeg",
    "https://images.pexels.com/photos/6646926/pexels-photo-6646926.jpeg",
    "https://images.pexels.com/photos/7156160/pexels-photo-7156160.jpeg",
  ],
  7: [
    "https://images.pexels.com/photos/3735195/pexels-photo-3735195.jpeg",
    "https://images.pexels.com/photos/5099276/pexels-photo-5099276.jpeg",
    "https://images.pexels.com/photos/7771964/pexels-photo-7771964.jpeg",
  ],
  8: categoryImages["غرف أطفال"],
  9: categoryImages["صالونات"],
  10: categoryImages["Salle à manger"],
  11: categoryImages["Tables de cuisine"],
  12: categoryImages["Déco"],
};

// Image Carousel Component
interface ImageCarouselProps {
  category?: string;
  images?: string[];
}

function ImageCarousel({ category, images: propImages }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = propImages || (category ? categoryImages[category] : []) || ["/placeholder.svg"];

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const altText = category || "Gallery image";

  return (
    <div className="relative bg-slate-900 rounded-lg overflow-hidden mb-4 h-40">
      <img
        src={images[currentIndex]}
        alt={altText}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.currentTarget.src = "/placeholder.svg";
        }}
      />
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-1 rounded-full transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-1 rounded-full transition-colors"
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}
      <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}

export default function Footer({ language }: FooterProps) {
  const isRtl = language === "ar";

  const missions = {
    en: [
      {
        id: 1,
        title: "Hero Section",
        icon: "🏠",
        images: missionCardImages[1],
        taglines: [
          "Darna – Refresh your home... and win your pocket",
          "With Darna, your new is in love, and your old is valued",
          "With Darna, you sell... and someone else buys",
          "From your home to Darna",
        ],
      },
      {
        id: 2,
        title: "Smart Pricing",
        icon: "💶",
        images: missionCardImages[2],
        taglines: [
          "Fair electronic evaluation, no discussion and no argument",
          "Smart Price, Perfect Choice",
        ],
      },
      {
        id: 3,
        title: "Logistics & Tracking",
        icon: "🚚",
        images: missionCardImages[3],
        taglines: ["Your items are safe, track them wherever they are"],
      },
      {
        id: 4,
        title: "Maintenance & Repair",
        icon: "🛠",
        images: missionCardImages[4],
        taglines: ["Renovate without effort, gain comfort"],
      },
      {
        id: 5,
        title: "Darna Brocante",
        icon: "🗝",
        images: missionCardImages[5],
        taglines: [
          "Zeal of old times in a talented application",
          "Authenticity has an address, and rare pieces have a place",
          "Rare pieces for unique spaces",
        ],
      },
      {
        id: 6,
        title: "Charity & Donation",
        icon: "❤️",
        images: missionCardImages[6],
        taglines: [
          "Ongoing charity... in every expensive piece",
          "Share the comfort, spread the love",
        ],
      },
      {
        id: 7,
        title: "Sustainability & Recycling",
        icon: "♻️",
        images: missionCardImages[7],
        taglines: [
          "Smart recycling... for a clean world",
          "Your furniture is renewed, and the earth's lifespan is extended",
          "Re-think · Re-furnish · Re-love",
          "Nothing is thrown away, everything is transformed with Darna",
        ],
      },
      {
        id: 8,
        title: "Kids Rooms",
        icon: "🛏️",
        images: missionCardImages[8],
      },
      {
        id: 9,
        title: "Living Rooms",
        icon: "🪑",
        images: missionCardImages[9],
      },
      {
        id: 10,
        title: "Dining Rooms",
        icon: "🍽️",
        images: missionCardImages[10],
      },
      {
        id: 11,
        title: "Kitchen Tables",
        icon: "🪑",
        images: missionCardImages[11],
      },
      {
        id: 12,
        title: "Decoration",
        icon: "✨",
        images: missionCardImages[12],
      },
    ],
    ar: [
      {
        id: 1,
        title: "الواجهة الرئيسية",
        icon: "🏠",
        images: missionCardImages[1],
        taglines: [
          "دارنا – جدد بيتك… و اربح جيبك",
          "مع دارنا جديدك حبو، وقديمك نقدرو",
          "مع دارنا إنت تبيع… وغيرك يشري",
          "من دارك لدارنا",
        ],
      },
      {
        id: 2,
        title: "التسعير الذكي",
        icon: "💶",
        images: missionCardImages[2],
        taglines: [
          "تقييم إلكتروني عادل، لا تناقش ولا تجادل",
          "Smart Price, Perfect Choice",
        ],
      },
      {
        id: 3,
        title: "اللوجيستيك والتتبع",
        icon: "🚚",
        images: missionCardImages[3],
        taglines: ["متاعك في أمان، تبعو وين ما كان"],
      },
      {
        id: 4,
        title: "الصيانة والترميم",
        icon: "🛠",
        images: missionCardImages[4],
        taglines: ["Renover sans effort, gagnez le confort"],
      },
      {
        id: 5,
        title: "دارنا بروكنت",
        icon: "🗝",
        images: missionCardImages[5],
        taglines: [
          "همة زمان في تطبيق فنان",
          "للأصالة عنوان، وللقطع النادرة مكان",
          "Rare pieces for unique spaces",
        ],
      },
      {
        id: 6,
        title: "الأعمال الخيرية والتبرع",
        icon: "❤️",
        images: missionCardImages[6],
        taglines: [
          "صدقة جارية… في كل قطعة غالية",
          "Share the comfort, spread the love",
        ],
      },
      {
        id: 7,
        title: "الاستدامة وإعادة التدوير",
        icon: "♻️",
        images: missionCardImages[7],
        taglines: [
          "تدوير ذكي… لعالم نقي",
          "أثاثك يتجدد، وعمر الأرض يتمدد",
          "Re-think · Re-furnish · Re-love",
          "Rien ne se jette, tout se transforme avec Darna",
        ],
      },
      {
        id: 8,
        title: "غرف أطفال",
        icon: "🛏️",
        images: missionCardImages[8],
      },
      {
        id: 9,
        title: "صالونات",
        icon: "🪑",
        images: missionCardImages[9],
      },
      {
        id: 10,
        title: "Salle à manger",
        icon: "🍽️",
        images: missionCardImages[10],
      },
      {
        id: 11,
        title: "Tables de cuisine",
        icon: "🪑",
        images: missionCardImages[11],
      },
      {
        id: 12,
        title: "Déco",
        icon: "✨",
        images: missionCardImages[12],
      },
    ],
    fr: [
      {
        id: 1,
        title: "Section Héroïque",
        icon: "🏠",
        images: missionCardImages[1],
        taglines: [
          "Darna – Rafraîchissez votre maison... et gagnez votre poche",
          "Avec Darna, votre neuf est aimé, et votre ancien est valorisé",
          "Avec Darna, vous vendez... et quelqu'un d'autre achète",
          "De votre maison à Darna",
        ],
      },
      {
        id: 2,
        title: "Tarification Intelligente",
        icon: "💶",
        images: missionCardImages[2],
        taglines: [
          "Prix intelligent, choix évident",
          "Smart Price, Perfect Choice",
        ],
      },
      {
        id: 3,
        title: "Logistique et Suivi",
        icon: "🚚",
        images: missionCardImages[3],
        taglines: ["Suivez votre confort"],
      },
      {
        id: 4,
        title: "Maintenance et Rénovation",
        icon: "🛠",
        images: missionCardImages[4],
        taglines: ["Renover sans effort, gagnez le confort"],
      },
      {
        id: 5,
        title: "Darna Brocante",
        icon: "🗝",
        images: missionCardImages[5],
        taglines: [
          "Darna brocante, chaque objet a une histoire",
          "Rare pieces for unique spaces",
        ],
      },
      {
        id: 6,
        title: "Charité et Donation",
        icon: "❤️",
        images: missionCardImages[6],
        taglines: [
          "Le partage commence par un geste simple",
          "Share the comfort, spread the love",
        ],
      },
      {
        id: 7,
        title: "Durabilité et Recyclage",
        icon: "♻️",
        images: missionCardImages[7],
        taglines: [
          "Re-think · Re-furnish · Re-love",
          "Rien ne se jette, tout se transforme avec Darna",
        ],
      },
      {
        id: 8,
        title: "غرف أطفال",
        icon: "🛏️",
        images: missionCardImages[8],
      },
      {
        id: 9,
        title: "صالونات",
        icon: "🪑",
        images: missionCardImages[9],
      },
      {
        id: 10,
        title: "Salle à manger",
        icon: "🍽️",
        images: missionCardImages[10],
      },
      {
        id: 11,
        title: "Tables de cuisine",
        icon: "🪑",
        images: missionCardImages[11],
      },
      {
        id: 12,
        title: "Déco",
        icon: "✨",
        images: missionCardImages[12],
      },
    ],
  };

  const labels = {
    en: {
      ourMission: "Our Mission",
      copyright: "© 2026Darna. All rights reserved.",
      followUs: "Follow Us",
    },
    ar: {
      ourMission: "مهمتنا",
      copyright: "© 2026دارنا. جميع الحقوق محفوظة.",
      followUs: "تابعنا",
    },
    fr: {
      ourMission: "Notre Mission",
      copyright: "© 2026Darna. Tous droits réservés.",
      followUs: "Suivez-nous",
    },
  };

  const missionCards = missions[language];
  const footerLabels = labels[language];

  return (
    <footer
      className={`bg-gradient-to-b from-slate-900 to-slate-950 text-white mt-16 ${
        isRtl ? "rtl" : "ltr"
      }`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          {footerLabels.ourMission}
        </h2>

        {/* Mission Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {missionCards.map((card) => (
            <div
              key={card.id}
              className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-lg p-6 hover:from-slate-700 hover:to-slate-600 transition-all duration-300 border border-slate-600 hover:border-slate-500"
            >
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="text-xl font-bold mb-4">{card.title}</h3>

              {card.images && (
                <div className="mb-4">
                  <ImageCarousel images={card.images} />
                </div>
              )}
              {card.taglines && (
                <ul className="space-y-3">
                  {card.taglines.map((tagline, idx) => (
                    <li key={idx} className="text-sm text-gray-300 leading-relaxed">
                      "{tagline}"
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Facebook Link Section */}
        <div className="border-t border-slate-700 pt-12 mb-8">
          <div className="flex flex-col items-center justify-center gap-6">
            <h3 className="text-lg font-semibold">{footerLabels.followUs}</h3>
            <a
              href="https://www.facebook.com/share/1DQeJ3cHGF/?mibextid=LQQJ4d"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <Facebook size={24} />
              Facebook Page
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-700 pt-8">
          <p className="text-gray-400 text-center">{footerLabels.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
