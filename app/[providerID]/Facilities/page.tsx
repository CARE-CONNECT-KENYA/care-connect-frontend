// pages/facilities/[providerID].js

import Facilities from "../../Components/ui/facility";
import { GetServerSideProps } from "next";

interface Provider {
    params: {
        providerID: string;
      };
}

const Page = async ({ params }: Provider) => {
    const providerID = parseInt(params.providerID);
    return (
      <main>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Facilities</h3>
            <p className="text-sm text-muted-foreground">
              List of facilities for the provider.
            </p>
          </div>
          
          <div className="">
            <Facilities providerID={providerID} />
          </div>
        </div>
      </main>
    );
  }
  
  export default Page;