export declare function estimateAdPrice(params: {
    type: string;
    dimensions?: string;
    address: string;
    material?: string;
    notes?: string;
}): Promise<{
    priceEstimate: number;
    reasoning: string;
}>;
export declare function generateQuote(params: {
    clientName: string;
    locationTitle: string;
    locationAddress: string;
    dimensions?: string;
    type: string;
    priceEstimate: number;
    contractDuration: number;
}): Promise<string>;
export declare function predictRenewalLikelihood(params: {
    clientName: string;
    paymentStatus: string;
    accountStatus: string;
    contractStartDate: Date;
    contractEndDate: Date;
    rentAmount: number;
}): Promise<{
    likelihood: number;
    reasoning: string;
    recommendations: string[];
}>;
//# sourceMappingURL=ai.d.ts.map