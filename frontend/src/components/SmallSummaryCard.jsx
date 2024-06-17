import React from 'react';


export default function SmallSummaryCard({icon, title, value, variant, callback}) {
  const variants = {
    1: {
      bgcolor: "variant-1-bg-color",
      iconColors: "variant-1-fg-color text-white",
      titleColor: "text-white-50",
      valueColor: "text-white",
    },
    2: {
      bgcolor: "variant-2-bg-color",
      iconColors: "variant-2-fg-color text-white",
      titleColor: "text-white-50",
      valueColor: "text-white",
    },
    3: {
      bgcolor: "variant-3-bg-color",
      iconColors: "variant-3-fg-color text-white",
      titleColor: "text-black-50",
      valueColor: "text-black",
    },
  }
  return (
      <div className={`bg-color-4 p-3 rounded-4 d-flex justify-content-between ${variants[variant].bgcolor}`}>
        {React.cloneElement(icon, {className: `my-auto p-2 fs-2 rounded-3 ${variants[variant].iconColors}`})}
        <div>
          <p className={`mb-0 fw-semibold poppins text-end ${variants[variant].valueColor}`}>{value}</p>
          <p className={`mb-0 text-sm roboto ${variants[variant].titleColor}`}>{title}</p>
        </div>
      </div>
  );
}