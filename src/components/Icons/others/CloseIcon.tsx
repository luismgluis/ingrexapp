import * as React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: link, style */
const CloseIcon: React.FC<SvgProps> = (props) => {
  const color = props.color || "#818181";
  return (
    <Svg viewBox="0 0 329.26933 329" {...props}>
      <G fill={color}>
        <Path
          d="M21.34 329.398c-5.461 0-10.926-2.09-15.082-6.25-8.344-8.34-8.344-21.824 0-30.164L292.848 6.391c8.34-8.34 21.824-8.34 30.164 0 8.343 8.34 8.343 21.824 0 30.164L36.422 323.148a21.231 21.231 0 01-15.082 6.25zm0 0"
          data-original={color}
        />
        <Path
          d="M307.93 329.398c-5.461 0-10.922-2.09-15.082-6.25L6.258 36.555c-8.344-8.34-8.344-21.825 0-30.164 8.34-8.34 21.82-8.34 30.164 0l286.59 286.593c8.343 8.34 8.343 21.825 0 30.164-4.16 4.18-9.621 6.25-15.082 6.25zm0 0"
          data-original={color}
        />
      </G>
    </Svg>
  );
};
export default CloseIcon;
