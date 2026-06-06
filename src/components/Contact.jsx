import { motion } from 'framer-motion';

export default function Contact() {
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
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
        }
    };

    return (
        <section id="contact" className="contact">
            <div className="container contact-container">
                <div className="section-tag">
                    <span className="section-num">06</span>
                    <span className="section-label">Contact</span>
                </div>

                <motion.h2 
                    className="contact-heading"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ staggerChildren: 0.15 }}
                >
                    <span className="h-line">
                        <motion.span className="h-word" variants={headingWordVariants}>Let's build</motion.span>
                    </span>
                    <span className="h-line">
                        <motion.span className="h-word" variants={headingWordVariants}>something</motion.span>
                    </span>
                    <span className="h-line">
                        <motion.span className="h-word text-warm" variants={headingWordVariants}>amazing</motion.span>
                    </span>
                </motion.h2>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.4 }}
                >
                    <motion.p className="contact-sub" variants={itemVariants}>
                        I'm currently seeking new opportunities and would love to hear from you. Whether you have a project idea or just want to say hello — my inbox is always open.
                    </motion.p>

                    <motion.div className="contact-btns" variants={itemVariants}>
                        <a href="https://www.linkedin.com/in/vishal-mishra-002727298" target="_blank" rel="noopener noreferrer" className="btn btn--fill btn--lg">
                            <i className="fab fa-linkedin-in" style={{ marginRight: 8 }} />
                            <span>Say Hello on LinkedIn</span>
                        </a>
                        <a href="mailto:vishalmishra.csm@gmail.com" className="btn btn--outline btn--lg">
                            <i className="fas fa-paper-plane" style={{ marginRight: 8 }} />
                            <span>Send an Email</span>
                        </a>
                    </motion.div>

                    <motion.div className="contact-socials" variants={itemVariants}>
                        <a href="https://github.com/VishalMishraCSE" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i className="fab fa-github" /></a>
                        <a href="https://www.linkedin.com/in/vishal-mishra-002727298" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin-in" /></a>
                        <a href="mailto:vishalmishra.csm@gmail.com" aria-label="Email"><i className="fas fa-envelope" /></a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
