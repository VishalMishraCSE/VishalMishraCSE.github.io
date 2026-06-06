import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
    {
        id: 'vidyora',
        num: '01',
        title: 'Vidyora',
        subtitle: 'Learning Management System',
        desc: 'A full-stack LMS platform with user authentication, API-based communication, and database integration. Features AI-based content recommendations and real-time analytics for personalised learning.',
        tags: ['React', 'JavaScript', 'REST APIs', 'SQL', 'AI'],
        link: 'https://vidyoratechnologies.com',
        locked: false,
        visual: 'browser',
        details: [
            'Architected a highly responsive learning management platform using React and Node.js.',
            'Integrated Machine Learning algorithms to offer personalised content recommendations to students based on learning patterns.',
            'Developed secure JWT-based authentication and designed optimized SQL database schemas for high performance.',
            'Engineered interactive dashboards using Chart.js to visualize live progress, grades, and engagement metrics.'
        ]
    },
    {
        id: 'nids-ml',
        num: '02',
        title: 'NIDS-ML',
        subtitle: 'Network Intrusion Detection System',
        desc: 'An ML pipeline to classify network attacks achieving 98.07% accuracy. Full data pipeline including feature selection, model training, evaluation, real-time email alerts, and deployment-ready integration.',
        tags: ['Python', 'Keras', 'TensorFlow', 'Feature Engineering'],
        link: 'https://github.com/dhanushmetuku/NIDS',
        locked: false,
        visual: 'ml',
        details: [
            'Constructed a multi-layer Neural Network model to detect network intrusions and potential threats.',
            'Cleaned and processed NSL-KDD datasets using scikit-learn, implementing PCA and ANOVA feature selection pipelines.',
            'Achieved 98.07% validation accuracy with optimized hyperparameters using Keras & TensorFlow.',
            'Integrated automated SMTP-based warning mail dispatch system that fires within 3 seconds of detecting high-level anomalies.'
        ]
    },
    {
        id: 'agri-rover',
        num: '03',
        title: 'Agri_Rover',
        subtitle: 'Solar-Powered Smart Agricultural Rover',
        desc: 'Integrating hardware and software to automate seed sowing, ploughing, and fertilizer dispensing across 500m with obstacle detection and timed automation.',
        tags: ['Arduino', 'Embedded C', 'IoT Sensors', 'Bluetooth'],
        link: 'https://github.com/VishalMishraCSE/Agri_Rover',
        locked: false,
        visual: 'iot',
        details: [
            'Designed and built a physical autonomous farming rover powered by clean solar energy.',
            'Coded Arduino controllers in Embedded C for motor speeds, servo steering, and sensor interfaces.',
            'Implemented ultrasonic sensors for obstacle collision avoidance with an auto-rerouting grid algorithm.',
            'Established Bluetooth communication module supporting remote configuration up to a radius of 500 meters.'
        ]
    },
    {
        id: 'smart-terrace',
        num: '04',
        title: 'Smart Terrace',
        subtitle: 'IoT-Based Smart Farming System',
        desc: 'Monitor 5+ plants in real time, automate soil-moisture-based watering, and stream live temperature, humidity, and system status to a mobile dashboard.',
        tags: ['ESP8266', 'Blynk IoT', 'Sensors', 'Mobile App'],
        link: '',
        locked: true,
        visual: 'smart-terrace',
        details: [
            'Engineered a smart farming system to monitor plant health telemetry (soil moisture, sunlight, humidity).',
            'Programmed ESP8266 microcontroller to stream sensor inputs to a mobile app via Blynk IoT cloud API.',
            'Built self-watering solenoid valve relays that trigger dynamically based on specific threshold moisture curves.',
            'Monitored 5+ independent plant profiles with automated local data logging for offline analysis.'
        ]
    }
];

