
import ShowData from "../components/Dashboard/ShowData";


export const Dashboad = () => {
  return (
    <div class="flex flex-col h-screen p-5">
      <div className="mt-10">
        <h1 class="text-3xl font-bold text-red-800 text-center">
          Welcome to dashboard!
        </h1>
        <p class="text-xl mt-2 text-gray-600 text-center">
          Welcome to attendance checker.
        </p>
      </div>
 
        <ShowData  />
    </div>
   
  );
};
