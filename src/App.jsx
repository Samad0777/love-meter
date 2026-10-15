import { Heart, Plus } from "lucide-react";
import { useState } from "react";

function App() {
  const [YourName, setYourName] = useState("");
  const [PartnerName, setPartnerName] = useState("");
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [Percentage, setPercentage] = useState(0);

  let charObj = {};
  let countArr = [];
  const CharacterCount = (YourName, partnerName) => {
    if (YourName.trim() === "" || partnerName.trim() === "") {
      return;
    }
    const names = (YourName + partnerName).toLowerCase();

    for (const char of names) {
      if (charObj[char]) {
        charObj[char]++;
      } else {
        charObj[char] = 1;
      }
    }

    for (const char in charObj) {
      countArr.push(charObj[char]);
    }
    // console.log(countArr);
    const result = calculateLoveScore(countArr);
    setPercentage(result);
  };

  const calculateLoveScore = (arr) => {
    let currentArr = [...arr];

    while (currentArr.length > 2) {
      const nextArr = [];

      for (let i = 0; i < Math.floor(currentArr.length / 2); i++) {
        const sum = currentArr[i] + currentArr[currentArr.length - 1 - i];

        nextArr.push(...String(sum).split("").map(Number));
      }

      if (currentArr.length % 2 !== 0) {
        nextArr.push(currentArr[Math.floor(currentArr.length / 2)]);
      }

      currentArr = nextArr;
    }

    return Number(currentArr.join(""));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (YourName.trim() === "" || PartnerName.trim() === "") {
      alert("Please enter both names.");
      return;
    }
    CharacterCount(YourName, PartnerName);
    setName1(YourName);
    setName2(PartnerName);
    // console.log("your name: " + YourName);
    // console.log("partner's name: " + PartnerName);
    setPartnerName("");
    setYourName("");
  };
  return (
    <>
      <div className="min-h-screen flex flex-col md:flex-row gap-8 items-center justify-center bg-rose-200 p-5">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 md:p-10 rounded-lg shadow-md flex flex-col gap-5 max-w-xl w-full"
        >
          <div className="flex items-center justify-center mb-5">
            <h1 className="text-3xl font-bold text-rose-500">Love Meter</h1>
            <Heart fill="red" className="ml-2 text-rose-500" />
          </div>
          <label className="font-medium text-gray-700">Enter your name</label>
          <input
            placeholder="your name"
            className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-rose-500"
            type="text"
            name="name"
            value={YourName}
            onChange={(e) => setYourName(e.target.value)}
          />
          <div className="flex items-center justify-center text-gray-500">
            <Plus />
          </div>
          <label className="font-medium text-gray-700">
            Enter your partner's name
          </label>
          <input
            placeholder="Partner's name"
            className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-rose-500"
            type="text"
            name="partnerName"
            value={PartnerName}
            onChange={(e) => setPartnerName(e.target.value)}
          />
          <button
            className="bg-rose-500 text-white py-2 px-4 rounded-lg hover:bg-rose-600 cursor-pointer active:scale-95"
            type="submit"
          >
            Calculate Love
          </button>
        </form>
        <div className="bg-white p-6 md:p-10 rounded-lg shadow-md flex flex-col gap-5 max-w-xl w-full">
          <h2 className="text-2xl font-bold text-rose-500">Result</h2>
          {/* <p className="text-gray-700">
            {Percentage > 0 ? "Your love percentage will be displayed here after calculation." : ""}
          </p> */}
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="font-medium uppercase tracking-wider">{name1}</p>
            <Heart fill="red" className="ml-2 text-rose-500" />
            <p className="font-medium uppercase tracking-wider">{name2}</p>
          </div>
          <div className="text-gray-700 flex items-center justify-center">
            {Percentage === 0 ? (
              <p>
                ❤️ Toh kiski yaadon mein khoye ho janaab? Dono ke naam daalo,
                phir dekhte hain dilon ka kya scene hai! 👀✨
              </p>
            ) : Percentage <= 10 ? (
              <p>
                😭 Bhai, yahan toh crush bhi tujhe "bro/sis" bolke chali jaaye.
                Umeed rakh, par expectations ko airplane mode pe daal! 💀
              </p>
            ) : Percentage <= 30 ? (
              <p>
                💀 Chemistry se zyada toh tum dono ke beech silence hai. Bhai,
                pehle hello toh bol de!
              </p>
            ) : Percentage <= 40 ? (
              <p>
                👀 Kuch toh baat hai, par abhi love story se zyada trailer lag
                raha hai. Picture abhi baaki hai mere dost!
              </p>
            ) : Percentage <= 60 ? (
              <p>
                😂 Chalne layak hai bhai! Bas effort dono taraf se hona chahiye,
                warna relationship ka pura load ek hi banda uthayega.
              </p>
            ) : Percentage <= 70 ? (
              <p>
                👀 Ohooo! Thodi chemistry toh lag rahi hai. Ab bas overthinking
                kam aur real conversations zyada kar, mere sher/sherni!
              </p>
            ) : Percentage <= 80 ? (
              <p>
                ❤️ Bhai, vibe toh match kar rahi hai! Ab har notification ko
                unka message samajhna band kar aur confidence se baat kar 😂
              </p>
            ) : Percentage <= 90 ? (
              <p>
                🔥 BHAI SAHAB! Itni vibe toh playlist aur late-night chats mein
                hoti hai. Bas respect, honesty aur consistency maintain rakhna!
              </p>
            ) : Percentage <= 100 ? (
              <p>
                💍 AREY ROMEO-JULIET! Meter toh full filmy ho gaya! 😂❤️ Abhi
                shaadi ke cards mat chhapwa—pehle confirm kar ki saamne se bhi
                same feelings hain! 👀
              </p>
            ) : (
              <p>
                🤨 Bhai, meter 100 se upar chala gaya! Calculator ko pyaar chadh
                gaya kya? 😂
              </p>
            )}
          </div>
          {["nihariya", "fardeen"].includes(name1.trim().toLowerCase()) &&
          ["nihariya", "fardeen"].includes(name2.trim().toLowerCase()) ? (
            <p className="text-rose-500 font-medium">
              Jaldi se dil ki baat keh do, kahin mauka haath se nikal na jaaye!
              😂❤️
            </p>
          ) : null}
          <div className="flex items-center justify-center mt-5">
            <span className="text-4xl font-bold text-rose-500">
              {Percentage}%
            </span>
            <Heart fill="red" className="ml-2 text-rose-500" />
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
            <div
              className="bg-rose-500 h-4 rounded-full"
              style={{ width: `${Percentage}%` }}
            ></div>
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-400 text-center mt-4">
        ✨ Just for fun! This score doesn't measure real love or compatibility.
        ❤️
      </p>
    </>
  );
}

export default App;
