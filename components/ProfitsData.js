import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ProfitsData = () => {

    const [sortSales, setSortSales] = useState("");
    const { data, error, sales14, sales15, sales16, sales17,
        profit14, profit15, profit16, profit17, qty14, qty15, qty16, qty17,
    } = useSelector((state) => state.home);

    const barData = {
        options: {
            chart: {
                id: "bar-chart"
            },
            xaxis: {
                categories: [2014, 2015, 2016, 2017,]
            },
            colors: ['#72B046', "#93b17d", '#142c04', '#67fb04'],
            stroke: {
                curve: 'smooth'
            }
        },
        series: [
            {
                name: "Profits",
                data: [profit14, profit15, profit16, profit17,]
            }
        ]
    };
    const pieData = {
        options: {
            colors: ['#72B046', "#93b17d", '#142c04', '#67fb04'],
            labels: ['2014', '2015', '2016', '2017']
        },
        series: [profit14, profit15, profit16, profit17,]
    };

    return (
        <div>
            <div className='py-6 '>
                <div>
                    <h1 className='font-bold text-sm md:text-2xl mb-6 text-center'>Bar Chart showing SkyHigh Profit data for the past 4 years </h1>
                </div>
                <div className="h-72 md:h-96">
                    <Chart
                        options={barData.options}
                        series={barData.series}
                        type="bar"
                        width="100%"
                        height="100%"
                    />
                </div>
            </div>

            <div className='py-6 '>
                <div>
                    <h1 className='font-bold text-sm md:text-2xl mb-6 text-center'>Pie chart showing SkyHigh Profit data for the past 4 years </h1>
                </div>
                <div className="h-auto md:h-96">
                    <Chart
                        options={pieData.options}
                        series={pieData.series}
                        type="pie"
                        width="100%"
                        height="100%"
                    />
                </div>
            </div>

            <div className='py-6 '>
                <div>
                    <h1 className='font-bold text-sm md:text-2xl mb-6 text-center'>Time series showing SkyHigh Profit data for the past 4 years </h1>
                </div>
                <div className="h-72 md:h-96">
                    <Chart
                        options={barData.options}
                        series={barData.series}
                        type="line"
                        width="100%"
                        height="100%"
                    />
                </div>
            </div>

            <div className='py-6 '>
                <div>
                    <h1 className='font-bold text-sm md:text-2xl mb-4 text-center'>Table showing SkyHigh Profit data for the past 4 years ( trauncated to first 30 values) </h1>
                </div>
                <div className='mb-3 '>
                    <div>
                        <div><label>Sort by;</label></div>
                        <div>
                            <select value={sortSales} onChange={(e) => { setSortSales(e.target.value) }}
                                className="py-2 px-6 bg-transparent border border-gray-500 rounded focus:outline-none focus:border-green">
                                <option value="">Select one</option>
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="">
                    <table className='text-sm text-gray-700 bg-white p-2 rounded shadow w-full'>
                        <thead className='border border-grayborder p-2'>
                            <tr>
                                <th className='px-2 py-1 text-left header' >2014</th>
                                <th className='px-2 py-1 text-left header' >2015</th>
                                <th className='px-2 py-1 text-left header' >2016</th>
                                <th className='px-2 py-1 text-left header' >2017</th>
                            </tr>
                        </thead>
                        {
                            sortSales === "" &&

                            <tbody>

                                {
                                    data.filter((item, x) => x + 1 < 30).map(item => (
                                        <tr key={item["Product ID"]}>
                                            <td className='p-2 border border-gray-300 cell' >
                                                {item["Order Date"].substr(item["Order Date"].length - 4) === "2014" &&
                                                    Number(item["Profit"]) > 0 ? Number(item["Profit"]) : ""
                                                }
                                            </td>
                                            <td className='p-2 border border-gray-300 cell' >
                                                {item["Order Date"].substr(item["Order Date"].length - 4) === "2015" &&
                                                    Number(item["Profit"]) > 0 ? Number(item["Profit"]) : ""
                                                }
                                            </td>
                                            <td className='p-2 border border-gray-300 cell' >
                                                {item["Order Date"].substr(item["Order Date"].length - 4) === "2016" &&
                                                    Number(item["Profit"]) > 0 ? Number(item["Profit"]) : ""
                                                }
                                            </td>
                                            <td className='p-2 border border-gray-300 cell' >
                                                {item["Order Date"].substr(item["Order Date"].length - 4) === "2017" &&
                                                    Number(item["Profit"]) > 0 ? Number(item["Profit"]) : ""
                                                }
                                            </td>

                                        </tr>
                                    ))
                                }
                                <tr>
                                    <td className='p-2 border border-gray-300 cell font-bold' >
                                        Total : {profit14}
                                    </td>
                                    <td className='p-2 border border-gray-300 cell font-bold' >
                                        Total : {profit15}
                                    </td>
                                    <td className='p-2 border border-gray-300 cell font-bold' >
                                        Total : {profit16}
                                    </td>
                                    <td className='p-2 border border-gray-300 cell font-bold' >
                                        Total : {profit17}
                                    </td>
                                </tr>
                            </tbody>
                        }

                        {/* for ascending sort */}
                        {
                            sortSales === "asc" &&

                            <tbody>

                                {
                                    data.filter((item, x) => x + 1 < 30).sort((a, b) => {
                                        if ((Number(a["Profit"]) || 0) > (Number(b["Profit"])) || 0) return 1;
                                        if ((Number(a["Profit"]) || 0) < (Number(b["Profit"])) || 0) return -1;
                                        return 0;
                                    }).map(item => (
                                        <tr key={item["Product ID"]}>
                                            <td className='p-2 border border-gray-300 cell' >
                                                {item["Order Date"].substr(item["Order Date"].length - 4) === "2014" &&
                                                    Number(item["Profit"]) > 0 ? Number(item["Profit"]) : ""
                                                }
                                            </td>
                                            <td className='p-2 border border-gray-300 cell' >
                                                {item["Order Date"].substr(item["Order Date"].length - 4) === "2015" &&
                                                    Number(item["Profit"]) > 0 ? Number(item["Profit"]) : ""
                                                }
                                            </td>
                                            <td className='p-2 border border-gray-300 cell' >
                                                {item["Order Date"].substr(item["Order Date"].length - 4) === "2016" &&
                                                    Number(item["Profit"]) > 0 ? Number(item["Profit"]) : ""
                                                }
                                            </td>
                                            <td className='p-2 border border-gray-300 cell' >
                                                {item["Order Date"].substr(item["Order Date"].length - 4) === "2017" &&
                                                    Number(item["Profit"]) > 0 ? Number(item["Profit"]) : ""
                                                }
                                            </td>

                                        </tr>
                                    ))
                                }
                                <tr>
                                    <td className='p-2 border border-gray-300 cell font-bold' >
                                        Total : {profit14}
                                    </td>
                                    <td className='p-2 border border-gray-300 cell font-bold' >
                                        Total : {profit15}
                                    </td>
                                    <td className='p-2 border border-gray-300 cell font-bold' >
                                        Total : {profit16}
                                    </td>
                                    <td className='p-2 border border-gray-300 cell font-bold' >
                                        Total : {profit17}
                                    </td>
                                </tr>
                            </tbody>
                        }


                        {/* for descending sort */}
                        {
                            sortSales === "desc" &&

                            <tbody>

                                {
                                    data.filter((item, x) => x + 1 < 30).sort((a, b) => {
                                        if ((Number(a["Profit"]) || 0) > (Number(b["Profit"])) || 0) return -1;
                                        if ((Number(a["Profit"]) || 0) < (Number(b["Profit"])) || 0) return 1;
                                        return 0;
                                    }).map(item => (
                                        <tr key={item["Product ID"]}>
                                            <td className='p-2 border border-gray-300 cell' >
                                                {item["Order Date"].substr(item["Order Date"].length - 4) === "2014" &&
                                                    Number(item["Profit"]) > 0 ? Number(item["Profit"]) : ""
                                                }
                                            </td>
                                            <td className='p-2 border border-gray-300 cell' >
                                                {item["Order Date"].substr(item["Order Date"].length - 4) === "2015" &&
                                                    Number(item["Profit"]) > 0 ? Number(item["Profit"]) : ""
                                                }
                                            </td>
                                            <td className='p-2 border border-gray-300 cell' >
                                                {item["Order Date"].substr(item["Order Date"].length - 4) === "2016" &&
                                                    Number(item["Profit"]) > 0 ? Number(item["Profit"]) : ""
                                                }
                                            </td>
                                            <td className='p-2 border border-gray-300 cell' >
                                                {item["Order Date"].substr(item["Order Date"].length - 4) === "2017" &&
                                                    Number(item["Profit"]) > 0 ? Number(item["Profit"]) : ""
                                                }
                                            </td>

                                        </tr>
                                    ))
                                }
                                <tr>
                                    <td className='p-2 border border-gray-300 cell font-bold' >
                                        Total : {profit14}
                                    </td>
                                    <td className='p-2 border border-gray-300 cell font-bold' >
                                        Total : {profit15}
                                    </td>
                                    <td className='p-2 border border-gray-300 cell font-bold' >
                                        Total : {profit16}
                                    </td>
                                    <td className='p-2 border border-gray-300 cell font-bold' >
                                        Total : {profit17}
                                    </td>
                                </tr>
                            </tbody>
                        }
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ProfitsData
