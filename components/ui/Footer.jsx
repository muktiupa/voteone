import Image from 'next/image';

const Footer = () => {
  return (
    <div className="flex mt-2 flex-col items-center justify-between bg-white text-[8px] absolute bottom-0">
      <Image
        src="/techindialogo.png"
        alt="Logo"
        width={300}
        height={100}
        className="w-[30%]"
        style={{ filter: 'grayscale(1) brightness(0.5)' }}
      />
      Powered by TEC INDIA ENTERTAINMENT PVT LTD.
    </div>
  );
};

export default Footer;