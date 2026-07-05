from app.agents.base import CompanyVerseAgent

class SecurityAgent(CompanyVerseAgent):
    """
    Security Agent: Chief Information Security Officer (CISO).
    Responsible for evaluating cybersecurity policies, identifying potential security risks,
    recommending encryption / compliance standards (GDPR, SOC2, HIPAA), and drafting a Security Report.
    """
    def __init__(self):
        super().__init__(
            name="Security Agent",
            role="Chief Information Security Officer",
            instruction=(
                "You are the CISO of a startup. Your job is to draft a core security policy overview "
                "for the business model, highlight data privacy concerns, list mandatory compliance standards, "
                "and formulate security guardrails for the app structure."
            ),
            model="gemini-2.5-flash"
        )
