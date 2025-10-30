import { invokeLLM } from "./_core/llm.js";
export async function estimateAdPrice(params) {
    const prompt = `You are an expert in outdoor advertising pricing. Estimate the monthly rental price for the following ad location:

Type: ${params.type}
Dimensions: ${params.dimensions || "Not specified"}
Location: ${params.address}
Material: ${params.material || "Not specified"}
Additional Notes: ${params.notes || "None"}

Consider factors like:
- Location desirability and foot traffic
- Ad type and size
- Material quality and maintenance
- Market rates for similar locations

Provide a realistic monthly price estimate in USD and explain your reasoning.`;
    const response = await invokeLLM({
        messages: [
            {
                role: "system",
                content: "You are an expert in outdoor advertising pricing. Provide realistic price estimates based on location, size, and market conditions.",
            },
            { role: "user", content: prompt },
        ],
        response_format: {
            type: "json_schema",
            json_schema: {
                name: "price_estimate",
                strict: true,
                schema: {
                    type: "object",
                    properties: {
                        priceEstimate: {
                            type: "number",
                            description: "Monthly rental price in USD (whole number)",
                        },
                        reasoning: {
                            type: "string",
                            description: "Explanation of the pricing factors considered",
                        },
                    },
                    required: ["priceEstimate", "reasoning"],
                    additionalProperties: false,
                },
            },
        },
    });
    const content = response.choices[0].message.content;
    if (!content || typeof content !== 'string') {
        throw new Error("No response from AI");
    }
    const result = JSON.parse(content);
    return {
        priceEstimate: Math.round(result.priceEstimate * 100), // Convert to cents
        reasoning: result.reasoning,
    };
}
export async function generateQuote(params) {
    const monthlyPrice = params.priceEstimate / 100;
    const totalPrice = monthlyPrice * params.contractDuration;
    const prompt = `Generate a professional advertising space rental quote for:

Client: ${params.clientName}
Location: ${params.locationTitle}
Address: ${params.locationAddress}
Type: ${params.type}
Dimensions: ${params.dimensions || "Standard size"}
Monthly Rate: $${monthlyPrice.toLocaleString()}
Contract Duration: ${params.contractDuration} months
Total Contract Value: $${totalPrice.toLocaleString()}

Create a professional, persuasive quote that includes:
1. Introduction and location benefits
2. Pricing breakdown
3. Key features and advantages
4. Terms and conditions summary
5. Call to action

Format it as a professional business document.`;
    const response = await invokeLLM({
        messages: [
            {
                role: "system",
                content: "You are a professional advertising sales representative. Generate compelling, professional quotes for outdoor advertising spaces.",
            },
            { role: "user", content: prompt },
        ],
    });
    const content = response.choices[0].message.content;
    return typeof content === 'string' ? content : '';
}
export async function predictRenewalLikelihood(params) {
    const monthsRemaining = Math.max(0, Math.floor((params.contractEndDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 30)));
    const contractDuration = Math.floor((params.contractEndDate.getTime() - params.contractStartDate.getTime()) /
        (1000 * 60 * 60 * 24 * 30));
    const prompt = `Analyze the renewal likelihood for this advertising client:

Client: ${params.clientName}
Payment Status: ${params.paymentStatus}
Account Status: ${params.accountStatus}
Contract Duration: ${contractDuration} months
Months Remaining: ${monthsRemaining}
Monthly Rent: $${(params.rentAmount / 100).toLocaleString()}

Assess the likelihood of contract renewal (0-100%) and provide:
1. Renewal likelihood percentage
2. Reasoning based on payment history and account status
3. Actionable recommendations to increase renewal chances`;
    const response = await invokeLLM({
        messages: [
            {
                role: "system",
                content: "You are a customer success analyst specializing in advertising contracts. Provide data-driven renewal predictions.",
            },
            { role: "user", content: prompt },
        ],
        response_format: {
            type: "json_schema",
            json_schema: {
                name: "renewal_prediction",
                strict: true,
                schema: {
                    type: "object",
                    properties: {
                        likelihood: {
                            type: "number",
                            description: "Renewal likelihood as a percentage (0-100)",
                        },
                        reasoning: {
                            type: "string",
                            description: "Explanation of the renewal likelihood assessment",
                        },
                        recommendations: {
                            type: "array",
                            items: { type: "string" },
                            description: "List of actionable recommendations",
                        },
                    },
                    required: ["likelihood", "reasoning", "recommendations"],
                    additionalProperties: false,
                },
            },
        },
    });
    const content = response.choices[0].message.content;
    if (!content || typeof content !== 'string') {
        throw new Error("No response from AI");
    }
    const parsed = JSON.parse(content);
    return parsed;
}
//# sourceMappingURL=ai.js.map