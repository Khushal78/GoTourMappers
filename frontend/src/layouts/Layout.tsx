import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Hero from "../Components/Hero";
import SearchBar from "../Components/SearchBar";

interface Props{
    children: React.ReactNode;

}

const Layout = ({children}:Props) => {
  return (
    <div className = "fles flex-col min-h-screen">
        <Header/>
        <Hero/>
        <div className="container mx-auto">
          <SearchBar/>
        </div>
        <div className="container mx-auto py-10 flex-1">
            {children}
        </div>
        <Footer/>
    </div>
  );
};

export default Layout;