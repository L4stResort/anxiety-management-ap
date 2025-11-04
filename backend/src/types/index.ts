export interface UserResponse {
    userId: string;
    gad7Score: number;
    anxietyLevel: string;
}

export interface Recommendation {
    title: string;
    description: string;
    tips: string[];
}