import React from "react";

export default function WithoutLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <main>
        {children}
      </main>
          
     
    );
  }
  