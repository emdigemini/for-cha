import { useState } from "react"
import { EDog, AlienDog, ECat, JumpingECat, HappyCat, ScaredDog, CryCat,
CryingDude, CryingSobbing, CryingDog, PleaseNo, NoNo } from "./components/Gif";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

const App = () => {
  const [ overlay, setOverlay ] = useState(true);
  const [ hellos, setHellos ] = useState([{ center: true }]);
  const [ hiHover, setHiHover ] = useState(false);
  const [ ignoreHover, setIgnoreHover ] = useState(false);
  const [ layer, setLayer ] = useState(0);
  const [ valentinesGreet, setValentinesGreet ] = useState(false);

  const audio = new Audio("/for-cha/fx/bg-music.mp3");

  return (
    <>
      {overlay && <Overlay setOverlay={setOverlay} audio={audio} />}
      <div className="relative bg-pink-400 min-h-screen min-w-screen overflow-hidden">
        {valentinesGreet && <HappyValentines />}
        {hiHover && <SheSaidHi />}
        {ignoreHover && <SheIgnoreMe />}
        {hellos.length > 5 && <DontIgnoreMe />}
        {layer === 2 && 
        <>
          {[...Array(15)].map((_, i) => {
            // eslint-disable-next-line react-hooks/purity
            const left = Math.random() * 100;
            // eslint-disable-next-line react-hooks/purity
            const top = Math.random() * 100;
            // eslint-disable-next-line react-hooks/purity
            const size = 20 + Math.random() * 40;
            // eslint-disable-next-line react-hooks/purity
            const delay = Math.random() * 5;

            return (
              <div
                key={i}
                className="absolute text-pink-400 opacity-70 animate-float"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  fontSize: `${size}px`,
                  animationDelay: `${delay}s`
                }}
              >
                ❤️
              </div>
            );
          })}
          <BeMyValentine setValentinesGreet={setValentinesGreet}/>
        </>
        }
        {layer === 1 && <Layer2 setLayer={setLayer} />}
        {layer === 0 && hellos.map((pos, index) => {
          return (
            <Hello key={index} 
            setLayer={setLayer}
            setHiHover={setHiHover} 
            setIgnoreHover={setIgnoreHover} 
            setHellos={setHellos}
            center={pos.center}
            x={pos.x}
            y={pos.y}/>
          )
        })}
      </div>
    </>
  )
}

function Overlay({ setOverlay, audio }){

  const playBgMusic = () => {
    setOverlay(false);
    // eslint-disable-next-line react-hooks/immutability
    audio.loop = true;
    audio.play().catch(error => {
      console.error("Playback failed:", error);
    });
  }

  return (
    <div className="fixed min-h-screen min-w-screen top-0 z-50
    bg-[rgba(0,0,0,0.55)] backdrop-blur-2xl flex justify-center items-center
    cursor-pointer text-white text-2xl"
    onClick={() => playBgMusic()}>
      <p className="animate-jump">
        Tap Anywhere.
      </p>
    </div>
  )
}

function Hello({ setLayer, setHiHover, setIgnoreHover, setHellos, center, x, y }){
  const audioYay = new Audio('/for-cha/fx/yayy-fx.mp3');
  const audioAww = new Audio('/for-cha/fx/aww-fx.mp3');

  const yayFx = () => {
    audioYay.play();
  }

  const awwFx = () => {
    audioAww.play();
  }

  const randomPosition = () => {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    return {x, y};
  }

  const proceed = () => {
    setHellos([]);
    setHiHover(false);
    yayFx();
    setLayer(1);
  }

  return (
      <div style={!center ? { position: 'absolute', top: `${y}px`, left: `${x}px`} : {}}
      className="absolute flex flex-col gap-6 items-center text-center
      top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2
      bg-white/40 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-white/50">
        <h2 className="text-4xl font-bold">Helloooooo Cha👋</h2>
        <div className="flex gap-1.5 font-medium">
          <button className="bg-lime-500 py-2 px-4 text-white rounded-md cursor-pointer
          hover:opacity-75"
          onMouseEnter={() => setHiHover(true)}
          onMouseLeave={() => setHiHover(false)}
          onClick={proceed}>Hi💗</button>
          <button className="bg-red-500 py-2 px-4 text-white rounded-md cursor-pointer
          hover:opacity-75"
          onMouseEnter={() => setIgnoreHover(true)}
          onMouseLeave={() => setIgnoreHover(false)}
          onClick={() => {
            const pos = randomPosition();
            setHellos(prev => [...prev, pos]);
            awwFx();
          }}>Ignore🙄</button>
        </div>
      </div>
  )
}

