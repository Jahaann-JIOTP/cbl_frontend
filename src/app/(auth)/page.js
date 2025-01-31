import Div from "@/components/Div";
import LoginForm from "@/components/LoginForm";
import Link from "next/link";


export default function Home() {
  return (
    <main className=''>
      {/* <Link href="/custom_dashboard">
        <button className="bg-[#f33b3b] text-white p-2 rounded-lg mt-[95px] fixed right-16 top-0">
          + Create Dashboard
        </button>
      </Link> */}

      <div className="">
        {/* <Div title={"Today"} height={'130px'} length={"lg:w-[23.6%] xl:w-[23.6%]"}></Div>
        <Div title={"Weekly"} height={'130px'} length={"lg:w-[23.6%] xl:w-[23.6%]"}></Div>
        <Div title={"Monthly"} height={'130px'} length={"lg:w-[23.6%] xl:w-[23.6%]"}></Div>
        <Div title={"Yearly"} height={'130px'} length={"lg:w-[23.6%] xl:w-[23.6%] mr-0"}></Div>
        <Div title={"Live Energy Consumption"} height={'300px'} length={"lg:w-[31.9%] xl:w-[32.4%]"}></Div>
        <Div title={"Live Power"} height={'300px'} length={"lg:w-[63.8%] xl:w-[63.8%]"}></Div>
        <Div title={"Pie Chart"} height={'300px'}></Div>
        <Div title={"Donut Chart"} height={'300px'} length={"lg:w-[50.3%] xl:w-[50.3%]"}></Div> */}

        <LoginForm />
      </div>
    </main>
  );
}
