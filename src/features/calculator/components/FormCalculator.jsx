import DropDown from './DropDown';
import { useState, useEffect } from 'react';
import { Building, DollarSign, TrendingUp } from 'lucide-react';

function FormCalculator({ totalProgress }) {
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
            "id": "initial_investment",
            "title": "Modal Awal (Rp)"
        },
        {
            "id": "monthly_revenue",
            "title": "Pendapatan Bulanan (Rp)"
        },
        {
            "id": "operating_costs",
            "title": "Biaya Operasional Bulanan (Rp)"
        }
    ];

    const dataFunding = ['Self Funded', 'Bank Loan', 'Investor Funding', 'Goverment Grant', 'CrowdFunding'];
    const dataBM = ['Produksi (B2B)', 'Penjualan Langsung (B2C)', 'Layanan Berlangganan', 'Waralaba (Franchise'];

    const [form, setForm] = useState({
        equipment: [],
        initial_investment: 50000,
        monthly_revenue: 8000,
        operating_costs: 3000,
        funding: "",
        business_model: "",
        time_frame: 24,
    });

    const [progress, setProgress] = useState(0);

    const updateProgress = (form) => {
        let count = 0;

        if (Array.isArray(form.equipment) && form.equipment.length > 0) count += 1;
        console.log(count);

        if (typeof form.initial_investment === "number" && form.initial_investment > 0) count += 1;
        if (typeof form.monthly_revenue === "number" && form.monthly_revenue > 0) count += 1;
        if (typeof form.operating_costs === "number" && form.operating_costs > 0) count += 1;

        if (typeof form.funding == "string" && form.funding.trim() !== "") count += 1;
        if (typeof form.business_model == "string" && form.business_model.trim() !== "") count += 1;

        setProgress(count);
    }

    useEffect(() => {
        updateProgress(form);
    }, [form])

    useEffect(() => {
        totalProgress(progress)
    }, [progress, totalProgress])

    const handleCheckboxToggle = (e) => {
        const { checked, value } = e.target;
        setForm(prev => ({
            ...prev,
            equipment: checked ? [...prev.equipment, value]
                : prev.equipment.filter(v => v !== value)
        }));
    }

    return (
        <div className='m-auto'>
            <form className="w-sm md:w-4xl mt-4 flex flex-col">
                <section className="mb-4 px-8 py-4 rounded-2xl border border-gray-300 shadow">
                    <div className='flex flex-row gap-2'>
                        <Building />
                        <h2 className='font-semibold'>Peralatan</h2>
                    </div>
                    <p className="mt-4">Pilih Jenis Peralatan</p>
                    <div className="flex flex-col">
                        {
                            dataEquipment.map((item, index) => (
                                <label htmlFor="" key={index} className="relative my-2">
                                    <input type="checkbox" id="index"
                                        value={item}
                                        onChange={handleCheckboxToggle}
                                        className="me-2 peer appearance-none w-4 h-4 bg-gray-300/40 border border-gray-200 rounded checked:bg-black" />
                                    <svg viewBox="0 0 24 24"
                                        class="pointer-events-none absolute left-0.5 top-1 h-3 w-3
              opacity-0 peer-checked:opacity-100">
                                        <path d="M20 6L9 17l-5-5" fill="none" stroke="white" stroke-width="3"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <span>{item}</span>
                                </label>
                            ))
                        }
                        <div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
                            {form.equipment?.map((item, index) => (
                                <span key={index} className='flex justify-center items-center text-center bg-gray-200 rounded me-2'>{item}</span>
                            ))}
                        </div>
                    </div>
                </section>
                <section className="grid md:grid-cols-2 gap-8">
                    <div className="px-8 py-8 rounded-2xl border border-gray-300 shadow">
                        <div className='flex flex-row gap-2'>
                            <DollarSign />
                            <h2 className='font-semibold'>Rincian Keuangan</h2>
                        </div>
                        <div className="mt-4">
                            {
                                dataFinancial.map((item, index) => (
                                    <div key={index} className="mt-4">
                                        <label htmlFor="" className="block mb-2 font-semibold">
                                            {item.title}
                                        </label>
                                        <input
                                            type="number"
                                            name=""
                                            id=""
                                            min={0}
                                            value={form[item.id]}
                                            onChange={(e) => setForm(prev => ({ ...prev, [item.id]: Number(e.target.value) }))}
                                            className="bg-gray-100 rounded w-11/12 h-9 focus:outline-gray-200 px-4" />
                                    </div>
                                ))
                            }
                            <label htmlFor="" className="block font-semibold mt-4">Jangka Waktu (Bulan): {form.time_frame}</label>
                            <div className='relative w-full h-4 bg-gray-200 rounded-full'>
                                <div
                                    className='absolute h-4 bg-black rounded-full'
                                    style={{ width: `${((form.time_frame - 6) / (60 - 6)) * 100}%` }}
                                ></div>
                                <input
                                    type="range"
                                    min={6}
                                    max={60}
                                    step={6}
                                    value={form.time_frame}
                                    className='accent-white absolute left-0 w-full h-4 appearance-none bg-transparent cursor-pointer'
                                    onChange={(e) => setForm(prev => ({ ...prev, time_frame: Number(e.target.value) }))}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="px-8 py-4 rounded-2xl border border-gray-300 shadow">
                        <div className='flex flex-row gap-2'>
                            <TrendingUp />
                            <h2 className='font-semibold'>Strategi Bisnis</h2>
                        </div>
                        <DropDown
                            data={dataFunding}
                            title={"Pilihan Pendanaan"}
                            value={form.funding}
                            onChange={(e) => setForm(prev => ({ ...prev, funding: e }))}
                            name={"funding-options"}
                            placeholder={"Select funding source"}
                        />
                        <DropDown
                            data={dataBM}
                            title={"Model Bisnis"}
                            value={form.business_model}
                            onChange={(e) => setForm(prev => ({ ...prev, business_model: e }))}
                            name={"business-model"}
                            placeholder={"Pilih model bisnis"}
                        />
                    </div>
                </section>
                <section className='px-8 py-8 mt-4 border border-gray-300 shadow rounded'>
                    <button
                        className={[
                            'w-full py-3 text-white rounded transition-colors',
                            progress === 6 ? 'bg-black hover:bg-black/50 cursor-pointer' : 'bg-gray-500 text-white/70'
                        ].join(" ")}>Hitung ROI</button>
                    {progress !== 6 ? <p className='text-center text-black/60 mt-4'>Lengkapi beberapa kolom lagi untuk menghitung ROI.</p> : <span></span>}

                </section>
            </form>
        </div>
    )
}

export default FormCalculator;