function DontIgnoreMe(){
  return (
    <div className="absolute bg-white text-black py-4 px-6 font-semibold text-2xl w-screen md:w-max
    top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-999 rounded-4xl text-center">
      Please stop ignoring me🥺🥺🙏🙏
    </div>
  )
}

function SheSaidHi(){
  return (
    <div className="fixed flex h-125 w-225
    top-1/3 left-1/2 -translate-y-1/2 -translate-x-1/2">
      <EDog />
      <AlienDog />
      <ECat />
      <JumpingECat />
      <HappyCat />
    </div >
  )
}

function SheIgnoreMe(){
  return (
    <div className="fixed flex h-125 w-225
    top-1/3 left-1/2 -translate-y-1/2 -translate-x-1/2">
      <NoNo />
      <CryCat />
      <CryingDude />
      <CryingDog />
      <PleaseNo />
      <CryingSobbing />
      <ScaredDog />
    </div >
  )
}

function BeMyValentine({ setValentinesGreet }){
  const [ beMy, setBeMy ] = useState("");
  const [ yes, setYes ] = useState(false);
  const [ yesOverlay, setYesOverlay ] = useState(false);
  const [ onHover, setOnHover ] = useState(false);
  const [ pos, setPos ] = useState({x: 100, y: "50%"});
  const [ nothing, setNothing ] = useState(0);
  const audioAww = new Audio('/for-cha/fx/aww-fx.mp3');
  const [ message, setMessage ] = useState("");

  const playAww = () => audioAww.play();

  const moveButton = () => {
    const maxX = 900 - 150;
    const maxY = 500 - 60;

    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    setPos({x: newX, y: newY});
  }

  const sendMessage = () => {
    setValentinesGreet(true);

    emailjs.init({
      publicKey: "T5wd1r2CfabMwgP3p",
    });

    emailjs
    .send(
      "service_43ujhao",
      "template_ts32kjk",
      {
        message,
      }
    )
    .then(() => {
      toast.success("Message sent successfully!");
      setMessage("");
    })
    .catch((error) => {
      alert("FAILED to send :<... try again");
    });
  }
  
  return (
    <>
      <div className="absolute flex flex-col items-center justify-center bg-amber h-125 w-screen md:w-225 p-6 bg-pink-200/40
      top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-4xl backdrop-blur-md">
        {beMy === "no" && <WhyNo />}

        {!yes && beMy === "" && 
        <>
        {yesOverlay && <YesOverlay setYes={setYes} setBeMy={setBeMy} />}
          <h2 className="text-3xl md:text-4xl font-bold text-pink-700 mb-6 text-center">
            Will you be my Valentine? 💖
          </h2>
          <div className={`${onHover ? "" : "relative"} flex gap-4`}>
            <button className="bg-pink-500 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:bg-pink-600 transition cursor-pointer"
            onClick={() => setYesOverlay(true)}>
              Yes
            </button>
            <div className="px-6"></div>
            <button style={!pos ? undefined : { position: 'absolute', top: `${pos.y}px`, left: `${pos.x}px`, transition: "all 0.1s ease"}}
            className="bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-xl shadow-md hover:bg-gray-400 transition cursor-pointer
            z-99"
            onMouseEnter={() => {
              setOnHover(true);
              moveButton();
            }}
            onClick={() => {
              setBeMy("no"); 
              playAww();
            }}>
              No
            </button>
          </div>
        <div className="absolute bottom-15 w-[80%] max-w-md px-6 py-3 bg-black/5 border-l-4 border-pink-500 rounded-r-lg">
          <p className="font-mono text-xs md:text-sm text-pink-700 leading-relaxed">
            <span className="text-pink-500 font-bold">{`// `}</span>
            I spent more time debugging this code than I spent thinking of what to say. 
            That's how much you mean to me. hehehe
          </p>
        </div>
        </>
        }
        {yes && beMy === "valentine" && (
          <div className="flex flex-col items-center justify-center bg-pink-100 py-12 px-6 rounded-2xl">
            <h2 className="text-2xl md:text-3xl font-bold text-pink-700 mb-4 text-center">
              Got something to say? 📝
            </h2>
            <textarea
              className="w-full max-w-md p-4 rounded-2xl border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none mb-4"
              rows={4}
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="flex gap-5">
              <button className="bg-pink-500 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:bg-pink-600 transition cursor-pointer"
              onClick={sendMessage}>
                Send
              </button>
              <button className="bg-red-500 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:bg-red-600 transition cursor-pointer"
              onClick={() => {
                setNothing(prev => prev+1);
                nothing > 3 && setValentinesGreet(true); 
              }}>
                {nothing === 0 && "Hmm... Nothing"}
                {nothing === 1 && "Really?"}
                {nothing === 2 && "Ehh!? Fr???"}
                {nothing === 3 && "You sure???"}
              </button>
              {nothing > 3 &&
              <HappyValentines />
              }
            </div>
          </div>
        )}
      </div>
    </>
  )
}

