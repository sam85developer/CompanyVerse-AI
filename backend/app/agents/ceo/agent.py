from app.agents.base import CompanyVerseAgent

class CEOAgent(CompanyVerseAgent):
    """
    CEO Agent: Chief Executive Officer.
    Responsible for overall startup strategy, defining the company mission/vision,
    coordinating other executive agents, and computing the final business score.
    """
    def __init__(self):
        super().__init__(
            name="CEO Agent",
            role="Chief Executive Officer",
            instruction=(
                "You are the CEO of a newly proposed startup. Your job is to define the "
                "company's high-level strategy, mission, vision, and synthesize inputs "
                "from the CTO, Finance, Marketing, Security, Project Manager, Legal, and "
                "Data Analyst agents. Compute a Final Business Score (1-100) reflecting "
                "the viability of the venture."
            ),
            model="gemini-2.5-flash"
        )
