interface DaisyIconProps {
  width?: number;
  height?: number;
}

const DaisyIcon: React.FC<DaisyIconProps> = ({ width = 40, height = width }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="15" fill="#FFD700" />
  
  <circle cx="50" cy="50" r="12" fill="#FFEE44" />
  
  <g>
    <path d="M50 25C50 25 42 10 50 5C58 10 60 25 50 25" fill="#FFFFFF" stroke="#EEEEEE" stroke-width="0.5" />
    <path d="M50 25C50 25 42 10 50 5C58 10 60 25 50 25" fill="#FFFFFF" stroke="#EEEEEE" stroke-width="0.5" transform="rotate(22.5 50 50)" />
    <path d="M50 25C50 25 42 10 50 5C58 10 60 25 50 25" fill="#FFFFFF" stroke="#EEEEEE" stroke-width="0.5" transform="rotate(45 50 50)" />
    <path d="M50 25C50 25 42 10 50 5C58 10 60 25 50 25" fill="#FFFFFF" stroke="#EEEEEE" stroke-width="0.5" transform="rotate(67.5 50 50)" />
    <path d="M50 25C50 25 42 10 50 5C58 10 60 25 50 25" fill="#FFFFFF" stroke="#EEEEEE" stroke-width="0.5" transform="rotate(90 50 50)" />
    <path d="M50 25C50 25 42 10 50 5C58 10 60 25 50 25" fill="#FFFFFF" stroke="#EEEEEE" stroke-width="0.5" transform="rotate(112.5 50 50)" />
    <path d="M50 25C50 25 42 10 50 5C58 10 60 25 50 25" fill="#FFFFFF" stroke="#EEEEEE" stroke-width="0.5" transform="rotate(135 50 50)" />
    <path d="M50 25C50 25 42 10 50 5C58 10 60 25 50 25" fill="#FFFFFF" stroke="#EEEEEE" stroke-width="0.5" transform="rotate(157.5 50 50)" />
    <path d="M50 25C50 25 42 10 50 5C58 10 60 25 50 25" fill="#FFFFFF" stroke="#EEEEEE" stroke-width="0.5" transform="rotate(180 50 50)" />
    <path d="M50 25C50 25 42 10 50 5C58 10 60 25 50 25" fill="#FFFFFF" stroke="#EEEEEE" stroke-width="0.5" transform="rotate(202.5 50 50)" />
    <path d="M50 25C50 25 42 10 50 5C58 10 60 25 50 25" fill="#FFFFFF" stroke="#EEEEEE" stroke-width="0.5" transform="rotate(225 50 50)" />
    <path d="M50 25C50 25 42 10 50 5C58 10 60 25 50 25" fill="#FFFFFF" stroke="#EEEEEE" stroke-width="0.5" transform="rotate(247.5 50 50)" />
    <path d="M50 25C50 25 42 10 50 5C58 10 60 25 50 25" fill="#FFFFFF" stroke="#EEEEEE" stroke-width="0.5" transform="rotate(270 50 50)" />
    <path d="M50 25C50 25 42 10 50 5C58 10 60 25 50 25" fill="#FFFFFF" stroke="#EEEEEE" stroke-width="0.5" transform="rotate(292.5 50 50)" />
    <path d="M50 25C50 25 42 10 50 5C58 10 60 25 50 25" fill="#FFFFFF" stroke="#EEEEEE" stroke-width="0.5" transform="rotate(315 50 50)" />
    <path d="M50 25C50 25 42 10 50 5C58 10 60 25 50 25" fill="#FFFFFF" stroke="#EEEEEE" stroke-width="0.5" transform="rotate(337.5 50 50)" />
  </g>
    </svg>
  );
};

export default DaisyIcon;
