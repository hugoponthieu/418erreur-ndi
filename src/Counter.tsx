// import { useState, useRef, useEffect } from "react";
// import {
//   addAutoClicker,
//   decrement,
//   increment,
//   respawnButton,
//   startAutoClickers,
// } from "@/features/counter/counterSlice.ts";
// import { useAppDispatch, useAppSelector } from "@/app/hooks.ts";
// import { RootState } from "@/app/store.ts";

// interface ShopItem {
//   id: number;
//   name: string;
//   price: number;
//   effect: () => void;
// }

// export function Counter() {
//   const count = useAppSelector((state: RootState) => state.counter.value);
//   const dispatch = useAppDispatch();

//   const startTimeRef = useRef(Date.now());
//   const [gameTime, setGameTime] = useState(0);
//   const autoClickers = useAppSelector(
//     (state: RootState) => state.counter.autoClickers,
//   );

//   const buttons = useAppSelector((state: RootState) => state.counter.buttons);

//   const [shopItems, setShopItems] = useState<ShopItem[]>([
//     {
//       id: 1,
//       name: "Get AutoClicker",
//       price: 10,
//       effect: () => {
//         // Réduire le temps d'apparition des boutons
//       },
//     },
//   ]);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       const currentTime = Date.now();
//       setGameTime(Math.floor((currentTime - startTimeRef.current) / 1000));
//       setTimeout(() => {
//         dispatch(respawnButton());
//       }, Math.random() * 5000);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   const incrementCounter = (buttonId: number) => {
//     dispatch(increment());


//     setButtons(prevButtons => 
//       prevButtons.map(button => 
//         button.id === buttonId 
//           ? { ...button, show: false } 
//           : button
//       )

//     setButtons((prevButtons) =>
//       prevButtons.map((button) =>

//         button.id === buttonId ? { ...button, show: false } : button,
//       ),
//         button.id === buttonId ? { ...button, show: false } : button
//       )

//     );

//     // Temps aléatoire avant l'apparition du prochain bouton
//     setTimeout(() => {
//       setButtons(prevButtons => {
//         const newButton = {
//           id: Math.max(...prevButtons.map(b => b.id)) + 1,
//           show: true,
//           position: {
//             top: Math.random() * (window.innerHeight - 50),
//             left: Math.random() * (window.innerWidth - 100)
//           }
//         };


//         return prevButtons.map(button => 
//           button.id === buttonId 
//             ? { 
//                 ...button, 
//                 show: true,
//                 position: {
//                   top: Math.random() * (window.innerHeight - 50),
//                   left: Math.random() * (window.innerWidth - 100)
//                 }
//               }
//             : button
//         ).concat(newButton);

//         return prevButtons
//           .map((button) =>
//             button.id === buttonId
//               ? {
//                 ...button,
//                 show: true,
//                 position: {
//                   top: Math.random() * (window.innerHeight - 50),
//                   left: Math.random() * (window.innerWidth - 100),
//                 },
//               }
//               : button
//           )
//           .concat(newButton);
//       });
//     }, Math.random() * 5000); // Entre 0 et 5 secondes
//   };

//   const buyItem = (item: ShopItem) => {
//     if (count >= item.price) {
//       // Déduire le prix
//       dispatch(decrement(item.price));
//       item.effect();
//     }
//   }
  
//   const incrementCounter = () => {
//     dispatch(increment());
//   };

//   return (
//     <div style={{ display: "flex", height: "100vh" }}>
//       <div style={{ flex: 2, position: "relative" }}>
//         <h1>Compteur: {count}</h1>
//         <div style={{ flex: 1, borderLeft: "1px solid black", padding: "20px" }}>
//           <h2>Magasin</h2>
//           {shopItems.map((item) => (
//             <div key={item.id} style={{ marginBottom: "10px" }}>
//               <p>
//                 {item.name} - Prix: {item.price}
//               </p>
//               <button onClick={() => buyItem(item)} disabled={count < item.price}>
//                 Acheter
//               </button>
//             </div>
//           ))}
//         </div>
        
//       <UnderwaterWorld />
//     </div>
//   );
// }

// export default Counter;
