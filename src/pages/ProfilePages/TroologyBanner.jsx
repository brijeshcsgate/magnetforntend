export default function TroologyBanner(){
  return(
    <>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400">
  <defs>
    <radialGradient id="bg-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
      <stop offset="0%" style="stop-color:#ff6666;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#ff0000;stop-opacity:1" />
      <animate attributeName="fx" values="25%;75%;25%" dur="10s" repeatCount="indefinite" />
      <animate attributeName="fy" values="25%;75%;25%" dur="10s" repeatCount="indefinite" />
    </radialGradient>
  </defs>

  <!-- Animated background -->
  <rect width="100%" height="100%" fill="url(#bg-gradient)">
    <animate attributeName="opacity" values="0.8;1;0.8" dur="5s" repeatCount="indefinite" />
  </rect>

  <!-- Floating particles -->
  <g>
    <circle cx="100" cy="100" r="3" fill="#ffcc00">
      <animate attributeName="cy" from="400" to="0" dur="15s" repeatCount="indefinite" />
      <animate attributeName="cx" values="100;120;100" dur="5s" repeatCount="indefinite" />
    </circle>
    <circle cx="700" cy="300" r="2" fill="#ffcc00">
      <animate attributeName="cy" from="400" to="0" dur="12s" repeatCount="indefinite" />
      <animate attributeName="cx" values="700;680;700" dur="4s" repeatCount="indefinite" />
    </circle>
    <circle cx="400" cy="200" r="4" fill="#ffcc00">
      <animate attributeName="cy" from="400" to="0" dur="20s" repeatCount="indefinite" />
      <animate attributeName="cx" values="400;420;400" dur="6s" repeatCount="indefinite" />
    </circle>
  </g>

  <!-- Main text "GITEX GLOBAL" with enhanced animation -->
  <text x="400" y="180" font-family="Arial, sans-serif" font-size="60" fill="none" stroke="white" stroke-width="2" text-anchor="middle">
    GITEX GLOBAL
    <animate attributeName="opacity" from="0" to="1" dur="1s" begin="0s" fill="freeze"/>
    <animate attributeName="y" values="200;180;185;180" dur="5s" begin="1s" repeatCount="indefinite"/>
  </text>

  <!-- Animated outline for "GITEX GLOBAL" -->
  <text x="400" y="180" font-family="Arial, sans-serif" font-size="60" fill="none" stroke="#ffcc00" stroke-width="2" text-anchor="middle" stroke-dasharray="800" stroke-dashoffset="800">
    GITEX GLOBAL
    <animate attributeName="stroke-dashoffset" from="800" to="0" dur="4s" begin="1s" fill="freeze"/>
    <animate attributeName="y" values="200;180;185;180" dur="5s" begin="1s" repeatCount="indefinite"/>
  </text>

  <!-- Subtext with staggered animation -->
  <text x="400" y="250" font-family="Arial, sans-serif" font-size="24" fill="white" text-anchor="middle" opacity="0">
    14 - 18 OCT 2024
    <animate attributeName="opacity" from="0" to="1" dur="2s" begin="2s" fill="freeze"/>
    <animate attributeName="x" values="380;400;420;400" dur="8s" begin="4s" repeatCount="indefinite"/>
  </text>

  <text x="400" y="290" font-family="Arial, sans-serif" font-size="20" fill="white" text-anchor="middle" opacity="0">
    Dubai World Trade Centre
    <animate attributeName="opacity" from="0" to="1" dur="2s" begin="3s" fill="freeze"/>
    <animate attributeName="x" values="420;400;380;400" dur="8s" begin="5s" repeatCount="indefinite"/>
  </text>
</svg>

    </>
  )
}






