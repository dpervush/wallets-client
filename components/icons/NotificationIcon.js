function SvgBell(props) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9 1.688v1.687M4.5 9.563c0-2.813.563-6.188 4.5-6.188 3.938 0 4.5 3.375 4.5 6.188 0 2.812 1.688 4.5 1.688 4.5H2.812S4.5 12.374 4.5 9.563zm6.75 4.5s0 2.25-2.25 2.25-2.25-2.25-2.25-2.25h4.5z"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgBell;
