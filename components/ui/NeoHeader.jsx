import Image from 'next/image';

const NeoHeader = () => {
    return (
      <div style={{ background: 'rgb(226 232 240)' }} className="h-[25vh] w-full rounded-b-[45px] m-auto">
        <div className="flex items-center justify-between w-full pt-4 p-2 p-x-9">
          <Image src="/ggt_logo.png" alt="Logo" width={80} height={80} className="w-20" />
          <Image src="/gail.png" alt="Logo" width={350} height={100} className="w-[35%]" />
        </div>
      </div>
    );
  };
  export default NeoHeader;