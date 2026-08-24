import logo from "../assets/blacked-out-logo.png";

export default function Home() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 p-4 text-start sm:p-8">
      <img
        src={logo}
        alt=""
        className="h-40 w-40 opacity-40 sm:h-84 sm:w-84"
      />
      <div className="flex flex-col gap-1.5 px-4 text-center text-[16px] text-muted sm:text-start">
        <p>Welcome to my IDE</p>
        <p>Open files on the left</p>
        <p>Use the terminal below to send me a message</p>
      </div>
    </div>
  );
}
