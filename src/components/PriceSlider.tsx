import React from "react";
import * as Slider from "@radix-ui/react-slider";

interface PriceSliderProps {
  price: number[];
  setPrice: React.Dispatch<React.SetStateAction<number[]>>;
  min?: number;
  max?: number;
}

const PriceSlider: React.FC<PriceSliderProps> = ({ price, setPrice, min = 0, max = 100000 }) => {
  return (
    <div className="mb-5">
      <div className="font-medium mb-4">Цена, ₽</div>

      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-6"
        value={price}
        min={min}
        max={max}
        step={1000}
        onValueChange={(val) => setPrice(val)}
      >
        {/* Track */}
        <Slider.Track className="bg-gray-300 relative flex-1 h-1 rounded-full">
          <Slider.Range className="absolute bg-custom-accent h-1 rounded-full" />
        </Slider.Track>

        {/* Мин Thumb */}
        <Slider.Thumb className="relative block p-3 bg-custom-accent rounded-lg border-0 focus:outline-none">
          <span className="text-sm font-light whitespace-nowrap">
            от {price[0]} ₽
          </span>
        </Slider.Thumb>

        {/* Макс Thumb */}
        <Slider.Thumb className="relative block p-3 bg-custom-accent rounded-lg border-0 focus:outline-none">
          <span className="text-[14px] font-light whitespace-nowrap">
            до {price[1]} ₽
          </span>
        </Slider.Thumb>
      </Slider.Root>
    </div>
  );
};

export default PriceSlider;