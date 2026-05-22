/* eslint-disable @typescript-eslint/no-explicit-any */ 
"use client";

import { SourcingSection, CustomSourcingPayload } from "@/types";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3005";

export const useSourcingCategories = () =>
	useQuery({
		queryKey: ["sourcing-categories-public"],
		queryFn: async () => {
			const { data } = await axios.get(`${API_URL}/sourcing-categories/public`);
			return data as {
				success: boolean;
				data: any[];
				grouped: SourcingSection[];
			};
		},
		staleTime: 10 * 60 * 1000,
	});

export const useSubmitCustomSourcing = () =>
	useMutation({
		mutationFn: async (payload: CustomSourcingPayload) => {
			const { data } = await axios.post(`${API_URL}/custom-sourcing`, payload);
			return data;
		},
	});
