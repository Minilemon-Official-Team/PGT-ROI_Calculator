function CheckBox({ value, onChange }) {
    return (
        <>
            <label htmlFor="" className="relative my-2">
                <input type="checkbox" id="index"
                    value={value}
                    onChange={onChange}
                    className="me-2 peer appearance-none w-4 h-4 bg-gray-300/40 border border-gray-200 rounded checked:bg-black" />
                <svg viewBox="0 0 24 24"
                    class="pointer-events-none absolute left-0.5 top-1 h-3 w-3
              opacity-0 peer-checked:opacity-100">
                    <path d="M20 6L9 17l-5-5" fill="none" stroke="white" stroke-width="3"
                        stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <span>{value}</span>
            </label>
        </>
    )
}

export default CheckBox;