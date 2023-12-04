import {Tick} from './svg'

export const FilterChipUnselected = () => (
  <div className="inline-flex justify-center items-center border border-stone-500 rounded-lg h-8">
    <span className="text-sm px-4">Filter chip</span>
  </div>
);

export const FilterChipSelected = () => (
  <div className="inline-flex justify-center items-center rounded-lg h-8 bg-teal-100">
    <span className='px-2'><Tick/></span>
    <span className="text-sm pr-4">Filter chip</span>
  </div>
);

export const FilterChipFilled = () => (
  <div className="inline-flex justify-center items-center bg-teal-100 rounded-lg h-8">
    <span className="text-sm px-4">Filter chip</span>
  </div>
);