import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { 
  Phone, 
  MapPin, 
  Mail, 
  Clock, 
  Star, 
  ArrowUpRight, 
  ArrowUp,
  Check, 
  Scissors, 
  Sparkles, 
  Award,
  ChevronRight,
  Menu,
  X,
  Calendar,
  User,
  ShieldCheck
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// =========================================================================
// TEXT CONTENT CONFIGURATION (Easily editable salon texts)
// =========================================================================
export const SALON_CONTENT = {
  brand: {
    name: "MONARCH",
    tagline: "Bespoke Men's Grooming & Barber Atelier",
    copyright: "Copyright and design by @FramerDevs 1990 - 2025"
  },
  contact: {
    phoneDisplay: "+1 (212) 840-2020",
    phoneTel: "+12128402020",
    email: "concierge@monarchgrooming.com",
    address: "450 Lexington Avenue, New York, NY 10017",
    schedule: [
      { days: "Monday - Friday", hours: "8:00AM - 7:00PM", isHoliday: false },
      { days: "Saturday", hours: "9:00AM - 8:00PM", isHoliday: false },
      { days: "Sunday", hours: "Holiday", isHoliday: true }
    ],
    branches: ["NEW YORK", "LONDON", "PARIS", "MILAN", "TOKYO", "DUBAI"]
  },
  hero: {
    titleLine1: "CRAFT",
    titleLine2: "MEETS",
    titleLine3: "ELEGANCE",
    subtext: "From bespoke scissor cuts to traditional hot lather shaves, our master barbers deliver an unmatched standard of refined men's grooming.",
    ctaBookSlot: "BOOK YOUR SLOT",
    ctaAppointment: "BOOK APPOINTMENT"
  },
  about: {
    tag: "ABOUT MONARCH",
    headingLine1: "YOUR PREMIER BESPOKE",
    headingLine2: "GROOMING & BARBER",
    headingLine3: "ATELIER.",
    cardTitle: "WHY CHOOSE US?",
    cardText: "Blending timeless European barber traditions with contemporary gentleman styling tailored to your distinct profile.",
    checkpoints: [
      "Master barbers & certified styling artisans",
      "Private, tranquil, and luxurious grooming suites",
      "Tailored scalp, hair, and beard consultations"
    ],
    ctaButton: "OUR EXPERTISE"
  },
  services: {
    tag: "OUR SERVICES",
    headingLine1: "YOUR TRUSTED BESPOKE",
    headingLine2: "BARBER SERVICES",
    items: [
      {
        title: "BESPOKE CUT",
        price: null,
        desc: "Tailored precision cuts designed to complement your facial structure and daily lifestyle.",
        isFeatured: false
      },
      {
        title: "THE SOVEREIGN SHAVE",
        price: "$55",
        desc: "Signature hot lather straight razor shave finished with cold botanical towels and balm.",
        isFeatured: true
      },
      {
        title: "EXECUTIVE TAPER",
        price: null,
        desc: "Seamless skin fades and classic low tapers perfected with hand-finished razor edges.",
        isFeatured: false
      },
      {
        title: "CRAFT & SHEARS",
        price: null,
        desc: "Full textured scissor work, precision weight removal, and custom pomade finishing.",
        isFeatured: false
      },
      {
        title: "ROYAL SCULPT",
        price: null,
        desc: "Complete beard reshaping, neckline razor sculpting, and deep conditioning oil treatment.",
        isFeatured: false
      },
      {
        title: "THE TONIC LOUNGE",
        price: null,
        desc: "Revitalizing scalp wash ritual, invigorating botanical rinse, and relaxed styling consultation.",
        isFeatured: false
      }
    ]
  },
  testimonials: {
    tag: "TESTIMONIALS",
    heading: "WHAT CLIENTS SAY",
    clientName: "ARTHUR C. PENDLETON",
    clientRole: "MANAGING DIRECTOR, BLACKSTONE",
    quote: "From the warm lather straight razor shave to the tailored precision cut, Monarch is the definitive standard in bespoke gentlemen's grooming. Exceptional service and impeccable atmosphere."
  },
  funFacts: {
    tag: "FUN FACTS",
    headingLine1: "BEING BETTER INFORMED",
    headingLine2: "MEANS MAKING A GOOD AND",
    headingLine3: "BETTER DECISIONS",
    card1Stat: "1500+",
    card1Label: "Serving daily haircut",
    card2Title: "CLEAN, RELAXING, AND WELCOMING ENVIRONMENT",
    card2Stat: "1500+",
    card2Label: "Serving daily haircut",
    card3Title: "CLEAN, RELAXING, AND WELCOMING ENVIRONMENT",
    card3Stat: "1500+",
    card3Label: "Serving daily haircut",
    card4Tag: "MEET WITH REWARDS",
    awards: ["ULTRA BEST BARBER", "HYPER BEST SALON"]
  },
  team: {
    tag: "MEET WITH TEAM",
    headingLine1: "EXPERT GROOMING",
    headingLine2: "CONSULTATIONS",
    ctaJoin: "JOIN WITH US",
    members: [
      { name: "JULIAN K. CROSS", role: "BARBER" },
      { name: "DOMINIC V. REYES", role: "BARBER" },
      { name: "MARCUS E. VAUGHN", role: "BARBER" }
    ]
  },
  marquee: "REFINED, TIMELESS, AND BESPOKE GROOMING EXPERIENCE",
  news: {
    galleryHeadingLine1: "BROWSE OUR LATEST",
    galleryHeadingLine2: "HAIRCUTS, STYLES, AND",
    galleryHeadingLine3: "TRANSFORMATIONS.",
    tag: "NEWS & INSIGHTS",
    headingLine1: "GET EVERY UPDATES",
    headingLine2: "FROM HERE",
    articles: [
      {
        category: "SALON",
        title: "ESTABLISHMENTS SUCH AS BAAN THAI AND MENS PLANET NOW PROVIDE ENHANCED.",
        date: "July 29, 2025"
      },
      {
        category: "BARBER",
        title: "BARBERS IN TEXAS AND LOUISIANA ARE CREATING SAFE SPACES.",
        date: "July 29, 2025"
      },
      {
        category: "STYLISH",
        title: "FOR MEN OF COLOR TO DISCUSS MENTAL HEALTH, INTEGRATING THERAPY.",
        date: "July 29, 2025"
      }
    ]
  },
  footer: {
    ctaTitleLine1: "TRANSFORM",
    ctaTitleLine2: "YOUR HAIR",
    ctaTitleLine3: "TODAY.",
    ctaButton: "BOOK AN APPOINTMENT",
    essentialPages: ["ABOUT SHOP", "OUR SERVICES", "EXPERT BABERS", "GALLERY", "COMMUNITY", "GET IN TOUCH"],
    socialLinks: ["FACEBOOK", "YOUTUBE", "LINKEDIN", "BEHANCE", "X"]
  }
};

// Online images sourced directly from Unsplash CDN
const IMAGES = {
  heroPill: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=400&q=80",
  heroMan: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1000&q=80",
  heroBrush: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=600&q=80",
  aboutBarber: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1000&q=80",
  aboutSalon: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1000&q=80",
  testimonialMan: "https://images.unsplash.com/photo-1593702233354-259d1f794ed1?auto=format&fit=crop&w=1000&q=80",
  avatar1: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
  avatar2: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80",
  avatar3: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
  bentoScissors: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=1000&q=80",
  bentoBowl: "https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=400&q=80",
  bentoPomade: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=400&q=80",
  bentoRewards: "https://images.unsplash.com/photo-1534778356534-d3d45b6df1da?auto=format&fit=crop&w=1000&q=80",
  openingHoursBg: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1920&q=80",
  team1: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
  team2: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
  team3: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
  newsCut: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1000&q=80"
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Bespoke Cut');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const containerRef = useRef(null);
  const lenisRef = useRef(null);

  const openBooking = (serviceName = 'Bespoke Cut') => {
    setSelectedService(serviceName);
    setBookingModalOpen(true);
  };

  // -------------------------------------------------------------
  // LENIS SMOOTH SCROLLING SETUP & GSAP TICKER INTEGRATION
  // -------------------------------------------------------------
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Silky exponential ease-out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.6,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Synchronize Lenis scroll position with GSAP ScrollTrigger
    lenis.on('scroll', (e) => {
      ScrollTrigger.update();
      setShowBackToTop(e.scroll > 400);
    });

    // Run Lenis RAF within GSAP ticker for synchronized 60-120fps motion
    const handleTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(handleTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(handleTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Smooth scroll helper for internal navigation and buttons
  const scrollTo = (target) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        offset: -20,
        duration: 1.35,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' });
      } else {
        const el = document.querySelector(target);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  useEffect(() => {
    if (bookingModalOpen) {
      // Pause smooth scrolling while modal is open
      lenisRef.current?.stop();
      gsap.fromTo('.booking-modal-overlay', 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.25, ease: 'power2.out' }
      );
      gsap.fromTo('.booking-modal-box', 
        { opacity: 0, scale: 0.9, y: 25 }, 
        { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'back.out(1.4)' }
      );
    } else {
      // Resume smooth scrolling when modal closes
      lenisRef.current?.start();
    }
  }, [bookingModalOpen]);

  useGSAP(() => {
    // -------------------------------------------------------------
    // 1. CONTINUOUS ANIMATING ELEMENTS (Ambient Motions)
    // -------------------------------------------------------------
    // Ambient background golden glow drifting & breathing
    gsap.to('.hero-glow', {
      x: -60,
      y: 40,
      scale: 1.25,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // Golden barber silhouette logo pulse & shimmer
    gsap.to('.hero-logo-icon', {
      scale: 1.1,
      filter: 'drop-shadow(0 0 8px rgba(202, 166, 114, 0.75))',
      duration: 2.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // Hero title pill thumbnail subtle floating
    gsap.to('.hero-pill-floating', {
      y: -6,
      scale: 1.04,
      duration: 2.8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // Hero luxury shaving brush floating & tilting
    gsap.to('.hero-brush-floating', {
      y: -12,
      rotation: 2.5,
      duration: 3.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // Testimonials straight razor accent floating & swaying
    gsap.to('.testimonial-razor', {
      y: -8,
      rotation: 20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // Bento circular images subtle floating & rotation
    gsap.to('.bento-circle-1', {
      y: -7,
      rotation: 8,
      duration: 3.6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
    gsap.to('.bento-circle-2', {
      y: 7,
      rotation: -8,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });


    // Giant MONARCH brand wordmark in footer ambient golden glow breathing
    gsap.to('.footer-wordmark-text', {
      filter: 'drop-shadow(0 0 24px rgba(202, 166, 114, 0.35))',
      duration: 3.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // -------------------------------------------------------------
    // 2. HERO ENTRANCE TIMELINE
    // -------------------------------------------------------------
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    heroTl.fromTo('.hero-navbar', 
      { y: -35, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.85 }
    );

    heroTl.fromTo('.hero-title-line', 
      { y: 55, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.14 }, 
      '-=0.45'
    );

    heroTl.fromTo('.hero-subtext', 
      { y: 25, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.7 }, 
      '-=0.4'
    );

    heroTl.fromTo('.hero-cta-btn', 
      { scale: 0.9, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 0.6 }, 
      '-=0.3'
    );

    heroTl.fromTo('.hero-man-img', 
      { x: 50, opacity: 0, scale: 0.95 }, 
      { x: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'power2.out' }, 
      '-=0.75'
    );

    heroTl.fromTo('.hero-brush-img', 
      { y: 45, opacity: 0, scale: 0.85 }, 
      { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: 'back.out(1.4)' }, 
      '-=0.6'
    );

    // -------------------------------------------------------------
    // 3. ABOUT SECTION SCROLLTRIGGERS
    // -------------------------------------------------------------
    gsap.fromTo('.about-header', 
      { y: 40, opacity: 0 }, 
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#about',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    gsap.fromTo('.about-left-img', 
      { y: 55, opacity: 0, scale: 0.96 }, 
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-left-img',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );

    gsap.fromTo('.about-right-img', 
      { y: 45, opacity: 0 }, 
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-right-img',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );

    gsap.fromTo('.about-card', 
      { y: 45, opacity: 0 }, 
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-card',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );

    gsap.fromTo('.about-check-item', 
      { x: -20, opacity: 0 }, 
      {
        x: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.about-card',
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      }
    );


    // -------------------------------------------------------------
    // 4. SERVICES SECTION SCROLLTRIGGERS
    // -------------------------------------------------------------
    gsap.fromTo('.services-header', 
      { y: 35, opacity: 0 }, 
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#services',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    gsap.fromTo('.service-card', 
      { y: 50, opacity: 0, scale: 0.96 }, 
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );

    // Interactive hover animation for service cards icons
    const serviceCards = gsap.utils.toArray('.service-card');
    serviceCards.forEach((card) => {
      const icon = card.querySelector('.service-card-icon');
      if (icon) {
        card.addEventListener('mouseenter', () => {
          gsap.to(icon, { scale: 1.15, rotation: 4, duration: 0.35, ease: 'power2.out' });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(icon, { scale: 1, rotation: 0, duration: 0.35, ease: 'power2.out' });
        });
      }
    });

    // -------------------------------------------------------------
    // 5. TESTIMONIALS SECTION SCROLLTRIGGERS
    // -------------------------------------------------------------
    gsap.fromTo('.testimonials-header', 
      { y: 35, opacity: 0 }, 
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#testimonials',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    gsap.fromTo('.testimonials-img', 
      { x: -50, opacity: 0 }, 
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.testimonials-img',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    gsap.fromTo('.testimonials-card', 
      { x: 50, opacity: 0 }, 
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.testimonials-card',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    gsap.fromTo('.testimonial-star', 
      { scale: 0, opacity: 0 }, 
      {
        scale: 1,
        opacity: 1,
        stagger: 0.08,
        duration: 0.5,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: '.testimonials-card',
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      }
    );

    // -------------------------------------------------------------
    // 6. FUN FACTS BENTO GRID & ANIMATING COUNTERS
    // -------------------------------------------------------------
    gsap.fromTo('.funfacts-header', 
      { y: 35, opacity: 0 }, 
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.funfacts-section',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    gsap.fromTo('.bento-card', 
      { y: 55, opacity: 0, scale: 0.95 }, 
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.15,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.funfacts-grid',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );

    // Animated counting up stats: 0 -> 1500+
    const counters = gsap.utils.toArray('.funfacts-counter');
    counters.forEach((counter) => {
      const countObj = { val: 0 };
      gsap.to(countObj, {
        val: 1500,
        duration: 2.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: counter,
          start: 'top 85%',
          once: true
        },
        onUpdate: () => {
          counter.textContent = `${Math.floor(countObj.val)}+`;
        }
      });
    });

    // -------------------------------------------------------------
    // 7. OPENING HOURS BANNER PARALLAX & CARD REVEAL
    // -------------------------------------------------------------
    gsap.to('.hours-bg-img', {
      yPercent: 14,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hours-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

    gsap.fromTo('.hours-card', 
      { x: 60, opacity: 0 }, 
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.hours-section',
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      }
    );

    gsap.fromTo('.hours-row', 
      { x: 20, opacity: 0 }, 
      {
        x: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.hours-card',
          start: 'top 70%',
          toggleActions: 'play none none none'
        }
      }
    );

    // -------------------------------------------------------------
    // 8. TEAM SECTION SCROLLTRIGGERS
    // -------------------------------------------------------------
    gsap.fromTo('.team-header', 
      { y: 35, opacity: 0 }, 
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.team-section',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    gsap.fromTo('.team-card', 
      { y: 55, opacity: 0, scale: 0.96 }, 
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.15,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.team-grid',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );

    // -------------------------------------------------------------
    // 9. NEWS SECTION SCROLLTRIGGERS
    // -------------------------------------------------------------
    gsap.fromTo('.news-gallery-header', 
      { y: 35, opacity: 0 }, 
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.news-gallery-header',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );

    gsap.fromTo('.news-header', 
      { y: 35, opacity: 0 }, 
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.news-header',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );

    gsap.fromTo('.news-img', 
      { x: -40, opacity: 0 }, 
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.news-img',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    gsap.fromTo('.news-article-item', 
      { x: 30, opacity: 0 }, 
      {
        x: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.news-articles-list',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );

    // -------------------------------------------------------------
    // 10. FOOTER SCROLLTRIGGERS & SCRUB
    // -------------------------------------------------------------
    gsap.fromTo('.footer-top', 
      { y: 40, opacity: 0 }, 
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.footer-section',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );

    gsap.fromTo('.footer-wordmark-text', 
      { scale: 0.92, opacity: 0.4 }, 
      {
        scale: 1,
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.footer-wordmark',
          start: 'top 95%',
          end: 'bottom 85%',
          scrub: 1
        }
      }
    );

    // -------------------------------------------------------------
    // 12. LUXURY GOLDEN SCROLL PROGRESS ANIMATION
    // -------------------------------------------------------------
    gsap.to('.scroll-progress-bar', {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.15
      }
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen bg-[#f7f4ee] text-[#1c1c1c] selection:bg-[#caa672] selection:text-white font-sans">
      
      {/* Luxury Golden Scroll Progress Indicator Bar */}
      <div 
        className="scroll-progress-bar fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#caa672] via-[#f3dfb9] to-[#caa672] z-50 origin-left scale-x-0 shadow-[0_0_10px_rgba(202,166,114,0.7)] pointer-events-none" 
      />

      {/* Floating Smooth Scroll Back to Top Button */}
      <button
        onClick={() => scrollTo(0)}
        aria-label="Scroll to top"
        className={`fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-[#141518]/90 text-[#caa672] border border-[#caa672]/50 backdrop-blur-md shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-[#caa672] hover:bg-[#caa672] hover:text-black cursor-pointer group ${
          showBackToTop 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <ArrowUp className="w-5 h-5 stroke-[2.5] group-hover:-translate-y-0.5 transition-transform" />
      </button>
      
      {/* =========================================================================
          1. HEADER & HERO (Dark Background)
         ========================================================================= */}
      <section className="bg-[#0b0c0e] text-white pt-5 pb-20 px-4 md:px-8 lg:px-12 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="hero-glow absolute top-0 right-0 w-[500px] h-[500px] bg-[#caa672]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Top Floating White Navigation Bar */}
        <header className="hero-navbar max-w-6xl mx-auto bg-white text-neutral-900 rounded-lg px-6 py-3.5 shadow-md flex items-center justify-between relative z-50">
          {/* Logo */}
          <button onClick={() => scrollTo(0)} className="flex items-center gap-2.5 group cursor-pointer text-left">
            {/* Golden Barber Silhouette / Head Icon */}
            <div className="hero-logo-icon w-7 h-7 flex items-center justify-center text-[#caa672]">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M12 2C8.686 2 6 4.686 6 8c0 1.954.935 3.69 2.387 4.793-.245.548-.387 1.157-.387 1.797 0 1.25.525 2.378 1.368 3.177C8.544 18.337 8 19.38 8 20.5v1.5h8v-1.5c0-1.12-.544-2.163-1.368-2.733.843-.799 1.368-1.927 1.368-3.177 0-.64-.142-1.249-.387-1.797C17.065 11.69 18 9.954 18 8c0-3.314-2.686-6-6-6zm0 2c2.209 0 4 1.791 4 4 0 1.859-1.282 3.411-3 3.858V10h-2v1.858C9.282 11.411 8 9.859 8 8c0-2.209 1.791-4 4-4zm-2 10.59c0-.882.718-1.59 1.6-1.59h.8c.882 0 1.6.708 1.6 1.59 0 .61-.34 1.14-.85 1.41l-.75.4v1.6h-1.6v-1.6l-.75-.4c-.51-.27-.85-.8-.85-1.41z"/>
              </svg>
            </div>
            <span className="font-heading font-extrabold text-xl tracking-wider text-black">
              {SALON_CONTENT.brand.name}
            </span>
          </button>

          {/* Navigation Links with Smooth Scrolling */}
          <nav className="hidden md:flex items-center gap-7 text-[11px] font-bold tracking-widest uppercase text-neutral-800">
            <button 
              onClick={() => scrollTo('#about')} 
              className="hover:text-[#caa672] transition-colors flex items-center gap-1 cursor-pointer"
            >
              ABOUT <span className="text-[10px] text-neutral-400">+</span>
            </button>
            <button 
              onClick={() => scrollTo('#services')} 
              className="hover:text-[#caa672] transition-colors flex items-center gap-1 cursor-pointer"
            >
              SERVICES <span className="text-[10px] text-neutral-400">+</span>
            </button>
            <button 
              onClick={() => scrollTo('#testimonials')} 
              className="hover:text-[#caa672] transition-colors cursor-pointer"
            >
              REVIEWS
            </button>
            <button 
              onClick={() => scrollTo('#team')} 
              className="hover:text-[#caa672] transition-colors cursor-pointer"
            >
              TEAM
            </button>
            <button 
              onClick={() => scrollTo('#news')} 
              className="hover:text-[#caa672] transition-colors cursor-pointer"
            >
              NEWS
            </button>
            <button 
              onClick={() => scrollTo('#contact')} 
              className="hover:text-[#caa672] transition-colors cursor-pointer"
            >
              CONTACT
            </button>
          </nav>

          {/* Right Phone + CTA Button */}
          <div className="flex items-center gap-4">
            <a 
              href={`tel:${SALON_CONTENT.contact.phoneTel}`} 
              className="hidden lg:block text-xs font-semibold tracking-wider text-neutral-700 hover:text-black transition"
            >
              {SALON_CONTENT.contact.phoneDisplay}
            </a>
            <button 
              onClick={() => openBooking()}
              className="bg-[#caa672] hover:bg-[#b8935c] text-white text-[11px] font-bold tracking-widest uppercase px-5 py-2.5 rounded transition shadow-sm cursor-pointer"
            >
              {SALON_CONTENT.hero.ctaBookSlot}
            </button>

            {/* Mobile menu button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-neutral-800 p-1.5 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </header>

        {/* Mobile dropdown menu with Smooth Scrolling */}
        {mobileMenuOpen && (
          <div className="md:hidden max-w-6xl mx-auto mt-2 bg-white text-neutral-900 rounded-lg p-5 shadow-lg flex flex-col gap-4 text-xs font-bold uppercase tracking-wider">
            <button 
              onClick={() => { setMobileMenuOpen(false); scrollTo('#about'); }} 
              className="text-left hover:text-[#caa672] transition cursor-pointer"
            >
              ABOUT
            </button>
            <button 
              onClick={() => { setMobileMenuOpen(false); scrollTo('#services'); }} 
              className="text-left hover:text-[#caa672] transition cursor-pointer"
            >
              SERVICES
            </button>
            <button 
              onClick={() => { setMobileMenuOpen(false); scrollTo('#testimonials'); }} 
              className="text-left hover:text-[#caa672] transition cursor-pointer"
            >
              TESTIMONIALS
            </button>
            <button 
              onClick={() => { setMobileMenuOpen(false); scrollTo('#team'); }} 
              className="text-left hover:text-[#caa672] transition cursor-pointer"
            >
              OUR TEAM
            </button>
            <button 
              onClick={() => { setMobileMenuOpen(false); scrollTo('#news'); }} 
              className="text-left hover:text-[#caa672] transition cursor-pointer"
            >
              NEWS
            </button>
            <button 
              onClick={() => { setMobileMenuOpen(false); scrollTo('#contact'); }} 
              className="text-left hover:text-[#caa672] transition cursor-pointer"
            >
              CONTACT
            </button>
            <a href={`tel:${SALON_CONTENT.contact.phoneTel}`} className="text-[#caa672] pt-2 border-t border-neutral-100">
              {SALON_CONTENT.contact.phoneDisplay}
            </a>
          </div>
        )}

        {/* Hero Main Content */}
        <div className="max-w-6xl mx-auto mt-14 md:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Block */}
          <div className="lg:col-span-7 z-10">
            <h1 className="font-heading font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-[76px] tracking-tight leading-[1.05] text-white uppercase">
              <div className="hero-title-line">{SALON_CONTENT.hero.titleLine1}</div>
              <div className="flex items-center flex-wrap gap-3 my-1 hero-title-line">
                {/* Inline Rounded Thumbnail */}
                <span className="hero-pill-floating inline-flex items-center justify-center h-12 w-24 md:h-14 md:w-28 rounded-full overflow-hidden border border-white/20 bg-neutral-800 shadow-inner align-middle">
                  <img 
                    src={IMAGES.heroPill} 
                    alt="Salon Hair Wash" 
                    className="w-full h-full object-cover"
                  />
                </span>
                <span>{SALON_CONTENT.hero.titleLine2}</span>
              </div>
              <div className="hero-title-line">{SALON_CONTENT.hero.titleLine3}</div>
            </h1>

            <p className="hero-subtext mt-6 text-neutral-400 text-xs sm:text-sm md:text-[13px] leading-relaxed max-w-md">
              {SALON_CONTENT.hero.subtext}
            </p>

            <div className="mt-8">
              <button 
                onClick={() => openBooking(SALON_CONTENT.services.items[0].title)}
                className="hero-cta-btn border border-[#caa672] text-white text-[11px] font-bold tracking-widest uppercase px-7 py-3 hover:bg-[#caa672] hover:text-black transition duration-300"
              >
                {SALON_CONTENT.hero.ctaAppointment}
              </button>
            </div>
          </div>

          {/* Right Image Block (Hero Bearded Man + Luxury Shaving Brush) */}
          <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end mt-8 lg:mt-0">
            <div className="relative w-full max-w-[420px] flex items-end justify-center">
              {/* Hero Portrait */}
              <div className="hero-man-img relative z-10 w-[78%] overflow-hidden rounded-md shadow-2xl">
                <img 
                  src={IMAGES.heroMan} 
                  alt="Gentleman Grooming Style" 
                  className="w-full h-auto object-cover aspect-[4/5]"
                />
              </div>

              {/* Shaving Brush Leaning / Standing to the right */}
              <div className="hero-brush-img hero-brush-floating relative z-20 w-[36%] -ml-12 mb-3 rounded-md overflow-hidden border border-neutral-700/60 shadow-2xl">
                <img 
                  src={IMAGES.heroBrush} 
                  alt="Luxury Shaving Brush" 
                  className="w-full h-auto object-cover aspect-square"
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          2. ABOUT SECTION & LOGOS STRIP
         ========================================================================= */}
      <section id="about" className="py-20 px-4 md:px-8 lg:px-12 max-w-6xl mx-auto">
        {/* Top Tag & Main Heading */}
        <div className="mb-12 about-header">
          <span className="badge-tag mb-3">{SALON_CONTENT.about.tag}</span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-neutral-900 leading-[1.1] max-w-2xl">
            {SALON_CONTENT.about.headingLine1} <br />
            {SALON_CONTENT.about.headingLine2} <br />
            {SALON_CONTENT.about.headingLine3}
          </h2>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Left Column: Vertical Large Photo */}
          <div className="about-left-img md:col-span-6 overflow-hidden rounded-md shadow-sm bg-neutral-200">
            <img 
              src={IMAGES.aboutBarber} 
              alt="Master barber grooming customer with straight razor" 
              className="w-full h-full object-cover aspect-[4/5] hover:scale-105 transition duration-700"
            />
          </div>

          {/* Right Column: Top Photo + Bottom "Why Choose Us" Card */}
          <div className="md:col-span-6 flex flex-col gap-6">
            {/* Top Salon Interior Photo */}
            <div className="about-right-img overflow-hidden rounded-md shadow-sm bg-neutral-200">
              <img 
                src={IMAGES.aboutSalon} 
                alt="Modern Barber Station Haircut" 
                className="w-full h-auto object-cover aspect-[16/9] hover:scale-105 transition duration-700"
              />
            </div>

            {/* Why Choose Us Card */}
            <div className="about-card bg-white p-7 sm:p-9 rounded-md border border-neutral-200/60 shadow-sm">
              <h3 className="font-heading font-extrabold text-base md:text-lg uppercase tracking-wider text-neutral-900 mb-2">
                {SALON_CONTENT.about.cardTitle}
              </h3>
              <p className="text-neutral-500 text-xs md:text-sm leading-relaxed mb-6">
                {SALON_CONTENT.about.cardText}
              </p>

              {/* Bullet Checklist */}
              <div className="space-y-3.5 mb-7">
                {SALON_CONTENT.about.checkpoints.map((item, idx) => (
                  <div key={idx} className="about-check-item flex items-center gap-3">
                    <span className="w-4 h-4 rounded-full bg-[#caa672] flex items-center justify-center text-white shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                    <span className="text-xs md:text-sm text-neutral-700 font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Our Expertise Button */}
              <button 
                onClick={() => openBooking('Grooming Consultation')}
                className="w-full border border-[#caa672] text-neutral-900 text-[11px] font-bold tracking-widest uppercase py-3 hover:bg-[#caa672] hover:text-white transition duration-300"
              >
                {SALON_CONTENT.about.ctaButton}
              </button>
            </div>
          </div>
        </div>


      </section>


      {/* =========================================================================
          3. BARBER SERVICES (3x2 Grid with Featured Dark Card)
         ========================================================================= */}
      <section id="services" className="py-20 px-4 md:px-8 lg:px-12 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14 services-header">
          <span className="badge-tag mb-3">{SALON_CONTENT.services.tag}</span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-neutral-900 leading-[1.15]">
            {SALON_CONTENT.services.headingLine1} <br />
            {SALON_CONTENT.services.headingLine2}
          </h2>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 services-grid">
          
          {/* Card 1 */}
          <div 
            onClick={() => openBooking(SALON_CONTENT.services.items[0].title)}
            className="service-card group cursor-pointer bg-white p-8 rounded-md border border-neutral-200/70 hover:border-[#caa672]/60 hover:shadow-md transition-all flex flex-col justify-between min-h-[260px] relative"
          >
            <div className="flex items-start justify-between">
              <h3 className="font-heading font-extrabold text-sm uppercase tracking-wider text-neutral-900">
                {SALON_CONTENT.services.items[0].title}
              </h3>
              <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-[#caa672] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
            </div>

            {/* Icon */}
            <div className="py-6 flex items-center justify-center">
              <svg className="service-card-icon w-14 h-14 text-[#caa672]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 14c2-4 7-6 12-4 5 2 7 7 6 12-1 4-3 7-5 9l-4 3c-4 0-7-3-7-7" />
                <circle cx="34" cy="34" r="3" />
                <circle cx="34" cy="42" r="3" />
                <path d="M32 35l-8-6" />
                <path d="M32 41l-8-6" />
                <path d="M24 29l-4-3" />
              </svg>
            </div>

            <p className="text-neutral-500 text-xs leading-relaxed">
              {SALON_CONTENT.services.items[0].desc}
            </p>
          </div>

          {/* Card 2 (Featured Dark Card with Price Marquee) */}
          <div 
            onClick={() => openBooking(SALON_CONTENT.services.items[1].title)}
            className="service-card group cursor-pointer bg-[#0a0a0b] text-white p-8 rounded-md border border-neutral-800 hover:border-[#caa672] hover:shadow-xl transition-all flex flex-col justify-between min-h-[260px] relative overflow-hidden"
          >
            <div className="flex items-start justify-between relative z-10">
              <h3 className="font-heading font-extrabold text-sm uppercase tracking-wider text-white">
                {SALON_CONTENT.services.items[1].title}
              </h3>
              <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-[#caa672] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
            </div>

            {/* Marquee ticker */}
            <div className="py-6 overflow-hidden relative">
              <div className="flex items-center gap-6 whitespace-nowrap animate-marquee">
                <span className="font-heading font-extrabold text-3xl md:text-4xl text-[#caa672] tracking-wider">{SALON_CONTENT.services.items[1].price}</span>
                <span className="font-heading font-extrabold text-3xl md:text-4xl text-[#caa672] tracking-wider">{SALON_CONTENT.services.items[1].price}</span>
                <span className="font-heading font-extrabold text-3xl md:text-4xl text-[#caa672] tracking-wider">{SALON_CONTENT.services.items[1].price}</span>
                <span className="font-heading font-extrabold text-3xl md:text-4xl text-[#caa672] tracking-wider">{SALON_CONTENT.services.items[1].price}</span>
                <span className="font-heading font-extrabold text-3xl md:text-4xl text-[#caa672] tracking-wider">{SALON_CONTENT.services.items[1].price}</span>
                <span className="font-heading font-extrabold text-3xl md:text-4xl text-[#caa672] tracking-wider">{SALON_CONTENT.services.items[1].price}</span>
              </div>
            </div>

            <p className="text-neutral-400 text-xs leading-relaxed relative z-10">
              {SALON_CONTENT.services.items[1].desc}
            </p>
          </div>

          {/* Card 3 */}
          <div 
            onClick={() => openBooking(SALON_CONTENT.services.items[2].title)}
            className="service-card group cursor-pointer bg-white p-8 rounded-md border border-neutral-200/70 hover:border-[#caa672]/60 hover:shadow-md transition-all flex flex-col justify-between min-h-[260px] relative"
          >
            <div className="flex items-start justify-between">
              <h3 className="font-heading font-extrabold text-sm uppercase tracking-wider text-neutral-900">
                {SALON_CONTENT.services.items[2].title}
              </h3>
              <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-[#caa672] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
            </div>

            <div className="py-6 flex items-center justify-center">
              <svg className="service-card-icon w-14 h-14 text-[#caa672]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="18" y="10" width="12" height="12" rx="2" />
                <path d="M14 22h20v6H14z" />
                <path d="M12 24v4" />
                <path d="M36 24v4" />
                <path d="M24 28v10" />
                <path d="M16 38h16" />
                <path d="M14 42h20" />
              </svg>
            </div>

            <p className="text-neutral-500 text-xs leading-relaxed">
              {SALON_CONTENT.services.items[2].desc}
            </p>
          </div>

          {/* Card 4 */}
          <div 
            onClick={() => openBooking(SALON_CONTENT.services.items[3].title)}
            className="service-card group cursor-pointer bg-white p-8 rounded-md border border-neutral-200/70 hover:border-[#caa672]/60 hover:shadow-md transition-all flex flex-col justify-between min-h-[260px] relative"
          >
            <div className="flex items-start justify-between">
              <h3 className="font-heading font-extrabold text-sm uppercase tracking-wider text-neutral-900">
                {SALON_CONTENT.services.items[3].title}
              </h3>
              <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-[#caa672] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
            </div>

            <div className="py-6 flex items-center justify-center">
              <svg className="service-card-icon w-14 h-14 text-[#caa672]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 18h8v20a3 3 0 01-3 3h-2a3 3 0 01-3-3V18z" />
                <path d="M24 12v6" />
                <path d="M20 12h8" />
                <path d="M20 14h-5a2 2 0 00-2 2v2" />
                <line x1="22" y1="26" x2="26" y2="26" />
              </svg>
            </div>

            <p className="text-neutral-500 text-xs leading-relaxed">
              {SALON_CONTENT.services.items[3].desc}
            </p>
          </div>

          {/* Card 5 */}
          <div 
            onClick={() => openBooking(SALON_CONTENT.services.items[4].title)}
            className="service-card group cursor-pointer bg-white p-8 rounded-md border border-neutral-200/70 hover:border-[#caa672]/60 hover:shadow-md transition-all flex flex-col justify-between min-h-[260px] relative"
          >
            <div className="flex items-start justify-between">
              <h3 className="font-heading font-extrabold text-sm uppercase tracking-wider text-neutral-900">
                {SALON_CONTENT.services.items[4].title}
              </h3>
              <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-[#caa672] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
            </div>

            <div className="py-6 flex items-center justify-center">
              <svg className="service-card-icon w-14 h-14 text-[#caa672]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="16" cy="30" r="2" />
                <path d="M16 28l18-10c2-1 4 0 4 2v4c0 2-2 3-4 4L18 32" />
                <path d="M16 32l16 8" />
              </svg>
            </div>

            <p className="text-neutral-500 text-xs leading-relaxed">
              {SALON_CONTENT.services.items[4].desc}
            </p>
          </div>

          {/* Card 6 */}
          <div 
            onClick={() => openBooking(SALON_CONTENT.services.items[5].title)}
            className="service-card group cursor-pointer bg-white p-8 rounded-md border border-neutral-200/70 hover:border-[#caa672]/60 hover:shadow-md transition-all flex flex-col justify-between min-h-[260px] relative"
          >
            <div className="flex items-start justify-between">
              <h3 className="font-heading font-extrabold text-sm uppercase tracking-wider text-neutral-900">
                {SALON_CONTENT.services.items[5].title}
              </h3>
              <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-[#caa672] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
            </div>

            <div className="py-6 flex items-center justify-center">
              <svg className="service-card-icon w-14 h-14 text-[#caa672]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 20h16a8 8 0 00-8-8v-2" />
                <line x1="18" y1="26" x2="18" y2="28" />
                <line x1="24" y1="26" x2="24" y2="30" />
                <line x1="30" y1="26" x2="30" y2="28" />
                <line x1="21" y1="34" x2="21" y2="36" />
                <line x1="27" y1="34" x2="27" y2="36" />
              </svg>
            </div>

            <p className="text-neutral-500 text-xs leading-relaxed">
              {SALON_CONTENT.services.items[5].desc}
            </p>
          </div>

        </div>
      </section>


      {/* =========================================================================
          4. TESTIMONIALS SECTION (Pure White Background)
         ========================================================================= */}
      <section id="testimonials" className="bg-white py-24 px-4 md:px-8 lg:px-12 border-y border-neutral-200/70">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-14 testimonials-header">
            <span className="badge-tag mb-3">{SALON_CONTENT.testimonials.tag}</span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-neutral-900">
              {SALON_CONTENT.testimonials.heading}
            </h2>
          </div>

          {/* Testimonial Presentation Grid */}
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Photo */}
            <div className="testimonials-img lg:col-span-6 rounded-md overflow-hidden shadow-sm bg-neutral-200">
              <img 
                src={IMAGES.testimonialMan} 
                alt="Client haircut styling experience" 
                className="w-full h-auto object-cover aspect-[4/3] sm:aspect-[16/11]"
              />
            </div>

            {/* Right Overlapping Beige Testimonial Card */}
            <div className="testimonials-card lg:col-span-6 lg:-ml-12 relative z-20">
              <div className="bg-[#f7f4ee] p-8 sm:p-10 rounded-md border border-neutral-200/80 shadow-lg relative overflow-hidden">
                
                {/* Floating Straight Razor Accent at Top Right */}
                <div className="testimonial-razor absolute -top-3 -right-3 w-16 sm:w-20 pointer-events-none drop-shadow-md text-[#caa672] opacity-80 rotate-12">
                  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="16" cy="30" r="2" />
                    <path d="M16 28l18-10c2-1 4 0 4 2v4c0 2-2 3-4 4L18 32" />
                    <path d="M16 32l16 8" />
                  </svg>
                </div>

                {/* Big Watermark Quotation Mark in Background */}
                <div className="absolute right-6 bottom-4 text-neutral-200 font-serif text-[120px] sm:text-[160px] leading-none select-none pointer-events-none opacity-40">
                  “
                </div>

                {/* Header row: Avatars + Author Info */}
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="flex -space-x-2">
                    <img 
                      src={IMAGES.avatar1} 
                      alt="Avatar 1" 
                      className="w-9 h-9 rounded-full border-2 border-white object-cover" 
                    />
                    <img 
                      src={IMAGES.avatar2} 
                      alt="Avatar 2" 
                      className="w-9 h-9 rounded-full border-2 border-white object-cover" 
                    />
                    <img 
                      src={IMAGES.avatar3} 
                      alt="Avatar 3" 
                      className="w-9 h-9 rounded-full border-2 border-white object-cover" 
                    />
                  </div>

                  <div>
                    <h4 className="font-heading font-extrabold text-sm uppercase tracking-wider text-neutral-900">
                      {SALON_CONTENT.testimonials.clientName}
                    </h4>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#caa672]">
                      {SALON_CONTENT.testimonials.clientRole}
                    </span>
                  </div>
                </div>

                {/* 5 Golden Stars */}
                <div className="flex gap-1 text-[#caa672] mb-4 relative z-10">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="testimonial-star w-3.5 h-3.5 fill-[#caa672] text-[#caa672]" />
                  ))}
                </div>

                {/* Quote Text */}
                <blockquote className="text-neutral-600 text-xs sm:text-sm leading-relaxed relative z-10 italic">
                  "{SALON_CONTENT.testimonials.quote}"
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          5. FUN FACTS (Bento Grid Stats Section)
         ========================================================================= */}
      <section className="funfacts-section py-24 px-4 md:px-8 lg:px-12 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="funfacts-header text-center mb-14">
          <span className="badge-tag mb-3">{SALON_CONTENT.funFacts.tag}</span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-neutral-900 leading-[1.15] max-w-2xl mx-auto">
            {SALON_CONTENT.funFacts.headingLine1} <br />
            {SALON_CONTENT.funFacts.headingLine2} <br />
            {SALON_CONTENT.funFacts.headingLine3}
          </h2>
        </div>

        {/* 4-Card Bento Grid */}
        <div className="funfacts-grid grid grid-cols-1 md:grid-cols-12 gap-5">
          
          {/* Card 1 */}
          <div className="bento-card md:col-span-7 relative rounded-md overflow-hidden min-h-[220px] flex items-end p-6 bg-neutral-900 group shadow-sm">
            <img 
              src={IMAGES.bentoScissors} 
              alt="Barber grooming haircut shears" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            <div className="relative z-10 text-white">
              <div className="funfacts-counter font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                {SALON_CONTENT.funFacts.card1Stat}
              </div>
              <div className="text-[11px] uppercase tracking-wider text-neutral-300 font-medium">
                {SALON_CONTENT.funFacts.card1Label}
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bento-card md:col-span-5 bg-white rounded-md p-6 border border-neutral-200/70 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <h3 className="font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider text-neutral-900 max-w-[200px] leading-snug">
              {SALON_CONTENT.funFacts.card2Title}
            </h3>

            <div className="flex items-end justify-between mt-8">
              <div>
                <div className="funfacts-counter font-heading font-extrabold text-3xl sm:text-4xl text-neutral-900 tracking-tight">
                  {SALON_CONTENT.funFacts.card2Stat}
                </div>
                <div className="text-[11px] uppercase tracking-wider text-neutral-500 font-medium">
                  {SALON_CONTENT.funFacts.card2Label}
                </div>
              </div>

              <div className="bento-circle-1 w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border border-neutral-200 shadow-sm shrink-0">
                <img 
                  src={IMAGES.bentoBowl} 
                  alt="Rich shaving lather bowl" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bento-card md:col-span-5 bg-[#caa672] text-white rounded-md p-6 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <h3 className="font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider text-white max-w-[200px] leading-snug">
              {SALON_CONTENT.funFacts.card3Title}
            </h3>

            <div className="flex items-end justify-between mt-8">
              <div>
                <div className="funfacts-counter font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                  {SALON_CONTENT.funFacts.card3Stat}
                </div>
                <div className="text-[11px] uppercase tracking-wider text-white/80 font-medium">
                  {SALON_CONTENT.funFacts.card3Label}
                </div>
              </div>

              <div className="bento-circle-2 w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border border-white/30 shadow-md shrink-0 bg-neutral-900">
                <img 
                  src={IMAGES.bentoPomade} 
                  alt="Vintage Barber Pomade Tin" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bento-card md:col-span-7 bg-[#141518] text-white rounded-md overflow-hidden relative min-h-[220px] flex flex-col justify-between p-6 shadow-sm group">
            <img 
              src={IMAGES.bentoRewards} 
              alt="Two Gentlemen in Barbershop" 
              className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent" />

            <div className="relative z-10">
              <span className="text-[11px] font-bold tracking-widest uppercase text-white/90">
                {SALON_CONTENT.funFacts.card4Tag}
              </span>
            </div>

            <div className="relative z-10 flex items-center gap-6 mt-6">
              <div className="flex items-center gap-2 border border-[#caa672]/60 px-3 py-1.5 rounded bg-black/40 backdrop-blur-xs">
                <Award className="w-5 h-5 text-[#caa672]" />
                <div className="text-[9px] uppercase font-bold tracking-wider text-neutral-200">
                  {SALON_CONTENT.funFacts.awards[0]}
                </div>
              </div>
              <div className="flex items-center gap-2 border border-[#caa672]/60 px-3 py-1.5 rounded bg-black/40 backdrop-blur-xs">
                <ShieldCheck className="w-5 h-5 text-[#caa672]" />
                <div className="text-[9px] uppercase font-bold tracking-wider text-neutral-200">
                  {SALON_CONTENT.funFacts.awards[1]}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* =========================================================================
          6. FULL BLEED OPENING HOURS HERO BANNER
         ========================================================================= */}
      <section className="hours-section relative min-h-[560px] md:min-h-[620px] flex items-center justify-end px-4 md:px-8 lg:px-12 py-16 bg-[#0b0c0e] overflow-hidden">
        {/* Background Photo */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={IMAGES.openingHoursBg} 
            alt="Hot towel shave lathering" 
            className="hours-bg-img w-full h-full object-cover object-center filter brightness-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/25 to-black/60" />
        </div>

        {/* Floating White Opening Hours Card */}
        <div className="hours-card relative z-10 w-full max-w-md bg-white p-8 sm:p-10 rounded-md shadow-2xl border border-neutral-100">
          <span className="badge-tag mb-3">OPENING HOURS</span>
          <h3 className="font-heading font-extrabold text-2xl uppercase tracking-tight text-neutral-900 mb-6">
            OPENING HOURS
          </h3>

          {/* Schedule Table */}
          <div className="space-y-3.5 text-xs sm:text-sm border-b border-neutral-200 pb-6 mb-6">
            {SALON_CONTENT.contact.schedule.map((row, idx) => (
              <div key={idx} className="hours-row flex justify-between items-center text-neutral-700">
                <span className="font-medium">{row.days}</span>
                <span className={row.isHoliday ? "font-bold text-[#caa672] uppercase tracking-wider" : "font-semibold text-neutral-900"}>
                  {row.hours}
                </span>
              </div>
            ))}
          </div>

          {/* Contact Details */}
          <div className="space-y-3 text-xs text-neutral-600 mb-7">
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-neutral-800 shrink-0" />
              <span>{SALON_CONTENT.contact.phoneDisplay}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-neutral-800 shrink-0" />
              <span>{SALON_CONTENT.contact.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-neutral-800 shrink-0" />
              <span>{SALON_CONTENT.contact.address}</span>
            </div>
          </div>

          {/* Book An Appointment Full-Width Button */}
          <button 
            onClick={() => openBooking('Barbershop Appointment')}
            className="w-full bg-[#caa672] hover:bg-[#b8935c] text-white text-[11px] font-bold tracking-widest uppercase py-3.5 rounded transition shadow-sm"
          >
            {SALON_CONTENT.footer.ctaButton}
          </button>
        </div>
      </section>


      {/* =========================================================================
          7. EXPERT GROOMING / MEET WITH TEAM
         ========================================================================= */}
      <section id="team" className="team-section py-24 px-4 md:px-8 lg:px-12 max-w-6xl mx-auto">
        {/* Header Row */}
        <div className="team-header flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="badge-tag mb-3">{SALON_CONTENT.team.tag}</span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-neutral-900 leading-[1.1]">
              {SALON_CONTENT.team.headingLine1} <br />
              {SALON_CONTENT.team.headingLine2}
            </h2>
          </div>

          <button 
            onClick={() => openBooking('Barber Team Consultation')}
            className="self-start sm:self-end border border-[#caa672] text-neutral-900 text-[11px] font-bold tracking-widest uppercase px-6 py-2.5 hover:bg-[#caa672] hover:text-white transition"
          >
            {SALON_CONTENT.team.ctaJoin}
          </button>
        </div>

        {/* 3 Team Cards */}
        <div className="team-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Barber 1 */}
          <div className="team-card group relative rounded-md overflow-hidden bg-neutral-900 shadow-sm">
            <div className="aspect-[4/5] overflow-hidden bg-neutral-200">
              <img 
                src={IMAGES.team1} 
                alt={`${SALON_CONTENT.team.members[0].name} - Barber`}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-white px-4 py-3 rounded-xs shadow-md flex items-center justify-between">
              <div>
                <span className="text-[9px] font-bold tracking-widest uppercase text-[#caa672] block">
                  {SALON_CONTENT.team.members[0].role}
                </span>
                <span className="font-heading font-extrabold text-xs uppercase tracking-wider text-neutral-900">
                  {SALON_CONTENT.team.members[0].name}
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-neutral-500 text-xs">
                <a href="#" className="hover:text-black font-semibold">f</a>
                <a href="#" className="hover:text-black font-semibold">𝕏</a>
              </div>
            </div>
          </div>

          {/* Barber 2 */}
          <div className="team-card group relative rounded-md overflow-hidden bg-neutral-900 shadow-sm">
            <div className="aspect-[4/5] overflow-hidden bg-neutral-200">
              <img 
                src={IMAGES.team2} 
                alt={`${SALON_CONTENT.team.members[1].name} - Barber`}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-white px-4 py-3 rounded-xs shadow-md flex items-center justify-between">
              <div>
                <span className="text-[9px] font-bold tracking-widest uppercase text-[#caa672] block">
                  {SALON_CONTENT.team.members[1].role}
                </span>
                <span className="font-heading font-extrabold text-xs uppercase tracking-wider text-neutral-900">
                  {SALON_CONTENT.team.members[1].name}
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-neutral-500 text-xs">
                <a href="#" className="hover:text-black font-semibold">f</a>
                <a href="#" className="hover:text-black font-semibold">𝕏</a>
              </div>
            </div>
          </div>

          {/* Barber 3 */}
          <div className="team-card group relative rounded-md overflow-hidden bg-neutral-900 shadow-sm sm:col-span-2 lg:col-span-1">
            <div className="aspect-[4/5] overflow-hidden bg-neutral-200">
              <img 
                src={IMAGES.team3} 
                alt={`${SALON_CONTENT.team.members[2].name} - Barber`}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-white px-4 py-3 rounded-xs shadow-md flex items-center justify-between">
              <div>
                <span className="text-[9px] font-bold tracking-widest uppercase text-[#caa672] block">
                  {SALON_CONTENT.team.members[2].role}
                </span>
                <span className="font-heading font-extrabold text-xs uppercase tracking-wider text-neutral-900">
                  {SALON_CONTENT.team.members[2].name}
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-neutral-500 text-xs">
                <a href="#" className="hover:text-black font-semibold">f</a>
                <a href="#" className="hover:text-black font-semibold">𝕏</a>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* =========================================================================
          8. GOLDEN TICKER / MARQUEE RIBBON
         ========================================================================= */}
      <div className="w-full bg-[#caa672] py-4 md:py-5 overflow-hidden shadow-inner">
        <div className="flex items-center gap-8 whitespace-nowrap animate-marquee">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 text-white font-heading font-extrabold text-xl sm:text-2xl md:text-3xl uppercase tracking-wider">
              <span>{SALON_CONTENT.marquee}</span>
              <span className="text-white/60">•</span>
            </div>
          ))}
        </div>
      </div>


      {/* =========================================================================
          9. BROWSE OUR LATEST STYLES & NEWS SECTION
         ========================================================================= */}
      <section id="news" className="news-section py-24 px-4 md:px-8 lg:px-12 max-w-6xl mx-auto">
        {/* Gallery / Style Transformation Heading */}
        <div className="news-gallery-header text-center mb-20">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-neutral-900 leading-[1.15] max-w-2xl mx-auto">
            {SALON_CONTENT.news.galleryHeadingLine1} <br />
            {SALON_CONTENT.news.galleryHeadingLine2} <br />
            {SALON_CONTENT.news.galleryHeadingLine3}
          </h2>
        </div>

        {/* News & Insights Header */}
        <div className="news-header mb-12">
          <span className="badge-tag mb-3">{SALON_CONTENT.news.tag}</span>
          <h3 className="font-heading font-extrabold text-3xl sm:text-4xl uppercase tracking-tight text-neutral-900">
            {SALON_CONTENT.news.headingLine1} <br />
            {SALON_CONTENT.news.headingLine2}
          </h3>
        </div>

        {/* 2-Column News Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Photo of barber trimming customer with electric clippers */}
          <div className="news-img md:col-span-6 rounded-md overflow-hidden bg-neutral-200 shadow-sm">
            <img 
              src={IMAGES.newsCut} 
              alt="Barber styling smiling customer" 
              className="w-full h-auto object-cover aspect-[4/3] sm:aspect-[16/11] hover:scale-105 transition duration-700"
            />
          </div>

          {/* Right Column: 3 News Articles */}
          <div className="news-articles-list md:col-span-6 flex flex-col divide-y divide-neutral-300/80">
            {SALON_CONTENT.news.articles.map((art, idx) => (
              <article key={idx} className="news-article-item py-6 first:pt-0 last:pb-0 group cursor-pointer">
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#caa672] mb-1.5 block">
                  {art.category}
                </span>
                <h4 className="font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wide text-neutral-900 group-hover:text-[#caa672] transition leading-snug mb-2">
                  {art.title}
                </h4>
                <time className="text-[11px] text-neutral-500">
                  {art.date}
                </time>
              </article>
            ))}
          </div>

        </div>
      </section>


      {/* =========================================================================
          10. FOOTER (Deep Black Theme with Giant Brand Wordmark)
         ========================================================================= */}
      <footer id="contact" className="footer-section bg-[#070708] text-white pt-20 pb-10 px-4 md:px-8 lg:px-12 border-t border-neutral-900">
        <div className="max-w-6xl mx-auto">
          
          {/* Top Row: Transform Callout + 3 Link Columns */}
          <div className="footer-top grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-neutral-900">
            
            {/* Left Col */}
            <div className="md:col-span-5 md:pr-10 md:border-r md:border-neutral-900 flex flex-col justify-between">
              <div>
                <h3 className="font-heading font-extrabold text-3xl sm:text-4xl uppercase tracking-tight text-white leading-tight mb-8">
                  {SALON_CONTENT.footer.ctaTitleLine1} <br />
                  {SALON_CONTENT.footer.ctaTitleLine2} <br />
                  {SALON_CONTENT.footer.ctaTitleLine3}
                </h3>
              </div>

              <div>
                <button 
                  onClick={() => openBooking('Barber Consultation')}
                  className="border border-[#caa672] text-white text-[11px] font-bold tracking-widest uppercase px-6 py-3 hover:bg-[#caa672] hover:text-black transition"
                >
                  {SALON_CONTENT.footer.ctaButton}
                </button>
              </div>
            </div>

            {/* Right Cols: 3 Navigation Link Columns */}
            <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
              
              {/* Column 1: Essential Pages */}
              <div>
                <h4 className="text-xs font-semibold text-neutral-400 mb-5">
                  Essential Pages
                </h4>
                <ul className="space-y-3 text-[11px] font-bold tracking-wider uppercase text-neutral-300">
                  <li>
                    <button onClick={() => scrollTo('#about')} className="hover:text-[#caa672] transition cursor-pointer text-left">
                      ABOUT SHOP
                    </button>
                  </li>
                  <li>
                    <button onClick={() => scrollTo('#services')} className="hover:text-[#caa672] transition cursor-pointer text-left">
                      OUR SERVICES
                    </button>
                  </li>
                  <li>
                    <button onClick={() => scrollTo('#team')} className="hover:text-[#caa672] transition cursor-pointer text-left">
                      EXPERT BARBERS
                    </button>
                  </li>
                  <li>
                    <button onClick={() => scrollTo('#news')} className="hover:text-[#caa672] transition cursor-pointer text-left">
                      GALLERY & NEWS
                    </button>
                  </li>
                  <li>
                    <button onClick={() => scrollTo('#testimonials')} className="hover:text-[#caa672] transition cursor-pointer text-left">
                      COMMUNITY REVIEWS
                    </button>
                  </li>
                  <li>
                    <button onClick={() => scrollTo('#contact')} className="hover:text-[#caa672] transition cursor-pointer text-left">
                      GET IN TOUCH
                    </button>
                  </li>
                </ul>
              </div>

              {/* Column 2: Social Follow */}
              <div>
                <h4 className="text-xs font-semibold text-neutral-400 mb-5">
                  Social Follow
                </h4>
                <ul className="space-y-3 text-[11px] font-bold tracking-wider uppercase text-neutral-300">
                  {SALON_CONTENT.footer.socialLinks.map((soc, idx) => (
                    <li key={idx}>
                      <a href="#" className="hover:text-[#caa672] transition">{soc}</a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: Other Branch */}
              <div className="col-span-2 sm:col-span-1">
                <h4 className="text-xs font-semibold text-neutral-400 mb-5">
                  Other Branch
                </h4>
                <ul className="space-y-3 text-[11px] font-bold tracking-wider uppercase text-neutral-300">
                  {SALON_CONTENT.contact.branches.map((city, idx) => (
                    <li key={idx}>
                      <span className="hover:text-[#caa672] transition cursor-pointer">{city}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>

          {/* Middle: Giant Luxury Wordmark */}
          <div 
            onClick={() => scrollTo(0)} 
            title="Click to smoothly scroll back to top"
            className="footer-wordmark py-14 text-center overflow-hidden cursor-pointer group"
          >
            <h1 className="footer-wordmark-text font-brand font-black text-6xl sm:text-8xl md:text-9xl lg:text-[140px] text-[#caa672] tracking-[0.08em] uppercase select-none leading-none group-hover:scale-[1.02] transition-transform duration-500">
              {SALON_CONTENT.brand.name}
            </h1>
          </div>

          {/* Bottom Copyright Bar */}
          <div className="pt-6 border-t border-neutral-900/80 text-center text-neutral-500 text-[11px]">
            <p>{SALON_CONTENT.brand.copyright}</p>
          </div>

        </div>
      </footer>


      {/* =========================================================================
          INTERACTIVE BOOKING MODAL
         ========================================================================= */}
      {bookingModalOpen && (
        <div className="booking-modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="booking-modal-box bg-[#0b0c0e] text-white w-full max-w-lg rounded-lg border border-neutral-800 p-6 sm:p-8 relative shadow-2xl">
            {/* Close button */}
            <button 
              onClick={() => setBookingModalOpen(false)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-white transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="badge-tag mb-2">RESERVATION</span>
            <h3 className="font-heading font-extrabold text-2xl uppercase tracking-tight text-white mb-1">
              BOOK YOUR SLOT
            </h3>
            <p className="text-xs text-neutral-400 mb-6">
              Experience the pinnacle of gentlemen's barbering & personalized grooming.
            </p>

            <form onSubmit={(e) => {
              e.preventDefault();
              alert(`Booking confirmed for ${selectedService}! We look forward to seeing you at ${SALON_CONTENT.brand.name}.`);
              setBookingModalOpen(false);
            }} className="space-y-4">
              
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                  Selected Service
                </label>
                <select 
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full bg-[#18191d] border border-neutral-700 rounded px-3 py-2.5 text-xs text-white focus:outline-hidden focus:border-[#caa672]"
                >
                  {SALON_CONTENT.services.items.map((svc, i) => (
                    <option key={i} value={svc.title}>
                      {svc.title} {svc.price ? `(${svc.price})` : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Your Name
                  </label>
                  <input 
                    type="text" 
                    required 
                    placeholder="John Doe" 
                    className="w-full bg-[#18191d] border border-neutral-700 rounded px-3 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-hidden focus:border-[#caa672]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Phone Number
                  </label>
                  <input 
                    type="tel" 
                    required 
                    placeholder="+1 (555) 000-0000" 
                    className="w-full bg-[#18191d] border border-neutral-700 rounded px-3 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-hidden focus:border-[#caa672]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Preferred Date
                  </label>
                  <input 
                    type="date" 
                    required 
                    defaultValue="2026-11-12"
                    className="w-full bg-[#18191d] border border-neutral-700 rounded px-3 py-2.5 text-xs text-white focus:outline-hidden focus:border-[#caa672]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Preferred Barber
                  </label>
                  <select className="w-full bg-[#18191d] border border-neutral-700 rounded px-3 py-2.5 text-xs text-white focus:outline-hidden focus:border-[#caa672]">
                    <option value="any">First Available Stylist</option>
                    {SALON_CONTENT.team.members.map((m, i) => (
                      <option key={i} value={m.name}>{m.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full bg-[#caa672] hover:bg-[#b8935c] text-white text-xs font-bold tracking-widest uppercase py-3.5 rounded transition shadow-md"
                >
                  CONFIRM APPOINTMENT
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
