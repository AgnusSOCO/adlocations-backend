import { ENV } from "./_core/env.js";

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const DEEPSEEK_MODEL = "deepseek/deepseek-chat";

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

interface DeepSeekResponse {
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

/**
 * Call DeepSeek via OpenRouter API
 */
async function callDeepSeek(
  messages: Message[],
  options: {
    temperature?: number;
    max_tokens?: number;
  } = {}
): Promise<string> {
  const response = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ENV.openRouterApiKey}`,
      "HTTP-Referer": "https://ad-locations-platform.manus.space",
      "X-Title": "Ad Locations Management Platform",
    },
    body: JSON.stringify({
      model: DEEPSEEK_MODEL,
      messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.max_tokens ?? 2000,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`DeepSeek API error: ${response.status} - ${error}`);
  }

  const data: DeepSeekResponse = await response.json();
  return data.choices[0]?.message?.content || "";
}

/**
 * Analyze ad location photo and provide insights
 */
export async function analyzeLocationPhoto(photoUrl: string, locationDetails: {
  title: string;
  address: string;
  type: string;
  dimensions?: string;
}): Promise<{
  visibility: string;
  condition: string;
  recommendations: string[];
  estimatedValue: string;
}> {
  const prompt = `As an outdoor advertising expert, analyze this ad location:

Location: ${locationDetails.title}
Address: ${locationDetails.address}
Type: ${locationDetails.type}
Dimensions: ${locationDetails.dimensions || "Not specified"}

Based on the location details, provide:
1. Visibility assessment (High/Medium/Low) with reasoning
2. Condition assessment of the area
3. 3-5 specific recommendations for maximizing advertising value
4. Estimated monthly rental value range

Respond in JSON format:
{
  "visibility": "High/Medium/Low",
  "condition": "Excellent/Good/Fair/Poor",
  "recommendations": ["rec1", "rec2", "rec3"],
  "estimatedValue": "$X,XXX - $Y,YYY per month"
}`;

  const response = await callDeepSeek([
    {
      role: "system",
      content: "You are an expert in outdoor advertising location analysis. Provide detailed, actionable insights.",
    },
    {
      role: "user",
      content: prompt,
    },
  ]);

  try {
    return JSON.parse(response);
  } catch {
    // Fallback if JSON parsing fails
    return {
      visibility: "Medium",
      condition: "Good",
      recommendations: ["Unable to parse detailed analysis"],
      estimatedValue: "Contact for pricing",
    };
  }
}

/**
 * Review landlord contract and extract key terms
 */
export async function reviewContract(contractText: string): Promise<{
  summary: string;
  keyTerms: string[];
  risks: string[];
  recommendations: string[];
}> {
  const prompt = `Review this landlord contract and provide:

Contract Text:
${contractText}

Analyze and provide:
1. Brief summary (2-3 sentences)
2. Key terms and conditions (list 5-7 important points)
3. Potential risks or red flags (list any concerns)
4. Recommendations for negotiation or clarification

Respond in JSON format:
{
  "summary": "...",
  "keyTerms": ["term1", "term2", ...],
  "risks": ["risk1", "risk2", ...],
  "recommendations": ["rec1", "rec2", ...]
}`;

  const response = await callDeepSeek([
    {
      role: "system",
      content: "You are a legal expert specializing in commercial real estate and advertising contracts. Provide clear, actionable analysis.",
    },
    {
      role: "user",
      content: prompt,
    },
  ], { temperature: 0.3 });

  try {
    return JSON.parse(response);
  } catch {
    return {
      summary: "Unable to parse contract analysis",
      keyTerms: [],
      risks: [],
      recommendations: [],
    };
  }
}

/**
 * Predict maintenance needs based on structure data
 */
export async function predictMaintenance(structureData: {
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
}> {
  const prompt = `Analyze this advertising structure for maintenance prediction:

Type: ${structureData.type}
Last Inspection: ${structureData.lastInspectionDate?.toLocaleDateString() || "Never"}
Current Status: ${structureData.maintenanceStatus}
Technician Notes: ${structureData.technicianNotes || "None"}
Age: ${structureData.age || "Unknown"} years

Predict:
1. Maintenance urgency level
2. Likely issues that may arise
3. Recommended preventive actions
4. Estimated maintenance cost range
5. Recommended timeline for action

Respond in JSON format:
{
  "urgency": "Low/Medium/High/Critical",
  "predictedIssues": ["issue1", "issue2", ...],
  "recommendedActions": ["action1", "action2", ...],
  "estimatedCost": "$X,XXX - $Y,YYY",
  "timeline": "Within X weeks/months"
}`;

  const response = await callDeepSeek([
    {
      role: "system",
      content: "You are a structural engineer specializing in outdoor advertising structures. Provide practical maintenance predictions.",
    },
    {
      role: "user",
      content: prompt,
    },
  ]);

  try {
    return JSON.parse(response);
  } catch {
    return {
      urgency: "Medium",
      predictedIssues: ["Unable to predict specific issues"],
      recommendedActions: ["Schedule regular inspection"],
      estimatedCost: "Contact for estimate",
      timeline: "Within 3 months",
    };
  }
}

/**
 * Generate professional client communication
 */
export async function generateClientEmail(context: {
  purpose: "quote" | "renewal" | "maintenance" | "general";
  clientName: string;
  locationDetails?: string;
  additionalInfo?: string;
}): Promise<{
  subject: string;
  body: string;
}> {
  const prompt = `Generate a professional email for:

Purpose: ${context.purpose}
Client Name: ${context.clientName}
Location Details: ${context.locationDetails || "N/A"}
Additional Context: ${context.additionalInfo || "N/A"}

Create a professional, friendly email with:
- Appropriate subject line
- Proper greeting
- Clear, concise body
- Professional closing

Respond in JSON format:
{
  "subject": "...",
  "body": "..."
}`;

  const response = await callDeepSeek([
    {
      role: "system",
      content: "You are a professional business communications expert. Write clear, friendly, and effective emails.",
    },
    {
      role: "user",
      content: prompt,
    },
  ], { temperature: 0.8 });

  try {
    return JSON.parse(response);
  } catch {
    return {
      subject: `Regarding ${context.purpose}`,
      body: `Dear ${context.clientName},\n\nThank you for your interest. We'll be in touch shortly.\n\nBest regards,\nAd Locations Management Team`,
    };
  }
}

