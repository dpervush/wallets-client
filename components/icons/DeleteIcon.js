function SvgDelete(props) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M6 6h1v6H6V6zM9 6h1v6H9V6z" fill="#fff" />
      <path
        d="M2 3v1h1v10a1 1 0 001 1h8a1 1 0 001-1V4h1V3H2zm2 11V4h8v10H4zM6 1h4v1H6V1z"
        fill="#fff"
      />
    </svg>
  );
}

export default SvgDelete;
