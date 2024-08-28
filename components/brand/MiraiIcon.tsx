import React from "react";

interface MiraiIconProps {
  width?: number;
  height?: number;
  fill?: string;
}

export const MiraiIcon: React.FC<MiraiIconProps> = ({
  width = 64,
  height = 64,
  fill = "black",
}) => {
  return (
    <svg width={width} height={height} viewBox="0 0 276.562 209.806" fill={fill} xmlns="http://www.w3.org/2000/svg">
      <path d="M29.6768 209.806L0 136.09L54.3021 0H109.236L138.281 72.2979L167.326 0H221.628L276.562 136.563L246.885 209.806H192.583L138.281 73.7155L83.9789 209.806H29.6768Z" />
    </svg>
  );
};
