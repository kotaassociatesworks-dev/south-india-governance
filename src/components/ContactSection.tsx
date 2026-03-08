import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, Mail, MapPin, MessageCircle, Clock, Building2 } from "lucide-react";

const whatsappUrl = "https://wa.me/919052878779?text=" + encodeURIComponent("Hello, I would like to inquire about taxation and compliance services.");
const gmailUrl = "mailto:kotaassociatesworks@gmail.com?subject=" + encodeURIComponent("Enquiry About Services") + "&body=" + encodeURIComponent("Hi Kota Associates,\n\nI would like to know about your services.\n\nPlease share the details regarding:\n- Service offerings\n- Pricing\n- Process & timeline\n\nLooking forward to hearing from you.\n\nThank you.");

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const contactItems = [
    {
      icon: Building2,
      title: "Head Office",
      content: (
        <p className="text-muted-foreground text-sm leading-relaxed">
          Kota Associates<br />
          5/134, Patel Street, Near Alaganadhaswamy Temple<br />
          East Gudur Rural, Andhra Pradesh 524101
        </p>
      ),
    },
    {
      icon: Phone,
      title: "Phone",
      content: (
        <div className="space-y-1">
          <a href="tel:+919052878779" className="block text-muted-foreground hover:text-accent transition-colors text-sm">+91 90528 78779</a>
        </div>
      ),
    },
    {
      icon: Mail,
      title: "Email",
      content: <a href="mailto:kotaassociatesworks@gmail.com" className="text-muted-foreground hover:text-accent transition-colors text-sm">kotaassociatesworks@gmail.com</a>,
    },
    {
      icon: Clock,
      title: "Working Hours",
      content: (
        <div className="text-sm text-muted-foreground">
          <p>Mon – Sat: 9:00 AM – 6:00 PM</p>
          <p>Sunday: Closed</p>
        </div>
      ),
    },
  ];

  return (
    <section id="contact" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(ellipse at 0% 50%, hsl(216 60% 26% / 0.03) 0%, transparent 50%)",
            "radial-gradient(ellipse at 100% 50%, hsl(44 60% 45% / 0.04) 0%, transparent 50%)",
            "radial-gradient(ellipse at 0% 50%, hsl(216 60% 26% / 0.03) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.div
        className="absolute top-10 right-[10%] w-16 h-16 border border-accent/10 rounded-full pointer-events-none"
        animate={{ y: [0, -15, 0], rotate: [0, 180, 360] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.p
            className="text-sm font-semibold tracking-[0.25em] uppercase text-accent mb-3"
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={inView ? { opacity: 1, letterSpacing: "0.25em" } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            Get In Touch
          </motion.p>
          <motion.h2
            className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Contact Us
          </motion.h2>
          <motion.p
            className="text-muted-foreground max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            Reach out for professional tax compliance and advisory services. We're here to help.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Office Card */}
            <div className="bg-card border border-border p-6 lg:p-8 space-y-6">
              {contactItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  >
                    <motion.div
                      className="w-11 h-11 bg-primary/10 flex items-center justify-center shrink-0"
                      whileHover={{ scale: 1.1, backgroundColor: "hsl(44 60% 45% / 0.15)" }}
                      animate={{
                        boxShadow: ["0 0 0px hsl(216 60% 26% / 0)", "0 0 15px hsl(216 60% 26% / 0.1)", "0 0 0px hsl(216 60% 26% / 0)"],
                      }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                    >
                      <Icon className="w-5 h-5 text-primary" />
                    </motion.div>
                    <div>
                      <h3 className="font-heading text-base font-semibold text-foreground mb-1">{item.title}</h3>
                      {item.content}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA buttons */}
            <motion.div
              className="grid sm:grid-cols-3 gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[hsl(142,70%,40%)] text-white font-semibold text-sm tracking-[0.08em] uppercase transition-all"
                whileHover={{ scale: 1.04, y: -3, boxShadow: "0 10px 25px -5px hsl(142 70% 40% / 0.3)" }}
                whileTap={{ scale: 0.97 }}
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </motion.a>
              <motion.a
                href="tel:+919052878779"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-primary text-primary-foreground font-semibold text-sm tracking-[0.08em] uppercase transition-all"
                whileHover={{ scale: 1.04, y: -3, boxShadow: "0 10px 25px -5px hsl(216 60% 26% / 0.3)" }}
                whileTap={{ scale: 0.97 }}
              >
                <Phone className="w-4 h-4" />
                Call Now
              </motion.a>
              <motion.a
                href={gmailUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 border-2 border-primary text-primary font-semibold text-sm tracking-[0.08em] uppercase transition-all hover:bg-primary hover:text-primary-foreground"
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                <Mail className="w-4 h-4" />
                Email
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Google Map */}
          <motion.div
            initial={{ opacity: 0, x: 40, rotateY: 10 }}
            animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-0"
            style={{ perspective: "800px" }}
          >
            <div className="bg-card border border-border overflow-hidden">
              <div className="p-4 border-b border-border flex items-center gap-3">
                <MapPin className="w-5 h-5 text-accent" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Kota Associates — Head Office</p>
                  <p className="text-xs text-muted-foreground">Gudur, Andhra Pradesh</p>
                </div>
              </div>
              <motion.div whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}>
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
              </motion.div>
              <a
                href="https://maps.app.goo.gl/MwoXPQXTaKDWfnM58"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 text-center text-sm font-semibold text-accent hover:bg-accent/5 transition-colors border-t border-border"
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
