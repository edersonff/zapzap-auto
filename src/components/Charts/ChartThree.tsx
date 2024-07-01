import { useGetCountQuery } from "@/services/count/getConversationQuery";
import { useGetUsageQuery } from "@/services/user/getUserQuery";
import { CircularProgress } from "@mui/joy";
import { ApexOptions } from "apexcharts";
import React, { useMemo, useState } from "react";
import ReactApexChart from "react-apexcharts";

interface ChartThreeState {
  series: number[];
}

const options: ApexOptions = {
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "donut",
  },
  colors: ["#3C50E0", "#6577F3", "#8FD0EF", "#0FADCF"],
  labels: ["Mensagens Enviadas", "Limite de Mensagens"],
  legend: {
    show: false,
    position: "bottom",
  },

  plotOptions: {
    pie: {
      donut: {
        size: "65%",
        background: "transparent",
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 380,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};

const ChartThree = ({ planId }: { planId?: number }) => {
  const { data: usage } = useGetUsageQuery();

  const state = useMemo(() => {
    let limit;

    if (!planId) {
      limit = 10000;
    }

    if (!usage?.totalMessages) {
      return { series: [0] };
    }

    const series = limit ? [usage.totalMessages, limit] : [usage.totalMessages];

    return { series };
  }, [usage, planId]);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-5">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Uso de Mensagens
          </h5>
        </div>
      </div>

      <div className="mb-4">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={options}
            series={state.series}
            type="donut"
          />
        </div>
      </div>

      <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
        <div className="w-full px-8">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-primary"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> Mensagens Enviadas </span>
              <span> {usage?.totalMessages} </span>
            </p>
          </div>
        </div>
        <div className="w-full px-8">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#6577F3]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> Limite de Mensagens </span>
              <span> {planId ? "Ilimitado" : "10000"} </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartThree;
