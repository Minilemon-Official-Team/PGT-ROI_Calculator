import DropDown from './DropDown';
import { useState } from 'react';

function FormCalculator() {
    const dataEquipment = [
        "Peralatan Produksi",
        "Peralatan Pengemasan",
        "Peralatan Kantor & Kasir",
        "Peralatan Penyimpanan",
        "Peralatan Pemasaran",
        "Kendaraan Operasional"
    ];

    const dataFinancial = [
        {
            "title": "Initial Investment (Rp)",
            "value": 50000,
        },
        {
            "title": "Expected Monthly Revenue (Rp)",
            "value": 8000,
        },
        {
            "title": "Monthly Operating Costs (Rp)",
            "value": 3000,
        }
    ];

    const dataFunding = ['Self Funded', 'Bank Loan', 'Investor Funding', 'Goverment Grant', 'CrowdFunding'];
    const dataBM = ['Produksi (B2B)', 'Penjualan Langsung (B2C)', 'Layanan Berlangganan', 'Waralaba (Franchise'];

    const [form, setForm] = useState({
        funding: "",
        business_model: "",
        time_frame: 24,
    });

    return (
        <>
            <form className="m-auto w-5xl mt-4">
                <section className="mb-4 px-8 py-4 rounded-2xl border border-gray-300 shadow">
                    <h2>Equipment</h2>
                    <p className="font-semibold mt-4">Select Equipment Types</p>
                    <div className="flex flex-col">
                        {
                            dataEquipment.map((item, index) => (
                                <label htmlFor="" key={index} className="relative my-2">
                                    <input type="checkbox" id="index"
                                        className="me-2 peer appearance-none w-4 h-4 bg-gray-300/40 border border-gray-200 rounded checked:bg-black" />
                                    <svg viewBox="0 0 24 24"
                                        class="pointer-events-none absolute left-0.5 top-1 h-3 w-3
              opacity-0 peer-checked:opacity-100">
                                        <path d="M20 6L9 17l-5-5" fill="none" stroke="white" stroke-width="3"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <span className="font-semibold">{item}</span>
                                </label>
                            ))
                        }
                    </div>
                </section>
                <section className="grid grid-cols-2 gap-8">
                    <div className="px-8 py-4 rounded-2xl border border-gray-300 shadow">
                        <h2>Financial Details</h2>
                        <div className="mt-4">
                            {
                                dataFinancial.map((item, index) => (
                                    <div key={index} className="mt-4">
                                        <label htmlFor="" className="block mb-2 font-semibold">
                                            {item.title}
                                        </label>
                                        <input type="number" name="" id="" min={0} value={item.value} className="bg-gray-100 rounded w-11/12 h-9 focus:outline-gray-200 px-4" />
                                    </div>
                                ))
                            }
                            <label htmlFor="" className="block font-semibold mt-4">Timeframe (months): {form.time_frame}</label>
                            <input
                                type="range"
                                min={6}
                                max={60}
                                step={6}
                                value={form.time_frame}
                                className='accent-black'
                                onChange={(e) => setForm({ ...e, time_frame: Number(e.target.value) })}
                            />
                        </div>
                    </div>
                    <div className="px-8 py-4 rounded-2xl border border-gray-300 shadow">
                        <h2>Business Strategy</h2>
                        <DropDown
                            data={dataFunding}
                            title={"Funding Options"}
                            value={form.funding}
                            onChange={(value) => setForm(f => ({ ...f, funding: value }))}
                            name={"funding-options"}
                            placeholder={"Select funding source"}
                        />
                        <DropDown
                            data={dataBM}
                            title={"Business Model"}
                            value={form.business_model}
                            onChange={(value) => setForm(bm => ({ ...bm, funding: value }))}
                            name={"business-model"}
                            placeholder={"Select business model"}
                        />
                    </div>
                </section>
                <section className='px-8 py-8 mt-4 border border-gray-300 shadow rounded'>
                    <button className='w-full py-3 bg-gray-500 text-white rounded cursor-pointer hover:bg-gray-400'>Calculate ROI</button>
                    <p className='text-center text-black/60 mt-4'>Complete more fields to calculate ROI</p>
                </section>
            </form>
        </>
    )
}

export default FormCalculator;