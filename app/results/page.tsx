"use client";
import { fetchModels } from "@/lib/api";
import { data } from "@/lib/definitions";
import React, { useEffect, useState } from "react";

const TABLE_HEAD = ["Id", "Name", "Predictions", "Questions"];

export default function Result() {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState([]);

  const handleSearch = (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const searchString = formData.get("searchText");
    if (!searchString || searchString.toString().length === 0) {
      setSelectedModel(models);
    }

    const chosenModel = models.find(
      (elem: any) => elem.attributes.name === searchString
    );
    setSelectedModel(chosenModel ? [chosenModel] : []);
  };

  useEffect(() => {
    fetchModels()
      .then((response: any) => {
        console.log(response);
        setModels(response);
        setSelectedModel(response);
      })
      .catch((error: Error) => console.log(error));
  }, []);

  return (
    <div className="max-width: fit-content">
      <div className="col-span-full">
        <label
          htmlFor="searchText"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Search Model
        </label>
        <div className="mt-2">
          <select
            id="{searchText}"
            name="{}"
            autoComplete="{}"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
          >
            {(
              [
                {
                  attributes: {
                    name: "",
                  },
                },
                ...(models ? models : []),
              ] as any
            ).map((el: any, idx: number) => {
              return <option key={idx}>{el.attributes.name}</option>;
            })}
          </select>
        </div>
      </div>
      <table className="max-width: fit-content min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="p-4 pt-10">
                <p color="blue-gray" className="font-bold leading-none">
                  {head}
                </p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((elem, index) => {
            return (
              <tr key={index}>
                <td className="p-4">
                  <p color="blue-gray" className="font-bold">
                    {elem.id}
                  </p>
                </td>
                <td className="p-4">
                  <p className="font-normal text-gray-600">
                    {elem.attributes.name}
                  </p>
                </td>
                <td className="p-4">
                  <p className="font-normal text-gray-600">
                    {elem.attributes.metadata.prediction.domain.values.join(
                      " "
                    )}
                  </p>
                </td>
                <td className="p-4">
                  <p className="font-normal text-gray-600">
                    {elem.attributes.metadata.attributes.reduce(
                      (acc, curr) => `${acc} ${curr.question}`,
                      ""
                    )}
                  </p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
