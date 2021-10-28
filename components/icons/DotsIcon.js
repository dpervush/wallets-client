function SvgDots(props) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 11 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx={1.5} cy={1.5} r={1.5} fill="#fff" />
      <circle cx={9.5} cy={1.5} r={1.5} fill="#fff" />
      <circle cx={9.5} cy={9.5} r={1.5} fill="#fff" />
      <circle cx={1.5} cy={9.5} r={1.5} fill="#fff" />
    </svg>
  );
}

export default SvgDots;
