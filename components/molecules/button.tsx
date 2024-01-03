import { Tick } from "./svg";

export const FilterChipUnselected = () => (
  <div className="inline-flex justify-center items-center border border-stone-500 rounded-lg h-8 hover:border-2 hover:shadow hover:opacity-80 cursor-pointer active:border-1">
    <span className="text-sm px-4">Filter chip</span>
  </div>
);

export const FilterChipSelected = () => (
  <div className="inline-flex justify-center items-center rounded-lg h-8 bg-teal-100 hover:shadow hover:opacity-80 cursor-pointer">
    <span className="px-2">
      <Tick />
    </span>
    <span className="text-sm pr-4">Filter chip</span>
  </div>
);

export const FilterChipFilled = ({tags}:{tags: string | string[]}) => (

  <div className="inline-flex justify-center items-center bg-teal-100 rounded-lg h-7 hover:shadow hover:opacity-80 hover:bg-teal-200 active:bg-teal-300 cursor-pointer">
    <span className="text-sm px-2">{tags}</span>
  </div>
);

interface ButtonProps{
  width?: string;
  height?: string;
  borderRadius?: string;
  text: string;
  bgColor: string;
  textColor: string;
  activeColor: string;
  url?: string;
  disabled?: boolean
  onclick?: (e) => Promise<void>
  type: "button" | "submit" | "reset"
}

export const Button = ({width, height, textColor, borderRadius, text, bgColor, activeColor, url, disabled, onclick, type}: ButtonProps) => (
  <a href={url || ''} target="blank">
  <button onClick={onclick} disabled={disabled}  className={` ${width || '' } ${borderRadius || ''} inline-flex text-sm items-center ${height || 'h-10'} font-medium ${bgColor} px-5 py-2.5 justify-center ${textColor}  hover:shadow hover:opacity-80 active:${activeColor} transition ease-in-out disabled:bg-slate-400 `} type={type}>
    {text} 
  </button>
  </a>
);
// TODO: the active color for the newsletter button is not working 