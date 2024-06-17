import React from 'react';
import {Button} from "react-bootstrap";


export default function SummaryCard({icon, title, value, variant, callback}) {
  const variants = {
    1: {
      bgcolor: "variant-1-bg-color",
      iconColors: "variant-1-fg-color text-white",
      btnbg: "btn-color-1",
      titleColor: "text-white",
      valueColor: "text-white-50",
    },
    2: {
      bgcolor: "variant-2-bg-color",
      iconColors: "variant-2-fg-color text-white",
      btnbg: "btn-color-3",
      titleColor: "text-white",
      valueColor: "text-white-50",
    },
  }
  return (
      <div className={`p-4 rounded-3 ${variants[variant].bgcolor}`}>
        <div className="d-flex justify-content-between">
          {React.cloneElement(icon, { className: `p-2 fs-1 rounded-3 ${variants[variant].iconColors}` })}
          <Button onClick={callback} className={`border-0 fw-semibold ${variants[variant].btnbg}`}>Detalhes</Button>
        </div>
        <p className={`fs-3 poppins fw-semibold mt-3 mb-1 ${variants[variant].titleColor}`}>{value}</p>
        <p className={`fs-5 poppins mb-0 fw-semibold ${variants[variant].valueColor}`}>{title}</p>
      </div>
  );
}