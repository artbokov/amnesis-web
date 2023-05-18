type valueOf<T> = T[keyof T];

const actions = {
	SEND: "send",
	COMMIT: "commit",
	EDIT: "edit",
};
type actionType = valueOf<typeof actions>;

const stages = {
	REQUEST: "request",
	APPROVE: "approve",
};
type stageType = valueOf<typeof stages>;

export type { actionType, stageType };
export { stages, actions };
