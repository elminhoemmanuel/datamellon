import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const CompData = () => {

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


    return (
        <div>

            <div className='py-6 '>
                <div>
                    <h1 className='font-bold text-sm md:text-2xl mb-6 text-center'>Composite bar chart showing SkyHigh Sales, Profit and Quantity data for the past 4 years </h1>
                </div>
                <div className="h-72 md:h-96 height flex items-center justify-center">
                    <Chart
                        options={compBarData.options}
                        series={compBarData.series}
                        type="bar"
                        width="100%"
                        height="100%"
                    />
                </div>
            </div>



            <div className='py-6 '>
                <div>
                    <h1 className='font-bold text-sm md:text-2xl mb-6 text-center'>Composite Time series showing SkyHigh Sales, Profit and Quantity data for the past 4 years </h1>
                </div>
                <div className="h-72 md:h-96 height">
                    <Chart
                        options={compBarData.options}
                        series={compBarData.series}
                        type="line"
                        width="100%"
                        height="100%"
                    />
                </div>
            </div>


        </div>
    )
}

export default CompData