/**
 * Enhanced market price intelligence
 */
export async function enhancedPriceEstimation(locationData: {
  address: string;
  type: string;
  dimensions?: string;
  visibility?: string;
  traffic?: string;
  demographics?: string;
}): Promise<{
  estimatedPrice: number;
  priceRange: { min: number; max: number };
  factors: string[];
  confidence: "Low" | "Medium" | "High";
  marketInsights: string;
}> {
  const prompt = `Provide market price analysis for this outdoor advertising location:

Address: ${locationData.address}
Type: ${locationData.type}
Dimensions: ${locationData.dimensions || "Standard"}
Visibility: ${locationData.visibility || "Not assessed"}
Traffic: ${locationData.traffic || "Unknown"}
Demographics: ${locationData.demographics || "Mixed"}

Analyze and provide:
1. Estimated monthly rental price (in cents, e.g., 500000 for $5,000)
2. Price range (min and max in cents)
3. Key factors affecting price
4. Confidence level in estimate
5. Brief market insights

Respond in JSON format:
{
  "estimatedPrice": 500000,
  "priceRange": { "min": 400000, "max": 600000 },
  "factors": ["factor1", "factor2", ...],
  "confidence": "Low/Medium/High",
  "marketInsights": "..."
}`;

  const response = await callDeepSeek([
    {
      role: "system",
      content: "You are a commercial real estate pricing expert specializing in outdoor advertising. Provide data-driven estimates.",
    },
    {
      role: "user",
      content: prompt,
    },
  ], { temperature: 0.3 });

  try {
    return JSON.parse(response);
  } catch {
    return {
      estimatedPrice: 300000,
      priceRange: { min: 200000, max: 400000 },
      factors: ["Location", "Type", "Visibility"],
      confidence: "Medium",
      marketInsights: "Standard market rate for this type of location",
    };
  }
}

/**
 * General AI assistant for queries
 */
export async function aiAssistant(userQuery: string, context?: string): Promise<string> {
  const messages: Message[] = [
    {
      role: "system",
      content: "You are an AI assistant for an outdoor advertising locations management platform. Help users with questions about managing ad locations, landlords, clients, and maintenance. Be concise and helpful.",
    },
  ];

  if (context) {
    messages.push({
      role: "system",
      content: `Context: ${context}`,
    });
  }

  messages.push({
    role: "user",
    content: userQuery,
  });

  return await callDeepSeek(messages, { temperature: 0.7, max_tokens: 1000 });
}
