// Copyright 2023 Alexandr Vasilev
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <https://www.gnu.org/licenses/>.

import "./statistics.scss";
import {
    AreaChart,
    Area,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer, YAxis, XAxisProps, Legend, Line,
} from "recharts";

// const data = [
//     { name: "0:00", Total: 27 },
//     { name: "3:00", Total: 22 },
//     { name: "6:00", Total: 24 },
//     { name: "9:00", Total: 24 },
//     { name: "12:00", Total: 22 },
//     { name: "15:00", Total: 25 },
//     { name: "18:00", Total: 23 },
//     { name: "21:00", Total: 26 },
// ];

const Statistics = ({ type, aspect, data, title }) => {
    var chartValue, chartData

    if (data !== undefined){
         chartData = [
            { time: data[0], Total: data[1] },
            { time: data[2], Total: data[3] },
            { time: data[4], Total: data[5] },
            { time: data[6], Total: data[7] },
            { time: data[8], Total: data[9] },
            { time: data[10], Total: data[11] },
            { time: data[12], Total: data[13] },
            { time: data[14], Total: data[15] },
        ]
        switch(type) {
            case "Автополив":
                chartValue = 'Влажность'
                break;
            default:
                break;
        }
    }

    // console.log(chartValue)
    return (
        <div className="chart">
            <div className="title">{title}</div>
            <ResponsiveContainer width="100%" aspect={aspect}>
                <AreaChart
                    width={730}
                    height={250}
                    data={chartData}
                    margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="time" stroke="gray" />
                    <YAxis dataKey="Total" stroke="gray" />
                    <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36}/>
                    {/*<Line name={chartValue} type="monotone" dataKey="Total" stroke="#8884d8" />*/}
                    {/*<Line name="uv of pages" type="monotone" dataKey="Total" stroke="#82ca9d" />*/}
                    <Area
                        type="monotone"
                        dataKey="Total"
                        name={chartValue}
                        stroke="#8884d8"
                        fillOpacity={1}
                        fill="url(#total)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Statistics;