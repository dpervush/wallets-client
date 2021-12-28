import * as React from "react";

const SvgTransactions = (props) => (
  <svg
    width={19}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#transactions_svg__a)">
      <path
        d="M18.27 7.964 16.163.696a.413.413 0 0 0-.107-.223.672.672 0 0 0-.197-.152.512.512 0 0 0-.232-.053H2.484a.569.569 0 0 0-.553.428L.02 7.607a.651.651 0 0 0 .035.375c-.036.12-.054.226-.054.322v6.285c0 .31.11.578.33.804.22.226.492.34.813.34h16c.322 0 .592-.114.813-.34.22-.226.33-.494.33-.804V8.214a1.54 1.54 0 0 0-.018-.25ZM2.93 1.411h12.25l1.662 5.75H11.52c0 .274-.039.53-.116.768a2.19 2.19 0 0 1-.33.642c-.143.19-.31.355-.5.492-.19.136-.408.24-.652.312a2.753 2.753 0 0 1-.777.107 2.55 2.55 0 0 1-.946-.17 2.226 2.226 0 0 1-.741-.473 2.17 2.17 0 0 1-.492-.732 2.438 2.438 0 0 1-.178-.946H1.324L2.93 1.41Zm14.215 13.178h-16V8.304h4.696c.25.726.667 1.294 1.25 1.705.584.41 1.268.616 2.054.616.524 0 1.009-.092 1.455-.277a3.114 3.114 0 0 0 1.143-.803c.316-.352.557-.765.723-1.241h4.68v6.285Z"
        fill="#fff"
      />
    </g>
    <defs>
      <clipPath id="transactions_svg__a">
        <path fill="#fff" d="M0 0h18.29v16H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default SvgTransactions;