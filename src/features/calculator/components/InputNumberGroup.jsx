import { Field, Input, Label } from '@headlessui/react';

function InputNumber({ title, name, value, onChange }) {
    return (
        <>
            <Field className="mt-4">
                <Label>{title}</Label>
                <Input
                    type='number'
                    name={name}
                    min={0}
                    value={value}
                    onChange={onChange}
                    className="bg-gray-100 rounded w-11/12 h-9 focus:outline-gray-200 px-4"
                />
            </Field>
        </>
    )
}

export default InputNumber;