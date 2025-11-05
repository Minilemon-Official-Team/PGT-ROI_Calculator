import { Field, Input, Label } from "@headlessui/react";

function InputNumber({ title, name, value, onChange }) {
    const handleChange = (e) => {
        let val = e.target.value;

        val = val.replace(/[^0-9]/g, "");

        if (val === "") {
            onChange({ target: { name, value: "" } });
            return;
        }

        val = val.replace(/^0+/, "");

        onChange({ target: { name, value: Number(val) } });
    };

    return (
        <Field className="mt-4">
            <Label>{title}</Label>
            <Input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                name={name}
                value={value === 0 ? "0" : value || ""}
                onChange={handleChange}
                className="bg-gray-100 rounded w-11/12 h-9 focus:outline-gray-200 px-4"
            />
        </Field>
    );
}

export default InputNumber;
