import { OceanHeightIcon } from "@/components/icons/ocean_height";
import { TemperatureIcon } from "@/components/icons/temperature";
import { ToxicityIcon } from "@/components/icons/toxicity";
import { RetroButton } from "@/components/ui/button";
import { Gauge } from "@/components/ui/gauge";
import { useState } from "react";

export function Components() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <RetroButton legend="button" onClick={() => setCount(count + 1)}>
        count is {count}
      </RetroButton>
      <ToxicityIcon color="#000" size={48} />
      <OceanHeightIcon color="#000" size={48} />
      <div className="flex flex-row gap-3 items-center">
        <TemperatureIcon color="#000" size={30} />

        {
          // @ts-ignore
          <Gauge color="green" label="blueyeah" percentage={30} />
        }
      </div>
      {/* // @ts-ignore
        <ShopTable
          title="test"
          items={[
            {
              name: "test",
              currentAmount: 34,
              price: 321,
            },
            {
              name: "test",
              currentAmount: 34,
              price: 321,
            },
          ]}
        />
      
      <MoneyCounter count={3} /> */}
    </div>
  );
}
