import * as React from "react";

function SvgComponent(props) {
  return (
    <svg data-name="Layer 1" viewBox="0 0 1025.78 991.71" {...props}>
      <path
        d="M385.07.5C172.68.5.5 172.68.5 385.07s172.18 384.58 384.57 384.58 384.58-172.18 384.58-384.58S597.47.5 385.07.5zm0 656.51c-150.18 0-271.93-121.75-271.93-271.94s121.75-271.93 271.93-271.93S657.01 234.9 657.01 385.07 535.26 657.01 385.07 657.01z"
        stroke="#000"
        strokeMiterlimit={10}
      />
      <path
        d="M572.771 657.07l81.678-81.678a10 10 0 0114.142 0l353.886 353.885a10 10 0 010 14.142l-19.092 19.092a98.52 98.52 0 01-139.328 0L572.75 671.204a10 10 0 010-14.142z"
        strokeWidth={0.81}
        stroke="#000"
        strokeMiterlimit={10}
      />
    </svg>
  );
}

export default SvgComponent;
