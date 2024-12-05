interface ToxicityIconProps {
  color: string;
  size: number;
}

export function ToxicityIcon({ color, size }: ToxicityIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M47.8125 16.8516H45.4219V31.1484H47.8125V16.8516Z"
        fill={color}
      />
      <path
        d="M45.4219 31.1484H43.0469V35.8984H45.4219V31.1484Z"
        fill={color}
      />
      <path
        d="M45.4219 12.1016H43.0469V16.8516H45.4219V12.1016Z"
        fill={color}
      />
      <path
        d="M43.0469 35.8984H40.6719V40.6641H43.0469V35.8984Z"
        fill={color}
      />
      <path
        d="M43.0469 7.33594H40.6719V12.1016H43.0469V7.33594Z"
        fill={color}
      />
      <path
        d="M40.6719 40.6641H35.9062V43.0547H40.6719V40.6641Z"
        fill={color}
      />
      <path
        d="M38.2813 12.1016H35.9063V9.71094H33.5156V12.1016H31.1406V14.4766H28.7656V19.2422H31.1406V24.0078H40.6719V14.4766H38.2813V12.1016Z"
        fill={color}
      />
      <path
        d="M40.6719 4.94531H35.9062V7.33594H40.6719V4.94531Z"
        fill={color}
      />
      <path
        d="M35.9063 43.0547H31.1406V45.4297H35.9063V43.0547Z"
        fill={color}
      />
      <path
        d="M35.9063 2.57031H31.1406V4.94531H35.9063V2.57031Z"
        fill={color}
      />
      <path
        d="M31.1406 33.5234H28.7656V31.1484H19.2344V33.5234H16.8594V35.8984H14.4688V38.2891H16.8594V40.6641H31.1406V38.2891H33.5156V35.8984H31.1406V33.5234Z"
        fill={color}
      />
      <path
        d="M31.1406 45.4297H16.8594V47.8047H31.1406V45.4297Z"
        fill={color}
      />
      <path
        d="M19.2344 26.3828H21.625V28.7578H26.375V26.3828H28.7656V21.6172H26.375V19.2422H21.625V21.6172H19.2344V26.3828Z"
        fill={color}
      />
      <path
        d="M31.1406 0.195312H16.8594V2.57031H31.1406V0.195312Z"
        fill={color}
      />
      <path
        d="M16.8594 43.0547H12.0938V45.4297H16.8594V43.0547Z"
        fill={color}
      />
      <path
        d="M16.8594 19.2422H19.2344V14.4766H16.8594V12.1016H14.4687V9.71094H12.0938V12.1016H9.71875V14.4766H7.32812V24.0078H16.8594V19.2422Z"
        fill={color}
      />
      <path
        d="M16.8594 2.57031H12.0938V4.94531H16.8594V2.57031Z"
        fill={color}
      />
      <path
        d="M12.0938 40.6641H7.32812V43.0547H12.0938V40.6641Z"
        fill={color}
      />
      <path
        d="M12.0938 4.94531H7.32812V7.33594H12.0938V4.94531Z"
        fill={color}
      />
      <path
        d="M7.32812 35.8984H4.95312V40.6641H7.32812V35.8984Z"
        fill={color}
      />
      <path
        d="M7.32812 7.33594H4.95312V12.1016H7.32812V7.33594Z"
        fill={color}
      />
      <path d="M4.95312 31.1484H2.5625V35.8984H4.95312V31.1484Z" fill={color} />
      <path d="M4.95312 12.1016H2.5625V16.8516H4.95312V12.1016Z" fill={color} />
      <path d="M2.5625 16.8516H0.1875V31.1484H2.5625V16.8516Z" fill={color} />
    </svg>
  );
}
