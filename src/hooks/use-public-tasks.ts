/* eslint-disable @typescript-eslint/no-explicit-any */
import { publicApi } from "@/app/api/axiosInstance";
import { ApiEndpoints } from "@/app/api/endpoints";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface PublicTaskUser {
	found: boolean;
	email: string;
	name?: string;
	contact_id?: string | null;
	is_staff?: boolean;
}

export interface ConfirmedUser {
	contact_id: string;
	name: string;
	email: string;
}

export interface PublicTask {
	id: string;
	Subject: string;
	Description?: string;
	Status: string;
	Priority: string;
	Due_Date?: string;
	Staff_Name?: string | null;
	Owner?: { name: string; id: string; email?: string };
	Who_Id?: { name: string; id: string };
	Created_Time: string;
	Modified_Time: string;
}

export const useIdentifyUser = () =>
	useMutation({
		mutationFn: async (email: string) => {
			const res: any = await publicApi.post(ApiEndpoints.PUBLIC_TASK_IDENTIFY, {
				email,
			});
			return (res?.data ?? res) as PublicTaskUser;
		},
	});

export const useConfirmUser = () =>
	useMutation({
		mutationFn: async (payload: {
			email: string;
			firstName?: string;
			lastName?: string;
			phone?: string;
		}) => {
			const res: any = await publicApi.post(
				ApiEndpoints.PUBLIC_TASK_CONFIRM,
				payload
			);
			return (res?.data ?? res) as ConfirmedUser;
		},
	});

export const usePublicTasks = (email: string | null) =>
	useQuery({
		queryKey: ["public-tasks", email],
		queryFn: async () => {
			if (!email) throw new Error("email required");
			const res: any = await publicApi.get(
				`${ApiEndpoints.PUBLIC_TASKS}?email=${encodeURIComponent(email)}`
			);
			const payload = res?.data ?? res;
			return payload as {
				email: string;
				contact_id: string | null;
				tasks: PublicTask[];
				total: number;
			};
		},
		enabled: !!email,
		staleTime: 30 * 1000,
	});

export const useCreatePublicTask = () => {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async (payload: {
			email: string;
			contact_id: string;
			subject: string;
			description?: string;
			priority?: "low" | "medium" | "high" | "urgent";
			status?: "pending" | "in_progress" | "review" | "completed" | "cancelled";
			dueDate?: string;
			staffName?: string;
		}) => {
			const res: any = await publicApi.post(ApiEndpoints.PUBLIC_TASKS, payload);
			return res?.data ?? res;
		},
		onSuccess: (_, vars) => {
			qc.invalidateQueries({ queryKey: ["public-tasks", vars.email] });
		},
	});
};

const STATUS_TO_API: Record<string, string> = {
	"Not Started": "pending",
	"In Progress": "in_progress",
	"Waiting for input": "review",
	Completed: "completed",
	Deferred: "cancelled",
};

export const useUpdateTaskStatus = (email: string) => {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async ({
			taskId,
			status,
		}: {
			taskId: string;
			status: string;
		}) => {
			const apiStatus = STATUS_TO_API[status] ?? "pending";
			const res: any = await publicApi.patch(
				`${ApiEndpoints.PUBLIC_TASKS}/admin/${taskId}`,
				{ status: apiStatus }
			);
			return res?.data ?? res;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["public-tasks", email] });
		},
	});
};
