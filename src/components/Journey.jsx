import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const timelineData = [
    {
        type: 'work',
        side: 'left',
        when: 'Mar 2026 – Present',
        title: 'Full Stack Developer Intern',
        subtitle: 'MWA TransLogistics · Hyderabad',
        details: [
            'Built a full-stack web app following SDLC principles to streamline business workflow.',
            'Implemented responsive frontend, RESTful APIs, JWT auth, and SQL database integration.',
            'Performed unit testing, debugging, and code optimization for production deployment.'
        ],
        badge: '💰 Paid · ₹10,000 stipend'
    },
    {
        type: 'work',
        side: 'right',
        when: 'Sep 2025 – Present',
        title: 'Club President & Founder',
        subtitle: 'AI Club — CMR Engineering College',
        details: [
            'Led a 50+ member club focused on hands-on AI model building and real-world problem solving.',
            'Organised weekly ML, deep learning, and prompt engineering sessions.',
            'Guided members through end-to-end AI tool development and hosted guest talks.'
        ]
    },
    {
        type: 'work',
        side: 'left',
        when: 'May 2025 – Jun 2025',
        title: 'Developer Intern',
        subtitle: 'Viswam AI · Hyderabad',
        details: [
            'Built real-time AI applications using Python and Streamlit, integrating LLMs via REST APIs.',
            'Worked on feature engineering, prompt engineering, and JSON data handling.',
            'Collaborated in Agile team on deploying smart document automation solutions.'
        ]
    },
    {
        type: 'edu',
        side: 'right',
        when: '2023 – 2027',
        title: 'B.Tech — Computer Science (AI & ML)',
        subtitle: 'CMR Engineering College · Hyderabad',
        gpa: { val: '8.70', label: 'CGPA' }
    },
    {
        type: 'edu',
        side: 'left',
        when: '2021 – 2023',
        title: 'Intermediate (MPC)',
        subtitle: 'Narayana Junior College · Hyderabad',
        gpa: { val: '9.35', label: 'GPA' }
    }
];

export default function Journey() {
    const containerRef = useRef(null);

    // Scroll tracker for spine line fill
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start center', 'end center']
    });

    const spineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    const headingWordVariants = {
        hidden: { y: '110%' },
        visible: { 
            y: 0, 
            transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } 
        }
    };

    const cardVariants = {
        hidden: (side) => ({
            opacity: 0,
            x: side === 'left' ? -40 : 40,
            y: 20
        }),
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <section id="journey" className="journey" ref={containerRef}>
            <div className="container">
                <div className="section-tag">
                    <span className="section-num">02</span>
                    <span className="section-label">The Journey</span>
                </div>

                <motion.h2 
                    className="section-heading"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ staggerChildren: 0.15 }}
                >
                    <span className="h-line">
                        <motion.span className="h-word" variants={headingWordVariants}>Where I've been,</motion.span>
                    </span>
                    <span className="h-line">
                        <motion.span className="h-word" variants={headingWordVariants}>what I've built</motion.span>
                    </span>
                </motion.h2>

                <div className="timeline">
                    {/* Spine background */}
                    <div className="timeline-spine">
                        {/* Animated fill */}
                        <motion.div 
                            className="timeline-spine-fill" 
                            style={{ 
                                scaleY: spineScaleY,
                                originY: 0,
                                height: '100%'
                            }} 
                        />
                    </div>

                    {timelineData.map((item, index) => (
                        <motion.div 
                            key={index}
                            className="tl-item"
                            data-side={item.side}
                            custom={item.side}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3, margin: "-50px" }}
                        >
                            {/* Dot indicator */}
                            <motion.div 
                                className={`tl-dot ${item.type === 'edu' ? 'tl-dot--edu' : ''}`}
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                            >
                                <span />
                            </motion.div>

                            {/* Card Content */}
                            <div className={`tl-card glass-warm ${item.type === 'edu' ? 'tl-card--edu' : ''}`}>
                                <span className="tl-when">
                                    <i className={item.type === 'work' ? 'fas fa-briefcase' : 'fas fa-graduation-cap'} />
                                    <span>{item.when}</span>
                                </span>
                                <h3>{item.title}</h3>
                                <h4>{item.subtitle}</h4>
                                
                                {item.details && (
                                    <ul>
                                        {item.details.map((detail, idx) => (
                                            <li key={idx}>{detail}</li>
                                        ))}
                                    </ul>
                                )}

                                {item.badge && <div className="tl-badge">{item.badge}</div>}

                                {item.gpa && (
                                    <div className="tl-gpa">
                                        <span className="tl-gpa-num">{item.gpa.val}</span>
                                        <span className="tl-gpa-label">{item.gpa.label}</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