export default function Projects() {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        if (!trackRef.current || !sectionRef.current) return;

        const getScrollAmount = () => trackRef.current.scrollWidth - window.innerWidth;

        const ctx = gsap.context(() => {
            gsap.to(trackRef.current, {
                x: () => -getScrollAmount(),
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: () => `+=${getScrollAmount() + 450}`,
                    pin: true,
                    scrub: 1.2,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const headingWordVariants = {
        hidden: { y: '110%' },
        visible: { 
            y: 0, 
            transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } 
        }
    };

    return (
        <section id="work" className="work" ref={sectionRef}>
            <div className="container work-header-container">
                <div className="section-tag">
                    <span className="section-num">03</span>
                    <span className="section-label">Featured Work</span>
                </div>
                <motion.h2 
                    className="section-heading"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ staggerChildren: 0.15 }}
                >
                    <span className="h-line">
                        <motion.span className="h-word" variants={headingWordVariants}>Things I've</motion.span>
                    </span>
                    <span className="h-line">
                        <motion.span className="h-word" variants={headingWordVariants}>shipped</motion.span>
                    </span>
                </motion.h2>
            </div>

            <div className="work-scroll-container" id="workScrollContainer">
                <div className="work-track" id="workTrack" ref={trackRef}>
                    {projectsData.map((project) => (
                        <article key={project.id} className="work-card">
                            <div 
                                className="work-card-inner glass-warm"
                                onClick={() => setSelectedProject(project)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="wc-left">
                                    <span className="wc-num">{project.num}</span>
                                    <h3 className="wc-title">{project.title}</h3>
                                    <p className="wc-subtitle">{project.subtitle}</p>
                                    <p className="wc-desc">{project.desc}</p>
                                    <div className="wc-tags">
                                        {project.tags.map((tag, i) => (
                                            <span key={i}>{tag}</span>
                                        ))}
                                    </div>
                                    <button 
                                        className="wc-link"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedProject(project);
                                        }}
                                        style={{ border: 'none', background: 'var(--ink)' }}
                                    >
                                        Read Story <i className="fas fa-arrow-right" style={{ marginLeft: 8 }} />
                                    </button>
                                </div>

                                <div className="wc-right">
                                    {project.visual === 'browser' && (
                                        <div className="wc-visual wc-visual--browser">
                                            <div className="wv-bar"><span></span><span></span><span></span></div>
                                            <div className="wv-body">
                                                <div className="wv-line wv-line--title"></div>
                                                <div className="wv-grid">
                                                    <div className="wv-box"></div><div className="wv-box"></div>
                                                    <div className="wv-box"></div><div className="wv-box"></div>
                                                </div>
                                                <div className="wv-line wv-line--short"></div>
                                                <div className="wv-line"></div>
                                            </div>
                                        </div>
                                    )}

                                    {project.visual === 'ml' && (
                                        <div className="wc-visual wc-visual--ml">
                                            <div className="wc-accuracy-ring">
                                                <svg viewBox="0 0 120 120">
                                                    <circle cx="60" cy="60" r="52" className="ar-bg"/>
                                                    <circle cx="60" cy="60" r="52" className="ar-fill" style={{ strokeDashoffset: 'calc(327 - 327 * 0.9807)' }}/>
                                                </svg>
                                                <div className="ar-text">
                                                    <strong>98.07%</strong>
                                                    <span>Accuracy</span>
                                                </div>
                                            </div>
                                            <div className="wc-neural">
                                                <div className="nn-col"><span></span><span></span><span></span></div>
                                                <div className="nn-col"><span></span><span></span><span></span><span></span></div>
                                                <div className="nn-col"><span></span><span></span><span></span></div>
                                            </div>
                                        </div>
                                    )}

                                    {(project.visual === 'iot' || project.visual === 'smart-terrace') && (
                                        <div className="wc-visual wc-visual--iot">
                                            <div className="iot-meters">
                                                <div className="iot-meter">
                                                    <div className="iot-meter-fill"></div>
                                                    <span>Soil {project.visual === 'iot' ? '72%' : '38%'}</span>
                                                </div>
                                                <div className="iot-meter">
                                                    <div className="iot-meter-fill"></div>
                                                    <span>Temp {project.visual === 'iot' ? '45°' : '55°'}</span>
                                                </div>
                                            </div>
                                            <div className="iot-live">
                                                <span className="iot-led"></span> 
                                                <span>{project.visual === 'iot' ? 'Rover Active' : 'Live Feeds'}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            {/* Cinematic Magazine Details Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div 
                        className="project-modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div 
                            className="project-modal"
                            initial={{ scale: 0.92, y: 30, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.92, y: 30, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="project-modal-close" onClick={() => setSelectedProject(null)}>
                                <i className="fas fa-times" />
                            </button>

                            <div className="project-modal-content">
                                <div className="pm-header">
                                    <span className="pm-subtitle">{selectedProject.subtitle}</span>
                                    <h4 className="pm-title">{selectedProject.title}</h4>
                                    <div className="pm-tags">
                                        {selectedProject.tags.map((tag, i) => (
                                            <span key={i}>{tag}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="pm-body">
                                    <p>{selectedProject.desc}</p>
                                    
                                    <h5>Key Achievements & Engineering Details</h5>
                                    <ul>
                                        {selectedProject.details.map((detail, i) => (
                                            <li key={i}>{detail}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="pm-footer">
                                    {selectedProject.locked ? (
                                        <span className="btn btn--outline wc-link--locked">
                                            <i className="fas fa-lock" style={{ marginRight: 8 }} />
                                            <span>Private Repository</span>
                                        </span>
                                    ) : (
                                        <a 
                                            href={selectedProject.link} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="btn btn--fill"
                                        >
                                            <span>{selectedProject.link.includes('github') ? 'View Code on GitHub' : 'Visit Live Project'}</span>
                                            <i className="fas fa-external-link-alt" style={{ marginLeft: 8 }} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
