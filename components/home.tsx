"use client";
import { data } from "../lib/definitions";
import { fetchDrinksModel, postDrinksModelAttributes } from "../lib/api";
import { useEffect, useState } from "react";
import { createDrinkChoiceModel } from "@/lib/action";
import { useRouter } from "next/navigation";

export default function Home() {
  const [requestData, setRequestData] = useState();
  const router = useRouter();

  const handleSave = (event: any) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    createDrinkChoiceModel(formData);

    const values = Object.fromEntries(formData.entries());

/*
    postDrinksModelAttributes(values)
      .then((response: any) => router.push("/result"))
      .catch((error: any) => console.log("Error" + error));
*/
    event.target.reset();
    router.push("show");
  };

  const handleSearch = (event: any) => {
    event.preventDefault();
    console.log("1 ###########################");
    const formData = new FormData(event.target);
    const searchString = formData.get("searchText");

    fetchDrinksModel(searchString && searchString.toString() || "")
      .then((response: any) => console.log(response))
      .catch((error: any) => console.log("Error" + error));
    event.target.reset();
  };
  useEffect(() => {
    fetchDrinksModel()
      .then((response: any) => {
        console.log(response);
        setRequestData(response);
      })
      .catch((error: Error) => console.log(error));
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="col-span-full">
          <form onSubmit={handleSearch} className="space-y-3">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              AI Model Id
            </h2>
            <div className="mt-2 flex items-center gap-x-3">
              <input
                type="text"
                id="searchText"
                name="searchText"
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={(requestData ? requestData : data[0]).id}
                defaultValue={(requestData ? requestData : data[0]).id}
                required
              />
              <button
                type="submit"
                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <form onSubmit={handleSave} className="space-y-3">
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Model Name
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  {(requestData ? requestData : data[0]).attributes.name}
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
                  {(requestData
                    ? requestData
                    : data[0]
                  ).attributes.metadata.attributes.map((elem: any, index: number) => {
                    return (
                      <div key={index} className="sm:col-span-12">
                        <label
                          htmlFor={elem.name}
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          {elem.question}
                        </label>
                        <div className="mt-2">
                          {elem.domain.values ? (
                            <select
                              id={elem.name}
                              name={elem.name}
                              autoComplete={elem.name}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                              {elem.domain.values.map((el: any, idx: number) => {
                                return <option key={idx}>{el}</option>;
                              })}
                            </select>
                          ) : (
                            <input
                              type="text"
                              id={elem.name}
                              name={elem.name}
                              aria-describedby="helper-text-explanation"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder={elem.domain.lower}
                              defaultValue={elem.domain.lower}
                              required
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        TOM drink choice AI models
      </footer>
    </div>
  );
}