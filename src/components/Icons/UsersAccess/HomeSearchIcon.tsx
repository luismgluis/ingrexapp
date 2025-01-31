import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: link, style */
const HomeSearchIcon: React.FC<SvgProps> = (props) => {
  const color = props.color || "#818181";
  return (
    <Svg width={406.99} height={406.99} viewBox="0 0 406.99 468.15" {...props}>
      <Path
        d="M406.82 156.43a28 28 0 00-11.2-19.19L220 5.5a27.45 27.45 0 00-33 0L11.37 137.23A27.76 27.76 0 002 169.76 27.47 27.47 0 0027.49 187H32v212.52A43.62 43.62 0 0075.49 443h199.75a11.69 11.69 0 0011.63-9.81A11.51 11.51 0 00275.49 420h-200A20.55 20.55 0 0155 399.51V187h297v204.26a11.67 11.67 0 009.81 11.63A11.51 11.51 0 00375 391.51V187h4.5a27.49 27.49 0 0027.33-30.58zm-23 4.43v.14a4.32 4.32 0 01-4.15 3H27.72a4.68 4.68 0 01-4.37-2.69 4.53 4.53 0 011.44-5.41l176-132a4.5 4.5 0 015.41 0L382.25 156a4.27 4.27 0 011.53 4.86z"
        fill={color}
      />
      <Path
        d="M193.93 232.52a9.84 9.84 0 00-8-2.22 58 58 0 00-47.65 47.7 9.82 9.82 0 002.22 8 10 10 0 007.66 3.55 9.88 9.88 0 009.84-8.22A38 38 0 01189.27 250a9.87 9.87 0 008.22-9.83 10 10 0 00-3.56-7.65z"
        fill={color}
      />
      <Path
        d="M293.56 346.69a11.47 11.47 0 00-8.13-3.37 11.43 11.43 0 00-8.13 3.37l-3.18 3.18-6.34-6.33a91.26 91.26 0 0017.49-73.82 92.25 92.25 0 00-47.7-63.72 90.12 90.12 0 00-98.39 9 92.21 92.21 0 00-35.38 71.29 91.6 91.6 0 00147.71 73.53l6.34 6.33-3.18 3.19a11.41 11.41 0 00-3.37 8.12 11.43 11.43 0 003.37 8.13l79.2 79.2a11.49 11.49 0 0016.26 0l22.63-22.62a11.5 11.5 0 000-16.27zM264 287.51a68.68 68.68 0 01-68.5 68.5 68.5 68.5 0 01-1.65-137h1.66a68.49 68.49 0 0168.49 68.5zM348.36 434l-6.36 6.38-62.93-62.93 6.36-6.36z"
        fill={color}
      />
    </Svg>
  );
};
export default HomeSearchIcon;