function YesOverlay({ setYes, setBeMy }){
  const audioYay = new Audio('/for-cha/fx/yayy-fx.mp3');
  const playYay = () => audioYay.play();

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden border border-pink-100 animate-in fade-in zoom-in duration-300">
        <div className="bg-pink-500 p-4 text-white text-center font-bold tracking-wide">
          TERMS & CONDITIONS 📜
        </div>
        <div className="p-6 space-y-4">
          <div className="h-32 overflow-y-auto pr-2 text-sm text-pink-900/70 leading-relaxed custom-scrollbar">
            <p className="font-bold mb-2 uppercase text-[10px] text-pink-400">Agreement 1.1: Gift Acceptance</p>
            <p>By clicking "Yes", the user (you) hereby agrees to accept any and all gifts, and treats from the developer (me) at any given time, regardless of location or occasion.</p>
            
            <p className="font-bold mb-2 mt-4 uppercase text-[10px] text-pink-400">Agreement 1.2: No Refusal Policy</p>
            <p>Bawal tumanggi ang tumanggi bading. Strict compliance is required. No returns, no exchanges, and definitely no "saying no" kapag may naisip akong ibigay sa'yo.❤️</p>
          </div>

          <button 
            onClick={() => {
              setYes(true);
              setBeMy("valentine");
              playYay();
            }}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-xl 
            transition-all active:scale-95 shadow-lg shadow-pink-200 cursor-pointer"
          >
            I AGREE & ACCEPT ❤️
          </button>
          
          <p className="text-[10px] text-center text-gray-400 italic">
            *Failure to comply will result with pagdadabog, pagtatampo, pagkalungkot at pagdadalamhati. NYAHAHAHA
          </p>
        </div>
      </div>
    </div>
  )
}

