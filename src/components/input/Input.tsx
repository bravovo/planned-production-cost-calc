import type { ChangeEvent } from "react";

type Input = {
    label: string;
    type: string;
    name: string;
    value: number | string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function Input({ label, type, name, value, onChange }: Input) {

    return (<div className='w-full flex flex-col justify-center items-start'>
        <label htmlFor={name}>{label}</label>
        <input type={type} name={name} onChange={onChange} value={value} className="rounded-[4px] border-none bg-[#282828] w-full px-2 py-0.5 focus:outline-none" />
    </div>);
}

export default Input;