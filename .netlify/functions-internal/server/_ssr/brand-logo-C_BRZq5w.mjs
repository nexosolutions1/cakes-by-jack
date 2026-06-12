import { j as jsxRuntimeExports } from "../_libs/react.mjs";
const logo = "/assets/favicon-_f5vaHWQ.jpeg";
function BrandLogo({
  size = 40,
  className = ""
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "img",
    {
      src: logo,
      alt: "Cakes by Jack",
      width: size,
      height: size,
      className: `rounded-full object-cover ${className}`
    }
  );
}
export {
  BrandLogo as B
};
