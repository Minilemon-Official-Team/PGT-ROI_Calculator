import React from "react";
import {
  TrendingUp,
  Calculator,
  BarChart3,
  MapPin,
  Briefcase,
  Target,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <section className="text-center py-16 px-6">
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-full bg-[#0b1020] flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">
          ROI Kalkulator & Dashboard Analitik
        </h1>

        <p className="max-w-2xl mx-auto text-gray-600 mb-6 text-sm md:text-base">
          Gunakan kalkulator ROI komprehensif kami untuk membuat keputusan investasi yang lebih cerdas.
          Evaluasi potensi pengembalian berbagai model bisnis, dan visualisasikan proyeksi keuangan Anda
          dengan mudah.
        </p>

        <Link
          to="/kalkulator"
          className="inline-flex items-center bg-[#0b1020] text-white px-5 py-2 rounded-md text-sm font-medium hover:opacity-95 transition"
        >
          <Calculator className="w-4 h-4 mr-2" /> Mulai Hitung ROI
        </Link>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-2xl p-6 bg-grey-300 shadow-sm hover:shadow-md transition">
            <div className="flex items-start gap-3">
              <div className="bg-gray-200 p-3 rounded-xl inline-flex items-center justify-center">
                <Calculator className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">
                  Kalkulator ROI
                </h3>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed max-w-xl">
                  Hitung tingkat pengembalian investasi Anda melalui formulir input lengkap yang mencakup
                  jenis peralatan dan model bisnis yang digunakan.
                </p>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition">
            <div className="flex items-start gap-3">
              <div className="bg-gray-200 p-3 rounded-xl inline-flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">
                  Dashboard Analitik
                </h3>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed max-w-xl">
                  Dashboard lengkap yang menampilkan grafik interaktif dan berbagai metrik kinerja utama.
                </p>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition">
            <div className="flex items-start gap-3">
              <div className="bg-gray-200 p-3 rounded-xl inline-flex items-center justify-center">
                <MapPin className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">
                  Location Analysis
                </h3>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed max-w-xl">
                  Compare ROI across all NYC boroughs with market insights and
                  regional performance data.
                </p>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition">
            <div className="flex items-start gap-3">
              <div className="bg-gray-200 p-3 rounded-xl inline-flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">
                  Model Bisnis
                </h3>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed max-w-xl">
                  Pelajari beragam model bisnis dan alternatif pendanaan guna memaksimalkan strategi investasi Anda.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="border border-gray-200 rounded-2xl p-8 text-center bg-white">
          <h3 className="text-lg font-semibold text-gray-900">
            Mengapa Menggunakan Kalkulator ROI Kami?
          </h3>
          <div className="w-20 h-1 bg-indigo-500 mt-3 mx-auto rounded-full"></div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-green-100 p-4 rounded-full mb-3">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900">
                Perhitungan yang Akurat
              </h4>
              <p className="text-sm text-gray-500 mt-2 max-w-xs">
                Hitung ROI secara presisi dengan menggunakan data pasar terkini dan model keuangan yang menyeluruh.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-indigo-100 p-4 rounded-full mb-3">
                <BarChart3 className="w-6 h-6 text-indigo-600" />
              </div>
              <h4 className="font-semibold text-gray-900">Analisis Visual</h4>
              <p className="text-sm text-gray-500 mt-2 max-w-xs">
                Visualisasikan perkembangan investasi Anda dari waktu ke waktu melalui grafik interaktif
                dan dasbor yang informatif.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-purple-100 p-4 rounded-full mb-3">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900">Market Insights</h4>
              <p className="text-sm text-gray-500 mt-2 max-w-xs">
                Compare across NYC boroughs and business models to find the best
                opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
