import { ShopTable } from "@/components/ui/shop";
// @ts-ignore
import UnderwaterWorld from "../UnderwaterWorld";
import { TemperatureIcon } from "@/components/icons/temperature";
import { Gauge } from "@/components/ui/gauge";
import { ToxicityIcon } from "@/components/icons/toxicity";
import { OceanHeightIcon } from "@/components/icons/ocean_height";
import { MoneyCounter } from "@/components/ui/money_counter";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  incrementOverfishing,
  incrementTemperature,
  incrementToxicity,
} from "@/features/counter/counterSlice";

export function Game() {
  const [plastic, setPlastic] = useState(0);
  const toxicity = useAppSelector((state) => state.counter.toxicity);
  const temperature = useAppSelector((state) => state.counter.temperature);
  const overfishing = useAppSelector((state) => state.counter.overfishing);

  const dispatch = useAppDispatch();

  useMemo(
    function incrementPlastic() {
      setPlastic(plastic + 1);
    },
    [setPlastic],
  );

  useEffect(() => {
    setInterval(() => {
      dispatch(incrementToxicity());
      dispatch(incrementTemperature());
      dispatch(incrementOverfishing());
    }, 5000);
  }, []);

  return (
    <div className="h-screen">
      <div className="z-10 bg-transparent absolute right-5 top-5 flex flex-col gap-5">
        <ShopTable
          title="ANTI-TOXICITY"
          items={[
            {
              name: "AGC 3000",
              currentAmount: 1,
              price: 10,
              informations: {
                title: "The auto-garbage collector 3000",
                description:
                  "This magical device will help you collect automatically plastic bottles. Therefore you will gain money and decrease the toxicity gauge by buying this item.",
              },
            },
          ]}
        />
        <ShopTable
          title="ANTI-OVERFISHING"
          items={[
            {
              name: "ANTI FISHER M*lware",
              currentAmount: 1,
              price: 10,
              informations: {
                title: "Anti fisher m*lware",
                description:
                  "As you may have understood, this item is a troll one. Violence is never a solution. Still, using technologies such as Blockchain to track how and where your fish has been captured can help mitigate overfishing.",
              },
            },
          ]}
        />
        <ShopTable
          title="ANTI-GLOBAL-WARMING"
          items={[
            {
              name: "Seagrasses",
              currentAmount: 1,
              price: 10,
              informations: {
                title: "Seagrasses",
                description:
                  "To prevent global warming, seagrasses can play a role by absorbing CO2 while producing O2. Also dense underwater vegetation can lower local water temperatures, helping to counteract localized warming effects",
              },
            },
          ]}
        />
      </div>
      <div className="z-10 bg-transparent absolute left-5 top-5 flex flex-col gap-2">
        <div className="flex flex-row gap-3 items-center">
          <ToxicityIcon color="#00FF4D" size={30} />
          <Gauge
            color="green"
            label="Toxicity"
            percentage={toxicity}
            informations={{
              title: "Toxicity",
              description:
                "This gauge represent how toxic is the water itself. This settings is impacted by the amount of micro-plastics in the ocean but also how acid is the water. The more this gauge is full, the more your water will get green",
            }}
          />
        </div>
        <div className="flex flex-row gap-3 items-center">
          <OceanHeightIcon color="#92DCE5" size={30} />
          <Gauge
            color="blue"
            label="Overfishing"
            percentage={overfishing}
            informations={{
              title: "Ocean's height",
              description:
                "This gauge represents the global overfishing. The more this gauge is full the less you will see fishes swimming around you...",
            }}
          />
        </div>
        <div className="flex flex-row gap-3 items-center">
          <TemperatureIcon color="#FF66D8" size={30} />
          <Gauge
            color="pink"
            label="Temperature"
            percentage={temperature}
            informations={{
              title: "Temperature",
              description:
                "This gauge shows how hot is your water, this directly impacts your amount of oxygen. That's why you will see less bubbles around you if this gauge gets larger.",
            }}
          />
        </div>
      </div>

      <div className="z-10 bg-transparent absolute left-5 bottom-5 flex flex-col gap-2">
        <MoneyCounter />
      </div>
      <UnderwaterWorld />
    </div>
  );
}
