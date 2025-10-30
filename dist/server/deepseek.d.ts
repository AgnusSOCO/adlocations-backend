/**
 * Analyze ad location photo and provide insights
 */
export declare function analyzeLocationPhoto(photoUrl: string, locationDetails: {
    title: string;
    address: string;
    type: string;
    dimensions?: string;
}): Promise<{
    visibility: string;
    condition: string;
    recommendations: string[];
    estimatedValue: string;
}>;
/**
 * Review landlord contract and extract key terms
 */
export declare function reviewContract(contractText: string): Promise<{
    summary: string;
    keyTerms: string[];
    risks: string[];
    recommendations: string[];
}>;
/**
 * Predict maintenance needs based on structure data
 */
export declare function predictMaintenance(structureData: {
    type: string;
    lastInspectionDate?: Date;
    maintenanceStatus: string;
    technicianNotes?: string;
    age?: number;
}): Promise<{
    urgency: "Low" | "Medium" | "High" | "Critical";
    predictedIssues: string[];
    recommendedActions: string[];
    estimatedCost: string;
    timeline: string;
}>;
/**
 * Generate professional client communication
 */
export declare function generateClientEmail(context: {
    purpose: "quote" | "renewal" | "maintenance" | "general";
    clientName: string;
    locationDetails?: string;
    additionalInfo?: string;
}): Promise<{
    subject: string;
    body: string;
}>;
/**
 * Enhanced market price intelligence
 */
export declare function enhancedPriceEstimation(locationData: {
    address: string;
    type: string;
    dimensions?: string;
    visibility?: string;
    traffic?: string;
    demographics?: string;
}): Promise<{
    estimatedPrice: number;
    priceRange: {
        min: number;
        max: number;
    };
    factors: string[];
    confidence: "Low" | "Medium" | "High";
    marketInsights: string;
}>;
/**
 * General AI assistant for queries
 */
export declare function aiAssistant(userQuery: string, context?: string): Promise<string>;
//# sourceMappingURL=deepseek.d.ts.map