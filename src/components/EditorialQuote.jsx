import { motion } from 'framer-motion';

export default function EditorialQuote() {
    return (
        <section className="editorial-quote-section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                >
                    <p className="editorial-quote">
                        "I believe code is not just a sequence of syntax — it's a <em>medium</em> to tell stories, <em>solve</em> actual problems, and <em>bridge</em> the gap between complex logic and human curiosity."
                    </p>
                    <p className="editorial-quote-author">Vishal Mishra — Developer & Builder</p>
                </motion.div>
            </div>
        </section>
    );
}
