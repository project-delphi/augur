import React from 'react';

// NOTE -- This stateless component is simply a responsive SVG of the Complete Augur Icon
// To employ, just set the width or height on the containing element and this SVG will respond appropriately
const AugurLogoIcon = () => (
  <svg
    className="augur-logo-icon"
    viewBox="0 0 62 43"
  >
    <g
      transform="translate(0.000000,43.000000) scale(0.100000,-0.100000)" fill="#c0c0c0" stroke="none"
    >
      <path
        d="M145 409 c-86 -32 -135 -103 -135 -194 0 -99 55 -170 151 -196 41 -11 119 -6 119 8 0 3 -15 23 -34 44 -75 82 -74 207 1 290 20 22 34 42 31 45 -11 11 -105 13 -133 3z m85 -21 c0 -6 -6 -19 -14 -27 -20 -23 -46 -106 -46 -149 0 -54 17 -107 45 -141 32 -37 31 -41 -4 -41 -35 0 -137 52 -134 69 2 6 -1 11 -7 11 -18 0 -40 58 -40 105 0 55 28 115 67 141 56 38 133 57 133 32z"
      />
      <path
        d="M323 396 c-77 -36 -108 -88 -108 -182 0 -64 3 -77 30 -115 100 -141 322 -101 364 66 16 63 15 65 -29 65 -22 0 -40 -4 -40 -10 0 -5 13 -10 29 -10 27 0 29 -2 22 -33 -11 -46 -26 -71 -61 -100 -91 -77 -228 -50 -279 55 -27 56 -27 110 0 166 52 106 192 131 284 50 48 -41 60 -25 13 17 -63 59 -142 69 -225 31z"
      />
      <path
        d="M305 338 c-51 -40 -72 -137 -41 -196 20 -39 61 -74 82 -70 9 1 28 23 41 48 33 60 29 150 -7 204 -29 42 -38 44 -75 14z m45 -18 c39 -21 52 -117 23 -177 -26 -56 -44 -54 -86 7 -25 37 -22 98 8 143 28 41 29 41 55 27z"
      />
      <path
        d="M480 226 c0 -2 11 -6 25 -8 14 -3 25 -1 25 3 0 5 -11 9 -25 9 -14 0 -25 -2 -25 -4z"
      />
    </g>
  </svg>
);

export default AugurLogoIcon;
