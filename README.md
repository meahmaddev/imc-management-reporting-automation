# IMC Management Reporting Automation — Distributed Data Pipeline

A highly concurrent, distributed data pipeline engineered to automate large-scale enterprise reporting for IMC. This system eliminates manual report compilation by dynamically orchestrating data extraction, processing, and structural transformations across 60+ interconnected branch nodes simultaneously.

## 🛠️ Tech Stack & Architecture
- **Orchestration Layer:** n8n Workflow Automation (Enterprise Scale)
- **Runtime Environment:** Node.js / JavaScript (ES6+)
- **Data Transport:** REST APIs, JSON Payloads, Webhooks
- **Architecture Pattern:** Asynchronous Fan-Out / Fan-In Concurrent Processing

## 📡 System Architecture & Data Flow
1. **Scheduled Ingestion:** The pipeline initiates via automated cron/scheduled triggers (daily/weekly), firing data extraction commands across enterprise endpoints.
2. **Concurrent Fan-Out:** The architecture splits into 60+ parallel data-processing streams, isolating each branch's metrics concurrently to prevent system latency bottlenecks.
3. **Data Transformation Engine:** Custom JavaScript mapping algorithms ingest multi-format branch responses, running structural validations and calculating cross-branch aggregations.
4. **Conditional Routing Loops:** Implemented strict conditional error-handling logic gates, ensuring minor branch timeout failures are caught, logged, and isolated without interrupting the parent pipeline.
5. **Unified Reporting Delivery:** Aggregated analytics are compiled into finalized schemas, generating end-to-end automated reports dispatched securely to cloud storage and executive email microservices.

## 📂 Project Structure
- `/src` : Standalone JavaScript data aggregation, structural mapping, and mathematical validation nodes.
