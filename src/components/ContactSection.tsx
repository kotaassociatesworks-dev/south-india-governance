import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, Mail, MapPin, MessageCircle, Clock, Building2 } from "lucide-react";

const whatsappUrl = "https://wa.me/919052878779?text=" + encodeURIComponent("Hello, I would like to inquire about taxation and compliance services.");
const gmailUrl = "mailto:kotaassociatesworks@gmail.com?subject=" + encodeURIComponent("Enquiry About Services") + "&body=" + encodeURIComponent("Hi Kota Associates,\n\nI would like to know about your services.\n\nPlease share the details regarding:\n- Service offerings\n- Pricing\n- Process & timeline\n\nLooking forward to hearing from you.\n\nThank you.");

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const contactItems = [
    { icon: Building2, title: "Head Office", content: (<p className="text-muted-foreground text-sm leading-relaxed">Kota Associates<br />5/134, Patel Street, Near Alaganadhaswamy Temple<br />East Gudur Rural, Andhra Pradesh 524101</p>) },
    { icon: Phone, title: "Phone", content: <a href="tel:+919052878779" className="block text-muted-foreground hover:text-accent transition-colors text-sm">+91 90528 78779</a> },
    { icon: Mail, title: "Email", content: <a href="mailto:kotaassociatesworks@gmail.com" className="text-muted-foreground hover:text-accent transition-colors text-sm">kotaassociatesworks@gmail.com</a> },
    { icon: Clock, title: "Working Hours", content: (<div className="text-sm text-muted-foreground"><p>Mon – Sat: 9:00 AM – 6:00 PM</p><p>Sunday: Closed</p></div>) },
  ];

  return (
    <section id="contact" className="py-28 lg:py-40 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-18"
        >
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-accent mb-4">Get In Touch</p>
          <h2 className="font-heading text-3xl lg:text-5xl font-bold text-foreground mb-5 tracking-tight">Contact Us</h2>
          <div className="section-divider mt-4 mb-6" />
          <p className="text-muted-foreground max-w-lg mx-auto text-lg">
            Reach out for professional tax compliance and advisory services.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14 max-w-6xl mx-auto">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-7"
          >
            <div className="glass-card rounded-xl p-8 lg:p-10 space-y-7">
              {contactItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    className="flex items-start gap-5"
                    initial={{ opacity: 0, x: -15 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-heading text-base font-semibold text-foreground mb-1.5">{item.title}</h3>
                      {item.content}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              className="grid sm:grid-cols-3 gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-4 font-semibold text-sm tracking-wider uppercase rounded-lg transition-all text-primary-foreground"
                style={{ background: "hsl(142 70% 40%)" }}
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </motion.a>
              <motion.a
                href="tel:+919052878779"
                className="inline-flex items-center justify-center gap-2 px-5 py-4 bg-primary text-primary-foreground font-semibold text-sm tracking-wider uppercase rounded-lg transition-all"
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                <Phone className="w-4 h-4" /> Call Now
              </motion.a>
              <motion.a
                href={gmailUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-4 border-2 border-primary text-primary font-semibold text-sm tracking-wider uppercase rounded-lg transition-all hover:bg-primary hover:text-primary-foreground"
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                <Mail className="w-4 h-4" /> Email
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Google Map */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="premium-card overflow-hidden">
              <div className="p-5 border-b border-border flex items-center gap-3">
                <MapPin className="w-5 h-5 text-accent" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Kota Associates — Head Office</p>
                  <p className="text-xs text-muted-foreground">Gudur, Andhra Pradesh</p>
                </div>
              </div>
              <iframe
                title="Kota Associates Office Location - Gudur, Andhra Pradesh"
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Kota+Associates,+Gudur,+Andhra+Pradesh&zoom=15"
                width="100%"
                height="380"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-[380px]"
              />
              <a
                href="https://maps.app.goo.gl/MwoXPQXTaKDWfnM58"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 text-center text-sm font-semibold text-accent hover:bg-accent/5 transition-colors border-t border-border"
              >
                Open in Google Maps →
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
