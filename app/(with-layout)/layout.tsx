import Footer from "../Footer";
import NavBar from "../NavBar";


export default function WithLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
  
        <main>
          <NavBar/>
          {children}
          <Footer/>
        
        </main>
     
       
     
    );
  }
  