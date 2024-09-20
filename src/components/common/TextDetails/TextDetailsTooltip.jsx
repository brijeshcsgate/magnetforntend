import React from "react";
import "./TextDetailsOne.css";
import DataCharectersTooltip from "@/components/ui/DataCharectersTooltip";
const TextDetailsTooltip = ({ details, title,maxLength }) => {

  return (
    <div className="text-details-one">
      <div className="text-details-title text-lg font-semibold text-gray-secondary">
        {title}
      </div>
      {details.map((detail, index) => (
        <div className="text-detail-box" key={index}>
          <div className={`${detail?.lastText?'text-detail-box-title':'text-detail-box-title2'} text-[13px] leading-5 text-gray-tertiary`}>
            {detail?.title}
          </div>
          <div className={`${detail?.lastText?'text-detail-box-name':'text-detail-box-name2'} text-[13px] leading-5 text-gray-secondary`}>
            {detail?.name.length>=65?
            
            <DataCharectersTooltip text={detail?.name} maxLength={maxLength} />:detail?.name}
          </div>
          {detail?.lastText?
          <div className="text-detail-box-last-text text-[13px] leading-5 text-blue-primary-200 hover:underline cursor-pointer">
            {detail?.lastText}
          </div>:''}
        </div>
      ))}
    </div>
  );
};

export default TextDetailsTooltip;
