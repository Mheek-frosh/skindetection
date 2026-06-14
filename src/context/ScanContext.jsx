import React, { createContext, useState, useContext, useEffect } from 'react';

const ScanContext = createContext();

const initialHistory = [
  {
    id: 'scan-1',
    diseaseName: 'Acne Vulgaris',
    confidenceScore: 94,
    status: 'Moderate',
    description: 'A common skin condition that occurs when hair follicles become plugged with oil and dead skin cells, causing whiteheads, blackheads or pimples.',
    recommendation: 'Use gentle cleansers, avoid picking or squeezing lesions, and apply over-the-counter benzoyl peroxide or salicylic acid. If condition persists, consult a dermatologist.',
    date: '2026-06-12',
    imageUrl: 'https://images.unsplash.com/photo-1607606320832-2968c70d90ed?w=600&auto=format&fit=crop&q=80',
    severityColor: 'amber'
  },
  {
    id: 'scan-2',
    diseaseName: 'Atopic Dermatitis (Eczema)',
    confidenceScore: 88,
    status: 'Mild',
    description: 'A chronic inflammatory skin condition characterized by dry, itchy, and red patches. It is common but non-contagious.',
    recommendation: 'Moisturize skin frequently, especially after bathing. Use mild, fragrance-free soaps and avoid triggers such as sudden temperature changes or harsh fabrics.',
    date: '2026-06-08',
    imageUrl: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=600&auto=format&fit=crop&q=80',
    severityColor: 'emerald'
  },
  {
    id: 'scan-3',
    diseaseName: 'Melasma',
    confidenceScore: 85,
    status: 'Mild',
    description: 'A skin condition characterized by brown or blue-gray patches or freckle-like spots. It is often caused by sun exposure and hormonal changes.',
    recommendation: 'Strict sun protection is crucial. Wear a broad-spectrum sunscreen of SPF 30+ daily and a wide-brimmed hat. Consult a doctor about topical brightening agents.',
    date: '2026-05-28',
    imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80',
    severityColor: 'emerald'
  }
];

const mockDiseases = [
  {
    diseaseName: 'Acne Vulgaris',
    confidenceScore: 92,
    status: 'Moderate',
    description: 'A common skin condition that occurs when hair follicles become plugged with oil and dead skin cells, causing whiteheads, blackheads or pimples.',
    recommendation: 'Use gentle cleansers, avoid picking or squeezing lesions, and apply over-the-counter benzoyl peroxide or salicylic acid. If condition persists, consult a dermatologist.',
    severityColor: 'amber'
  },
  {
    diseaseName: 'Atopic Dermatitis (Eczema)',
    confidenceScore: 95,
    status: 'Severe',
    description: 'A chronic inflammatory skin condition characterized by dry, itchy, and red patches. It is common but non-contagious.',
    recommendation: 'Moisturize skin frequently, especially after bathing. Apply topical anti-inflammatory creams as advised by a doctor. Avoid scratching to prevent secondary infections.',
    severityColor: 'red'
  },
  {
    diseaseName: 'Psoriasis',
    confidenceScore: 89,
    status: 'Moderate',
    description: 'An autoimmune skin condition that speeds up the life cycle of skin cells, causing cells to build up rapidly on the surface of the skin as red, scaly, itchy plaques.',
    recommendation: 'Keep skin well-moisturized. Avoid triggers like stress, smoking, and skin injuries. Discuss topical corticosteroids, phototherapy, or systemic treatments with a doctor.',
    severityColor: 'amber'
  },
  {
    diseaseName: 'Benign Melanocytic Nevus (Mole)',
    confidenceScore: 97,
    status: 'Mild',
    description: 'A common, benign growth on the skin (mole) composed of melanocytes (pigment-producing cells).',
    recommendation: 'Standard benign mole. No treatment required. Monitor occasionally using the ABCDE method (Asymmetry, Border, Color, Diameter, Evolving) and report changes to a physician.',
    severityColor: 'emerald'
  },
  {
    diseaseName: 'Tinea Corporis (Ringworm)',
    confidenceScore: 91,
    status: 'Mild',
    description: 'A superficial fungal infection of the skin characterized by a red, itchy, circular rash with clearer skin in the middle.',
    recommendation: 'Apply over-the-counter topical antifungal creams twice daily for 2 weeks. Keep the affected area clean and dry. Avoid sharing personal items.',
    severityColor: 'emerald'
  }
];

export const ScanProvider = ({ children }) => {
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('skin_scan_history');
    return saved ? JSON.parse(saved) : initialHistory;
  });
  
  const [activeScan, setActiveScan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [country, setCountry] = useState('Nigeria');
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    localStorage.setItem('skin_scan_history', JSON.stringify(history));
  }, [history]);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const startScan = (imageFileOrUrl) => {
    setLoading(true);
    
    // Choose a random disease for simulation
    const randomIdx = Math.floor(Math.random() * mockDiseases.length);
    const chosenDisease = mockDiseases[randomIdx];
    
    // Select an Unsplash image matching the disease if it was a default,
    // otherwise use the uploaded image
    const imageUrl = typeof imageFileOrUrl === 'string'
      ? imageFileOrUrl
      : URL.createObjectURL(imageFileOrUrl);

    const steps = [
      'Uploading image to secure server...',
      'De-noising and pre-processing skin layers...',
      'Detecting lesion boundaries and segmentation...',
      'Extracting features via ResNet50 (CNN Model)...',
      'Running classification and soft-max layer...',
      'Calculating final confidence score statistics...'
    ];

    let stepIdx = 0;
    setLoadingMessage(steps[0]);

    const interval = setInterval(() => {
      stepIdx++;
      if (stepIdx < steps.length) {
        setLoadingMessage(steps[stepIdx]);
      } else {
        clearInterval(interval);
        
        const newScan = {
          id: `scan-${Date.now()}`,
          ...chosenDisease,
          date: new Date().toISOString().split('T')[0],
          imageUrl
        };

        setActiveScan(newScan);
        setHistory(prev => [newScan, ...prev]);
        setLoading(false);
        showToast('Skin analysis completed successfully!');
      }
    }, 600); // 3.6 seconds total
  };

  const clearActiveScan = () => {
    setActiveScan(null);
  };

  const deleteHistoryItem = (id) => {
    setHistory(prev => prev.filter(item => item.id !== id));
    showToast('Scan history item deleted.', 'info');
  };

  const clearHistory = () => {
    setHistory([]);
    showToast('Scan history cleared.', 'info');
  };

  return (
    <ScanContext.Provider value={{
      history,
      activeScan,
      loading,
      loadingMessage,
      country,
      setCountry,
      startScan,
      clearActiveScan,
      deleteHistoryItem,
      clearHistory,
      toasts,
      showToast,
      removeToast
    }}>
      {children}
    </ScanContext.Provider>
  );
};

export const useScan = () => {
  const context = useContext(ScanContext);
  if (!context) {
    throw new Error('useScan must be used within a ScanProvider');
  }
  return context;
};
