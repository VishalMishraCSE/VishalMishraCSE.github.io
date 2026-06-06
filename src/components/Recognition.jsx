import { motion } from 'framer-motion';

const awardsData = [
    {
        icon: 'fas fa-medal',
        title: '1st Place — TECHZ EXPO-2K23',
        desc: 'AI-ACT (B-Free Glasses) · CMR Engineering College · 2023'
    },
    {
        icon: 'fas fa-star',
        title: 'Smart India Hackathon College Winner (×2)',
        desc: 'Won SIH at college level twice · 2023–24'
    },
    {
        icon: 'fas fa-flag',
        title: 'SIH 2024 — National Level Selection',
        desc: 'AgriTech project selected for national round · 2024'
    },
    {
        icon: 'fas fa-building',
        title: 'E-Cell IIT Bombay Representative',
        desc: 'Visited as college representative · 2025'
    },
    {
        icon: 'fas fa-code',
        title: '150+ LeetCode Problems',
        desc: 'Arrays, Trees, Graphs — active solver'
    }
];

const certsData = [
    {
        issuer: 'Verified Credentials',
        title: 'View Complete Certificates Portfolio (PDF)',
        year: 'Verify All',
        link: 'https://drive.google.com/file/d/1gBgI9jtNxIZxPlmfqd4coDAZ5VaZYQ0n/view?usp=sharing',
        isPrimary: true
    },
    {
        issuer: 'Google',
        title: 'Google Analytics Certification',
        year: '2025',
        link: 'https://drive.google.com/file/d/1Is1Rqzo66IN8RBtN_9dwuFyNvmP1jEgf/view?usp=drive_link'
    },
    {
        issuer: 'AWS',
        title: 'Introduction to Generative AI',
        year: '2025',
        link: 'https://drive.google.com/file/d/1QBGNKtMxOzwJEXUAtcAVXX0Q6jwCjHTG/view?usp=drive_link'
    },
    {
        issuer: 'NPTEL',
        title: 'Python Certificate (81%)',
        year: '2025'
    },
    {
        issuer: 'Salesforce',
        title: 'Agentforce Specialist',
        year: '2025'
    },
    {
        issuer: 'Google Cloud',
        title: 'Generative AI Leader Track',
        year: '2026'
    },
    {
        issuer: 'Adobe',
        title: 'Adobe Analytics Foundations',
        year: '2026'
    }
];

export default function Recognition() {
    const headingWordVariants = {
        hidden: { y: '110%' },
        visible: { 
            y: 0, 
            transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } 
        }
    };

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.08
            }
        }
    };

    const awardCardVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: { 
            opacity: 1, 
            x: 0, 
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
        }
    };

    const certCardVariants = {
        hidden: { opacity: 0, x: 30 },
        visible: { 
            opacity: 1, 
            x: 0, 
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
        }
    };

    return (
        <section id="recognition" className="recognition">
            <div className="container">
                <div className="section-tag">
                    <span className="section-num">05</span>
                    <span className="section-label">Recognition</span>
                </div>
                <motion.h2 
                    className="section-heading"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ staggerChildren: 0.15 }}
                >
                    <span className="h-line">
                        <motion.span className="h-word" variants={headingWordVariants}>Awards &</motion.span>
                    </span>
                    <span className="h-line">
                        <motion.span className="h-word" variants={headingWordVariants}>Certifications</motion.span>
                    </span>
                </motion.h2>

                <div className="recog-grid">
                    {/* Left Column — Awards */}
                    <motion.div 
                        className="recog-col"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        <h3 className="recog-col-title"><i className="fas fa-trophy" /> Awards</h3>
                        {awardsData.map((award, i) => (
                            <motion.div key={i} className="recog-card glass-warm" variants={awardCardVariants}>
                                <div className="rc-icon"><i className={award.icon} /></div>
                                <div>
                                    <h4>{award.title}</h4>
                                    <p>{award.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Right Column — Certifications */}
                    <motion.div 
                        className="recog-col"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        <h3 className="recog-col-title"><i className="fas fa-certificate" /> Certifications</h3>
                        {certsData.map((cert, i) => {
                            const CardTag = cert.link ? 'a' : 'div';
                            const linkProps = cert.link 
                                ? { href: cert.link, target: '_blank', rel: 'noopener noreferrer' } 
                                : {};

                            return (
                                <motion.div 
                                    key={i}
                                    variants={certCardVariants}
                                    style={{ display: 'block' }}
                                >
                                    <CardTag 
                                        className={`cert-card glass-warm ${cert.isPrimary ? 'cert-card--primary' : ''}`} 
                                        {...linkProps}
                                        style={{ display: 'block', opacity: 1, transform: 'none' }} // reset opacity wrapper style
                                    >
                                        <span className="cert-issuer">{cert.issuer}</span>
                                        <h4>{cert.title}</h4>
                                        <span className="cert-year">{cert.year}</span>
                                        {cert.link && <i className="fas fa-external-link-alt cert-ext" />}
                                    </CardTag>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
