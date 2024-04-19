import React from 'react'
import notfound from "/404.gif";
function NoTfound() {
  return (
    <div className="bg-[#09001F] w-screen h-screen flex justify-center items-center bg-black">
      <img className="h-[50%] object-cover " src={notfound} alt="" />
    </div>
  );
}

export default NoTfound
