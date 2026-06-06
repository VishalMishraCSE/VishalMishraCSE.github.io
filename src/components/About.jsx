import { motion } from 'framer-motion';

export default function About() {
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
                staggerChildren: 0.12
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 40, scale: 0.98 },
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
        }
    };

    return (
        <section id="about" className="about">
            <div className="container">
                <div className="section-tag">
                    <span className="section-num">01</span>
                    <span class="section-label">About Me</span>
                </div>

                <div className="about-headline-wrap">
                    <motion.h2 
                        className="about-headline"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ staggerChildren: 0.15 }}
                    >
                        <span className="h-line">
                            <motion.span className="h-word" variants={headingWordVariants}>A builder at heart,</motion.span>
                        </span>
                        <span className="h-line">
                            <motion.span className="h-word" variants={headingWordVariants}>driven by <em className="text-warm">curiosity</em></motion.span>
                        </span>
                    </motion.h2>
                </div>

                <div className="about-grid">
                    <motion.div 
                        className="about-story"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <motion.p className="about-p about-p--lead" variants={cardVariants}>
                            I'm fascinated by the invisible thread between elegant code and real human impact. Every project I touch, I ask: <em>"Does this actually solve something?"</em>
                        </motion.p>
                        <motion.p className="about-p" variants={cardVariants}>
                            Currently in my final year of B.Tech in Computer Science (AI & ML) at CMR Engineering College, Hyderabad. Over the past 3 years, I've gone from writing my first "Hello World" to shipping production applications, training ML models that actually work, and leading a 50+ member AI club.
                        </motion.p>
                        <motion.p className="about-p" variants={cardVariants}>
                            When I'm not coding, I'm exploring generative AI frontiers, competing in hackathons (and winning them), or mentoring the next wave of builders. I believe in shipping fast, iterating faster, and never settling for "good enough."
                        </motion.p>
                    </motion.div>

                    <motion.div 
                        className="about-bento"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <motion.div className="about-bento-card glass-warm" variants={cardVariants}>
                            <div className="abc-icon"><i className="fas fa-graduation-cap" /></div>
                            <h4>Education</h4>
                            <p>B.Tech CSE (AI & ML)</p>
                            <span className="abc-sub">CMR Engineering College · 8.70 CGPA</span>
                        </motion.div>
                        
                        <motion.div className="about-bento-card glass-warm" variants={cardVariants}>
                            <div className="abc-icon"><i className="fas fa-map-marker-alt" /></div>
                            <h4>Based in</h4>
                            <p>Hyderabad, India</p>
                            <span className="abc-sub">Open to relocation</span>
                        </motion.div>
                        
                        <motion.div className="about-bento-card glass-warm about-bento-card--wide" variants={cardVariants}>
                            <div className="abc-icon"><i className="fas fa-rocket" /></div>
                            <h4>What drives me</h4>
                            <p>Building AI-powered tools that make complex problems feel simple. From LMS platforms to smart agricultural rovers — I ship things.</p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
