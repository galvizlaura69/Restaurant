import React from "react";
import { Wrapper } from "@/components";
import page from '../../assets/page.jpg';
import { FaRegHandshake } from "react-icons/fa";


export const Restaurant: React.FC = () => {

  return (
    <Wrapper className="w-full ">
      <h2 className='text-white text-3xl font-bold py-4 pr-4 text-right bg-red-900'>
        Bienvenid@
        <FaRegHandshake className="inline-block ml-2" />
      </h2>
      <div className="flex justify-center text-center pt-8 w-[800px] m-auto">
        <img src={page} alt="icon" className="mt-4" />
      </div>
    </Wrapper>
  );
};
