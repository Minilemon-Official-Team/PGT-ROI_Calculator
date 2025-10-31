import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronDown } from 'lucide-react';

function PeriodDropDown({ name, value, onChange, data }) {
    return (
        <>
            <Listbox name={name} value={value} onChange={onChange}>
                <ListboxButton className="w-fit h-9 mt-2 text-start px-4 rounded bg-gray-200 focus:outline-gray-400">
                    <div className='flex flex-row justify-between gap-4'>
                        <span className='text-black'>
                            {value}
                        </span>
                        <ChevronDown color='gray' size={24} />
                    </div>
                </ListboxButton>
                <ListboxOptions anchor="bottom" className="mt-4 w-(--button-width) rounded-2xl bg-white border border-gray-300 focus:outline-none">
                    {data.map((item, index) => (
                        <ListboxOption
                            key={index}
                            value={item}
                            className="mt-2 mx-2 mb-2 px-4 py-2 hover:bg-gray-100 rounded cursor-pointer">
                            {item} months
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </Listbox>
        </>
    )
}

export default PeriodDropDown;