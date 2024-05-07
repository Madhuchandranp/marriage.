import React from "react";


export default function Actioncmnt( {handleClick,type,className}) {

    return(
        <div className={className} onClick={handleClick}>
            {type}
        </div>
    );
};
