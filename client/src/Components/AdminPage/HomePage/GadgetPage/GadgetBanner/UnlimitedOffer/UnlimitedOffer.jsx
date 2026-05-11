import React from 'react';
import GadgetOffer from '../GadgetOffer/GadgetOffer';



export default function UnlimitedOffer() {
  const datas = [
    {name: 'Exclusive', img: 'https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FContent%2Fba897a9739ba409f96516ee42b91b161.png&w=640&q=75', description: 'Lorem ipsum 8this product is vary dengarus. and I also love this product and we go this product area.'},
    {name: 'Trimmer', img: 'https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FContent%2F023bb97fbac249d0a2481f9f0b6884c2.png&w=640&q=75', description: 'Lorem ipsum 9this product is vary dengarus. and I also love this product and we go this product area.'},
    {name: 'Exclusive Earbuds Rubel Hossen Khan.', img: 'https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FContent%2F91af89a0fb90404ea769da196e6aa59b.png&w=640&q=75', description: 'Lorem ipsum 1this product is vary dengarus. and I also love this product and we go this product area.0'},
    {name: 'Exclusive Earbuds Rubel Hossen Khan.', img: 'https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FContent%2F6e26505aa3be420abb92c66972d36dcb.png&w=640&q=75', description: 'Lorem ipsum 8this product is vary dengarus. and I also love this product and we go this product area.'},
    {name: 'Exclusive Earbuds Rubel Hossen Khan.', img: 'https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FContent%2F318205326921458694a802af8b61b4f4.png&w=640&q=75', description: 'Lorem ipsum 9this product is vary dengarus. and I also love this product and we go this product area.'},
    {name: 'Exclusive Earbuds Rubel Hossen Khan.', img: 'https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FContent%2F6c17ed9e80f547e5b0b6cad237378c94.png&w=640&q=75', description: 'Lorem ipsum 1this product is vary dengarus. and I also love this product and we go this product area.0'},
  ];


  return (
    <div className=''>
        <h2 className='text-xl font-semibold py-2'>Unlimited Offer</h2>
        <div className="flex gap-3  overflow-x-auto no-scrollbar">
            {datas.map((data, index) => (
                <div key={index} className="w-37.5 text-center shrink-0">
                    <img className="w-37.5 mx-auto rounded-xl" src={data.img} alt="" />
                    <p className='w-full overflow-hidden capitalize h-[22.4px] truncate mt-1 font-semibold text-center'>{data.name}</p>
                </div>
            ))}       
        </div>

        <div>
            <GadgetOffer />
        </div>
    </div>
  );
}
