import React from 'react';
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

export default function OrderCard({itemName, userName, value}) {

  return (
      <div className="py-2 px-3 rounded-2 mb-2 bg-color-1-gradient">
        <div className="justify-content-between d-flex">
          <p className="text-black-50 poppins text-truncate mb-2">
            {itemName}
          </p>
          <p className="text-success fw-semibold poppins mb-2">
            <ArrowDropUpIcon/>
            R$ {value}
          </p>
        </div>
        <p className="text-black roboto text-xs d-flex align-items-center">
          <PersonOutlineIcon/>
          {userName}
        </p>
      </div>
  );
}