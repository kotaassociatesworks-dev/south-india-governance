import { useState } from "react";
import { motion } from "framer-motion";
import { Users, FileText, Download, CheckCircle, Clock, AlertCircle, Search, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const mockRequests = [
  { id: "KA-2026-001", client: "Ravi Kumar", service: "E-Way Bill Generation", status: "pending", date: "2026-03-07", files: 2, amount: 160 },
  { id: "KA-2026-002", client: "Suresh Reddy", service: "GST Registration", status: "in-progress", date: "2026-03-06", files: 5, amount: 5000 },
  { id: "KA-2026-003", client: "Lakshmi Traders", service: "GST Monthly Filing", status: "completed", date: "2026-03-05", files: 3, amount: 599 },
  { id: "KA-2026-004", client: "Krishna Enterprises", service: "Partnership Deed", status: "pending", date: "2026-03-07", files: 1, amount: 4999 },
  { id: "KA-2026-005", client: "Anjali Pharma", service: "E-Way Bill Generation", status: "completed", date: "2026-03-04", files: 4, amount: 400 },
  { id: "KA-2026-006", client: "Venkat & Sons", service: "Balance Sheet", status: "in-progress", date: "2026-03-06", files: 6, amount: 1599 },
  { id: "KA-2026-007", client: "Priya Textiles", service: "GST Monthly Filing", status: "pending", date: "2026-03-07", files: 2, amount: 599 },
  { id: "KA-2026-008", client: "Srinivas Agro", service: "Rental Agreement", status: "completed", date: "2026-03-03", files: 2, amount: 4999 },
];

const statusColors = {
  pending: { bg: "bg-yellow-100", text: "text-yellow-800", icon: Clock },
  "in-progress": { bg: "bg-blue-100", text: "text-blue-800", icon: AlertCircle },
  completed: { bg: "bg-green-100", text: "text-green-800", icon: CheckCircle },
};

const AdminPage = () => {
  const [requests, setRequests] = useState(mockRequests);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);

  const filtered = requests.filter((r) => {
    const matchStatus = filterStatus === "all" || r.status === filterStatus;
    const matchSearch = !searchQuery || r.client.toLowerCase().includes(searchQuery.toLowerCase()) || r.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  const stats = {
    total: requests.length,
    pending: requests.filter((r) => r.status === "pending").length,
    inProgress: requests.filter((r) => r.status === "in-progress").length,
    completed: requests.filter((r) => r.status === "completed").length,
    revenue: requests.reduce((sum, r) => sum + r.amount, 0),
  };

  const updateStatus = (id, newStatus) => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r)));
  };

  return (
    <main>
      <Navbar />
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-secondary min-h-screen">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-semibold tracking-[0.25em] uppercase text-accent mb-3">
              Administration
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-2">
              Admin Dashboard
            </motion.h1>
            <p className="text-sm text-muted-foreground">Manage client requests, files, and service status</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 max-w-5xl mx-auto mb-12">
            {[
              { label: "Total Requests", value: stats.total, icon: FileText },
              { label: "Pending", value: stats.pending, icon: Clock },
              { label: "In Progress", value: stats.inProgress, icon: AlertCircle },
              { label: "Completed", value: stats.completed, icon: CheckCircle },
              { label: "Revenue", value: `₹${stats.revenue.toLocaleString("en-IN")}`, icon: Users },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="bg-background border border-border p-5 text-center"
                >
                  <Icon className="w-5 h-5 text-accent mx-auto mb-2" />
                  <p className="font-heading text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Filters */}
          <div className="max-w-5xl mx-auto mb-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by client or request ID..."
                className="w-full h-11 pl-10 pr-4 border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="flex gap-2">
              {["all", "pending", "in-progress", "completed"].map((s) => (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-colors ${
                    filterStatus === s ? "bg-primary text-primary-foreground" : "bg-background border border-border text-muted-foreground hover:border-accent/40"
                  }`}
                >
                  {s === "all" ? "All" : s.replace("-", " ")}
                </button>
              ))}
            </div>
          </div>

          {/* Requests table */}
          <div className="max-w-5xl mx-auto bg-background border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="text-left px-4 py-3 font-semibold">Request ID</th>
                    <th className="text-left px-4 py-3 font-semibold">Client</th>
                    <th className="text-left px-4 py-3 font-semibold">Service</th>
                    <th className="text-left px-4 py-3 font-semibold">Amount</th>
                    <th className="text-left px-4 py-3 font-semibold">Date</th>
                    <th className="text-left px-4 py-3 font-semibold">Status</th>
                    <th className="text-left px-4 py-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((req, i) => {
                    const statusInfo = statusColors[req.status];
                    const StatusIcon = statusInfo.icon;
                    return (
                      <motion.tr
                        key={req.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.04 }}
                        className="border-t border-border hover:bg-secondary/50 transition-colors"
                      >
                        <td className="px-4 py-3 font-mono font-semibold text-accent">{req.id}</td>
                        <td className="px-4 py-3 font-medium">{req.client}</td>
                        <td className="px-4 py-3">{req.service}</td>
                        <td className="px-4 py-3 font-semibold">₹{req.amount.toLocaleString("en-IN")}</td>
                        <td className="px-4 py-3 text-muted-foreground">{req.date}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold ${statusInfo.bg} ${statusInfo.text}`}>
                            <StatusIcon className="w-3 h-3" />
                            {req.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => alert(`Downloading ${req.files} files for ${req.id}`)}
                              className="p-1.5 text-muted-foreground hover:text-primary transition-colors"
                              title="Download files"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                            <select
                              value={req.status}
                              onChange={(e) => updateStatus(req.id, e.target.value)}
                              className="text-xs border border-input bg-background px-2 py-1 focus:outline-none focus:ring-1 focus:ring-ring"
                            >
                              <option value="pending">Pending</option>
                              <option value="in-progress">In Progress</option>
                              <option value="completed">Completed</option>
                            </select>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {filtered.length === 0 && (
              <p className="text-center py-8 text-muted-foreground text-sm">No requests found.</p>
            )}
          </div>

          <p className="text-center text-xs text-muted-foreground mt-8">
            This is a frontend demo. Enable Lovable Cloud for persistent data storage and real admin functionality.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default AdminPage;
