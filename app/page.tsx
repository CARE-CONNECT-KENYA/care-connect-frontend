import HomeCategories from "./Components/HomeCategories";
import HomeHeader from "./Components/HomeHeader";
export default function Home() {
  return (
    <div>
      <div className= "mb-14">
         <HomeHeader  />
      </div>
      
      <div>
        <HomeCategories />
      </div>
      
      

    </div>
   
  );
}
