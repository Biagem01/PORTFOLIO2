import { motion } from "framer-motion";
import { Mail, Linkedin, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Messaggio inviato!",
      description: "Ti risponderò il prima possibile.",
    });

    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="relative py-32 px-6 bg-gradient-to-br from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-6">
            Mettiamoci in Contatto
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Pronto a discutere il tuo prossimo progetto o opportunità? Sono sempre aperto a nuove sfide e collaborazioni.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-primary/20">
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <span className="text-4xl font-display font-bold text-primary">TN</span>
              </div>
            </div>

            <div className="space-y-4">
              <motion.a
                href="mailto:tuaemail@example.com"
                className="flex items-center gap-4 p-4 rounded-xl bg-card hover:bg-card/80 transition-colors group"
                whileHover={{ x: 4 }}
                data-testid="link-email"
              >
                <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-semibold">tuaemail@example.com</p>
                </div>
              </motion.a>

              <motion.a
                href="https://linkedin.com/in/tuoprofilo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-card hover:bg-card/80 transition-colors group"
                whileHover={{ x: 4 }}
                data-testid="link-linkedin"
              >
                <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Linkedin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">LinkedIn</p>
                  <p className="font-semibold">linkedin.com/in/tuoprofilo</p>
                </div>
              </motion.a>
            </div>

            <div className="pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Cerchi un designer UX con competenze tecniche? Discutiamo come posso aiutare il tuo team a creare esperienze digitali eccezionali.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-2xl font-display font-bold mb-6">
                Inviami un messaggio
              </h3>

              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  placeholder="Il tuo nome"
                  data-testid="input-name"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  placeholder="la-tua@email.com"
                  data-testid="input-email"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">
                  Messaggio
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
                  placeholder="Raccontami del tuo progetto..."
                  data-testid="input-message"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-6 text-lg font-semibold rounded-xl"
                data-testid="button-send"
              >
                {isSubmitting ? (
                  "Invio in corso..."
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Invia Messaggio
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center pt-2">
                Le tue informazioni verranno utilizzate solo per rispondere alla tua richiesta e non saranno mai condivise con terze parti.
              </p>
            </form>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-32 pt-12 border-t border-border text-center"
        >
          <p className="text-muted-foreground">
            © 2024 Il Tuo Portfolio. Fatto con ❤️ e React.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