function Layer2({ setLayer }){
  const proceed = () => {
    setLayer(2)
  }

  return (
    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 
    flex flex-col gap-8 items-center text-center w-[90%] max-w-md bg-white/60 backdrop-blur-xl p-12 rounded-4xl 
    shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/80 animate-in fade-in zoom-in duration-500">
      <div className="text-5xl animate-bounce">💝</div>

      <h2 className="text-2xl md:text-3xl font-extrabold text-pink-600 leading-tight">
        I'm not good with words, <br /> 
        <span className="text-pink-400 font-medium text-xl">so I made this for you...</span>
      </h2>

      <button 
        className="group relative bg-gradient-to-right from-pink-500 to-rose-500 py-4 px-10 text-white font-bold rounded-full 
        shadow-lg shadow-pink-200 transition-all duration-300 hover:scale-105 hover:shadow-pink-300 active:scale-95"
        onClick={proceed}
      >
        <span className="relative z-10 cursor-pointer">Continue</span>
        <div className="absolute inset-0 rounded-full bg-pink-500 opacity-50
        group-hover:opacity-100 transition-opacity cursor-pointer" />
      </button>
    </div>
  )
}

function WhyNo() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-bottom-right from-pink-100 to-red-200 text-center px-4">

      <h1 className="text-5xl md:text-7xl font-bold text-red-600">
        why noo?? 😭
      </h1>

      <p className="mt-4 text-lg md:text-xl text-gray-700 max-w-md">
        aray ko po, aray naman beh, aray lods, aray teh, 
        sumasakit, napakasakit, ang hapdi, ang kirot, ang tindi, wasak na wasak, durog na durog, basag ang puso, nadurog ang puso, 
        pinunit ang puso, tinaga ang puso

      </p>

      <div className="relative gap-12 justify-around md:justify-center items-center w-screen flex mt-6 text-6xl animate-bounce">
        <div>
          <img className="h-20 md:h-24 bottom-23 scale-x-[-1] animate-pulse" src="/for-cha/gif/sad-disappointed.gif" alt="" />
        </div>
        💔
        <div>
          <img className="h-20 md:h-24 bottom-23 animate-pulse" src="/for-cha/gif/sad-disappointed.gif" alt="" />
        </div>
      </div>
      <p className="mt-6 text-gray-600 italic text-center">
        Sayang ang pinag-aralan ko kung hindi ko mapapagana 'tong 'Yes' button sayo.😔
        <br />
        Paalam kolehiyo
      </p>

    </div>
  );
}

function HappyValentines(){
  return (
    <div className="absolute min-h-screen min-w-screen flex items-center justify-center bg-rose-50/20 p-6
    top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 backdrop-blur-1xl z-999">
      <div className="z-999 max-w-md w-full bg-white/70 backdrop-blur-md border border-rose-200 
      rounded-3xl shadow-xl p-8 text-center transition-all hover:scale-[1.02]">
        
        <div className="mb-6 text-4xl animate-bounce">❤️</div>

        <h1 className="text-2xl font-bold text-rose-600 mb-4">
          Happy Heart Day! CHARIZZZZZZZZZZ <br />
          <span className="text-sm font-normal text-rose-400">
            Libre mo naman ako? Chariz HAHAHA.
          </span>
        </h1>

        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p className="text-sm italic">
            I'm sorry I don't have flowers or chocolates for you today. 
            If I could code them into reality, your room would be full of them by now. 🍫🌹
          </p>

          <div className="h-1px bg-gradient-to-right from-transparent via-rose-200 to-transparent my-4" />

          <p>
            So go ahead and enjoy all the treats and attention from everyone else today. 
            Tanggapin mo lang lahat ng chocolates from your suitors tapos penge ako HAHAHA chariz ulit. <br />
            You're everyone's favorite for a reason.
          </p>
          
          <p className="font-medium">
            I'm just here always for you, quietly cheering for you.
          </p>

          <p className="text-lg font-semibold text-rose-500 pt-2">
            Happy Valentine's Day! <br />
            <span className="text-xs uppercase tracking-widest text-gray-400">
              No "chariz/charot" this time — you really are the best. ✨
            </span>
          </p>
        </div>

        <div className="mt-8 text-[10px] text-rose-300 font-mono">
          {`// status: supporting_you_always.html`}
        </div>
      </div>
    </div>
  )
}


export default App