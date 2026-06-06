import { motion } from 'framer-motion';

const skillsData = [
    {
        icon: 'fas fa-code',
        title: 'Languages',
        size: 'lg',
        chips: [
            { name: 'C++', hl: false },
            { name: 'Java', hl: false },
            { name: 'Python', hl: true },
            { name: 'JavaScript', hl: false }
        ]
    },
    {
        icon: 'fas fa-globe',
        title: 'Web & Backend',
        size: 'lg',
        chips: [
            { name: 'React', hl: true },
            { name: 'HTML/CSS', hl: false },
            { name: 'Streamlit', hl: false },
            { name: 'REST APIs', hl: false },
            { name: 'Microservices', hl: false },
            { name: 'JWT/Auth', hl: false }
        ]
    },
    {
        icon: 'fas fa-brain',
        title: 'AI / Machine Learning',
        size: 'xl',
        chips: [
            { name: 'TensorFlow', hl: true },
            { name: 'Keras', hl: false },
            { name: 'Machine Learning', hl: true },
            { name: 'Deep Learning', hl: false },
            { name: 'Prompt Eng.', hl: false },
            { name: 'LLM', hl: false },
            { name: 'GenAI', hl: false }
        ]
    },
    {
        icon: 'fas fa-database',
        title: 'Databases',
        size: 'sm',
        chips: [
            { name: 'SQL', hl: false },
            { name: 'MySQL', hl: false },
            { name: 'Schema Design', hl: false },
            { name: 'Normalization', hl: false }
        ]
    },
    {
        icon: 'fas fa-tools',
        title: 'Engineering',
        size: 'sm',
        chips: [
            { name: 'Git', hl: true },
            { name: 'SDLC', hl: false },
            { name: 'Agile', hl: false },
            { name: 'AWS', hl: false },
            { name: 'CI/CD', hl: false },
            { name: 'Linux', hl: false }
        ]
    },
    {
        icon: 'fas fa-microchip',
        title: 'Core CS',
        size: 'sm',
        chips: [
            { name: 'DSA', hl: true },
            { name: 'OOPs', hl: false },
            { name: 'OS', hl: false },
            { name: 'Networks', hl: false }
        ]
    }
];

export default function Skills() {
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

    const cardVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.97 },
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
        }
    };

    return (
        <section id="skills" className="skills">
            <div className="container">
                <div className="section-tag">
                    <span className="section-num">04</span>
                    <span className="section-label">Tech Arsenal</span>
                </div>
                <motion.h2 
                    className="section-heading"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ staggerChildren: 0.15 }}
                >
                    <span className="h-line">
                        <motion.span className="h-word" variants={headingWordVariants}>Tools I use to</motion.span>
                    </span>
                    <span className="h-line">
                        <motion.span className="h-word" variants={headingWordVariants}>bring ideas to life</motion.span>
                    </span>
                </motion.h2>

                <motion.div 
                    className="skills-bento"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {skillsData.map((group, index) => (
                        <motion.div 
                            key={index} 
                            className={`sb-card glass-warm ${
                                group.size === 'lg' ? 'sb-card--lg' : group.size === 'xl' ? 'sb-card--xl' : ''
                            }`}
                            variants={cardVariants}
                        >
                            <div className="sb-header">
                                <i className={group.icon} />
                                <h3>{group.title}</h3>
                            </div>
                            <div className="sb-chips">
                                {group.chips.map((chip, idx) => (
                                    <span 
                                        key={idx} 
                                        className={`chip ${chip.hl ? 'chip--hl' : ''}`}
                                    >
                                        {chip.name}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
