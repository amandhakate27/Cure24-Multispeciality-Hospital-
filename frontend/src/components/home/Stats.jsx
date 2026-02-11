const statsData = [
    {
        value: "24/7",
        label: "Emergency Care",
    },
    {
        value: "50+",
        label: "Expert Doctors",
    },
    {
        value: "15+",
        label: "Departments",
    },
    {
        value: "50k+",
        label: "Happy Patients",
    },
];

const Stats = () => {
    return (
        <section className="relative -mt-5 pb-16 overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-blue-50 to-blue-100" />
            <div className="absolute -left-24 -top-24 w-72 h-72 bg-blue-200/40 blur-3xl rounded-full -z-10" />
            <div className="absolute -right-10 top-24 w-48 h-48 bg-blue-300/30 blur-2xl rounded-full -z-10" />
            <div className="max-w-7xl mx-auto px-6 lg:px-10 ">
                <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-white/70 shadow-sm px-6 py-8 ">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                        {statsData.map((item) => (
                            <div key={item.label} className="sm:px-4">
                                <h3 className="text-3xl md:text-4xl font-bold text-blue-700">
                                    {item.value}
                                </h3>
                                <p className="text-slate-600 mt-2 text-sm md:text-base">
                                    {item.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Stats;
