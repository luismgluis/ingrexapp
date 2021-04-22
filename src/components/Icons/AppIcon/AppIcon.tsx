import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const AppIcon: React.FC<SvgProps> = (props) => {
  const blue = "#cdd6e2"; //"#002345"; //"#033c59";
  const contrast = "#00112E"; //"#D55F00"; //"#f5a302";
  return (
    <Svg viewBox="0 0 500 500" {...props}>
      <Path fill="none" d="M0 0H500V500H0z" />
      <Path
        d="M236.32 195.76l73.61 19.76a5.29 5.29 0 004-.73l50.76-29.91a5.23 5.23 0 001.82-7.07l-28.65-51.12a5.59 5.59 0 00-3.26-2.54L66.63 52.36A5.21 5.21 0 0060.29 56l-21.94 81.4a5.35 5.35 0 003.81 6.35l69.43 18.67a4.71 4.71 0 003.81-.54l70-39.16c5.44-3.08 8 3.44 9.79 6.34l38.07 64.36 3.08 2.36z"
        fill={blue}
        fillRule="evenodd"
      />
      <Path
        d="M307.75 232.56L288 306a5 5 0 00.54 4l30.1 50.76a5.28 5.28 0 007.07 2l51.12-28.82 2.54-3.08 71.78-267.99a5.29 5.29 0 00-3.81-6.52l-81.22-21.76a5.41 5.41 0 00-6.52 3.63l-18.49 69.43a6.07 6.07 0 00.36 4l39.34 70c2.9 5.25-3.45 8-6.35 9.6l-64.35 38.05a4.7 4.7 0 00-2.36 3.26z"
        fill={blue}
        fillRule="evenodd"
      />
      <Path
        d="M269.86 303.62l-73.42-19.76a5.55 5.55 0 00-4.17.55l-50.58 30.09a5.29 5.29 0 00-2 7.07l28.83 51.13a5.26 5.26 0 003.08 2.53l268 71.79a5.31 5.31 0 006.52-3.62l21.71-81.4a5.2 5.2 0 00-3.81-6.35L394.77 337a5.1 5.1 0 00-4 .55l-70 39.15c-5.25 3.09-8-3.44-9.61-6.34L273.12 306a4.88 4.88 0 00-3.26-2.36z"
        fill={blue}
        fillRule="evenodd"
      />
      <Path
        d="M199.88 266.1l19.58-73.43a5.56 5.56 0 00-.54-4.16L189 137.93a5.33 5.33 0 00-7.07-2l-51.3 28.83a5.1 5.1 0 00-2.54 3.26L56.3 435.78a5.34 5.34 0 003.63 6.53l81.4 21.76a5.46 5.46 0 006.52-3.81L166.34 391a5.1 5.1 0 00-.54-4l-39.16-70c-2.9-5.26 3.45-7.8 6.35-9.61l64.35-38.07 2.54-3.26z"
        fill={blue}
        fillRule="evenodd"
      />
      <Path
        d="M197.34 269.36L133 307.43c-2.9 1.81-9.25 4.35-6.35 9.61l39.16 70a5.1 5.1 0 01.54 4l4.35-16.14a6.26 6.26 0 01-2.17-2.17L139.7 321.6a5.29 5.29 0 012-7.07l50.58-30.09a5.25 5.25 0 012.9-.73l4.71-17.58-2.54 3.26zM189 137.93l29.92 50.58a5.11 5.11 0 01.72 2.71l16.68 4.54-3.08-2.36-38.07-64.4c-1.81-2.9-4.35-9.42-9.79-6.34l-70 39.16a5.05 5.05 0 01-3.62.54l16.67 4.53a6.29 6.29 0 012.18-2.17l51.3-28.83a5.33 5.33 0 017.07 2zM364.67 184.88l-50.76 29.91a6.34 6.34 0 01-1.63.73l-4.53 17a4.85 4.85 0 012.36-3.26l64.35-38.08c2.9-1.63 9.25-4.35 6.35-9.6l-39.34-70a5.2 5.2 0 01-.54-3.26l-4.54 16.67a4.26 4.26 0 011.45 1.64l28.65 51.12a5.23 5.23 0 01-1.82 7.07zM318.63 360.73L288.53 310a2.54 2.54 0 01-.54-1.63l-18.13-4.72a4.88 4.88 0 013.26 2.36l38.07 64.36c1.64 2.9 4.36 9.43 9.61 6.34l70-39.15a5.1 5.1 0 014-.55l-16.86-4.53-1.09 1.45-51.15 28.79a5.28 5.28 0 01-7.07-2z"
        fill={contrast}
        fillRule="evenodd"
      />
    </Svg>
  );
};

export default AppIcon;
