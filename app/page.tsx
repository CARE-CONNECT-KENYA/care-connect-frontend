import HomeCategories from "./Components/HomeCategories";
import HomeFaeturedlist from "./Components/HomeFaeturedlist";
import HomeHeader from "./Components/HomeHeader";
import HomeRegister from "./Components/HomeRegister";
import HomeSearch from "./Components/HomeSearch";


export default function Home() {
  return (
    <div>
        <div className= "mb-14">
          <HomeHeader  />
        </div>
        
        <div className="mb-14">
          <HomeCategories />
        </div>

        <div className="mb-14">
          <HomeFaeturedlist  />
        </div>

        <div className="mb-14">
          <HomeSearch />
        </div>

        <div className="mb-14">
          <HomeRegister />
        </div>
      
    </div>
   
  );
}
