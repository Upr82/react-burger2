import React from "react";
import { useSelector } from "react-redux";


const ApiResult = () => {

  const getText = (state: any) => state.portal.text;
  const text: string = useSelector(getText);

  return (
    <>
      <p className='mt-10 text text_type_main-large'>
        {text}
      </p>
    </>
  )
}

export default ApiResult;
