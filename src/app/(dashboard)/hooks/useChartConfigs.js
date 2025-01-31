"use client";
import { useState, useEffect } from "react";
import localforage from "localforage";

function useChartConfigs(storageKey) {
  const [chartConfigs, setChartConfigs] = useState({});

  // Load chart configurations from localforage on initial render
  useEffect(() => {
    async function loadConfigs() {
      const savedConfigs = await localforage.getItem(storageKey);
      if (savedConfigs) {
        setChartConfigs(savedConfigs);
      }
    }
    loadConfigs();
  }, [storageKey]);

  // Save chart configurations to localforage whenever they change
  useEffect(() => {
    localforage.setItem(storageKey, chartConfigs);
  }, [chartConfigs, storageKey]);

  return [chartConfigs, setChartConfigs];
}

export default useChartConfigs;