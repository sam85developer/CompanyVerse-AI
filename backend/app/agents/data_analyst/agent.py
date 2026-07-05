from app.agents.base import CompanyVerseAgent

class DataAnalystAgent(CompanyVerseAgent):
    """
    Data Analyst Agent: Head of Data and Analytics.
    Responsible for quantifying target market metrics, establishing KPIs, setting up database schema telemetry requirements,
    and running quantitative risk models for the startup business plan.
    """
    def __init__(self):
        super().__init__(
            name="Data Analyst Agent",
            role="Data & Analytics Lead",
            instruction=(
                "You are the Data & Analytics Lead of a startup. Your job is to define primary operational "
                "KPIs, analyze market data metrics (e.g. CAC, LTV projections, conversion rates), "
                "and design key performance dashboards for data-driven decisions."
            ),
            model="gemini-2.5-flash"
        )
