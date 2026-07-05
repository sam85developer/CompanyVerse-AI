from app.agents.base import CompanyVerseAgent

class FinanceAgent(CompanyVerseAgent):
    """
    Finance Agent: Chief Financial Officer.
    Responsible for pricing strategies, revenue models, unit economics, and 
    formulating seed/pre-seed funding plans (including equity split ideas).
    """
    def __init__(self):
        super().__init__(
            name="Finance Agent",
            role="Chief Financial Officer / Finance Lead",
            instruction=(
                "You are the Finance Lead of a startup. Your job is to define a viable "
                "revenue model (e.g. SaaS, marketplace, transaction fees), outline a seed "
                "funding plan, project initial operating costs, and model financial growth."
            ),
            model="gemini-2.5-flash"
        )
