import { useCallback } from "react";
import axios from "axios";

export const useCheckedInPatientData = (baseUrl, token) => {
  const fetchPatients = useCallback(
    async (query) => {
      try {
        const response = await axios.get(`${baseUrl}opd-setting`, {
          headers: { Authorization: `Bearer ${token}` },
        });

          const data = response.data;
          
        const LaboratoryCode = data?.find(
          (item) => item.moduleServiceName === "Laboratory"
        )?.moduleServiceCode;
          
          console.log("code", LaboratoryCode);

        if (LaboratoryCode) {
          const patientResponse = await axios.get(
            `${baseUrl}patient/checked-in-by-service/${LaboratoryCode}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          return patientResponse.data;
        }
      } catch (error) {
        console.error("Failed to fetch patients:", error);
        return [];
      }
    },
    [baseUrl, token]
  );

  return { fetchPatients };
};
