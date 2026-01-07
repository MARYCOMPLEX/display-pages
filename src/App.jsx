import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
    Search,
    Heart,
    ShieldCheck,
    Zap,
    Navigation,
    Star,
    Globe,
    Construction
} from 'lucide-react';

// --- 多语言配置 ---
const translations = {
    zh: {
        nav: {
            features: "核心功能",
            howItWorks: "AI 原理",
            status: "敬请期待",
        },
        hero: {
            tag: "关于美食的真相",
            titleStart: "别再被",
            titleHighlight: "4.5星评分",
            titleEnd: "欺骗。",
            desc: "不再依赖注水评分，基于真实用户评价的情感分析，帮你找到真正值得信赖的餐厅。",
            status: "✨ 项目正在开发中 · 敬请期待",
        },
        trustScore: {
            tag: "信任分 TRUST SCORE",
            title: "拒绝盲猜，\n还原真相。",
            descStart: "大多数评分系统都坏了。我们分析数万条真实评论，生成一个",
            descHighlight: "信任分 (Trust Score)",
            descEnd: "（0-10分）。",
            greenText: "绿色 (>8分)",
            greenDesc: "代表持续优秀。我们帮你过滤噪音，直达美味。",
            cardGood: "值得信赖",
            cardBad: "谨防营销"
        },
        ai: {
            title: "读懂你的每一个馋念。",
            desc: "不止是关键词匹配。我们解析意图，分析情感，并验证真实性。",
            cards: [
                { title: '自然语言搜索', desc: '试试搜"适合约会的安静小酒馆，人均50刀以内"。我们懂你的潜台词。' },
                { title: '实时分析', desc: '看着 AI 实时扫描评论、交叉验证数据，并瞬间生成你的专属列表。' },
                { title: '真相洞察', desc: '好坏兼听。我们的"真相警示"会提醒你长队难排或服务冷漠的问题。' },
                { title: '精选合集', desc: '收藏心头好，构建你的私人美食地图。绝不错过任何一次惊艳。' }
            ],
            loadingTags: [
                "正在解析意图...",
                "正在核算信任分..."
            ]
        },
        bento: {
            title: "为吃货而生",
            feed: {
                title: "探索流",
                desc: "价格、距离、一句话真相，一目了然。绿色分数指引你直奔高品质。",
                tags: ["$15以内", "深夜食堂"]
            },
            profile: {
                title: "个人中心",
                desc: "记录你的味蕾探索之旅。"
            },
            saved: {
                title: "收藏夹",
                desc: "左滑删除，点击导航。你的种草清单，井井有条。"
            },
            details: {
                title: "详情页",
                desc: "高清图集、深度内幕、关键信息卡片，一切尽在掌握。"
            }
        },
        footer: {
            title: "准备好品尝真味了吗？",
            subtitle: "本项目为演示作品，功能持续完善中，敬请期待。"
        }
    },
    en: {
        nav: {
            features: "Features",
            howItWorks: "How AI Works",
            status: "Coming Soon",
        },
        hero: {
            tag: "The Truth About Food",
            titleStart: "Stop Eating at",
            titleHighlight: "4.5 Star Traps.",
            titleEnd: "",
            desc: "Discover dining spots based on real user sentiments, not inflated ratings. Powered by AI analysis of authentic reviews.",
            status: "✨ Project in Development · Stay Tuned",
        },
        trustScore: {
            tag: "TRUST SCORE",
            title: "Don't guess.\nKnow the truth.",
            descStart: "Most rating systems are broken. We analyze thousands of reviews to generate a ",
            descHighlight: "Trust Score",
            descEnd: " (0-10).",
            greenText: "Green (>8)",
            greenDesc: " means it's consistently excellent. We cut through the noise so you don't have to.",
            cardGood: "Trusted Spot",
            cardBad: "Avoid the Hype"
        },
        ai: {
            title: "Understanding your cravings.",
            desc: "Not just keywords. We parse intent, analyze sentiment, and verify reality.",
            cards: [
                { title: "Natural Language", desc: "Just type 'Cozy date night spot with good wine under $50'. We understand context." },
                { title: "Real-time Analysis", desc: "Watch as our AI scans reviews, cross-references data, and builds your list instantly." },
                { title: "The Inside Scoop", desc: "Get the good AND the bad. Our 'Reality Check' warns you about long waits or rude service." },
                { title: "Curated Collections", desc: "Save your favorites. Build your personal food map. Never forget a great meal." }
            ],
            loadingTags: [
                "Processing Intent...",
                "Checking Trust Scores..."
            ]
        },
        bento: {
            title: "Designed for Foodies",
            feed: {
                title: "The Feed",
                desc: "Scan prices, distances, and one-liner truths at a glance. Green scores guide your eye to quality.",
                tags: ["Under $15", "Open Late"]
            },
            profile: {
                title: "Your Profile",
                desc: "Track your culinary journey."
            },
            saved: {
                title: "Saved Places",
                desc: "Swipe to delete. Tap to navigate. Your bucket list, organized."
            },
            details: {
                title: "Detail View",
                desc: "Photos gallery, full inside scoop, and essential info cards."
            }
        },
        footer: {
            title: "Ready to eat real?",
            subtitle: "This is a portfolio project. Features are under development."
        }
    }
};

