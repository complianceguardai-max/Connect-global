import { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext(null);

export const LANGUAGES = {
  en: { code: 'en', label: 'English', flag: '🇬🇧', dir: 'ltr' },
  ar: { code: 'ar', label: 'العربية', flag: '🇦🇪', dir: 'rtl' },
  fr: { code: 'fr', label: 'Français', flag: '🇫🇷', dir: 'ltr' },
  zh: { code: 'zh', label: '中文', flag: '🇨🇳', dir: 'ltr' },
  es: { code: 'es', label: 'Español', flag: '🇪🇸', dir: 'ltr' },
};

export const TRANSLATIONS = {
  en: {
    nav_commerce: 'Global Commerce',
    nav_defi: 'Decentralized Finance',
    nav_talent: 'International Talent',
    nav_knowledge: 'Knowledge Sharing',
    nav_resources: 'Resources',
    hero_title_1: 'EU AI ACT COMPLIANCE.',
    hero_title_2: 'ZERO DEPLOYMENT FRICTION.',
    hero_subtitle: 'Enterprise-grade AI governance infrastructure for CTOs. Ship ML models to production with immutable audit trails, automated bias detection, and real-time risk classification—protecting deployment velocity without risking the €35M fine.',
    hero_cta: 'SCHEDULE TECHNICAL DEMO',
    hero_connect: 'REQUEST API ACCESS',
    bento_network: 'Immutable Model Logging & Audit Trails',
    bento_payments: 'Automated Bias Detection & Dataset Lineage',
    bento_markets: 'Real-time EU AI Act Risk Classification',
    bento_hq: 'Real-Time Collaboration',
    run_more: 'Run more →',
    stats_title: 'Real-Time Global Statistics',
    users_countries: 'Users in 195+ Countries',
    transactions: 'Global Transactions Flowing',
    active_nodes: 'Active Nodes & Partners',
    support: 'Support 24/7',
  },
  ar: {
    nav_commerce: 'التجارة العالمية',
    nav_defi: 'التمويل اللامركزي',
    nav_talent: 'المواهب الدولية',
    nav_knowledge: 'تبادل المعرفة',
    nav_resources: 'الموارد',
    hero_title_1: 'وصول عالمي.',
    hero_title_2: 'واجهة واحدة.',
    hero_subtitle: 'خدمات عابرة للحدود موحدة للجميع في كل مكان.',
    hero_cta: 'ابدأ رحلتك العالمية',
    hero_connect: 'تواصل الآن',
    bento_network: 'شبكة عالمية موحدة',
    bento_payments: 'مدفوعات آمنة',
    bento_markets: 'الأسواق الدولية',
    bento_hq: 'تعاون في الوقت الفعلي',
    run_more: 'المزيد ←',
    stats_title: 'إحصائيات عالمية في الوقت الفعلي',
    users_countries: 'مستخدمون في 195+ دولة',
    transactions: 'معاملات عالمية جارية',
    active_nodes: 'عقد وشركاء نشطون',
    support: 'دعم 24/7',
  },
  fr: {
    nav_commerce: 'Commerce Mondial',
    nav_defi: 'Finance Décentralisée',
    nav_talent: 'Talents Internationaux',
    nav_knowledge: 'Partage de Connaissances',
    nav_resources: 'Ressources',
    hero_title_1: 'ACCÈS MONDIAL.',
    hero_title_2: 'UNE INTERFACE.',
    hero_subtitle: 'Services transfrontaliers unifiés pour tous, partout.',
    hero_cta: 'COMMENCER LE VOYAGE',
    hero_connect: 'SE CONNECTER',
    bento_network: 'Réseau Mondial Unifié',
    bento_payments: 'Paiements Sécurisés',
    bento_markets: 'Marchés Internationaux',
    bento_hq: 'Collaboration en Temps Réel',
    run_more: 'En savoir plus →',
    stats_title: 'Statistiques Mondiales en Temps Réel',
    users_countries: 'Utilisateurs dans 195+ Pays',
    transactions: 'Transactions Mondiales',
    active_nodes: 'Nœuds & Partenaires Actifs',
    support: 'Support 24/7',
  },
  zh: {
    nav_commerce: '全球商务',
    nav_defi: '去中心化金融',
    nav_talent: '国际人才',
    nav_knowledge: '知识共享',
    nav_resources: '资源',
    hero_title_1: '全球访问。',
    hero_title_2: '一个界面。',
    hero_subtitle: '为所有人提供统一的跨境服务、资源和商务。',
    hero_cta: '开始全球之旅',
    hero_connect: '立即连接',
    bento_network: '统一全球网络',
    bento_payments: '安全支付与金融',
    bento_markets: '进入国际市场',
    bento_hq: '实时协作',
    run_more: '了解更多 →',
    stats_title: '实时全球统计',
    users_countries: '195+国家用户',
    transactions: '全球交易流动',
    active_nodes: '活跃节点与合作伙伴',
    support: '24/7支持',
  },
  es: {
    nav_commerce: 'Comercio Global',
    nav_defi: 'Finanzas Descentralizadas',
    nav_talent: 'Talento Internacional',
    nav_knowledge: 'Intercambio de Conocimiento',
    nav_resources: 'Recursos',
    hero_title_1: 'ACCESO GLOBAL.',
    hero_title_2: 'UNA INTERFAZ.',
    hero_subtitle: 'Servicios transfronterizos unificados para todos, en todas partes.',
    hero_cta: 'INICIAR VIAJE GLOBAL',
    hero_connect: 'CONECTAR AHORA',
    bento_network: 'Red Global Unificada',
    bento_payments: 'Pagos Seguros',
    bento_markets: 'Mercados Internacionales',
    bento_hq: 'Colaboración en Tiempo Real',
    run_more: 'Ver más →',
    stats_title: 'Estadísticas Globales en Tiempo Real',
    users_countries: 'Usuarios en 195+ Países',
    transactions: 'Transacciones Globales',
    active_nodes: 'Nodos y Socios Activos',
    support: 'Soporte 24/7',
  },
};

export function AppProvider({ children }) {
  const [activeNavModal, setActiveNavModal] = useState(null);
  const [activeBentoModal, setActiveBentoModal] = useState(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [selectedCity, setSelectedCity] = useState(null);
  const [language, setLanguage] = useState('en');
  const [toasts, setToasts] = useState([]);
  const [infoModal, setInfoModal] = useState(null);

  const t = useCallback((key) => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS.en[key] || key;
  }, [language]);

  const closeAllModals = useCallback(() => {
    setActiveNavModal(null);
    setActiveBentoModal(null);
    setShowOnboarding(false);
    setSelectedCity(null);
    setInfoModal(null);
  }, []);

  const openOnboarding = useCallback(() => {
    setOnboardingStep(0);
    setShowOnboarding(true);
  }, []);

  const addToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type, duration }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const openInfoModal = useCallback((contentKey) => {
    setInfoModal(contentKey);
  }, []);

  const closeInfoModal = useCallback(() => {
    setInfoModal(null);
  }, []);

  return (
    <AppContext.Provider value={{
      activeNavModal, setActiveNavModal,
      activeBentoModal, setActiveBentoModal,
      showOnboarding, setShowOnboarding, openOnboarding,
      onboardingStep, setOnboardingStep,
      selectedCity, setSelectedCity,
      language, setLanguage,
      toasts, addToast, removeToast,
      infoModal, openInfoModal, closeInfoModal,
      t,
      closeAllModals,
      dir: LANGUAGES[language]?.dir || 'ltr',
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
