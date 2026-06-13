/**
 * n8n JavaScript Code Node: Distributed Branch Data Fan-In & Aggregation Engine
 * 
 * Objective: Consolidates asynchronous parallel responses from 60+ enterprise branch nodes,
 *            runs mathematical transformations, aggregates metrics, and flags operational anomalies.
 */

// Capture all parallel inputs streaming from the n8n fan-out branches
const inputItems = items || [];

// Initialize our master corporate reporting schema
const aggregatedReport = {
    metadata: {
        compiled_at: new Date().toISOString(),
        total_branches_processed: inputItems.length,
        system_health_status: "OPTIMAL"
    },
    financial_metrics: {
        gross_revenue: 0,
        total_operational_costs: 0,
        net_profit: 0
    },
    operational_anomalies: []
};

// Execute high-performance data reduction across the concurrent stream arrays
inputItems.forEach((item, index) => {
    try {
        const branchData = item.json || {};
        const branchId = branchData.branch_id || `BRANCH_ERR_${index}`;
        
        // 1. Core metric parsing with strict type normalization
        const revenue = parseFloat(branchData.revenue) || 0;
        const costs = parseFloat(branchData.costs) || 0;
        const profit = revenue - costs;

        // 2. Aggregate corporate-level numbers
        aggregatedReport.financial_metrics.gross_revenue += revenue;
        aggregatedReport.financial_metrics.total_operational_costs += costs;
        aggregatedReport.financial_metrics.net_profit += profit;

        // 3. Exception Isolation (Flag underperforming or irregular branches without crashing the loop)
        if (branchData.status === "FAILED" || branchData.timeout_triggered) {
            aggregatedReport.operational_anomalies.push({
                branch_id: branchId,
                incident_type: "NETWORK_TIMEOUT_OR_FAILED_FETCH",
                severity: "HIGH"
            });
        } else if (profit < 0) {
            aggregatedReport.operational_anomalies.push({
                branch_id: branchId,
                incident_type: "NEGATIVE_MARGIN_ALERT",
                severity: "MEDIUM",
                details: `Net Loss: ${profit.toFixed(2)}`
            });
        }

    } catch (error) {
        // Enforce fault isolation at the branch item level
        aggregatedReport.metadata.system_health_status = "DEGRADED";
        aggregatedReport.operational_anomalies.push({
            index_position: index,
            incident_type: "UNEXPECTED_JSON_SCHEMA_EXCEPTION",
            error_message: error.message
        });
    }
});

// Calculate final high-level floating point formatting to avoid JS floating point bugs
aggregatedReport.financial_metrics.gross_revenue = parseFloat(aggregatedReport.financial_metrics.gross_revenue.toFixed(2));
aggregatedReport.financial_metrics.total_operational_costs = parseFloat(aggregatedReport.financial_metrics.total_operational_costs.toFixed(2));
aggregatedReport.financial_metrics.net_profit = parseFloat(aggregatedReport.financial_metrics.net_profit.toFixed(2));

// Return the pristine compiled enterprise matrix to the n8n deployment flow
return [{ json: aggregatedReport }];
