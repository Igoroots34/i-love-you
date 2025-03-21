interface DaisyIconProps {
  width?: number;
  height?: number;
}

const DaisyIcon: React.FC<DaisyIconProps> = ({ width = 40, height = width }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="20" fill="#FFFF00" />
      <g>
        <path d="M50 20C50 20 60 5 70 20C80 35 50 40 50 40" fill="#FFFDD0" />
        <path d="M50 20C50 20 40 5 30 20C20 35 50 40 50 40" fill="#FFFDD0" transform="rotate(45 50 50)" />
        <path d="M50 20C50 20 60 5 70 20C80 35 50 40 50 40" fill="#FFFDD0" transform="rotate(90 50 50)" />
        <path d="M50 20C50 20 40 5 30 20C20 35 50 40 50 40" fill="#FFFDD0" transform="rotate(135 50 50)" />
        <path d="M50 20C50 20 60 5 70 20C80 35 50 40 50 40" fill="#FFFDD0" transform="rotate(180 50 50)" />
        <path d="M50 20C50 20 40 5 30 20C20 35 50 40 50 40" fill="#FFFDD0" transform="rotate(225 50 50)" />
        <path d="M50 20C50 20 60 5 70 20C80 35 50 40 50 40" fill="#FFFDD0" transform="rotate(270 50 50)" />
        <path d="M50 20C50 20 40 5 30 20C20 35 50 40 50 40" fill="#FFFDD0" transform="rotate(315 50 50)" />
      </g>
    </svg>
  );
};

export default DaisyIcon;
