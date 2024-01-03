interface TitleAndSvgProps {
  title: string;
  svg: JSX.Element;
  padding?: string;
  justifyContent?: string;
}
export const TitleAndSvg = ({ title, svg, padding, justifyContent }: TitleAndSvgProps) => (
  <div className={`flex items-center ${padding} ${justifyContent || ''}`}>
    <h2 className="text-titleLarge font-bold pr-2 text-purple-7">{title}</h2>
    <span>{svg}</span>
  </div>
);

export const TextAndSvg = ({ text, svg,url }: {text: string; svg: JSX.Element; url: string}) => (
  <div className='flex items-start pb-3  '>
    <span>{svg}</span>
    <p className="text font-bold pl-0.5 text-purple-7 underline decoration-blue-400 hover:decoration-2 cursor-pointer"><a href={url}>{text}</a></p>
  </div>
);