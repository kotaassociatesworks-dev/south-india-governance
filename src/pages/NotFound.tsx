import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

const NotFound = () => (
  <Layout>
    <div className="container-narrow py-32 text-center">
      <p className="font-heading text-7xl text-accent mb-4">404</p>
      <h1 className="font-heading text-3xl text-primary mb-4">Page Not Found</h1>
      <p className="text-muted-foreground mb-8">The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn-primary">Return Home</Link>
    </div>
  </Layout>
);

export default NotFound;
