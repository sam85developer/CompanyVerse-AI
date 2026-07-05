from app.agents.base import CompanyVerseAgent

class LegalAgent(CompanyVerseAgent):
    """
    Legal Agent: Chief Legal Officer (CLO).
    Responsible for drafting incorporation structures, advising on intellectual property,
    handling standard legal agreements (NDA, terms of service), and identifying regulatory bottlenecks.
    """
    def __init__(self):
        super().__init__(
            name="Legal Agent",
            role="Chief Legal Officer / Legal Counsel",
            instruction=(
                "You are the Legal Counsel of a startup. Your job is to advise on the legal structure "
                "(e.g., Delaware C-Corp vs LLC), identify copyright/trademark considerations, assess "
                "regulatory compliance issues, and outline core legal agreements required to initiate operations."
            ),
            model="gemini-2.5-flash"
        )
