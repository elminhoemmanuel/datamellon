import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import { AiTwotonePieChart } from "react-icons/ai"
import Link from 'next/link'
import { fetch } from "../redux/actions/home"
import { useDispatch, useSelector } from 'react-redux'
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import SalesData from "../components/SalesData"
import ProfitsData from "../components/ProfitsData"
import QtyData from "../components/QtyData"


export default function Home() {

    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("sales");
    const dispatch = useDispatch();
    const { data, error, sales14, sales15, sales16, sales17,
        profit14, profit15, profit16, profit17, qty14, qty15, qty16, qty17,
    } = useSelector((state) => state.home);

    const compBarData = {
        options: {
            chart: {
                id: "bar-chart",
                type: 'bar',
                stacked: true,
                plotOptions: {
                    bar: {
                        horizontal: false,
                    },
                },
            },
            xaxis: {
                categories: [2014, 2015, 2016, 2017,]
            },
            colors: ['#72B046', "#67fb04", '#142c04', '#67fb04'],
            stroke: {
                curve: 'smooth',
                width: 2
            }
        },
        series: [
            {
                name: "Sales",
                data: [sales14, sales15, sales16, sales17,]
            },
            {
                name: "Profit",
                data: [profit14, profit15, profit16, profit17,]
            },
            {
                name: "Quantity",
                data: [qty14, qty15, qty16, qty17,]
            },
        ]
    };

    let sortedData1 = [...data];


    useEffect(() => {
        dispatch(fetch(() => { setLoading(false) }))
    }, [loading])


    return (
        <>
            <Head>
                <title>SkyHigh</title>
                <meta name="keywords" content="SkyHigh" />
            </Head>

            <div className='text-black'>
                <nav className='px-6 md:px-16 py-3 flex'>
                    <Link href="/">
                        <a className='flex items-center text-lg'>
                            <p className="text-gray-500">SkyHigh</p>
                            <div><AiTwotonePieChart className='text-green h-6 w-6' /></div>
                        </a>
                    </Link>
                </nav>

                <div>
                    {
                        loading ?
                            <div className='flex items-center justify-center py-8'>
                                <div className='spinner-page'></div>
                            </div>
                            :

                            <div >

                                {
                                    error === "" &&
                                    <div className="mx-auto w-4/5">

                                        <div className='mb-3 '>
                                            <div>
                                                <div><label>Show data for;</label></div>
                                                <div>
                                                    <select value={filter} onChange={(e) => { setFilter(e.target.value) }}
                                                        className="py-2 px-6 bg-transparent border border-gray-500 rounded focus:outline-none focus:border-green">
                                                        <option value="sales">Sales</option>
                                                        <option value="profits">Profits</option>
                                                        <option value="qty">Quantity</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        { filter === "sales" && <SalesData  />}
                                        { filter === "profits" && <ProfitsData  />}
                                        { filter === "qty" && <QtyData  />}

                                    </div>
                                }
                            </div>
                    }
                </div>

                <div className='flex items-center justify-center py-10'>
                    {
                        error && <p className='text-sm'>{error}</p>
                    }
                </div>
            </div>
        </>
    )
}
