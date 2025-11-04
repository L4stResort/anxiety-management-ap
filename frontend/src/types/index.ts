export interface UserResponse {
    userId: string;
    gad7Score: number;
    date: Date;
}

export interface Recommendation {
    title: string;
    description: string;
    tips: string[];
}