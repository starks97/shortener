import { MetaDictionary } from "~/interfaces";
const metaDictionary: MetaDictionary = {
  workspace: () => ({
    title: "ByteTrim - Manage Your Workspace Effortlessly",
    description:
      "ByteTrim is a fast and reliable URL shortener service that helps you manage and track your links with ease in your workspace. Simplify your links and improve your online presence.",
    keywords: "link shortener, workspace management, short links",
    author: "ByteTrim Team",
    viewport: "width=device-width, initial-scale=1",
    ogTitle: "ByteTrim - Manage Your Workspace Effortlessly",
    ogDescription:
      "Simplify and track your URLs with ByteTrim, the ultimate link management tool for your workspace.",
    ogUrl: "https://bytetrim.com/workspace",
    ogType: "website",
    ogImage: "https://bytetrim.com/workspace-preview.jpg", // Replace with the actual preview image URL
    twitterCard: "summary_large_image",
    twitterTitle: "ByteTrim - Manage Your Workspace Effortlessly",
    twitterDescription:
      "ByteTrim is a reliable URL shortener for simplifying and tracking your links in your workspace. Perfect for businesses and individuals.",
    twitterImage: "https://bytetrim.com/workspace-preview.jpg", // Replace with the actual Twitter image URL
  }),
  home: () => ({
    title: "ByteTrim - Shorten Your URLs Effortlessly",
    description:
      "ByteTrim is a fast and reliable URL shortener service that helps you manage and track your links with ease. Simplify your links and improve your online presence.",
    keywords: "link shortener, link management, short links",
    author: "ByteTrim Team",
    viewport: "width=device-width, initial-scale=1",
    ogTitle: "ByteTrim - Shorten Your URLs Effortlessly",
    ogDescription:
      "Simplify and track your URLs with ByteTrim, the ultimate link management tool.",
    ogUrl: "https://bytetrim.com",
    ogType: "website",
    ogImage: "https://bytetrim.com/preview-image.jpg", // Replace with the actual preview image URL
    twitterCard: "summary_large_image",
    twitterTitle: "ByteTrim - Shorten Your URLs Effortlessly",
    twitterDescription:
      "ByteTrim is a reliable URL shortener for simplifying and tracking your links. Perfect for businesses and individuals.",
    twitterImage: "https://bytetrim.com/preview-image.jpg", // Replace with the actual Twitter image URL
  }),
  workspace_id: (id: string | undefined) => ({
    title: `ByteTrim Workspace - ${id}`,
    description: `Manage and track your links in Workspace ${id} on ByteTrim.`,
    keywords: `workspace ${id}, link management, tracking links`,
    author: "ByteTrim Team",
    viewport: "width=device-width, initial-scale=1",
    ogTitle: `ByteTrim Workspace - ${id}`,
    ogDescription: `Easily manage and monitor your links in Workspace ${id} on ByteTrim.`,
    ogUrl: `https://bytetrim.com/workspace/${id}`,
    ogType: "website",
    ogImage: "https://bytetrim.com/preview-image.jpg",
    twitterCard: "summary",
    twitterTitle: `ByteTrim Workspace - ${id}`,
    twitterDescription: `Manage and track your links in Workspace ${id} on ByteTrim.`,
    twitterImage: "https://bytetrim.com/preview-image.jpg",
  }),
  register: () => ({
    title: "ByteTrim - Register for a New Account",
    description:
      "Join ByteTrim today to start managing and shortening your URLs effortlessly. Create your account and improve your online presence.",
    keywords: "register, sign up, create account",
    author: "ByteTrim Team",
    viewport: "width=device-width, initial-scale=1",
    ogTitle: "ByteTrim - Register for a New Account",
    ogDescription:
      "Sign up for ByteTrim and start managing and shortening your URLs. It's fast, reliable, and easy to use.",
    ogUrl: "https://bytetrim.com/register",
    ogType: "website",
    ogImage: "https://bytetrim.com/register-preview.jpg", // Replace with the actual preview image URL
    twitterCard: "summary_large_image",
    twitterTitle: "ByteTrim - Register for a New Account",
    twitterDescription:
      "Create an account on ByteTrim and simplify your links. Start managing your URLs today.",
    twitterImage: "https://bytetrim.com/register-preview.jpg", // Replace with the actual Twitter image URL
  }),
  login: () => ({
    title: "ByteTrim - Log In to Your Account",
    description:
      "Log in to your ByteTrim account and start managing your shortened URLs. Access all your link management features in one place.",
    keywords: "sign in, link management, URL shortener",
    author: "ByteTrim Team",
    viewport: "width=device-width, initial-scale=1",
    ogTitle: "ByteTrim - Log In to Your Account",
    ogDescription:
      "Access your ByteTrim account and manage your links with ease. Log in now to continue shortening and tracking your URLs.",
    ogUrl: "https://bytetrim.com/login",
    ogType: "website",
    ogImage: "https://bytetrim.com/login-preview.jpg", // Replace with the actual preview image URL
    twitterCard: "summary_large_image",
    twitterTitle: "ByteTrim - Log In to Your Account",
    twitterDescription:
      "Log in to ByteTrim to manage your URLs and track your link performance. It's fast and simple.",
    twitterImage: "https://bytetrim.com/login-preview.jpg", // Replace with the actual Twitter image URL
  }),
  about: () => ({
    title: "About ByteTrim - The Ultimate URL Shortener",
    description:
      "Learn more about ByteTrim, a powerful URL shortener and link management tool that helps you track and organize your URLs efficiently.",
    keywords: "about, ByteTrim, URL shortener, link management, tracking links",
    author: "ByteTrim Team",
    viewport: "width=device-width, initial-scale=1",
    ogTitle: "About ByteTrim - The Ultimate URL Shortener",
    ogDescription:
      "ByteTrim is a reliable and efficient URL shortener that helps individuals and businesses manage and track their links.",
    ogUrl: "https://bytetrim.com/about",
    ogType: "website",
    ogImage: "https://bytetrim.com/about-preview.jpg", // Replace with the actual preview image URL
    twitterCard: "summary_large_image",
    twitterTitle: "About ByteTrim - The Ultimate URL Shortener",
    twitterDescription:
      "ByteTrim is the easiest way to shorten, manage, and track your URLs. Learn more about us here.",
    twitterImage: "https://bytetrim.com/about-preview.jpg", // Replace with the actual Twitter image URL
  }),
  pricing: () => ({
    title: "ByteTrim - Pricing Plans",
    description:
      "Explore ByteTrim's pricing plans and choose the best option for managing and shortening your links. Affordable and reliable URL management for businesses and individuals.",
    keywords:
      "pricing, URL shortener, link management, link shortening service",
    author: "ByteTrim Team",
    viewport: "width=device-width, initial-scale=1",
    ogTitle: "ByteTrim - Pricing Plans",
    ogDescription:
      "Choose the best pricing plan for your needs and get started with ByteTrim to manage and track your links efficiently.",
    ogUrl: "https://bytetrim.com/pricing",
    ogType: "website",
    ogImage: "https://bytetrim.com/pricing-preview.jpg", // Replace with the actual preview image URL
    twitterCard: "summary_large_image",
    twitterTitle: "ByteTrim - Pricing Plans",
    twitterDescription:
      "Explore ByteTrim's pricing plans for link management, from affordable options to premium features for businesses and individuals.",
    twitterImage: "https://bytetrim.com/pricing-preview.jpg", // Replace with the actual Twitter image URL
  }),
};

export default metaDictionary;
