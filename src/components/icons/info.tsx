interface InfoIconProps {
  size: number;
  color: string;
}

export function InfoIcon({ size, color }: InfoIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 33 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M32.8501 12.19H31.3301V19.81H32.8501V12.19Z" fill={color} />
      <path d="M31.33 19.81H29.8V22.86H31.33V19.81Z" fill={color} />
      <path d="M31.33 9.14H29.8V12.19H31.33V9.14Z" fill={color} />
      <path d="M29.8002 22.86H28.2802V25.9H29.8002V22.86Z" fill={color} />
      <path d="M29.8002 6.09H28.2802V9.14H29.8002V6.09Z" fill={color} />
      <path d="M28.2801 25.9H26.7501V27.43H28.2801V25.9Z" fill={color} />
      <path d="M28.2801 4.57H26.7501V6.09H28.2801V4.57Z" fill={color} />
      <path d="M26.7501 27.43H23.7101V28.95H26.7501V27.43Z" fill={color} />
      <path d="M26.7501 3.05H23.7101V4.57H26.7501V3.05Z" fill={color} />
      <path d="M23.7102 28.95H20.6602V30.48H23.7102V28.95Z" fill={color} />
      <path
        d="M22.1801 6.09H20.6601V4.57H13.0401V6.09H11.5201V7.62H9.99011V12.19H13.0401V9.14H14.5601V7.62H17.6101V9.14H19.1401V12.19H17.6101V13.71H16.0901V15.24H14.5601V18.29H19.1401V16.76H20.6601V15.24H22.1801V13.71H23.7101V7.62H22.1801V6.09Z"
        fill={color}
      />
      <path d="M23.7102 1.52H20.6602V3.05H23.7102V1.52Z" fill={color} />
      <path d="M20.66 30.48H13.04V32H20.66V30.48Z" fill={color} />
      <path
        d="M19.14 19.81H14.56V21.33H13.04V25.9H14.56V27.43H19.14V25.9H20.66V21.33H19.14V19.81Z"
        fill={color}
      />
      <path d="M20.66 0H13.04V1.52H20.66V0Z" fill={color} />
      <path d="M13.0401 28.95H9.99011V30.48H13.0401V28.95Z" fill={color} />
      <path d="M13.0401 1.52H9.99011V3.05H13.0401V1.52Z" fill={color} />
      <path d="M9.99006 27.43H6.94006V28.95H9.99006V27.43Z" fill={color} />
      <path d="M9.99006 3.05H6.94006V4.57H9.99006V3.05Z" fill={color} />
      <path d="M6.94004 25.9H5.42004V27.43H6.94004V25.9Z" fill={color} />
      <path d="M6.94004 4.57H5.42004V6.09H6.94004V4.57Z" fill={color} />
      <path d="M5.42015 22.86H3.90015V25.9H5.42015V22.86Z" fill={color} />
      <path d="M5.42015 6.09H3.90015V9.14H5.42015V6.09Z" fill={color} />
      <path d="M3.90012 19.81H2.37012V22.86H3.90012V19.81Z" fill={color} />
      <path d="M3.90012 9.14H2.37012V12.19H3.90012V9.14Z" fill={color} />
      <path d="M2.3701 12.19H0.850098V19.81H2.3701V12.19Z" fill={color} />
    </svg>
  );
}
