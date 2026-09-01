import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { SoundManager } from './utils/SoundManager';

// Scroll restoration helper
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Route-based SEO Metadata Manager
const MetadataManager = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    let title = "HypeFuze | Elite Technology Holding Company & Software Studio";
    let description = "HypeFuze is an elite technology holding company developing custom high-performance web applications, AI creative ad labs, reaction latency test widgets, and run split pace calculators.";
    
    switch (pathname) {
      case '/':
        title = "HypeFuze | Elite Technology Holding Company & Software Studio";
        description = "HypeFuze is an elite technology holding company developing custom high-performance web applications, IceBerree AI ad labs, reaction latency test widgets, and run split pace calculators.";
        break;
      case '/about':
        title = "About Us | The HypeFuze Vision & Technological Sovereignty";
        description = "Learn about HypeFuze's mission to democratize AI ad creation, sports science, and athletic pacing strategy with elite, self-directed software.";
        break;
      case '/contact':
        title = "Contact HypeFuze | Connect with Our Software Studio";
        description = "Get in touch with the HypeFuze studio team for product inquiries, custom software development, or strategic collaborations.";
        break;
      case '/privacy':
        title = "Privacy Policy | HypeFuze";
        description = "Read the HypeFuze Privacy Policy to understand how we collect, protect, and handle data across our applications and platforms.";
        break;
      case '/terms':
        title = "Terms of Service | HypeFuze";
        description = "Review the Terms of Service for HypeFuze.com, our tracking tools, and reaction speed platforms.";
        break;
      default:
        break;
    }

    document.title = title;
    
    // Update description meta tag
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
    
    // Update OpenGraph description
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', description);
    }

    // Update OpenGraph title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }

    // Update Twitter title
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', title);
    }

    // Update Twitter description
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', description);
    }

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `https://hypefuze.com${pathname === '/' ? '' : pathname}`);
  }, [pathname]);

  return null;
};

// Global click sound handler wrapper
const GlobalSoundProvider = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    const handleGlobalClick = (e) => {
      const target = e.target;
      // Skip playing if clicked element is explicitly marked "data-no-sound" (e.g., mute button itself)
      if (target.closest('[data-no-sound="true"]')) return;
      
      // If clicked element is a button, anchor, or custom hover card, trigger Synthesised Click Sound
      if (
        target.closest('button') || 
        target.closest('a') || 
        target.closest('.reveal-card')
      ) {
        SoundManager.playClick();
      }
    };

    document.addEventListener('click', handleGlobalClick, true);
    return () => {
      document.removeEventListener('click', handleGlobalClick, true);
    };
  }, []);

  return children;
};

// Route wrapper for clean page transitions
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Home />
            </motion.div>
          }
        />
        <Route
          path="/about"
          element={
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <About />
            </motion.div>
          }
        />
        <Route
          path="/contact"
          element={
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <Contact />
            </motion.div>
          }
        />
        <Route
          path="/privacy"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Privacy />
            </motion.div>
          }
        />
        <Route
          path="/terms"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Terms />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <MetadataManager />
      <GlobalSoundProvider>
        <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-[#ccff00] selection:text-black">
          <Navbar />
          <main className="flex-grow">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </GlobalSoundProvider>
    </Router>
  );
}

export default App;
