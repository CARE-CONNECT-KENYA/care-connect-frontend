import HomeCategories from "./Components/HomeCategories";
import HomeFaeturedlist from "./Components/HomeFaeturedlist";
import HomeHeader from "./Components/HomeHeader";
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
      
      

    </div>
   
  );
}
