import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import VideoPlayer from "../common/VideoPlayer";
import { buildApiUrl, buildAssetUrl } from "../../utils/api";
import panelOfDoctorsVideo from "../../assets/videos/panel of doctors.mp4";

const defaultCampaignVideos = [
    { _id: "def-1", title: "Advanced Healthcare Facilities", videoUrl: panelOfDoctorsVideo },
    { _id: "def-2", title: "Patient Care Journey", videoUrl: panelOfDoctorsVideo },
    { _id: "def-3", title: "Our Expert Panel of Doctors", videoUrl: panelOfDoctorsVideo },
    { _id: "def-4", title: "Emergency & Critical Care", videoUrl: panelOfDoctorsVideo },
];

const sectionVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
};

const CampaignVideos = () => {
    const [videos, setVideos] = useState(defaultCampaignVideos);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await fetch(buildApiUrl("/api/videos"));
                if (res.ok) {
                    const data = await res.json();
                    if (data.success && Array.isArray(data.videos) && data.videos.length > 0) {
                        setVideos(data.videos);
                    }
                }
            } catch (err) {
                console.error("Failed to fetch campaign videos:", err);
            }
        };

        fetchVideos();
    }, []);

    // Show up to 4 videos on desktop
    const displayVideos = videos.slice(0, 4);

    return (
        <section className="bg-white py-16 md:py-20 border-t border-blue-100">
            <motion.div
                className="max-w-[1600px] mx-auto px-6 lg:px-10 xl:px-14 text-center"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <h2 className="text-3xl md:text-4xl font-bold text-blue-800">
                    Campaign Videos
                </h2>
                <p className="text-blue-700 mt-3 max-w-2xl mx-auto">
                    Watch our latest hospital campaigns, medical achievements, and patient success stories.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 text-left">
                    {displayVideos.map((video) => {
                        const src = video.videoUrl
                            ? (/^https?:\/\//i.test(video.videoUrl) || video.videoUrl.startsWith('blob:')
                                ? video.videoUrl
                                : buildAssetUrl(video.videoUrl))
                            : panelOfDoctorsVideo;

                        return (
                            <div
                                key={video._id || video.id}
                                className="group bg-white rounded-2xl border border-blue-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col hover:-translate-y-1"
                            >
                                <div className="relative aspect-video bg-slate-950 overflow-hidden">
                                    <VideoPlayer src={src} />
                                </div>
                                <div className="p-4 flex-1 flex flex-col gap-1">
                                    <h3 className="font-semibold text-blue-800 text-sm md:text-base line-clamp-2" title={video.title}>
                                        {video.title || "Hospital Campaign Video"}
                                    </h3>
                                    {video.description && (
                                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-3">{video.description}</p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-10 flex justify-center">
                    <Link
                        to="/gallery#videos"
                        className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl font-semibold transition-transform hover:scale-[1.03] active:scale-95 group"
                    >
                        See More
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </motion.div>
        </section>
    );
};

export default CampaignVideos;
