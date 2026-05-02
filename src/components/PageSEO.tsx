import { Helmet } from "react-helmet-async";

interface Crumb {
  name: string;
  url: string;
}

interface Props {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  breadcrumbs?: Crumb[];
  jsonLd?: object | object[];
}

const BASE_TITLE = "Kota Associates";
const BASE_URL = "https://kotaassociates.in";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-default.jpg`;

const PageSEO = ({ title, description, canonical, ogImage, breadcrumbs, jsonLd }: Props) => {
  const fullTitle = `${title} | ${BASE_TITLE}`;
  const url = `${BASE_URL}${canonical || ""}`;
  const image = ogImage || DEFAULT_OG_IMAGE;

  const breadcrumbLd = breadcrumbs && breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.name,
      item: `${BASE_URL}${b.url}`,
    })),
  } : null;

  const extras = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={url} />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={BASE_TITLE} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {breadcrumbLd && (
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      )}
      {extras.map((obj, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(obj)}</script>
      ))}
    </Helmet>
  );
};

export default PageSEO;
