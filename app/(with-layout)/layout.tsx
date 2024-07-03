import Footer from "../Footer";
import NavBar from "../NavBar";


export default function WithLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="en">
        <body>
        <NavBar/>
          {children}
          <Footer/>
        </body>
      </html>
    );
  }
  