const SITE_NAME = "SKY HOSTEL";
const SITE_ALT_NAME = "Sky Hostels";
const LOGO_PATH = "/favicon.png";
const DEFAULT_TITLE = "SKY HOSTEL | Premium Boys/Girls Hostel Near MIT ADT University College, Loni Kalbhor";

const DEFAULT_DESCRIPTION =
  "Premium Boys/Girls Hostel Near MIT ADT University College, Loni Kalbhor. Sky Hostels offers safe, comfortable, and student-friendly accommodation with modern amenities.";

const BASE_KEYWORDS = [
  "Premium Boys/Girls Hostel Near MIT ADT University College, Loni Kalbhor",
  "MIT ADT University College hostel",
  "Hostel near MIT ADT University College",
  "Boys hostel near MIT ADT Loni Kalbhor",
  "SKY HOSTEL",
  "Sky Hostels",
  "student hostel Loni Kalbhor",
  "hostel in Pune Solapur Highway",
  "PG and hostel near MIT ADT",
  "safe hostel for students Pune"
];

function upsertMeta(attributeName, attributeValue, content) {
  if (!content) return;
  let tag = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attributeName, attributeValue);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function upsertCanonical(url) {
  if (!url) return;
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", url);
}

function upsertJsonLd(scriptId, data) {
  if (!scriptId || !data) return;
  let scriptTag = document.querySelector(`script#${scriptId}[type="application/ld+json"]`);
  if (!scriptTag) {
    scriptTag = document.createElement("script");
    scriptTag.setAttribute("type", "application/ld+json");
    scriptTag.setAttribute("id", scriptId);
    document.head.appendChild(scriptTag);
  }
  scriptTag.textContent = JSON.stringify(data);
}

export function getSeoKeywords(extraKeywords = []) {
  const merged = [...BASE_KEYWORDS, ...extraKeywords].filter(Boolean);
  return Array.from(new Set(merged)).join(", ");
}

export function setSeoMeta({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  keywords = getSeoKeywords(),
  path = "/"
}) {
  document.title = title;

  const origin = window.location?.origin || "";
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = `${origin}${normalizedPath}`;
  const logoUrl = `${origin}${LOGO_PATH}`;

  upsertMeta("name", "description", description);
  upsertMeta("name", "keywords", keywords);
  upsertMeta("name", "robots", "index, follow");

  upsertMeta("property", "og:type", "website");
  upsertMeta("property", "og:site_name", SITE_NAME);
  upsertMeta("property", "og:title", title);
  upsertMeta("property", "og:description", description);
  upsertMeta("property", "og:url", canonicalUrl);
  upsertMeta("property", "og:image", logoUrl);

  upsertMeta("name", "twitter:card", "summary_large_image");
  upsertMeta("name", "twitter:title", title);
  upsertMeta("name", "twitter:description", description);
  upsertMeta("name", "twitter:image", logoUrl);

  upsertCanonical(canonicalUrl);

  upsertJsonLd("sky-hostel-org-ld", {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    alternateName: SITE_ALT_NAME,
    url: origin || canonicalUrl,
    logo: logoUrl
  });

  upsertJsonLd("sky-hostel-site-ld", {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: SITE_ALT_NAME,
    url: origin || canonicalUrl
  });
}



