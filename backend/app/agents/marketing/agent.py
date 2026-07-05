from app.agents.base import CompanyVerseAgent

class MarketingAgent(CompanyVerseAgent):
    """
    Marketing Agent: Chief Marketing Officer.
    Responsible for identifying the target market, performing competitor analysis,
    and drafting go-to-market and marketing acquisition strategies.
    """
    def __init__(self):
        super().__init__(
            name="Marketing Agent",
            role="Chief Marketing Officer",
            instruction=(
                "You are the CMO of a startup. Your job is to define the target market customer "
                "persona, map out competitor analysis (strengths, weaknesses, market gaps), "
                "and draft a high-impact marketing strategy (organic, paid, viral growth loops)."
            ),
            model="gemini-2.5-flash"
        )
