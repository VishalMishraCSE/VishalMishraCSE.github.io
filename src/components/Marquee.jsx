export default function Marquee() {
    return (
        <div className="marquee-section">
            <div className="marquee-track">
                <div className="marquee-content">
                    <span>Full Stack Developer</span><span className="marquee-dot">✦</span>
                    <span>AI & ML Engineer</span><span className="marquee-dot">✦</span>
                    <span>Hackathon Winner</span><span className="marquee-dot">✦</span>
                    <span>AI Club President</span><span className="marquee-dot">✦</span>
                    <span>Problem Solver</span><span className="marquee-dot">✦</span>
                    {/* Repeated content to make infinite loop seamless */}
                    <span>Full Stack Developer</span><span className="marquee-dot">✦</span>
                    <span>AI & ML Engineer</span><span className="marquee-dot">✦</span>
                    <span>Hackathon Winner</span><span className="marquee-dot">✦</span>
                    <span>AI Club President</span><span className="marquee-dot">✦</span>
                    <span>Problem Solver</span><span className="marquee-dot">✦</span>
                </div>
            </div>
        </div>
    );
}
