import { Field, Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronDown } from 'lucide-react';

function DropDown({ data, title, name, onChange, value, placeholder }) {
    return (
        <>
            <div className="mt-4">
                <Field>
                    <Label>
                        {title}
                    </Label>
                    <Listbox name={name} value={value} onChange={onChange}>
                        <ListboxButton className="w-11/12 h-9 mt-2 text-start px-4 rounded bg-gray-100 focus:outline-gray-400">
                            {value?.label ? (
                                <span>{value.label}</span>
                            ) : (
                                <div className='flex flex-row justify-between'>
                                    <span className='text-gray-400'>{placeholder}</span>
                                    <ChevronDown color='gray' size={24} />
                                </div>
                            )}
                        </ListboxButton>
                        <ListboxOptions anchor="bottom" className="mt-4 w-96 rounded bg-white border border-gray-300 focus:outline-none">
                            {data.map((item) => (
                                <ListboxOption
                                    key={item.id}
                                    value={item}
                                    className="mt-2 mx-2 mb-2 px-4 py-2 hover:bg-gray-100 rounded cursor-pointer">
                                    {item.label}
                                </ListboxOption>
                            ))}
                        </ListboxOptions>
                    </Listbox>
                </Field>
            </div>
        </>
    )
}

export default DropDown;