import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - JustiFi",
  description: "Get in touch with JustiFi for support, partnerships, or general inquiries.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
