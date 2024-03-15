import { Package } from "@/types/package";
import { useEffect, useState } from "react";
import axios from 'axios';
import { RiOpenaiFill } from "react-icons/ri";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { MdOutlineFileDownload } from "react-icons/md";


const packageData: Package[] = [
  {
    name: "Free package",
    price: 0.0,
    invoiceDate: `Jan 13,2023`,
    status: "Paid",
  },
  {
    name: "Standard Package",
    price: 59.0,
    invoiceDate: `Jan 13,2023`,
    status: "Paid",
  },
  {
    name: "Business Package",
    price: 99.0,
    invoiceDate: `Jan 13,2023`,
    status: "Unpaid",
  },
  {
    name: "Standard Package",
    price: 59.0,
    invoiceDate: `Jan 13,2023`,
    status: "Pending",
  },
];

interface TableThreeProps {
  prop: string;
}
interface ChartData {
  Date: number;
  Company: string;
  Name: string;
  Learnings: string;
  packageItem: string[];
  error: string;
}
const TableThree: React.FC<TableThreeProps> = ({ prop }) => {

  const cleanedProp = prop.replace(/NaN/g, 'null');

  const jsonData: ChartData[] = JSON.parse(cleanedProp);
  const uniqueLearnings = Array.from(new Set(jsonData));


  const handleDownload = (packageItem: ChartData) => {
    if (packageItem) {
      const content = `Company: ${packageItem.Company}\nDate: ${packageItem.Date}\nInsights: ${packageItem.Learnings}`;
      const blob = new Blob([content], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'insights.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleShare = (packageItem: ChartData) => {
    if (packageItem) {
      const content = `\nCompany: ${packageItem.Company}\nDate: ${packageItem.Date}\nInsights: ${packageItem.Learnings}`;
      try {
        const blob = new Blob([content], { type: 'text/plain' });
        const blobUrl = URL.createObjectURL(blob);
        const message = `Check out this insights:  ${content}`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
      } catch (error) {
        console.error('Error sharing file via WhatsApp:', error);
      }
    }
  };

  // const AIhandleDownload = async (packageItem: ChartData) => {
  //   if (packageItem) {
  //     try {
  //       const apiKey = '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';
  // const response = await axios.post(
  //   'https://api.openai.com/v1/engines/gpt-3.5-turbo-0301/completions',
  //   {
  //     prompt: `Refine the following insights:\n\nCompany: ${packageItem.Company}\nDate: ${packageItem.Date}\nInsights: ${packageItem.Learnings}\n\n`,
  //     max_tokens: 200,
  //     n: 1,
  //   },
  //   {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${apiKey}`,
  //     },
  //   }
  // );

  //       if (!response.data || response.data.choices.length === 0) {
  //         throw new Error('Failed to generate refined insights.');
  //       }

  //       const refinedInsights = response.data.choices[0].text.trim();

  //       const blob = new Blob([refinedInsights], { type: 'text/plain;charset=utf-8' });
  //       const link = document.createElement('a');
  //       link.href = URL.createObjectURL(blob);
  //       link.download = 'refined_insights.txt';
  //       document.body.appendChild(link);
  //       link.click();
  //       document.body.removeChild(link);
  //     } catch (error) {
  //       console.error('Error:', error.message);
  //     }
  //   }
  // };

  const handleAIDownload = async (packageItem: ChartData) => {
    try {
      const response = await axios.post(
        'https://open-ai21.p.rapidapi.com/conversationgpt35',
        {
          messages: [
            {
              role: 'user',
              content: `Refine the following insights:\n\nCompany: ${packageItem.Company}\nDate: ${packageItem.Date}\nInsights: ${packageItem.Learnings}\n\n`,
            },
          ],
          web_access: false,
          system_prompt: '',
          temperature: 0.9,
          top_k: 5,
          top_p: 0.9,
          max_tokens: 256
        },
        {
          headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'fa15cd3b21mshd04f3774d3312b8p1de02djsn2f951e135492',
            'X-RapidAPI-Host': 'open-ai21.p.rapidapi.com'
          },
        }
      );
      console.log(response.data.result)
      if (response.data && response.data.status) {
        const refinedInsights = response.data.result;

        const blob = new Blob([refinedInsights], { type: 'text/plain;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'refined_insights.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Learnings
      </h4>
      <div className="max-w-full overflow-x-auto">
        <div className="table-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                  Date
                </th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                  Company
                </th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                  Name
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Learnings
                </th>
              </tr>
            </thead>
            <tbody>
              {uniqueLearnings.map((packageItem, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <p className="text-sm">{packageItem.Date}</p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <h5 className="font-medium text-black dark:text-white">
                      {packageItem.Company}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {packageItem.Name}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
                      {packageItem.Learnings}
                    </div>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <div className="relative inline-block group">
                        <button className="group-hover:text-primary" onClick={() => handleAIDownload(packageItem)}>
                          <RiOpenaiFill />
                        </button>
                        <span className="opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-center rounded-md py-2 px-4 absolute bottom-full left-1/2 transform -translate-x-1/2 transition duration-300">
                          AI refiner
                        </span>
                      </div>
                      <div className="relative inline-block group">
                        <button className="hover:text-primary" onClick={() => handleShare(packageItem)}>
                          <FaRegShareFromSquare />
                        </button>
                        <span className="opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-center rounded-md py-2 px-4 absolute bottom-full left-1/2 transform -translate-x-1/2 transition duration-300">
                          Share
                        </span>
                      </div>
                      <div className="relative inline-block group">
                        <button className="hover:text-primary" onClick={() => handleDownload(packageItem)}>
                          <MdOutlineFileDownload />
                        </button>
                        <span className="opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-center rounded-md py-2 px-4 absolute bottom-full left-1/2 transform -translate-x-1/2 transition duration-300">
                          Download
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableThree;
