import { useLocation, useSearchParams } from "react-router-dom";

const FloatingWhatsApp = () => {
  const { pathname } = useLocation();
  const [params] = useSearchParams();

  const messageFor = (): string => {
    if (pathname.startsWith("/eway-bills")) return "Hi, I need help with E-Way Bill generation.";
    if (pathname.startsWith("/compliance")) {
      const t = params.get("type");
      if (t === "msme") return "Hi, I need MSME compliance assistance.";
      if (t === "mnc") return "Hi, I need MNC / transfer pricing advisory.";
      if (t === "startup") return "Hi, I need startup compliance assistance.";
      if (t === "legacy") return "Hi, I need legacy-business tax & compliance advice.";
      return "Hi, I'd like to discuss compliance for my business.";
    }
    if (pathname.startsWith("/calculators")) return "Hi, I have a tax calculation query.";
    if (pathname.startsWith("/contact")) return "Hi, I'd like to book a consultation.";
    if (pathname.startsWith("/services")) return "Hi, I'd like to know more about your services.";
    return "Hi, I have a query for Kota Associates.";
  };

  const href = `https://wa.me/919052878779?text=${encodeURIComponent(messageFor())}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
      aria-label="Chat on WhatsApp"
    >
      <svg viewBox="0 0 32 32" className="w-7 h-7" fill="currentColor"><path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.318.187-.43.302-.83.215-1.245-.072-.215-2.087-1.117-2.65-1.247z"/><path d="M16.063.176c-8.814 0-15.974 7.16-15.974 15.974 0 2.815.733 5.53 2.123 7.946L0 32l8.094-2.166a15.835 15.835 0 0 0 7.97 2.137c8.815 0 15.975-7.16 15.975-15.974S24.878.176 16.063.176zm0 28.93a13.013 13.013 0 0 1-7.06-2.07l-.5-.297-5.166 1.38 1.38-5.038-.328-.516a12.94 12.94 0 0 1-2.04-7.014c0-7.144 5.812-12.957 12.956-12.957s12.956 5.813 12.956 12.957c0 7.143-5.812 12.956-12.956 12.956z"/></svg>
    </a>
  );
};

export default FloatingWhatsApp;
