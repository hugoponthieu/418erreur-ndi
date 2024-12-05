import { ShopTable } from "@/components/ui/shop";
import UnderwaterWorld from "../UnderwaterWorld";
import { TemperatureIcon } from "@/components/icons/temperature";
import { Gauge } from "@/components/ui/gauge";
import { ToxicityIcon } from "@/components/icons/toxicity";
import { OceanHeightIcon } from "@/components/icons/ocean_height";
import { MoneyCounter } from "@/components/ui/money_counter";
import { useMemo, useState } from "react";

export function Game() {

  const [plastic, setPlastic] = useState(0);

  useMemo(function incrementPlastic() {
    setPlastic(plastic + 1);
  }, [setPlastic]);

  return (
    <div className="h-screen">
      <div className="z-10 bg-transparent absolute right-5 top-5">
        <ShopTable
          title="GARBAGE"
          items={[
            {
              name: "auto-garbage collector",
              currentAmount: 1,
              price: 10,
            },
          ]}
        />
      </div>
      <div className="z-10 bg-transparent absolute left-5 top-5 flex flex-col gap-2">
        <div className="flex flex-row gap-3 items-center">
          <ToxicityIcon color="#00FF4D" size={30} />
          <Gauge color="green" label="Toxicity" percentage={30} />
        </div>
        <div className="flex flex-row gap-3 items-center">
          <OceanHeightIcon color="#92DCE5" size={30} />
          <Gauge color="blue" label="Ocean's height" percentage={30} />
        </div>
        <div className="flex flex-row gap-3 items-center">
          <TemperatureIcon color="#FF66D8" size={30} />
          <Gauge color="pink" label="Temperature" percentage={30} />
        </div>
      </div>

      <div className="z-10 bg-transparent absolute left-5 bottom-5 flex flex-col gap-2">
        <MoneyCounter />
      </div>
      <UnderwaterWorld/>
    </div>
  );
}
