import React from 'react';



export default function GadgetHero() {
  const datas = [
    { img: 'https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FContent%2Fcfd0db2afe974d1a88aabb81d97625d2.png&w=750&q=75', description: 'Lorem ipsum 8this product is vary dengarus. and I also love this product and we go this product area.'},
    { img: 'https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FContent%2Fd9b76fbb787e43bd89e2ed5efca77cd1.png&w=750&q=75', description: 'Lorem ipsum 9this product is vary dengarus. and I also love this product and we go this product area.'},
    { img: 'https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FContent%2F1977539931ef42e2bf246972931bbf36.png&w=750&q=75', description: 'Lorem ipsum 1this product is vary dengarus. and I also love this product and we go this product area.0'},
  ];


  return (
    <div className=''>
        <h2 className='text-xl font-semibold my-2'>Gadget Festive</h2>
        <div className="flex gap-3  overflow-x-auto no-scrollbar">
            {datas.map((data, index) => (
            <div key={index} className="text-center shrink-0">
                <img className="w-[288px] mx-auto rounded-xl" src={data.img} alt="" />
                <p>{data.name}</p>
                </div>
            ))}       
        </div>
    </div>
  );
}
