import Image from 'next/image';

const Header = () => {
  return (
    <div className="flex flex-col items-center justify-between bg-white w-full">
      <Image src="/gail.png" alt="Logo" width={300} height={100} className="w-[30%]" />
    </div>
  );
};
export default Header;