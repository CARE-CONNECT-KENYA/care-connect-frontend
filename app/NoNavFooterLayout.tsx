// components/NoNavFooterLayout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "No Nav Footer Layout",
  description: "A layout without navigation and footer",
};

export default function NoNavFooterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
 
      <section>
            {children}
     </section>
  
  );
}
