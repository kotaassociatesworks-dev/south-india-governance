import { useState } from "react";
import Layout from "@/components/Layout";
import { Lock, FileLock2, Bell } from "lucide-react";
import { Link } from "react-router-dom";

const Portal = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [msg, setMsg] = useState("");

  // TODO: connect to /api/portal/login (auth.js middleware already in /server)
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("Client portal access is by invitation. Please request access below.");
  };

  return (
    <Layout>
      <section className="bg-primary text-primary-foreground">
        <div className="container-narrow py-24 text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-accent mb-4">For Existing Clients</p>
          <h1 className="font-heading text-5xl md:text-6xl mb-4">Client Portal</h1>
          <div className="gold-divider mx-auto" />
        </div>
      </section>

      <section className="section bg-background">
        <div className="container-narrow grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="font-heading text-3xl text-primary mb-4">Sign In</h2>
            <div className="gold-divider mb-8" />
            <form onSubmit={submit} className="space-y-5">
              <div>
                <label className="label-clean">Email</label>
                <input type="email" className="input-clean" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <label className="label-clean">Password</label>
                <input type="password" className="input-clean" value={pwd} onChange={(e) => setPwd(e.target.value)} />
              </div>
              <button type="submit" className="btn-primary w-full">
                <Lock className="w-4 h-4 mr-2" /> Sign In
              </button>
              {msg && <p className="text-sm text-amber-700 dark:text-amber-400">{msg}</p>}
            </form>

            <p className="mt-8 text-sm text-muted-foreground">
              No account? <Link to="/contact?service=portal-access" className="text-accent font-medium hover:underline">Request access →</Link>
            </p>
          </div>

          <div className="bg-secondary/40 border border-border rounded p-8">
            <h3 className="font-heading text-xl text-primary mb-2">What You'll Get (Coming Soon)</h3>
            <div className="gold-divider mb-6" />
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3"><FileLock2 className="w-5 h-5 text-accent shrink-0 mt-0.5" /><span>Secure document vault for tax records, returns and notices</span></li>
              <li className="flex gap-3"><Bell className="w-5 h-5 text-accent shrink-0 mt-0.5" /><span>Filing status tracker with deadline reminders</span></li>
              <li className="flex gap-3"><Lock className="w-5 h-5 text-accent shrink-0 mt-0.5" /><span>Notice tracker — review and respond to GST/IT notices</span></li>
            </ul>
            <p className="text-xs text-muted-foreground mt-6">Currently in private beta with select clients.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Portal;
