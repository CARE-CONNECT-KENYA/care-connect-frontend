import HomeCategories from "./Components/HomeCategories";
import HomeFaeturedlist from "./Components/HomeFaeturedlist";
import HomeHeader from "./Components/HomeHeader";
import HomeRegister from "./Components/HomeRegister";
export default function Home() {
  return (
    <div>
      <div className= "mb-14">
         <HomeHeader  />
      </div>
      
      <div className="mb-14">
        <HomeCategories />
      </div>

      <div>
        <HomeFaeturedlist />
      </div>
      <div>
        <HomeRegister />
      </div>
      
      

    </div>
   
  );
}
