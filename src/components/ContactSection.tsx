import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

const whatsappUrl = "https://wa.me/919052878779?text=" + encodeURIComponent("Hi, can I know about your services?");
const gmailUrl = "mailto:kotaassociatesworks@gmail.com?subject=" + encodeURIComponent("Enquiry About Services") + "&body=" + encodeURIComponent("Hi Kota Associates,\n\nI would like to know about your services.\n\nPlease share the details regarding:\n- Service offerings\n- Pricing\n- Process & timeline\n\nLooking forward to hearing from you.\n\nThank you.");

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const contactItems = [
    {
      icon: Phone,
      title: "Phone",
      content: <a href="tel:+919052878779" className="text-muted-foreground hover:text-accent transition-colors">+91 90528 78779</a>,
    },
    {
      icon: Mail,
      title: "Email",
      content: <a href="mailto:kotaassociatesworks@gmail.com" className="text-muted-foreground hover:text-accent transition-colors">kotaassociatesworks@gmail.com</a>,
    },
    {
      icon: MapPin,
      title: "Office",
      content: <p className="text-muted-foreground">Gudur, Andhra Pradesh<br />Operations across South India</p>,
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

      {/* Floating decorative element */}
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
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {contactItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  <motion.div
                    className="w-12 h-12 bg-primary/10 flex items-center justify-center shrink-0"
                    whileHover={{ scale: 1.1, backgroundColor: "hsl(44 60% 45% / 0.15)" }}
                    animate={{
                      boxShadow: ["0 0 0px hsl(216 60% 26% / 0)", "0 0 15px hsl(216 60% 26% / 0.1)", "0 0 0px hsl(216 60% 26% / 0)"],
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                  >
                    <Icon className="w-5 h-5 text-primary" />
                  </motion.div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-1">{item.title}</h3>
                    {item.content}
                  </div>
                </motion.div>
              );
            })}

            {/* CTA buttons with 3D hover */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[hsl(142,70%,40%)] text-white font-semibold text-sm tracking-[0.1em] uppercase transition-all"
                whileHover={{ scale: 1.05, y: -3, boxShadow: "0 10px 25px -5px hsl(142 70% 40% / 0.3)" }}
                whileTap={{ scale: 0.97 }}
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Me
              </motion.a>
              <motion.a
                href={gmailUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground font-semibold text-sm tracking-[0.1em] uppercase transition-all"
                whileHover={{ scale: 1.05, y: -3, boxShadow: "0 10px 25px -5px hsl(216 60% 26% / 0.3)" }}
                whileTap={{ scale: 0.97 }}
              >
                <Mail className="w-5 h-5" />
                Gmail Me
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Google Map with 3D entrance */}
          <motion.div
            initial={{ opacity: 0, x: 40, rotateY: 10 }}
            animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            style={{ perspective: "800px" }}
          >
            <iframe
              title="Kota Associates Gudur Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.5!2d79.85!3d14.15!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDA5JzAwLjAiTiA3OcKwNTEnMDAuMCJF!5e0!3m2!1sen!2sin!4v1700000000000"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[400px] border border-border"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;