// --- 组件：iPhone 边框模拟器 ---
const PhoneMockup = ({ src, alt, className = "" }) => (
    <div className={`relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl ${className}`}>
        <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute z-10"></div>
        <div className="h-[32px] w-[3px] bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
        <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
        <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white dark:bg-gray-900 relative">
            <img src={src} alt={alt} className="w-full h-full object-cover" />
        </div>
    </div>
);

// --- 组件：功能特性卡片 ---
const FeatureCard = ({ icon: Icon, title, desc, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        viewport={{ once: true }}
        className="bg-white/50 dark:bg-neutral-900/50 backdrop-blur-lg border border-neutral-200 dark:border-neutral-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all"
    >
        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4 text-green-600 dark:text-green-400">
            <Icon size={24} />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-white">{title}</h3>
        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">{desc}</p>
    </motion.div>
);

export default function App() {
    const [lang, setLang] = useState('zh');
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const t = translations[lang];

    const toggleLang = () => {
        setLang(prev => prev === 'zh' ? 'en' : 'zh');
    };

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-[#FAFAFA] dark:bg-black text-neutral-900 dark:text-white font-sans selection:bg-green-500/30">

            {/* 顶部进度条 */}
            <motion.div className="fixed top-0 left-0 right-0 h-1 bg-green-500 origin-left z-50" style={{ scaleX }} />

            {/* 导航栏 */}
            <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 py-4' : 'bg-transparent py-6'}`}>
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-400">FindRealTaste</span>
                    </div>
                    <div className="flex items-center gap-8">
                        <div className="hidden md:flex gap-8 text-sm font-medium text-neutral-600 dark:text-neutral-400">
                            <a href="#features" className="hover:text-green-500 transition-colors">{t.nav.features}</a>
                            <a href="#how-it-works" className="hover:text-green-500 transition-colors">{t.nav.howItWorks}</a>
                        </div>

                        {/* 语言切换按钮 */}
                        <button
                            onClick={toggleLang}
                            className="flex items-center gap-1 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                        >
                            <Globe size={16} />
                            {lang === 'zh' ? 'En' : '中文'}
                        </button>

                        {/* 状态展示，非点击按钮 */}
                        <div className="hidden md:flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 px-4 py-2 rounded-full text-xs font-semibold">
                            <Construction size={14} />
                            {t.nav.status}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section - 首页展示 */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 text-center z-10 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-green-600 font-semibold tracking-wide uppercase text-sm mb-4">{t.hero.tag}</h2>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-[1.1]">
                            {t.hero.titleStart} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-800 to-neutral-400 dark:from-white dark:to-neutral-500">
                                {t.hero.titleHighlight}
                            </span>
                            {t.hero.titleEnd}
                        </h1>
                        <p className="text-xl md:text-2xl text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                            {t.hero.desc}
                        </p>

                        {/* 替换按钮组为纯文本提示 */}
                        <div className="flex justify-center mb-16">
                            <div className="text-neutral-500 dark:text-neutral-400 font-medium tracking-wide">
                                {t.hero.status}
                            </div>
                        </div>

                    </motion.div>

                    {/* Hero Image - 首页.png */}
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative flex justify-center items-end"
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/20 blur-[120px] rounded-full -z-10"></div>
                        <PhoneMockup src="./imgs/home.png" alt="FindRealTaste Home Screen" className="z-10 scale-100 md:scale-110" />
                        <PhoneMockup src="./imgs/results.png" className="hidden md:block absolute left-1/2 -translate-x-[320px] translate-y-12 scale-90 opacity-40 z-0 blur-[1px]" />
                        <PhoneMockup src="./imgs/history.png" className="hidden md:block absolute right-1/2 translate-x-[320px] translate-y-12 scale-90 opacity-40 z-0 blur-[1px]" />
                    </motion.div>
                </div>
            </section>

            {/* Trust Score Section - 核心卖点 */}
            <section className="py-24 bg-neutral-900 text-white relative overflow-hidden" id="features">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <div className="md:w-1/2">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                            >
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-900/30 border border-green-800 text-green-400 text-xs font-bold mb-6">
                                    <ShieldCheck size={14} />
                                    {t.trustScore.tag}
                                </div>
                                <h2 className="text-4xl md:text-5xl font-bold mb-6 whitespace-pre-line">{t.trustScore.title}</h2>
                                <p className="text-neutral-400 text-lg mb-8 leading-relaxed">
                                    {t.trustScore.descStart} <strong>{t.trustScore.descHighlight}</strong>{t.trustScore.descEnd}
                                    <br /><br />
                                    <span className="text-green-400">{t.trustScore.greenText}</span> {t.trustScore.greenDesc}
                                </p>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="p-4 bg-neutral-800 rounded-xl border border-neutral-700">
                                        <div className="text-3xl font-bold text-green-400 mb-1">9.2</div>
                                        <div className="text-sm text-neutral-400">{t.trustScore.cardGood}</div>
                                    </div>
                                    <div className="p-4 bg-neutral-800 rounded-xl border border-neutral-700">
                                        <div className="text-3xl font-bold text-red-400 mb-1">4.1</div>
                                        <div className="text-sm text-neutral-400">{t.trustScore.cardBad}</div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* 展示 详情1.png */}
                        <div className="md:w-1/2 flex justify-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                            >
                                <PhoneMockup src="./imgs/detail1.png" alt="Trust Score Detail" />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* AI Analysis Section - 加载动画与解析 */}
            <section className="py-24 bg-white dark:bg-black" id="how-it-works">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">{t.ai.title}</h2>
                        <p className="text-neutral-500 max-w-2xl mx-auto">{t.ai.desc}</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 items-center">
                        {/* Left: Input */}
                        <div className="space-y-6">
                            <FeatureCard
                                icon={Search}
                                title={t.ai.cards[0].title}
                                desc={t.ai.cards[0].desc}
                                delay={0}
                            />
                            <FeatureCard
                                icon={Zap}
                                title={t.ai.cards[1].title}
                                desc={t.ai.cards[1].desc}
                                delay={0.2}
                            />
                        </div>

                        {/* Center: The Loading View (解析.png) */}
                        <div className="flex justify-center py-8 md:py-0">
                            <motion.div
                                className="relative"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <PhoneMockup src="./imgs/analysis.png" alt="AI Analysis Loading" />
                                {/* Floating Elements */}
                                <div className="absolute -right-12 top-20 bg-white dark:bg-neutral-800 p-3 rounded-lg shadow-lg text-xs font-mono border dark:border-neutral-700 animate-pulse whitespace-nowrap">
                                    {t.ai.loadingTags[0]}
                                </div>
                                <div className="absolute -left-12 bottom-40 bg-white dark:bg-neutral-800 p-3 rounded-lg shadow-lg text-xs font-mono border dark:border-neutral-700 animate-pulse whitespace-nowrap" style={{ animationDelay: '1s' }}>
                                    {t.ai.loadingTags[1]}
                                </div>
                            </motion.div>
                        </div>

                        {/* Right: The Result */}
                        <div className="space-y-6">
                            <FeatureCard
                                icon={Navigation}
                                title={t.ai.cards[2].title}
                                desc={t.ai.cards[2].desc}
                                delay={0.4}
                            />
                            <FeatureCard
                                icon={Heart}
                                title={t.ai.cards[3].title}
                                desc={t.ai.cards[3].desc}
                                delay={0.6}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Bento Grid Gallery - 展示更多页面 */}
            <section className="py-24 bg-neutral-50 dark:bg-neutral-900/50">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-12 text-center">{t.bento.title}</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto h-auto">

                        {/* Card 1: The Feed (Large) */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="lg:col-span-2 bg-white dark:bg-neutral-900 rounded-3xl p-8 shadow-sm border border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row items-center gap-8 overflow-hidden"
                        >
                            <div className="flex-1 space-y-4">
                                <h3 className="text-2xl font-bold">{t.bento.feed.title}</h3>
                                <p className="text-neutral-500">{t.bento.feed.desc}</p>
                                <div className="flex gap-2 mt-4">
                                    {t.bento.feed.tags.map((tag, i) => (
                                        <span key={i} className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-xs">{tag}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="w-48 shrink-0">
                                <img src="./imgs/results.png" className="rounded-xl shadow-lg border-4 border-white dark:border-neutral-700 rotate-3 hover:rotate-0 transition-transform duration-500" alt="Feed" />
                            </div>
                        </motion.div>

                        {/* Card 2: Profile (Tall) */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="row-span-2 bg-neutral-900 text-white rounded-3xl p-8 shadow-sm flex flex-col items-center justify-between overflow-hidden relative"
                        >
                            <div className="text-center z-10">
                                <h3 className="text-2xl font-bold mb-2">{t.bento.profile.title}</h3>
                                <p className="text-neutral-400 text-sm">{t.bento.profile.desc}</p>
                            </div>
                            <div className="mt-8 relative z-10">
                                <img src="./imgs/profile.png" className="rounded-[2rem] border-8 border-neutral-800 shadow-2xl" alt="Profile" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 z-0"></div>
                        </motion.div>

                        {/* Card 3: Saved (Small) */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-white dark:bg-neutral-900 rounded-3xl p-8 shadow-sm border border-neutral-200 dark:border-neutral-800"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-red-100 text-red-500 rounded-full"><Heart size={20} fill="currentColor" /></div>
                                <h3 className="text-xl font-bold">{t.bento.saved.title}</h3>
                            </div>
                            <p className="text-neutral-500 text-sm mb-4">{t.bento.saved.desc}</p>
                            <img src="./imgs/saved.png" className="w-full h-32 object-cover object-top rounded-lg opacity-80" alt="Saved" />
                        </motion.div>

                        {/* Card 4: Details (Small) */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-white dark:bg-neutral-900 rounded-3xl p-8 shadow-sm border border-neutral-200 dark:border-neutral-800"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-purple-100 text-purple-500 rounded-full"><Star size={20} /></div>
                                <h3 className="text-xl font-bold">{t.bento.details.title}</h3>
                            </div>
                            <p className="text-neutral-500 text-sm">{t.bento.details.desc}</p>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* Footer / CTA - 简化版 */}
            <section className="py-32 bg-black text-white text-center relative overflow-hidden" id="download">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>

                <div className="relative z-10 max-w-4xl mx-auto px-6">
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">{t.footer.title}</h2>
                    <p className="text-xl text-neutral-400 mb-12">{t.footer.subtitle}</p>
                </div>
            </section>

        </div>
    );
}
