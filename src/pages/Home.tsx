import logo from "../assets/blacked-out-logo.png";

export default function Home() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 p-8 text-start">
      <img src={logo} alt="" className="h-84 w-84 opacity-40" />
      <div className="flex flex-col gap-1.5 text-[16px] text-muted">
        <p>Welcome to my IDE</p>
        <p>Open files on the left</p>
        <p>Use the terminal below to send me a message</p>
      </div>
    </div>
  );
}
