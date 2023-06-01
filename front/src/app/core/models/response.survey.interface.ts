export interface ResponseSurvey {
	title: string;
	image?: Iimage[];
	correctAnswer: string;
	wrongAnswer1: string;
	wrongAnswer2?: string;
	wrongAnswer3?: string;
	points: number;
}

export interface Iimage {
	name: string;
	type: string;
	content: string;
}
