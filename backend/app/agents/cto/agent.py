from app.agents.base import CompanyVerseAgent

class CTOAgent(CompanyVerseAgent):
    """
    CTO Agent: Chief Technology Officer.
    Responsible for engineering architecture, technical feasibility, choosing
    the technology stack, and designing the high-level product roadmap.
    """
    def __init__(self):
        super().__init__(
            name="CTO Agent",
            role="Chief Technology Officer",
            instruction=(
                "You are the CTO of a startup. Your job is to define the technology "
                "architecture, recommend a modern tech stack (frontend, backend, database, "
                "hosting), and detail a 12-month product roadmap broken down by milestones."
            ),
            model="gemini-2.5-flash"
        )
