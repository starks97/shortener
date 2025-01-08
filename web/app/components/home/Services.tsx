const services = [
  {
    title: "Custom-Branded Links",
    description:
      "Elevate your online presence with short, personalized URLs that carry your brand’s look and feel.",
  },
  {
    title: "Advanced Analytics",
    description:
      "Track clicks, referrals, and user engagement in real time. Gain insights that help optimize campaigns.",
  },
  {
    title: "Secure & Reliable",
    description:
      "Experience peace of mind with enterprise-grade security and lightning-fast link redirections.",
  },
];

export default function Services() {
  return (
    <div className="max-w-7xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
      {services.map((service, index) => (
        <div className="flex flex-col items-center text-center" key={index}>
          <div className="w-16 h-16 mb-4 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full shadow">
            {/* Replace with your icon */}
            <svg
              className="w-8 h-8 text-orange-400 bg-transparent"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M5 8a3 3 0 106 0H5zM2 14.5A1.5 1.5 0 013.5 13h9a1.5 1.5 0 010 3h-9A1.5 1.5 0 012 14.5z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-orange-500">
            {service.title}
          </h3>
          <p className="text-gray-300">{service.description}</p>
        </div>
      ))}
    </div>
  );
}
